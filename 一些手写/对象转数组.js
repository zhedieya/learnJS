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

