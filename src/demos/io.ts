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

			fn( runCount );

			return memOutput;
		},
		js_io: ( fn, runCount ) => {
			fn( runCount );

			return numbersOut;
		},
	},

};

export default ioDemo;
