// 手写call   思路就是通过对象调用函数隐式绑定来将this的指向变更为obj
Function.prototype._call = function (obj, ...arguments) {
  // 因为调用call时传入指向undefined或者null，this会指向window，所以这儿需处理一下
  obj = obj || window;
  // Symbol是唯一的，防止重名key
  const func = Symbol();
  // 将func设置为obj的属性，值为this，这样obj.func时this便指向obj
  obj[func] = this;
  // 执行，返回执行值
  return obj[func](...arguments);
}

// apply同理，就是参数是数组
Function.prototype._apply = function (obj, args) {
  obj = obj || window;
  const func = Symbol();
  obj[func] = this;
  return obj[func](...args);
}
// 测试
let obj = {
  name: 'cyk',
  testFn(age) {
    console.log(`${this.name}${age}岁了`)
  }
}
let testObj = {
  name: 'zhedieya'
}
obj.testFn._call(testObj, 22);
obj.testFn._apply(testObj, [22])

