// 源对象
const oldData = [
  { id: 1, groupId: 1001 },
  { id: 2, groupId: 1001 },
  { id: 5, groupId: 1002 },
  { id: 3, groupId: 1002 },
  { id: 4, groupId: 1002 },
]
// 目的对象
let newData = [
  { id: 1, groupId: 1001, rowSpan: 2 },
  { id: 2, groupId: 1001 },
  { id: 5, groupId: 1002, rowSpan: 3 },
  { id: 3, groupId: 1002 },
  { id: 4, groupId: 1002 },
]

console.log(oldData, newData);

let data = oldData.reduce((acc, cur) => {
  // find 找到第一个满足条件的项
  let isFind = acc.find((item) => item.groupId === cur.groupId); 
  let obj = { ...cur, rowSpan: 1 };
  if (isFind) {
    isFind.rowSpan++;
    acc.push(cur)
  } else
    acc.push(obj)
  return acc;
}, [])

console.log(data);
