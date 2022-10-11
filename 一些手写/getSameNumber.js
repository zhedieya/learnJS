function getSameNumbers(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr1) || (arr1.length === 0) || (arr2.length === 0)) return '参数异常';
  let newArr = [];
  let newArr1 = [...new Set([].concat.apply([], arr1))];
  let newArr2 = new Set([].concat.apply([], arr2))
  newArr1.forEach(elem => { if (newArr2.has(elem)) { newArr.push(elem) } })
  return newArr;
}

function getSameNumbers_yours(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr1) || (arr1.length === 0) || (arr2.length === 0)) return '参数异常';
  let newArr = [];
  let newArr1 = [...new Set([].concat.apply([], arr1))];
  let newArr2 = [...new Set([].concat.apply([], arr2))];
  newArr1.forEach(elem => { if (newArr2.includes(elem)) { newArr.push(elem) } })
  return newArr;
}

const arr1 = [], arr2 = []
for (let i = 0; i < 100000; i++) {
  arr1.push(Math.floor(Math.random() * i))
  arr2.push(Math.floor(Math.random() * i))
}
console.time('mine')
getSameNumbers(arr1, arr2)
console.timeEnd('mine')
console.time('yours')
getSameNumbers_yours(arr1, arr2)
console.timeEnd('yours')
