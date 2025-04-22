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
	factorial: factorialLoopDemo,
};

export default demos;
