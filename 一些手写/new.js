function _new(func, ...args) {
  // 1.创建一个新对象
  let obj = {};
  // 2.将新对象的隐式原型指向构造函数的显式原型
  obj.__proto__ = func.prototype;
  // 3.执行构造函数，将属性和方法添加到新创建的新对象上 实现（实例对象拥有构造函数的属性） (将func的this指向obj，这样obj就可以访问到func的属性和方法)
  let result = func.apply(obj, args)
  // 4.如果构造函数执行的结果返回的是一个对象，那么返回这个对象
  if (result && typeof (result) == 'object' || typeof (result) == 'function') {
    return result;
  }
  // 如果构造函数返回的不是一个对象，直接返回创建的新对象
  return obj;
}

// 测试
function Person(name) {
  this.name = name;
  this.sayAge = function () {
    console.log('My age is 18');
  }
}

Person.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
}

const duck = _new(Person, 'zhedieya')
console.log(duck.name);
duck.sayName()
duck.sayAge()

// test
