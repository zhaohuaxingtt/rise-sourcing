/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-08-31 10:40:55
 * @LastEditTime: 2021-07-21 17:57:58
 * @LastEditors: Please set LastEditors
 * @Description: 公共utils部分
 * @FilePath: \rise\src\utils\index.js
 */
import router from '../router'
import store from '../store'
import localStoreage from './localstorage'
import jsencrypt from 'jsencrypt'
import {sendKey,sendPermissonKey} from '@/api/usercenter'
import {onlyselfProject,allitemsList,BKMROLETAGID} from '@/config'
export function setCookie(cookieName, cookieData) {
  // eslint-disable-next-line no-undef
  return Cookies.set(cookieName, cookieData, { domain: process.env.VUE_APP_ROOT_DOMAIN })
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

//表头数据权限过滤
export function permissionTitle(key,titleList){
  const permissionMap = store.state.permission.whiteBtnList[key]
  let newTitleList = JSON.parse(JSON.stringify(titleList))
  if(permissionMap){
    const a = []
    titleList.forEach(element => {
       if(permissionMap.fieldList.find(items=>items.fieldName == element.props || element.list)) a.push(element)
       if(element.list){
        element.list = permissionTitle(key,element.list)
       }
    });
    newTitleList = a
  }
  return newTitleList
}

//序列化url参数传递
export function serialize(data, type = Object) {
  let str = ''

  switch(type) {
    case Object:
      for (let key in data) {
        str += key + '=' + encodeURIComponent(data[key]) + '&'
      }
      str = str.replace(/&$/, '')
      return str
    case Array:
      if (Array.isArray(data)) {
        str = data
          .map(item => {
            return serialize(item)
          })
          .join("&")
      }

      return str
  }
  
}

// 数字限制输入
export const numberProcessor = function(val, precision = 4, negative) {
  let result = ""
  if (+precision > 0) {
    if (negative) {
      result = (val + "").replace(/[^\d.-]/g, "")
        .replace(/(?<=(-|[^-]+))-/, "")
        .replace(/^(-?)\.*/g, "$1")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(-?)0+([0-9].*)/, "$1$2")
        .replace(new RegExp(`^(.+\\.\\d{0,${ precision }})\\d*$`), "$1")
    } else {
      result = (val + "").replace(/[^\d.]/g, "")
      .replace(/^\.*/g, "")
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".")
      .replace(/^0+([0-9].*)/, "$1")
      .replace(new RegExp(`^(.+\\.\\d{0,${ precision }})\\d*$`), "$1")
    }
    
  } else {
    if (negative) {
      result = (val + "").replace(/[^\d-]/g, "")
        .replace(/(?<=(-|[^-]+))-/, "")
        .replace(/^(-?)0+([0-9])/, "$1$2")
    } else {
      result = (val + "").replace(/\D/g, "")
      .replace(/^0+([0-9])/, "$1")
    }
  }
  return result
}
//i18N 翻译
// eslint-disable-next-line no-undef
let languageList = [];
// eslint-disable-next-line no-undef
Vue.prototype.language = function(languageKey,name){
  if(process.env.NODE_ENV == 'dev'){
    languageList.push(languageKey+'----'+name+ '----' + this.$router.currentRoute.path)
  }
  return this.$t(languageKey)
}
// eslint-disable-next-line no-undef
router.afterEach((to,from)=>{
  if(process.env.NODE_ENV == 'dev' && languageList.length !== 0){
    _languageSendToService()
    _permissionKeySendToService(from)
  }
})
function _languageSendToService(){
  let languageLists = Array.from(new Set(languageList))
  sendKey(languageLists)
  languageList = []
}
function _permissionKeySendToService(router){
  console.log(`============The permissions automatically collected in the current interface are ${store.state.permission.resourceList.length}============`)
  console.log(store.state.permission.resourceList)
  const serviceData = router.matched.map((r,i)=>{ return {'name':r.meta.title,'permissionKey':r.path.toUpperCase() , 'url':r.path,'target':r.path,resourceList:i==router.matched.length-1?store.state.permission.resourceList:[]}})
  sendPermissonKey(serviceData)
  store.dispatch('clearResource',[])
}
/**********************************************************************************************************************************************
 * @description: 结合业务逻辑和角色，处理权限列表, 过滤逻辑：
 * 1.如果当前的采购项目属于：【仅零件号变更，钢材一次性采购，钢材批量采购，配件，附件，一次性采购，DB一次性采购，工序委外，AEKO零件】 则过滤只有当前另加自己。
 * 2.剩下的零件只要出现一种，都要出现当前这个类型的全集：【FS零件，GS零件，COP零件，SPECIAL零件，DB零件，涨价，FS common sourcing，GS common sourcing，扩产能】
 * 3.如果当前当如果当前角色仅为扩产能角色则返回：【扩产能】
 * 4.如果单项选择中 存在 【一次性采购，DB一次性采购】 则这两个要成对出现
 * @param {*} projectList          徐睿数据字典返回的全量options
 * @param {*} currentProjectType   当前的零件采购项目。
 * @return {*}
 *********************************************************************************************************************************************/
