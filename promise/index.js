// https://es6.ruanyifeng.com/#docs/promise
/**
 * Promise
 * resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
 */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error')
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p1)
  }, 1000)
})
// p2 的状态由 p1 决定，p1 会等待 3 秒后 reject
p2.then((res) => {
  console.log('resolve', res)
}).catch((err) => {
  console.log('reject', err)
})

/**
 * then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
 * 使用then方法，依次指定多个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
 */
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success1')
  }, 3000)
})

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p3)
  }, 1000)
})
/**
 * 如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。
 * 另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获
 */
p4.then((res) => {
  console.log('resolve1', res)
  return 'success2'
})
  .then((res) => {
    console.log('resolve2', res)
    throw new Error('resolve2 error')
  })
  .catch((err) => {
    console.log(err)
  })
// reject()方法的作用，等同于抛出错误。
// 如果 Promise 状态已经变成resolved，再抛出错误是无效的。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

/**
 * 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
 */
Promise.resolve('foo')
// 等价于
new Promise((resolve) => resolve('foo'))
//（1）参数是一个 Promise 实例
// 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

// （2）参数是一个thenable对象
// thenable对象指的是具有then方法的对象，比如下面这个对象。
const thenable = {
  then: function (resolve, reject) {
    resolve(42)
  },
}
Promise.resolve(thenable).then((res) => {
  console.log(res)
})
// 上面代码中，Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

// （3）参数不是具有then方法的对象，或根本就不是对象
// 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
const p5 = Promise.resolve('Hello')
p5.then(function (s) {
  console.log(s)
})
// 上面代码生成一个新的 Promise 对象的实例p。
// 由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，
// 所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。

// （4）不带有任何参数
// Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
const p6 = Promise.resolve()

p6.then(function () {
  // ...
})
// 上面代码的变量p6就是一个 Promise 对象。
// 需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

setTimeout(function () {
  console.log('three')
}, 0)

Promise.resolve().then(function () {
  console.log('two')
})

console.log('one')
// one
// two
// three
// 上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
