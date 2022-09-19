// Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组。
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
console.log(arrayLike);

console.log('arrayLike --> array');

console.log(Array.from(arrayLike));
console.log(Array.prototype.slice.call(arrayLike));
console.log(Array.prototype.concat.apply([], arrayLike));

// this arrayLike is not iterable, so can not use spread operator
