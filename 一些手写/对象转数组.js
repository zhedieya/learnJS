let arr = [
  { name: 'zhedieya', age: 21, sex: 'male' },
  { name: 'cyk', age: 20, sex: 'male' },
  { name: 'foldtheDuck', age: 22, sex: 'female' },
]

// let result = [...new Set(arr.reduce((acc, cur) => {
//   return acc.concat(Object.keys(cur))
// }, []))]
// console.log(result);
let res = [];
res.push(Object.keys(arr[0]))
res.push(...arr.map(item => Object.values(item)))
console.log(res);

let obj={
  keyword:'111',
  password:'22222',
}

// 测试merge

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
