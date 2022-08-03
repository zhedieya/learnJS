/**
 * bind 起源
 * @param {*} context 
 * @returns 
 */
function foo1(sth) {
  return this.a1 + sth;
}
let obj1 = {
  a1: 2
};
let bar1 = function () {
  return foo1.apply(obj1, arguments)
}
var b1 = bar1(3);
console.log(b1); // 5

/** 演变为↓ */
function foo2(sth) {
  return this.a1 + sth;
}
let obj2 = {
  a1: 2
};
function bind2(fn, obj) {
  return function () {
    return fn.apply(obj, arguments)
  }
}
let bar2 = bind2(foo2, obj2)
var b2 = bar2(3);
console.log(b2); // 5

Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  // 保存bind函数的this，指向调用者
  var _self = this
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    /** 这段代码会判断硬绑定函数是否被new调用，如果是的话会使用新创建的this替换硬绑定的this */
    // 当作为构造函数调用时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数调用时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return _self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  // 若调用bind的函数不能作为构造函数(比如下面的obj.testFn)会报错     所以这儿需做一下判断
  if (this.prototype) {
    fBound.prototype = Object.create(this.prototype)
  }
  return fBound; //返回一个函数
}

// 测试
let foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';

let bindFoo = bar._bind(foo, 'Jack');
let objTest1 = new bindFoo(20);
console.log(objTest1.habit);


let obj = {
  name: 'cyk',
  testFn(age) {
    console.log(`${this.name}${age}岁了`)
  }
}
let testObj = {
  name: 'zhedieya'
}
obj.testFn._bind(testObj, 22)();

// a way of accomplishing Currying
function foo3(p1, p2) {
  this.val = p1 + p2
}
// 使用null是因为本例中并不关心硬绑定的this是什么，反正new时会被修改
var bar3 = foo3.bind(null, 2)
var test = new bar3(3)
console.log(test.val); // 5

