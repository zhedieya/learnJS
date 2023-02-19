// 第一版
var curry1 = function (fn) {
  // 注：这里只知道使用者会传入 fn，还有其他的参数不知道，通过 arguments 处理。
  var args = [].slice.call(arguments, 1) // 注：截取 1 ~ length-1 的数组，即非 fn 的预设（默认）元素。
  return function () {
    var newArgs = args.concat([].slice.call(arguments)) // 注：将默认参数 和 新传入的实参合并
    return fn.apply(this, newArgs) // 注：通过 apply 调用 fn。另外，经过实验发现，使用 call 和 apply，若（总传入的）实参个数超出 被调用函数形参的个数，多余的实参会被抛弃
  }
}

function add(a, b) {
  return a + b
}

var addCurry = curry1(add, 1)
addCurry(2) // 3

/********************************/

// 第二版
function sub_curry(fn) {
  // 注：第一版的代码，作为辅助函数
  var args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry2(fn, length) {
  // 注：function.length 表示形参个数，第一次调用 curry，没传递 length，所以 length 为 fn.length。因为下面有递归调用 curry，
  // 所以“可能”会有第二次调用 curry。递归调用时，会传递 length；所以这时候，length 是传来的实参，不是 fn.length。
  // 另外，这里传来的 length 也影响了是否继续递归的判断
  length = length || fn.length

  return function () {
    if (arguments.length < length) {
      // 注：这里的 length 表示 还能传递多少实参
      // 注：调用 sub_curry 第一个参数就是 fn，所以放在第一个，后面的参数作为“默认参数”
      var combined = [fn].concat([].slice.call(arguments))
      // 注：递归调用 curry 函数。length - arguments.length 作为 curry 函数的形参 length 对应的实参，表示：还可以传
      // 递多少实参
      return curry2(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      // 注：传递了足够的参数，则停止递归；调用 fn
      return fn.apply(this, arguments)
    }
  }
}

var fn = curry2(function (a, b, c) {
  console.log([a, b, c])
})

// fn("a", "b", "c") // ["a", "b", "c"]
// fn("a", "b")("c") // ["a", "b", "c"]
fn('a')('b')('c') // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]

function curry3(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      // 注：如果（多次调用的）arguments 合并的长度够了，则运行函数；否则，函数继续等待调用
      return func.apply(this, args) // 注：执行函数
    } else {
      return function (...args2) {
        // 注：继续等待调用
        // 注：递归。在递归前，将 args 和 args2 合并，并替代 args，用于递归判断
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
