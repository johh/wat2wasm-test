import type { Demo } from '../demos';
import wat from './io.wat';


const numbers = new Float32Array( 1_000_000 );
const numbersOut = new Float32Array( 1_000_000 );

numbers.forEach( ( _, i ) => { numbers[i] = Math.random(); } );


function getNumber( index: number ): number {
	return numbers[index];
}

function setNumber( index: number, value: number ): void {
	numbersOut[index] = value;
}


const ioDemo: Demo = {
	wat,
	wasmImports: {
		env: {
			getNumber,
			setNumber,
		},
	},
	exports: {
		bulk_memory: ( fn, runCount, instance ) => {
			const mem = new Float32Array( ( instance.exports.memory as WebAssembly.Memory ).buffer );
			const memOutput = new Float32Array( mem.buffer, 4_000_000, 1_000_000 );

			mem.set( numbers );

			const sum = fn( runCount );

			console.log( sum );

			return memOutput;
		},
		js_io: ( fn, runCount ) => {
			const sum = fn( runCount );

			console.log( sum );

			return numbersOut;
		},
		js_only: ( fn, runCount ) => {
			let sum = 0;

			for ( let i = 0; i < runCount; i += 1 ) {
				sum += numbers[i];
				numbersOut[i] = sum;
			}
		},
		js_only_accurate: ( fn, runCount ) => {
			const sum = new Float32Array( 1 );

			for ( let i = 0; i < runCount; i += 1 ) {
				sum[0] += numbers[i];
				// eslint-disable-next-line prefer-destructuring
				numbersOut[i] = sum[0];
			}
		},
	},

};

export default ioDemo;
