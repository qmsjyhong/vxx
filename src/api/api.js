let api =  {
  right: '/right'
}

// 不同环境分发
for (var k in api) {
  if (process.env.NODE_ENV === 'development') {
    api[k] = '/dev/' + api[k]
  } else {
    api[k] = '/prod/' + api[k]
  }
}

export default api