/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-02-19 15:19:26
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息保存。
 * @FilePath: \rise\src\store\module\permission.js
 */
const routerLayout = ()=> import('@/layout/routerLayout.vue')
import {staticRouter} from '@/router'
const getVuerouter = function(router){
  const res = []
  router.forEach(element => {
    const data = {
      meta:{
        title:element.title
      },
      path:element.path,
      children:element.children?getVuerouter(element.children):[]
    }
    if(!element.children && element.filePath){
      data.component = ()=> import(`@/views${element.filePath}`)
    }else{
      data.component = routerLayout
    }
    res.push(data)
  });
  return res
}
const state = {
  menuList: [],
  vueRouter:[],
  //系统登录用户信息。存入store，前台不存储用户的敏感信息。
  userInfo:{},
  roleList:''
};
const mutations = {
  SET_MENU_LIST(state,data){
    state.menuList = data
  },
  SET_VUE_ROUTER(state,data){
    state.vueRouter = data
  },
  SET_USER_INFO(state,data){
    state.userInfo = data
  },
  SET_ROLE_INFO(state,data){
    state.roleList = data
  }
};
const actions = {
  // 通过异步方式获取菜单。
  getPermissinInfo({commit}){
  },
  userInfoByToken({commit}){ //根据token获取用户信息
  },
  setUserInfo({commit},data){
  },
  loginOut({commit}){
  },
  refreshToken(){
  }
};
const getters = {
 
};
export default {
  state,
  mutations,
  actions,
  getters
}