const arr = [
  { id: 1, pid: 0, name: '1' },
  { id: 2, pid: 1, name: '2' },
  { id: 3, pid: 1, name: '3' },
  { id: 4, pid: 2, name: '4' },
  { id: 5, pid: 2, name: '5' },
  { id: 6, pid: 3, name: '6' },
]
/**
 * 数组转树形结构-对象
 * @param {*} arr
 * @param {*} id  id字段
 * @param {*} pid  父id字段
 * @param {*} children  子节点字段
 * @returns
 */
const arrayToTreeByObj = (arr, id = 'id', pid = 'pid', children = 'children') => {
  if (!Array.isArray(arr)) {
    throw new Error('data must be an array')
  }
  if (id === pid) {
    throw new Error('id and pid must not be same')
  }
  const result = []
  const map = {}
  arr.forEach((item) => {
    map[item[id]] = item
  })
  arr.forEach((item) => {
    const parent = map[item[pid]]
    if (parent) {
      ;(parent[children] || (parent[children] = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

console.log(arrayToTreeByObj(arr))

/**
 * 数组转树形结构-递归
 * @param {*} arr
 * @param {*} rootId 根节点id
 * @param {*} children 子节点字段
 */
const arrayToTreeByRecursion = (arr, rootId, children = 'children') => {
  if (!Array.isArray(arr)) {
    throw new Error('data must be an array')
  }
  const result = []
  arr.forEach((item) => {
    if (item.pid === rootId) {
      result.push({
        ...item,
        [children]: arrayToTreeByRecursion(arr, item.id),
      })
    }
  })
  return result
}

console.log(arrayToTreeByRecursion(arr, 0))
