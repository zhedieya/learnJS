/**
 * author: changyakai
 */
const getRules = (message) => {
  return {
    required: true,
    message,
    trigger: ['blur', 'change'],
    transform(value) {
      if (!value) return false
      return value.trim()
    },
  }
}

/**
 * 生成表单验证规则
 * @param {*} key  字段名
 * @param {*} message  提示信息
 * @param {*} rules 其他规则
 * @returns  {Object}  { [key]: [getRules(message), ...rules] }
 */
function genRules({ key, message, rules }) {
  if (!key || !message) {
    throw new Error('Missing key or message')
  }
  return {
    [key]: [getRules(message), ...rules],
  }
}

/**
 * 清空对象
 * @param {*} obj
 * @param {*} value
 * @returns
 */
function clearObject(obj, value = undefined) {
  if (!obj) return

  const keys = Reflect.ownKeys(obj)
  let empty = {}
  keys.forEach((key) => {
    Reflect.set(empty, key, value)
  })
  return empty
}

/**
 * 数组转树形结构-对象
 * @param {*} arr
 * @param {*} id  id字段
 * @param {*} pid  父id字段
 * @param {*} children  子节点字段
 * @returns
 */
function arrayToTreeByObj(arr, id = 'id', pid = 'pid', children = 'children') {
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

/**
 * 数组转树形结构-递归
 * @param {*} arr
 * @param {*} rootId 根节点id
 * @param {*} children 子节点字段
 */
function arrayToTreeByRecursion(arr, rootId, children = 'children') {
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

/**
 * 树转数组-stack
 * @param {*} treeData 树形结构数据
 */
function treeToArrayByStack(treeData) {
  if (!Array.isArray(treeData)) {
    throw new Error('TreeData must be an array')
  }
  const result = []
  const stack = [...treeData]
  while (stack.length) {
    const item = stack.pop()
    result.push(item)
    if (item.children) {
      stack.push(...item.children)
    }
  }
  return result
}

/**
 * 树转数组-递归
 * @param {*} treeData 树形结构数据
 * @returns
 */
function treeToArrayByRecursion(treeData) {
  if (!Array.isArray(treeData)) {
    throw new Error('TreeData must be an array')
  }
  const result = []
  treeData.forEach((item) => {
    result.push(item)
    if (item.children) {
      result.push(...treeToArrayByRecursion(item.children))
    }
  })
  return result
}

export { genRules, clearObject, arrayToTreeByObj, arrayToTreeByRecursion, treeToArrayByStack, treeToArrayByRecursion }
