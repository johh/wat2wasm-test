import type { Demo } from '../demos';
import wat from './factorial.wat';


const factorialLoopDemo: Demo = {
	wat,
	exports: {
		fac: ( fn, runCount ) => {
			for ( let i = 0; i < runCount; i += 1 ) {
				fn( 128 );
			}
		},
		facloop: ( fn, runCount ) => {
			fn( 128, runCount );
		},
	},

};

export default factorialLoopDemo;
