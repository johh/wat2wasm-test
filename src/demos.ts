type RunnerFn<R = unknown> = ( fn: ( ...args: unknown[]) => R, previous?: R ) => R;


const demos: Record<string, {
	wat: string,
	exports: Record<string, RunnerFn>
}> = {
	factorial: {
		wat: `(module
  (func $fac (export "fac") (param f64) (result f64)
    local.get 0
    f64.const 1
    f64.lt
    if (result f64)
      f64.const 1
    else
      local.get 0
      local.get 0
      f64.const 1
      f64.sub
      call $fac
      f64.mul
    end)
)
`,
		exports: {
			fac: ( fn ) => {
				fn( 128 );
			},
		},
	},
};

export default demos;
