/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-23 13:29:36
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息保存。
 * @FilePath: \rise\src\store\module\permission.js
 */
import {getUserInfoByToken,getSystemMeun} from '@/api/usercenter'
const routerLayout = ()=> import('@/layout/default.vue')
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
  menuList: [{name:"询源管理",url:'/home'}],
  vueRouter:[],
  //系统登录用户信息。存入store，前台不存储用户的敏感信息。
  roleList:'',
  whiteBtnList:[]
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
  },
  SET_WIHTEBTN_LIST(state,data){
    state.whiteBtnList = data
  }
};
const actions = {
  // 通过异步方式获取菜单。
  getPermissinInfo({commit}){
    return new Promise((r,j)=>{
      getSystemMeun().then(res=>{
        if(res.code == 200 && res.data) {
          commit('SET_MENU_LIST',res.data.menuList);
          commit('SET_WIHTEBTN_LIST',res.data.resourceList);
          r(res.data.menuList)
        }else{
          commit('SET_MENU_LIST',[]);
          commit('SET_WIHTEBTN_LIST',[]);
          j()
        }
      }).catch(err=>{
        commit('SET_MENU_LIST',[]);
        commit('SET_WIHTEBTN_LIST',[]);
        j()
      })
    })
  },
  userInfoByToken({commit}){ //根据token获取用户信息
      // eslint-disable-next-line no-debugger
      return new Promise((resole,reject)=>{
        getUserInfoByToken().then(res=>{
          // eslint-disable-next-line no-debugger
          if(res.code == 200 && res.data){
            commit('SET_USER_INFO',res.data)
            commit('SET_ROLE_INFO',res.data.userName)
            resole(res.data)
          }else{
            commit('SET_USER_INFO',{})
            commit('SET_ROLE_INFO',{})
            reject({})
          }
        }).catch(err=>{
          commit('SET_USER_INFO',{})
          commit('SET_ROLE_INFO',{})
          reject(err)
        })
      })
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