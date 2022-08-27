// https://github.com/mqyqingfeng/Blog/issues/27
var array = [2, 1, 1, '1', '1', 2];

function unique1(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    // 第一次内循环不会执行，会直接将数组第一个参数赋给res
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen，因为若不是唯一的，会直接跳出循环，此时j<resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}

console.log(unique1(array)); // [1, "1"]

// indexOf
function unique2(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i])
    }
  }
  return res;
}

console.log(unique2(array)); // [1, "1"]

// 排序后去重
function unique3(array) {
  var res = [];
  var previous;
  var sortedArray = array.concat().sort();   //.concat()目的是获取array的副本，不会影响到原数组
  for (var i = 0; i < sortedArray.length; i++) {
    // 如果是第一个元素或者前相邻的元素不同
    if (!previous || previous !== sortedArray[i]) {
      res.push(sortedArray[i])
    }
    previous = sortedArray[i];
  }
  return res;
}

console.log(unique3(array));

// filter+indexOf
function unique4(array) {
  var res = array.filter(function (item, index, array) {
    // console.log(array.indexOf(item), index);
    // 也就是判断元素第一次出现的地方是否与元素下标相同，不相同说明前面已存在重复的元素
    return array.indexOf(item) === index;
  })
  return res;
}
console.log(unique4(array));


// filter+sort
function unique5(array) {
  var res = array.concat().sort().filter(function (item, index, array) {
    return !index || item !== array[index - 1]
  })
  return res;
}

console.log(unique5(array));

// reduce 去重
let unique6 = array.reduce((acc, cur) => {
  if (!(acc.includes(cur))) {
    acc.push(cur)
  }
  return acc
}, [])
console.log(unique6);


// ES6 Set
function unique7(array) {
  // return Array.from(new Set(array));
  return [...new Set(array)]
}
// 简化
var unique = (array) => [...new Set(array)];

console.log(unique(array));

[1, 1, 2].reduce((total, i) => (total.add(i), total), new Set())

let planChangeRecord = [
  {
    changeAfter: "123",
    changeBefore: "222",
    field: "计划名称",
    planId: "4028efc382a9be680182d8e5b09905a0",
    planName: "222",
    type: "修改",
  },
  {
    changeAfter: "1234",
    changeBefore: "222",
    field: "计划名称",
    planId: "4028efc382a9be680182d8e5b09905a0",
    planName: "222",
    type: "修改",
  }, {
    changeAfter: "12345",
    changeBefore: "222",
    field: "计划名称",
    planId: "4028efc382a9be680182d8e5b09905a0",
    planName: "222",
    type: "修改",
  }
]

// 对象数组根据某些属性去重
/* 
 遇到这么个业务场景：vue watch深度监听一个对象数组，这个对象数组的数据是通过接口调用后拼接而成的(这个接口是获取当前表格某行数据变更的内容，如果多次变更这行数据的同一个属性，会造成数据冗余)，
 所以会出现许多属性相同的对象，那么就会出现重复的数据，这时候就可以用这个方法去重
 类似于上面的planChangeRecord数据
 */
function uniqueArray(arr) {
  // 缓存由于记录数据
  const cache = [];
  for (const iterator of arr) {
    // 检查缓存中是否存在
    if (cache.find((element) => element.planId === iterator.planId && element.field === iterator.field)) {
      // 存在则跳过
      continue;
    }
    cache.push(iterator);
  }
  return cache;
}
// 若想留下最开始的数据  则不用reverse
console.log(uniqueArray(planChangeRecord.reverse()));

