/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-02-19 16:05:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\localstorage.js
 */
 class storeage {
  constructor(){}
  set(key,value) {
    window.localStorage.setItem(key,value)
  }
  get(key) {
    return window.localStorage.getItem(key)
  }
  remove(key) {
    window.localStorage.removeItem(key)
  }
 }
const localStoreage = new storeage()
export default localStoreage
