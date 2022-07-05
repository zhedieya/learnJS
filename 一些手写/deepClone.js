function deepClone(target, map = new Map()) {
  // 基本数据类型直接返回
  if (typeof target !== "object") {
    return target;
  }
  //对引用类型特殊处理
  //判断是数组还是对象
  const cloneTarget = Array.isArray(target) ? [] : {};
  //   防止循环引用导致栈溢出 已存在则直接返回
  if (map.get(target)) {
    return map.get(target);
  }
  //若不存在则存储进map
  map.set(target, cloneTarget);
  //递归深拷贝
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key], map);
  }
  return cloneTarget;
}

const a = {
  name: "折叠鸭鸭",
  age: 22,
  hobbies: { sports: "篮球", tv: "雍正王朝" },
  works: ["2020", "2021"],
};
a.key = a; // 环引用
const b = deepClone(a);

console.log(b);
// {
//     name: '折叠鸭鸭',
//     age: 22,
//     hobbies: { sports: '篮球', tv: '雍正王朝' },
//     works: [ '2020', '2021' ],
//     key: [Circular]
// }
console.log(b === a); // false
