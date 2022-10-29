const baseState = [
  {
    title: 'Learn TypeScript',
    done: true,
  },
  {
    title: 'Try Immer',
    done: false,
  },
];
const nextState = [...baseState]; // 浅拷贝数组
// nextState[1].done = true; // 会影响到原对象

nextState[1] = {
  // 替换第一层元素
  ...nextState[1], // 浅拷贝第一层元素
  done: true, // 期望的更新
};

// 因为 nextState 是新拷贝的, 所以使用 push 方法是安全的,
// 但是在未来的任意时间做相同的事情会违反不变性原则并且导致 bug！
nextState.push({ title: 'Tweet about it' });
console.log(nextState)
console.log(baseState)
