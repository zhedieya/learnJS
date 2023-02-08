// https://juejin.cn/post/6844904096525189128
// Promise/A+规范的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    console.log('调用Promise构造函数')
    this._status = PENDING // 初始状态
    // 以数组形式储存是为了实现then方法多次调用添加多个处理函数
    this._resolveQueue = [] // then收集的执行成功的回调队列
    this._rejectQueue = [] // then收集的执行失败的回调队列
    this._value = undefined // 储存then回调return的值

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (val) => {
      console.log('out _resolve')
      //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
      const run = () => {
        console.log('in _resolve')
        if (this._status !== PENDING) return // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = FULFILLED // 变更状态
        this._value = val // 储存当前value

        // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
    // 实现同resolve
    let _reject = (val) => {
      const run = () => {
        console.log('in _reject')
        if (this._status !== PENDING) return // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = REJECTED // 变更状态
        this._value = val // 储存当前value
        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }

  // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  then(resolveFn, rejectFn) {
    console.log('in then')
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    resolveFn = typeof resolveFn === 'function' ? resolveFn : (value) => value
    rejectFn =
      typeof rejectFn === 'function'
        ? rejectFn
        : (reason) => {
            throw reason
          }

    return new MyPromise((resolve, reject) => {
      // 重新包装resolveFn一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
      const fulfilledFn = (value) => {
        try {
          //执行第一个(当前的)Promise的成功回调,并获取返回值
          let x = resolveFn(value)
          //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
          //这里resolve之后，就能被下一个.then()的回调获取到返回值，从而实现链式调用
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      //reject同理
      const rejectedFn = (error) => {
        try {
          let x = rejectFn(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      switch (this._status) {
        // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
        case PENDING:
          console.log('in queue')
          this._resolveQueue.push(fulfilledFn)
          this._rejectQueue.push(rejectedFn)
          break
        // 当状态已经变为resolve/reject时,直接执行then回调
        case FULFILLED:
          fulfilledFn(this._value) // this._value是上一个then回调return的值
          break
        case REJECTED:
          rejectedFn(this._value)
          break
      }
    })
  }

  //catch方法其实就是执行一下then的错误回调
  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  //finally方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value), // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason
        }) // reject同理
    )
  }

  //静态的resolve方法
  static resolve(value) {
    if (value instanceof MyPromise) return value // 根据规范, 如果参数是Promise实例, 直接return这个实例
    return new MyPromise((resolve) => resolve(value))
  }

  //静态的reject方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  //静态的all方法
  static all(promiseArr) {
    let index = 0
    let result = []
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        MyPromise.resolve(p).then(
          (val) => {
            index++
            result[i] = val
            //所有then执行后, resolve结果
            if (index === promiseArr.length) {
              resolve(result)
            }
          },
          (err) => {
            //有一个Promise被reject时，MyPromise的状态变为reject
            reject(err)
          }
        )
      })
    })
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
      for (let p of promiseArr) {
        MyPromise.resolve(p).then(
          //Promise.resolve(p)用于处理传入值不为Promise的情况
          (value) => {
            resolve(value) //注意这个resolve是上边new MyPromise的
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }
}

// 即将(resolve, reject) => {
// } 作为参数传递给构造函数
const p1 = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  resolve('1')
  // }, 1000)
})

p1.then((res) => {
  console.log(res)
  return 2 //链式调用测试
})
// .then() //值穿透测试
// .then((res) => {
//   console.log(res)
//   return new MyPromise((resolve, reject) => {
//     resolve(3) //返回Promise测试
//   })
// })
// .then((res) => {
//   console.log(res)
//   throw new Error('reject测试') //reject测试
// })
// .then(
//   () => {},
//   (err) => {
//     console.log(err)
//   }
// )
