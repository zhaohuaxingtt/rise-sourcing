/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-07-14 18:36:57
 * @LastEditors: Please set LastEditors
 * @Description: 公共utils部分
 * @FilePath: \rise\src\utils\index.js
 */
import router from '../router'
import store from '../store'
import localStoreage from './localstorage'
import jsencrypt from 'jsencrypt'
import { sendKey } from '@/api/usercenter'
export function setCookie(cookieName, cookieData) {
  // eslint-disable-next-line no-undef
  return Cookies.set(cookieName, cookieData, {
    domain: process.env.VUE_APP_ROOT_DOMAIN,
  })
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
export function password(str, publicKey) {
  const mathRsa = new jsencrypt()
  mathRsa.setPublicKey(
    '-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----'
  )
  return mathRsa.encrypt(str)
}

export function closeCliantClearStoreage() {
  let beginTime = null
  window.onbeforeunload = function(params) {
    beginTime = new Date().getTime()
  }
  window.onunload = function() {
    let endTime = new Date().getTime()
    if (endTime - beginTime <= 5) {
      removeToken()
      removeRefreshToken()
    }
  }
}

//表头数据权限过滤
export function permissionTitle(key, titleList) {
  const permissionMap = store.state.permission.whiteBtnList[key]
  let newTitleList = JSON.parse(JSON.stringify(titleList))
  if (permissionMap) {
    const a = []
    titleList.forEach((element) => {
      if (
        permissionMap.fieldList.find(
          (items) => items.fieldName == element.props || element.list
        )
      )
        a.push(element)
      if (element.list) {
        element.list = permissionTitle(key, element.list)
      }
    })
    newTitleList = a
  }
  return newTitleList
}

//序列化url参数传递
export function serialize(data, type = Object) {
  let str = ''

  switch (type) {
    case Object:
      for (let key in data) {
        str += key + '=' + encodeURIComponent(data[key]) + '&'
      }
      str = str.replace(/&$/, '')
      return str
    case Array:
      if (Array.isArray(data)) {
        str = data
          .map((item) => {
            return serialize(item)
          })
          .join('&')
      }

      return str
  }
}

// 数字限制输入
export const numberProcessor = function(val, precision = 4) {
  let result = ''
  if (+precision > 0) {
    result = (val + '')
      .replace(/[^\d.]/g, '')
      .replace(/^\.*/g, '')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(/^0+([0-9].*)/, '$1')
      .replace(new RegExp(`^(.+\\.\\d{0,${precision}})\\d*$`), '$1')
  } else {
    result = (val + '').replace(/\D/g, '').replace(/^0+([0-9])/, '$1')
  }
  return result
}

export function filterEmptyChildren(arr, target) {
  arr.forEach((value, index) => {
    if (value.code && value.code === target) {
      arr.splice(index, 1)
    }
    if (value.child && value.child.length > 0) {
      filterEmptyChildren(value.child, target)
    }
  })
}
//i18N 翻译
// eslint-disable-next-line no-undef
let languageList = []
// eslint-disable-next-line no-undef
Vue.prototype.language = function(languageKey, name) {
  if (process.env.NODE_ENV == 'dev') {
    languageList.push(
      languageKey + '----' + name + '----' + this.$router.currentRoute.path
    )
  }
  return this.$t(languageKey)
}
// eslint-disable-next-line no-undef
router.afterEach(() => {
  if (process.env.NODE_ENV == 'dev' && languageList.length !== 0) {
    let languageLists = Array.from(new Set(languageList))
    sendKey(languageLists)
      .then((res) => {
        if (res.code == 200) {
          languageList = []
        }
      })
      .catch((err) => {
        languageList = []
      })
  }
})
