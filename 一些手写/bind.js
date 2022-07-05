Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  // 保存bind函数的this，指向调用者
  var _self = this
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数调用时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 当作为普通函数调用时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return _self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  // 若调用bind的函数不能作为构造函数(比如下面的obj.testFn)会报错     所以这儿需做一下判断
  console.log(this.prototype);
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

