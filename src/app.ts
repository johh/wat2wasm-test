/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import wabtModule from 'wabt';
import demos from './demos';


const form = document.querySelector( 'form' );
const input = document.querySelector<HTMLTextAreaElement>( '#input' );
const demo = document.querySelector<HTMLTextAreaElement>( '#demo' );
const runs = document.querySelector<HTMLTextAreaElement>( '#runs' );
const output = document.querySelector( 'output' );


async function wait(): Promise<void> {
	return new Promise( ( resolve ) => {
		requestIdleCallback( () => {
			resolve();
		} );
	} );
}

async function setup(): Promise<void> {
	const wabt = await wabtModule();

	input.value = demos[demo.value].wat;

	form.addEventListener( 'submit', async ( event ) => {
		event.preventDefault();

		form.classList.add( 'busy' );

		// const t = new TextEncoder().encode( input.value );

		const currentDemo = demos[demo.value];
		const numRuns = parseInt( runs.value, 10 );

		const m = wabt.parseWat( 'test.wast', input.value );

		m.resolveNames();
		m.validate();

		const bin = m.toBinary( { log: true, write_debug_names: true } );
		const wasmModule = await WebAssembly.compile( bin.buffer );
		const wasmInstance = await WebAssembly.instantiate( wasmModule );

		m.destroy();

		const log:string[] = [];
		const writeOut = async (): Promise<void> => {
			output.textContent = log.join( '\n' );
			await wait();
		};

		log.push( `Running ${demo.value} ${numRuns} times...` );

		await writeOut();

		const keys = Object.keys( wasmInstance.exports );

		for ( let i = 0; i < keys.length; i += 1 ) {
			const key = keys[i];

			let args = currentDemo.exports[key];
			const exp = wasmInstance.exports[key];
			const isLastKey = i === keys.length - 1;
			const listChar = isLastKey ? '└' : '├';
			const prefixChar = isLastKey ? ' ' : '│';

			if ( typeof exp !== 'function' ) continue;

			log.push( `${listChar}─ export "${key}"` );

			// eslint-disable-next-line no-await-in-loop
			await writeOut();

			if ( !args ) {
				log.push( `${prefixChar}  ├─ No arguments listed for export "${key}"` );
				args = [];
			}

			const start = performance.now();

			for ( let j = 0; j < numRuns; j += 1 ) {
				exp( ...args );
			}

			log.push( `${prefixChar}  └ WASM took ${( performance.now() - start ).toFixed( 2 )}ms` );

			// eslint-disable-next-line no-await-in-loop
			await writeOut();
		}


		// Object.keys( wasmInstance.exports ).forEach( ( key ) => {
		// 	const exp = wasmInstance.exports[key];

		// 	log.push( '' );
		// 	if ( typeof exp === 'function' ) {
		// 		exp( 64 );
		// 	}
		// } );

		form.classList.remove( 'busy' );
	} );
}

setup();
