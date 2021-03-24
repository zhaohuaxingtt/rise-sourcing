/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-22 17:47:00
 * @LastEditors: Please set LastEditors
 * @Description: 公共utils部分
 * @FilePath: \rise\src\utils\index.js
 */
import localStoreage from './localstorage'
import jsencrypt from 'jsencrypt'
export function setCookie(cookieName, cookieData) {
  // eslint-disable-next-line no-undef
  Cookies.set(cookieName, cookieData, { domain: process.env.VUE_APP_ROOT_DOMAIN })
}
export function removeCookie(cookieName) {
  // eslint-disable-next-line no-undef
  Cookies.remove(cookieName, { domain: process.env.VUE_APP_ROOT_DOMAIN })
}
export function getCookie(cookieName) {
  // eslint-disable-next-line no-undef
  return Cookies.get(cookieName, { domain: process.env.VUE_APP_ROOT_DOMAIN })
}
//获取token
export function getToken() {
  return getCookie(process.env.VUE_APP_TOKEN_NAME)
}
//settoken
export function setToken(tokenData) {
  return setCookie(process.env.VUE_APP_TOKEN_NAME, tokenData)
}
//removeoken
export function removeToken() {
  return removeCookie(process.env.VUE_APP_TOKEN_NAME)
}
//获取token
export function getRefreshToken() {
  return getCookie(process.env.VUE_APP_REFRESH_TOKEN_NAME)
}
//settoken
export function setRefreshToken(tokenData) {
  return setCookie(process.env.VUE_APP_REFRESH_TOKEN_NAME, tokenData)
}
//removeoken
export function removeRefreshToken() {
  return localStoreage.remove(process.env.VUE_APP_REFRESH_TOKEN_NAME)
}
//errorCodeMessage
export function errorCodeMessage(code) {
  const codeMessage = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  }
  return codeMessage[code]
}

export const math = window.math.create(window.math.all, {
  number: 'BigNumber',
  precision: 64,
})

export function _getMathNumber(lamda) {
  return Number(math.format(math.evaluate(lamda), 14))
}

export function password(str,publicKey){
  const mathRsa = new jsencrypt()
  mathRsa.setPublicKey('-----BEGIN PUBLIC KEY-----'+publicKey+'-----END PUBLIC KEY-----')
  return mathRsa.encrypt(str)
}

export function closeCliantClearStoreage(){
  let beginTime = null;
  window.onbeforeunload = function (params) {
    beginTime = new Date().getTime()
  }
  window.onunload = function(){
    let endTime = new Date().getTime()
    if(endTime - beginTime <=5){
      removeToken()
      removeRefreshToken()
    }
  }
}

export function serialize(data) {
  let str = ''
  for (let key in data) {
    str += key + '=' + encodeURIComponent(data[key]) + '&'
  }
  str = str.replace(/&$/, '')
  return str
}