const treeData = [
  {
    id: 1,
    name: '1',
    children: [
      {
        id: 2,
        name: '2',
        children: [
          {
            id: 3,
            name: '3',
          },
          {
            id: 4,
            name: '4',
          },
        ],
      },
    ],
  },
]
/**
 * 树转数组-stack
 * @param {*} treeData
 */
const treeToArrayByStack = (treeData) => {
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

console.log(treeToArrayByStack(treeData))

/**
 * 树转数组-递归
 * @param {*} treeData 
 * @returns 
 */
const treeToArrayByRecursion = (treeData) => {
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

console.log(treeToArrayByRecursion(treeData));
