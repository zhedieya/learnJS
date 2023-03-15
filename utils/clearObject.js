function clearObject(obj, value = undefined) {
  if (!obj) return

  const keys = Reflect.ownKeys(obj)
  let empty = {}
  keys.forEach((key) => {
    Reflect.set(empty, key, value)
  })
  return empty
}

let res = clearObject({ a: 1, b: 2, c: 3 })
console.log(res)
