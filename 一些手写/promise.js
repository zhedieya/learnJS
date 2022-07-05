//手写Promise

// 定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class _Promise {
  // executor 是一个执行器，进入会立即执行
  // 并传入resolve和reject方法
  constructor(executor) {
    // 捕获执行器错误
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 初始状态值为PENDING
  status = PENDING;

  // 成功的值
  value = null;
  // 失败的值
  reason = null;

  // 存储成功回调函数 以数组形式储存是为了实现then方法多次调用添加多个处理函数
  // onFulfilledCallback = null;
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  // onRejectedCallback = null;
  onRejectedCallbacks = [];



  // 更改成功的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      // 修改状态为成功
      this.status = FULFILLED;
      // 保存成功后的值
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  // 更改失败的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      // 修改状态为失败
      this.status = REJECTED;
      // 保存失败后的值
      this.reason = reason;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // 为了实现链式调用，这儿创建一个Promise，并在后面return出去
    const promise2 = new _Promise((reslove, reject) => {
      // 判断状态
      if (this, this.status === FULFILLED) {
        // 创建一个微任务等待promise2完成初始化
        queueMicrotask(() => {
          // then执行时的错误捕捉
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 将promise2和x传入resolvePromise处理
            resolvePromise(promise2, x, reslove, reject)
          } catch (error) {
            reject(error)
          }
        })

      } else if (this.status === REJECTED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })

      } else if (this.status === PENDING) {
        // 因为若Promise里执行了异步函数(比如setTimeout)，会直接执行微任务then，此时状态还是PENDING，无法执行成功失败的回调函数
        // 所以将成功回调和失败回调存储起来，等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
      }
    })
    return promise2;
  }
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof _Promise) {
      return parameter;
    }

    // 转成常规方式
    return new _Promise(resolve => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new _Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

// 处理then里为了链式调用而产生的返回值
function resolvePromise(promise2, x, reslove, reject) {
  // 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
  // 若相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 如果成功回调函数的执行结果是Promise的实例对象
  if (x instanceof _Promise) {
    // 链式调用，目的是将其状态变为 fulfilled 或者 rejected
    x.then(reslove, reject)
  } else {
    reslove(x)
  }
}


const promise1 = new _Promise((resolve, reject) => {
  resolve('success')
  reject('err')
})
promise1.then(value => {
  console.log(0);
  console.log('resolve', value)
  // return 一个返回值作为下一个then方法的参数
  return other()
}, reason => {
  console.log('reject', reason)
}).then(value => {
  console.log(4)
  console.log('resolve', value)
})


function other() {
  return new _Promise((resolve, reject) => {
    resolve('other')
  })
}

const promise2 = new _Promise((resolve, reject) => {
  // 异步函数
  setTimeout(() => {
    resolve('success')
  }, 2000);
})
promise2.then(value => {
  console.log(1)
  console.log('resolve', value)
})

promise2.then(value => {
  console.log(2)
  console.log('resolve', value)
})

promise2.then(value => {
  console.log(3)
  console.log('resolve', value)
})


const promise3 = new _Promise((reslove, reject) => {
  reslove('success')
})
const p3 = promise3.then(value => {
  console.log(5);
  console.log(value);
  return p3;
})
p3.then(value => {
  console.log(6);
  console.log('resolve', value)
}), reason => {
  console.log(7);
  console.log(reason.message);
}
