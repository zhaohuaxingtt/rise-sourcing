/*
 * @Author: your name
 * @Date: 2021-07-28 11:52:46
 * @LastEditTime: 2021-07-28 11:57:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\utils\language.js
 */
import router from '@/router'
import { sendKey } from '@/api/usercenter'

let languageList = []

//i18N 翻译
// eslint-disable-next-line no-undef
router.afterEach((to, from) => {
  if (process.env.NODE_ENV == 'dev' && languageList.length !== 0) {
    _languageSendToService()
  }
})
function _languageSendToService() {
  let languageLists = Array.from(new Set(languageList))
  sendKey(languageLists)
  languageList = []
}

//i18N 翻译
export default function (key, name) {
  if (process.env.NODE_ENV == 'dev') {
    languageList.push(
      key + '----' + name + '----' + router.currentRoute.path
    )
  }
  return i18n.t(key);
}
