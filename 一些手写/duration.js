const task_queue = []
let is_first_task = true

function helper(text = '', duration = 0) {
  setTimeout(() => {
    console.log('text', text)
    if (task_queue.length) {
      const { text, duration } = task_queue.shift()
      helper(text, duration)
    }
  }, duration)
}

function createTask(arg) {
  const { text, duration } = arg
  if (is_first_task) {
    helper(text, duration)
    is_first_task = false
  } else {
    task_queue.push(arg)
  }
}

createTask({ text: '5', duration: 5000 })
createTask({ text: '2', duration: 2000 })
createTask({ text: '3', duration: 3000 })
