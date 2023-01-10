var fs = require('fs')
var path = require('path')

function findLargest1(dir, cb) {
  // 读取目录下的所有文件
  fs.readdir(dir, function (er, files) {
    if (er) return cb(er)

    var counter = files.length
    var errored = false
    var stats = []

    files.forEach(function (file, index) {
      // 读取文件信息
      fs.stat(path.join(dir, file), function (er, stat) {
        if (errored) return

        if (er) {
          errored = true
          return cb(er)
        }

        stats[index] = stat

        // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
        if (--counter == 0) {
          var largest = stats
            .filter(function (stat) {
              return stat.isFile()
            })
            .reduce(function (prev, next) {
              if (prev.size > next.size) return prev
              return next
            })

          cb(null, files[stats.indexOf(largest)])
        }
      })
    })
  })
}
// 查找当前目录最大的文件
findLargest1('./', function (er, filename) {
  if (er) return console.error(er)
  console.log('largest file was:', filename)
})

// promise
var readDir = function (dir) {
  return new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, files) {
      if (err) reject(err)
      resolve(files)
    })
  })
}

var stat = function (path) {
  return new Promise(function (resolve, reject) {
    fs.stat(path, function (err, stat) {
      if (err) reject(err)
      resolve(stat)
    })
  })
}

function findLargest2(dir) {
  return readDir(dir)
    .then(function (files) {
      console.log(files);
      let promises = files.map((file) => stat(path.join(dir, file)))
      return Promise.all(promises).then(function (stats) {
        return { stats, files }
      })
    })
    .then((data) => {
      console.log(data);
      let largest = data.stats
        .filter(function (stat) {
          return stat.isFile()
        })
        .reduce((prev, next) => {
          if (prev.size > next.size) return prev
          return next
        })

      return data.files[data.stats.indexOf(largest)]
    })
}

// 查找当前目录最大的文件
findLargest2('./').then((filename) => {
  console.log('largest file was:', filename)
})
