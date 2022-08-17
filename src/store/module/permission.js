/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2022-02-11 11:09:29
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息保存。
 * @FilePath: \rise\src\store\module\permission.js
 */
import { getUserInfoByToken, getSystemMeun } from '@/api/usercenter'
import { watermark } from '@/utils'
const routerLayout = () => import('@/layout/default.vue')
const getVuerouter = function(router) {
  const res = []
  router.forEach((element) => {
    const data = {
      meta: {
        title: element.title,
      },
      path: element.path,
      children: element.children ? getVuerouter(element.children) : [],
    }
    if (!element.children && element.filePath) {
      data.component = () => import(`@/views${element.filePath}`)
    } else {
      data.component = routerLayout
    }
    res.push(data)
  })
  return res
}
//初始化菜单，新增active字段和默认选中第一个点亮
function initMeun(data) {
  try {
    data.forEach((items, index) => {
      if (index == 0) {
        items['active'] = false
      } else {
        items['active'] = false
      }
    })
    return data
  } catch (error) {
    return []
  }
}
/**
 * @description: 拿到用户权限过渡方法
 * @param {*} userInfo
 * @return {*}
 */
function translateUserRole(userInfo) {
  try {
    const roleList = []
    userInfo.roleList.forEach((i) => {
      roleList.push(i.code)
    })
    return roleList
  } catch (error) {
    return []
  }
}
const state = {
  menuList: [],
  vueRouter: [],
  //系统登录用户信息。存入store，前台不存储用户的敏感信息。
  roleList: [],
  userInfo: {},
  whiteBtnList: [],
  language: 'zh',
  resourceList: [], //前端上传的resource列表
}
const mutations = {
  SET_LANGUAGE(state, data) {
    localStorage.setItem('lang', data)
    state.language = data
  },
  SET_MENU_LIST(state, data) {
    state.menuList = data
  },
  SET_VUE_ROUTER(state, data) {
    state.vueRouter = data
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  SET_ROLE_INFO(state, data) {
    state.roleList = data
  },
  SET_WIHTEBTN_LIST(state, data) {
    state.whiteBtnList = data
  },
  SET_RESOURCE(state, data) {
    state.resourceList = data
  },
}
//合并菜单的key到resouce里面去，满足菜单勾选取消后，能将界面上是菜单类型的permissionremove掉
function mergeMenuToresouce(resouce, menuList) {
  try {
    menuList.forEach((items) => {
      if (items.permissionKey) resouce[items.permissionKey] = 'menu'
      if (items.menuList && items.menuList.length > 0) {
        mergeMenuToresouce(resouce, items.menuList)
      }
    })
  } catch (error) {
    return []
  }
}
const actions = {
  // 通过异步方式获取菜单。
  getPermissinInfo({ commit }) {
    return new Promise((r, j) => {
      getSystemMeun()
        .then((res) => {
          if (res.code == 200 && res.data) {
            commit('SET_MENU_LIST', initMeun(res.data.menuList))
            mergeMenuToresouce(res.data.resourceList, res.data.menuList)
            commit('SET_WIHTEBTN_LIST', res.data.resourceList || [])
            r(res.data.menuList || [])
          } else {
            commit('SET_MENU_LIST', [])
            commit('SET_WIHTEBTN_LIST', [])
            j()
          }
        })
        .catch((err) => {
          commit('SET_MENU_LIST', [])
          commit('SET_WIHTEBTN_LIST', [])
          j()
        })
    })
  },
  userInfoByToken({ commit }) {
    //根据token获取用户信息
    // eslint-disable-next-line no-debugger
    return new Promise((resole, reject) => {
      getUserInfoByToken()
        .then((res) => {
          // eslint-disable-next-line no-debugger
          if (res.code == 200 && res.data) {
            commit('SET_USER_INFO', res.data)
            commit('SET_ROLE_INFO', translateUserRole(res.data))
            resole(res.data)
          } else {
            commit('SET_USER_INFO', {})
            commit('SET_ROLE_INFO', [])
            reject({})
          }
          watermark()
          window.addEventListener('resize',(a,b)=>{
            watermark()
          })
        })
        .catch((err) => {
          commit('SET_USER_INFO', {})
          commit('SET_ROLE_INFO', [])
          reject(err)
        })
    })
  },
  setUserInfo({ commit }, data) {},
  loginOut({ commit }) {
    commit('SET_MENU_LIST', [])
  },
  refreshToken() {},
  uploadResource({ commit, state }, resource) {
    const template = JSON.parse(JSON.stringify(state.resourceList))
    commit('SET_RESOURCE', [
      ...template,
      ...[{ name: resource[1], permissionKey: resource[0], type: 2 }],
    ])
  },
  clearResource({ commit }) {
    commit('SET_RESOURCE', [])
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
