/*
 * @Author: your name
 * @Date: 2021-09-09 14:49:02
 * @LastEditTime: 2021-09-09 17:24:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\moneyComputation.js
 */
// 计算金额
export const getMoney = (num) => {
  return Number(num/1000000).toFixed(2)
}

// 将金额按千分位处理
export const getMoneyInfo = (num) => {
  let prefix = '' //前缀
  let suffix = '' //后缀
  let str = num.toString()
  if(str.indexOf('.') > -1) {
    let arr = str.split('.')
    prefix = arr[0]
    suffix = arr[1]
  } else {
    prefix = num.toString()
  }
  let res = prefix.split("")
  let position = prefix.length
  while (position > 2) {
    position -= 3
    res.splice(position + 1, 0, ',')
  }
  res = res.join('')
  return res + (suffix ? '.' + suffix : suffix)
}