export function filterProjectList(oldProjectList,currentProjectType){
  try {
    let newProjectLists = []
    const onlyselfList = Object.keys(JSON.parse(JSON.stringify(onlyselfProject))).map(i=> onlyselfProject[i])
    const allreturnlist = Object.keys(JSON.parse(JSON.stringify(allitemsList))).map(i=> allitemsList[i])
    const needHuc = [onlyselfProject.DBYICHIXINGCAIGOU,onlyselfProject.YICIXINGCAIGOU]
    if(currentProjectType == ""){newProjectLists = oldProjectList}
    if(onlyselfList.includes(currentProjectType)){
      newProjectLists = oldProjectList.filter(i=>i.code == currentProjectType)
      if(needHuc.includes(currentProjectType)){
        newProjectLists = oldProjectList.filter(i=>needHuc.find((ii)=>ii == i.code))
      }
    }
    if(allreturnlist.includes(currentProjectType)){
      newProjectLists = oldProjectList.filter(i=>allreturnlist.find(ii=>i.code==ii))
      if(store.state.permission.roleList.length == 1){
        if(store.state.permission.roleList.find(i=>i == BKMROLETAGID)){
          newProjectLists = newProjectLists.filter(i=>i.code == allitemsList['KUOCHANNENG'])
        }else{
          newProjectLists = newProjectLists.filter(ii=>!(ii.code == allitemsList['KUOCHANNENG']))
        }
      }else{
        if(!store.state.permission.roleList.find(i=>i == BKMROLETAGID)){
          newProjectLists = newProjectLists.filter(ii=>!(ii.code == allitemsList['KUOCHANNENG']))
        }
      }
    }
    return newProjectLists
  } catch (error) {
    console.log(error)
    return []
  }
}

/*********************************************************************************************************************************************
 * @description: 业务场景：用户在满足当前角色权限的情况下，业务不满足他去操作当前的组件，列如：仅零件号变更的零件采购项目，rfq，定点管理等...不需要展示。但是同一个
 * 控件已经定义了唯一key，为了复用当前key所衍生的业务权限判断方法，属于增量修改。
 * 1.当前方法在v-permission中去调用，会结合router中的parmars(businessKey)来协同控制。
 * 2.businessKey代表当前业务的类型，比如仅零件号变更，在config中会存在一份黑名单。此黑名单需要开发结合业务去维护，无法做到自动化。
 * 3.config businessKey/index.js 中将会维护所有业务存在的黑名单key.
 * 4.如果以后业务黑名单由后台接管，提前做出业务key的提取，方便迁移。
 * @param {*} currentPermissinKey     当前控件的permissionKey
 * @param {*} currentProjectParmars   当前的业务ID
 * @return {*} Boolean
 ********************************************************************************************************************************************/
import {businessKey} from '@/config/businesskey'
export function businessPermission(currentPermissinKey,currentProjectParmars){
  try {
    if(!currentProjectParmars.businessKey) return true
    const businessKeyQuery = currentProjectParmars.businessKey;
    if(businessKey[businessKeyQuery].find(i=>i == currentPermissinKey)) return true;
  } catch (error) {
    return false
  }
}
/*********************************************************************************************************************************************
 * @description: 转换所有零件采购项目黑名单，白名单方法。对于某个业务场景下的业务白名单KEY 相对于相同业务场景的其他类型就是黑名单KEY. 所以需要构造一份正向和反向的
 * KEY出来。
 * @param {*} currentKeyBusinessKey   当前业务key
 * @param {*} whiteList               当前业务key所对应的白名单
 * @param {*} blackList               当前业务场景需要对应的黑名单
 * @param {*} allBusinessKey          所有业务场景值
 * @param {*} config                  需要改变的原始对象
 * @return {*}
 ********************************************************************************************************************************************/
export function translateBackToWhite(currentKeyBusinessKey,whiteList,blackList,allBusinessKey,config){
  Object.keys(allBusinessKey).forEach(i=>{
    if(allBusinessKey[i] == currentKeyBusinessKey){
      config[currentKeyBusinessKey] = [...(config[currentKeyBusinessKey] || []),...blackList]
    }else{
      config[allBusinessKey[i]] = [...(config[allBusinessKey[i]] || []),...whiteList]
    }
  })
}

/**
 * Array 类型数据权限过滤
 * @param {*} permissionKey
 * @param {*} list
 */
export function permissionArray(permissionKey, list) {
  return list.filter(item => store.state.permission.whiteBtnList[item[permissionKey]])
}