(module
  (import "env" "getNumber" (func $get_external (param i32) (result f32)))
  (import "env" "setNumber" (func $set_external (param i32) (param f32)))
  (memory (export "memory") 128 128)

  (func (export "bulk_memory") (param $count i32) (result f32)
    (local $sum f32)
    (local $i i32)
    (local $offset i32)
    (local.set $i (i32.const 0))
    (loop $forloop (block $breakforloop
      (i32.ge_s (local.get $i) (local.get $count))
      br_if $breakforloop
      ;; calculate mem offset of next f32
      local.get $i
      i32.const 4
      i32.mul
      ;; save offset to $offset but keep it on the stack
      local.tee $offset
      ;; load f32 at that offset
      f32.load
      ;; and add it to $sum
      local.get $sum
      f32.add
      local.set $sum

      ;; calculate mem offset of output
      i32.const 4000000
      local.get $offset
      i32.add

      ;; store $sum in output
      local.get $sum
      f32.store

      ;; increment $i by one
      local.get $i
      i32.const 1
      i32.add
      local.set $i

      br $forloop
    ))
    (local.get $sum)
  )
  (func (export "js_io") (param $count i32) (result f32)
    (local $sum f32)
    (local $i i32)
    (local.set $i (i32.const 0))
    (loop $forloop (block $breakforloop
      (i32.ge_s (local.get $i) (local.get $count))
      br_if $breakforloop
      ;; load next f32
      local.get $i
      call $get_external
      ;; and add it to $sum
      local.get $sum
      f32.add
      local.set $sum

      ;; store $sum in output
      local.get $i
      local.get $sum
      call $set_external

      ;; increment $i by one
      local.get $i
      i32.const 1
      i32.add
      local.set $i

      br $forloop
    ))
    (local.get $sum)
  )
)
