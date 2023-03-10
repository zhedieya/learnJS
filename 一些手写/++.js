let res = [0]

for (let i = 1; i < 3; i++) {
  res[i] = res[i - 1]++ // res[i] = res[i - 1]; res[i - 1] += 1
}

console.log(res)

// [0]
// [0, 0] res[1] = res[0]  res[0] = res[0] + 1  ==> [1, 0]
// [1, 0, 0] res[2] = res[1] res[1] = res[1] + 1  ==> [1, 1, 0]
