/**
 * 获取兄弟节点的id
 * @param {*} type 
 * @param {*} treeData 
 * @param {*} id 
 * @returns 
 */
const getSiblingId = (type, treeData, id) => {
  if (!Array.isArray(treeData)) {
    throw new Error('TreeData must be an array')
  }
  for (let i = 0; i < treeData.length; i++) {
    let item = treeData[i]
    if (item.id === id) {
      return type === 'up' ? treeData[i - 1]?.id : treeData[i + 1]?.id
    }
    if (item.children) {
      let res = getSiblingId(type, item.children, id)
      if (res) {
        return res
      }
    }
  }
}

/**
 * 前端上移下移树形数据，每次只能移动一层
 * @param {*} treeData 
 * @param {*} id 
 * @param {*} type 
 */
const move = (treeData, id, type) => {
  if (!Array.isArray(treeData)) {
    throw new Error('TreeData must be an array')
  }
  let loop = (treeData, id, type) => {
    for (let i = 0; i < treeData.length; i++) {
      let item = treeData[i]
      if (item.id === id) {
        let siblingId = getSiblingId(type, treeData, id)
        if (siblingId) {
          let siblingIndex = treeData.findIndex(item => item.id === siblingId)
          let temp = treeData[siblingIndex]
          // treeData[siblingIndex] = treeData[i]
          // treeData[i] = temp
          // 使用splice交换
          treeData.splice(siblingIndex, 1, treeData[i])
          treeData.splice(i, 1, temp)
        }
        return
      }
      if (item.children) {
        loop(item.children, id, type)
      }
    }
  }
  loop(treeData, id, type)
}

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
      }
    ],
  },
  {
    id: 5,
    name: '5',
  },
  {
    id: 6,
    name: '6',
  }
]
console.log('before', treeData);
move(treeData, 1, 'down')
console.log('after', treeData);
