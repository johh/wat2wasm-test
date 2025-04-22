import factorialDemo from './demos/factorial';
import factorialLoopDemo from './demos/factorialLoop';


type RunnerFn<R = unknown> = (
	fn: ( ...args: unknown[]) => R,
	runCount: number,
) => R;

export type Demo = {
	wat: string,
	exports: Record<string, RunnerFn>
};


const demos: Record<string, Demo> = {
	factorialJS: factorialDemo,
	factorialWASM: factorialLoopDemo,
};

export default demos;
