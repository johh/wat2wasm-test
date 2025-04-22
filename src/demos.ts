import factorialDemo from './demos/factorial';
import factorialLoopDemo from './demos/factorialLoop';


type RunnerFn<R = unknown> = ( fn: ( ...args: unknown[]) => R, previous?: R ) => R;

export type Demo = {
	wat: string,
	exports: Record<string, RunnerFn>
};

const demos: Record<string, Demo> = {
	factorial: factorialDemo,
	factorial1M: factorialLoopDemo,
};

export default demos;
