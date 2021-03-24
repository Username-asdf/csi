const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  timeData:['永久有效','1分钟','2分钟','3分钟',
  '4分钟','5分钟','6分钟','7分钟',
  '8分钟','9分钟','10分钟','11分钟',
  '12分钟','13分钟','14分钟','15分钟'],
}
