let arr1 = [
  {
    name: '1', type: 0
  },
  {
    name: '2', type: 0
  },
  {
    name: '3', type: 2
  },
  {
    name: '4', type: 2
  },
  {
    name: '5', type: 3
  },
  {
    name: '6', type: 3
  },
]
// 双map
let resultArr = Array.from(new Set(arr1.map(value => { return value.type }))).map(item => {
  return {
    type: item,
    values: arr1.filter(el => {
      if (el.type == item) {
        return el;
      }
    })
  }
})
console.log(resultArr);
// test
