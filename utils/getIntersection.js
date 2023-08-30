/**
 * 两个对象数组，根据某个字段来取交集
 * @param {*} arr1  
 * @param {*} arr2 
 * @param {*} key 
 * @returns 
 */
const getIntersection = (arr1, arr2, key) => {
  let map = new Map()
  let res = []
  arr1.forEach(item => {
    map.set(item[key], item)
  })
  arr2.forEach(item => {
    if (map.has(item[key])) {
      res.push(item)
    }
  })
  return res
}

let arr1 = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
]
let arr2 = [
  { id: 1, name: 'a' },
]
let res = getIntersection(arr1, arr2, 'id')
console.log('res', res)
