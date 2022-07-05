// 处理之前
var arr1 = [];
for (var i = 0; i < 3; i++) {
  arr1[i] = function () {
    console.log(i);
  }
}
// 由于var是全局变量，执行完循环后i是3，所以每次打印结果都是3
arr1[0]();
arr1[1]();
arr1[2]();

// 修改成闭包来解决问题
var arr2 = [];
for (var i = 0; i < 3; i++) {
  // 立即执行函数会形成一个单独的作用域，作用域里面的变量，外面访问不到,可以避免变量污染
  // 立即执行函数只要满足‘访问另一个函数作用域里的变量’就形成了闭包
  arr2[i] = (function (i) { //function里的是独立作用域的i
    return function () {
      console.log(i); //同上
    }
  })(i); //这儿的i是for循环里的i   每次循环都会将该i赋值给循环里独立作用域里i
}

arr2[0]();
arr2[1]();
arr2[2]();


// let块级作用域解决问题
var arr3 = [];
for (let i = 0; i < 3; i++) {
  arr3[i] = function () {
    console.log(i);
  }
}
// for循环里有个隐藏作用域，在每次执行循环体之前，js引擎会把i在循环体上下文中重新创建并初始化一次
// 几次循环，就有几次不同的i
arr3[0]();
arr3[1]();
arr3[2]();


console.log('*********************');

// 自由变量的查找，是在函数定义的地方，向上级作用域查找。不是在执行的地方。
function createCache() {
  const data = {}; // 闭包中被隐藏的数据，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}

const c = createCache();
c.set("a", 100);
console.log(c.get("a")); // 100




