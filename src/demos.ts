import factorialLoopDemo from './demos/factorialLoop';
import ioDemo from './demos/io';


type RunnerFn<R = unknown> = (
	fn: ( ...args: unknown[]) => R,
	runCount: number,
	instance: WebAssembly.Instance,
) => R;

export type Demo = {
	wat: string,
	wasmImports?: WebAssembly.Imports,
	exports: Record<string, RunnerFn>
};


const demos: Record<string, Demo> = {
	factorial: factorialLoopDemo,
	io: ioDemo,
};

export default demos;
