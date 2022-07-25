/** 了解 但不推荐使用
 * eval(...)和with会在运行时修改或者创建新的作用域，以此来欺骗其他在书写时定义的词法作用域
 * eval() 函数会将传入的字符串当做 JavaScript 代码进行执行，来"欺骗"词法作用域。
 * with() 函际上是根据传递给它的对象凭空创建一个全新的词法作用域
 * 会导致引擎无法在编译时对作用域进行查找优化
 */
"use strict"  // 严格模式下eval无法更改词法作用域
function foo(str, i) {
  eval(str);
  console.log(i, j);
}

var j = 2 

foo("var j = 3", 1); // output:1,3


console.log(eval('2 + 2'));
// expected output: 4

console.log(eval(new String('2 + 2')));
// expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'));
// expected output: true

console.log(eval('2 + 2') === eval(new String('2 + 2')));
// expected output: false

