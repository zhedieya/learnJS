const getRules = (message) => {
  return {
    required: true,
    message,
    trigger: ['blur', 'change'],
    transform(value) {
      if (!value) return false
      return value.trim()
    },
  }
}

const genRules = ({ key, message, rules }) => {
  if (!key || !message) {
    throw new Error('Missing key or message')
  }
  return {
    [key]: [getRules(message), ...rules],
  }
}

let res = genRules({ key: 'name', message: '请输入姓名', rules: [{ cyk: 1 }] })

console.log(res)
