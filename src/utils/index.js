export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function sortTime (a, b, s = 'asc') {
  try {
    const at = new Date(a)
    const bt = new Date(b)
    if (s === 'desc') return at < bt
    else return at > bt
  } catch (error) {
    return false
  }
}
// 计算时间差
export function beforeTime (oldDate, newDate) {
  if ((!(oldDate instanceof Date)) && (!(newDate instanceof Date))) return
  var time = newDate - oldDate
  // 1秒内
  var oneSecond = 1000
  if (time < oneSecond) {
    return '刚刚'
  }
  // 1分内
  var oneMinute = oneSecond * 60
  if (time < oneMinute) {
    var seconds = Math.floor(time / oneSecond)
    return `${seconds}秒前`
  }
  // 1小时内
  var oneHour = oneMinute * 60
  if (time < oneHour) {
    var minutes = Math.floor(time / oneMinute)
    return `${minutes}分钟前`
  }
  // 1天内
  var oneDay = oneHour * 24
  if (time < oneDay) {
    var hours = Math.floor(time / oneHour)
    return `${hours}小时前`
  }
  // 1月内
  var oneMonth = oneDay * 30
  if (time < oneMonth) {
    var days = Math.floor(time / oneDay)
    return `${days}天前`
  }
  // 1年内
  var oneYear = oneMonth * 12
  if (time < oneYear) {
    var months = Math.floor(time / oneMonth)
    return `${months}个月前`
  }
  var years = Math.floor(time / oneYear)
  return `${years}年前`
}

export function getCurrentPages (params) {
  return params
}

/* 获取当前页url */
export function getCurrentPageUrl () {
  var pages = getCurrentPages()
  var currentPage = pages[pages.length - 1]
  var url = currentPage.route
  return url
}

/* 获取当前页url中的参数对象 */
export function getCurrentPageUrlArgs () {
  var pages = getCurrentPages()
  var currentPage = pages[pages.length - 1]
  var options = currentPage.options
  return options
}

/* 获取当前页带参数的url */
export function getCurrentPageUrlWithArgs () {
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

export function isIncludeChinese (str) {
  if (escape(str).indexOf('%u') < 0) {
    return false // 不带中文
  }
  return true // 带中文
}

export function showToast (title, icon = 'success') {
  wx.showToast({
    title,
    icon
  })
}

let Base64 = require('js-base64').Base64
const salt = 'sjnv$u049qrh[c9hnq98--8Y(*Rg-gf4'
// 加密
export function b64encode (value) {
  try {
    return Base64.encode(salt + value.toString())
  } catch (error) {
    return value
  }
}
// 解密
export function b64decode (value) {
  try {
    let dstr = Base64.decode(value.toString())
    if (dstr.startsWith(salt)) {
      return dstr.slice(salt.length)
    }
    return value
  } catch (error) {
    return value
  }
}
