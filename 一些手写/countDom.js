const topThreeDom1 = () => {
  // 获取所有dom
  const allDom = document.querySelectorAll('*')

  const domMap = {}
  // 计算数量
  for (let i = 0; i < allDom.length; i++) {
    let tagName = allDom[i].tagName
    if (domMap[tagName]) {
      domMap[tagName]++
    } else {
      domMap[tagName] = 1
    }
  }

  // 排序获得前三dom
  const [first, second, third] = Object.entries(domMap).sort((a, b) => {
    return b[1] - a[1]
  })
  return [first, second, third]
}
// reduce
function topThreeDom2() {
  //获取所有dom
  const allDom = document.querySelectorAll('*')

  const domArr = [...allDom].map((val) => val.tagName)
  let res =domArr.reduce((res, item) => {
    res[item] = (res[item] || 0) + 1
    return res
  }, {})
  return Object.entries(res).sort((a,b)=>b[1]-a[1]).slice(0,3)
}
