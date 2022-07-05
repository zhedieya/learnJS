function debounce1(func, delay) {
  var time = null

  return function () {
    var context = this
    var args = arguments

    clearTimeout(time)
    time = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

// fn是你要调用的函数，delay是防抖的时间,immediate参数判断是否立即执行（希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行）
function debounce2(fn, delay, immediate) {
  // timer是一个定时器
  let timer = null
  // 返回一个闭包函数，用闭包保存timer确保其不会销毁，重复点击会清理上一次的定时器
  return function () {
    var context = this
    // 保存事件参数，防止fn函数需要事件参数里的数据
    let args = arguments
    // 调用一次就清除上一次的定时器
    clearTimeout(timer)
    if (immediate) {
      // 如果没执行，直接执行；如果执行过了，不再执行
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (callNow) fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        // 若不改变this指向，则会指向window
        fn.apply(context, args)
      }, delay)
    }
  }
}

// 时间戳实现节流
function throttle1(func, delay) {
  var previous = 0
  return function () {
    var context = this
    var args = arguments
    var now = +new Date()
    if (now - previous >= delay) {
      func.apply(context, args)
      previous = now
    }
  }
}
// 定时器实现节流
function throttle2(func, delay) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, delay)
    }
  }
}
// 第一种事件(throttle1)会立刻执行，第二种事件会在 n 秒后第一次执行
// 第一种事件(throttle2)停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件
