// var Cat = {}; //JSON
// Cat.name = "kity"; //添加属性并赋值
// console.log(Cat.name);

// var Dog = {};
// Dog.color = "red";
// console.log(Dog.color);

// var Peg = 'ConardLi'
// Peg.color = 'red';
// console.log(Peg.color); // undefined
// async function testAsync() {
//   // return "hello async";
//   console.log('test');
// }

// const result = testAsync();
// console.log(result);

// 异步执行顺序
// setTimeout(function () {
//   console.log("setTimeout");
// });

// new Promise(function (resolve) {
//   console.log("promise");
//   resolve()
// }).then(function () {
//   console.log("then");
// });

// console.log("console");

// var name = "windowsName";
// function a() {
//     var name = "Cherry";

//     console.log(this.name);          // windowsName  严格模式：undefiened

//     console.log("inner:" + this);    // inner: Window
// }
// a();
// console.log("outer:" + this)         // outer: Window
// var a = {
//   name : "Cherry",

//   func1: function () {
//       console.log(this.name)
//   },

//   func2: function () {
//       setTimeout(  function () {
//           this.func1()
//       }.bind(a),100);
//   }

// };

// a.func2()            // Cherry

// var obj = {
//   hi: function () {
//     console.log(this);
//     return () => {
//       console.log(this);
//     };
//   },
//   sayHi: function () {
//     return function () {
//       console.log(this);
//       return () => {
//         console.log(this);
//       };
//     };
//   },
//   say: () => {
//     console.log(this);
//   },
// };
// obj.hi(); //输出obj对象

// var test1 = {
//   a: function () {
//     console.log(this);
//   },
//   b: function () {
//     console.log(this);
//   }
// }
// test1.a();

// function foo(func) {
//   func()
// }

// function bar() {
//   console.log(this); // window
// }

// var obj={
//   name:'obj',
//   bar:bar
// }

// foo(obj.bar);

// function foo(func) {
//   func()
// }

// function bar() {
//   console.log(this); // window
// }

// foo(bar);

// function test(){
//   var outerArgs=Array.prototype.slice.call(arguments,1)
//   console.log(outerArgs);
//   return function(){
//     var innerArgs=Array.prototype.slice.call(arguments)
//     // innerArgs=arguments  // [Arguments] { '0': 22 }
//     console.log(innerArgs);
//   }
// }
// let obj = {
//   name: 'cyk',
//   testFn() {
//     console.log('sss')
//   }
// }

// var a=obj.testFn;
// var b=new a(); // a is not a constructor

// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
// })
//   .then(result => result)
//   .catch(e => e);

// const p2 = new Promise((resolve, reject) => {
//   throw new Error('报错了');
// })
//   .then(result => result)
//   .catch(e => e);

// Promise.all([p1, p2])
//   .then((result) => {
//     console.log(p2);
//     console.log(result)
//   })
//   .catch(e => console.log(e));
// // ["hello", Error: 报错了]
// 创建一个新的p对象promise
// const p = new Promise((resolve, reject) => { // 执行器函数
//   console.log('sss');
//   // 执行异步操作任务
//   setTimeout(() => {
//     const time = Date.now()
//     // 如果当前时间是偶数代表成功，否则失败
//     if (time % 2 == 0) {
//       // 如果成功，调用resolve(value)
//       resolve('成功的数据，time=' + time)
//     } else {
//       // 如果失败，调用reject(reason)
//       reject('失败的数据，time=' + time)
//     }
//   }, 1000);
// })

// p.then(
//   value => { // 接收得到成功的value数据 onResolved
//     console.log('成功的回调', value)  // 成功的回调 成功的数据，time=1615015043258
//   },
//   reason => { // 接收得到失败的reason数据 onRejected
//     console.log('失败的回调', reason)    // 失败的回调 失败的数据，time=1615014995315
//   }
// )

// const testArr = [1, 3, 4, 1, 3, 2, 9, 8, 5, 3, 2, 0, 12, 10]
// let a=testArr.reduce((acc, cur) => {
//   if (!(cur in acc)) {
//     acc[cur] = 1
//   } else {
//     acc[cur] += 1
//   }
//   return acc
// }, {})

// console.log(a);

// console.log();
// var obj = {
//   name:'ConardLi',
//   [Symbol('name2')]:'code秘密花园'
// }
//  // ["name"]
//  console.log(Object.getOwnPropertyNames(obj));
// console.log([Symbol('cyk')]);
// const obj={};
// obj['sss']=1;
// console.log(obj);

// console.log(toString(2));
// var value=3;
// var obj = {};
// Object.defineProperty(obj, "num", {
//     get:()=>{
//       return value;
//     },
//     set:(newValue)=>{
//       value=newValue
//     },
//     enumerable : true,
//     configurable : true
// });
// console.log(obj);
// obj.num=22
// console.log(obj.num);
// let arr = ['毕业旅行', '毕业旅游', '毕业了'];
// function makeSensitiveMap(sensitiveWordList) {
//   // 构造根节点
//   const result = new Map();
//   for (const word of sensitiveWordList) {
//     let map = result;
//     for (let i = 0; i < word.length; i++) {
//       // 依次获取字
//       const char = word.charAt(i);
//       // 判断是否存在
//       if (map.get(char)) {
//         // 获取下一层节点
//         map = map.get(char);
//       } else {
//         // 将当前节点设置为非结尾节点
//         if (map.get("laster") === true) {
//           map.set("laster", false);
//         }
//         const item = new Map();
//         // 新增节点默认为结尾节点
//         item.set("laster", true);
//         map.set(char, item);
//         map = map.get(char);
//       }
//     }
//   }
//   return result;
// };
// console.log(makeSensitiveMap(arr));
// console.log(JSON.parse(JSON.stringify('[aa,bb,cc]')));
// let arr=JSON.parse(JSON.stringify('[aa,bb,cc]'));
// let arr=Object.values('[aa,bb,cc]')
// console.log(arr);
// console.log(Object.prototype.toString.call(arr));
// function showCase(value) {
//   switch (value) {
//     case 'A':
//       console.log('a');
//       break;

//     default:
//       console.log('default');
//   }
// }
// showCase(String('A'))

// for(var i=0;i<10;i++){
//   setTimeout(()=>{
//     console.log(i);
//   },1000)
// }
// var arrayLike = {
//   0: 'zhangsan',
//   1: 'lisi',
//   2: 'zhaoliu',
//   length: 3
// }

// console.log(Array.from(arrayLike));

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000)
// }

// for (var i = 0; i < 5; i++) {
//   (function (j) {
//     setTimeout(() => {
//       console.log(j);
//     }, 1000)
//   })(i)
// }

// function spread(a,b){
//   console.log(a,b);  
// }
// spread.apply(null,[2,3])

// let curry = spread.bind(null,2)
// curry(3)

// spread.bind(null,2)(3)

function zhedieya() {
  console.log(arguments);
}
zhedieya(1, 2, 3)

function test (a,...args){
  console.log(args);
}
test(1,2,3)
//  test gitmoji
// git commit -m ":sparkles: test emoji"
// git commit -m ":sparkles: test emoji"

