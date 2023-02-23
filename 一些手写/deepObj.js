const deepObj = {
  name: 'cyk',
  sex: {
    male: {
      age: {
        lover: {
          heihei: {
            wow: 'impact',
          },
        },
      },
    },
  },
}

let obj = {
  name: 'zhangsan',
  age: 18,
  stuInfo: {
    stuNo: 1,
    classNo: 2,
    score: {
      htmlScore: 100,
      cssScore: 90,
      jsScore: 95,
    },
  },
}
// 使用队列层序遍历
const findField = (obj, target) => {
  let queue = [obj]
  while (queue.length) {
    const cur = queue.shift()
    for (let key in cur) {
      if (key === target) {
        return cur[key]
      }
      if (typeof cur[key] === 'object' && cur[key] !== null) {
        queue.push(cur[key])
      }
    }
  }
  return
}

console.log(findField(deepObj, 'wow'))
