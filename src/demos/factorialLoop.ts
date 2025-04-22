import type { Demo } from '../demos';


const factorialLoopDemo: Demo = {
	wat: `(module
  (func $fac (param f64) (result f64)
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
    end
  )
  (func $facloop (export "facloop") (param $num f64) (param $count i32) (result f64)
    (local $i i32)
    (local.set $i (i32.const 0))
    (loop $forloop (block $breakforloop
      (i32.ge_s (local.get $i) (local.get $count))
      br_if $breakforloop
      (call $fac (local.get $num))
      (local.set $i (i32.add (local.get $i) (i32.const 1)))
      br $forloop
    ))
    (f64.const 0)
  )
)
`,
	exports: {
		facloop: ( fn ) => {
			fn( 128, 1_000_000 );
		},
	},

};

export default factorialLoopDemo;
