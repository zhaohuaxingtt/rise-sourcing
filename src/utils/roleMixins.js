/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-03 16:13:03
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-03 16:32:36
 * @Description: 前端获取当前登录用户角色身份
 */

import Vuex from 'vuex'
import {
  // 前期采购员
  qianqicaigou,
  // 专业采购员
  zhuanyecaigou
} from '@/config/role'

export const roleMixins = {
  computed: {
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    /**
     * @description: 获取用户角色列表
     * @param {*}
     * @return {*}
     */    
    roleList() {
      // 获取用户角色列表
      let roleList = (this.userInfo && this.userInfo.positionList) || []
      roleList = roleList.map(o => o.roleDTOList || [])
      roleList = Array.from(new Set(roleList.flat(Infinity)))
      return roleList.map(o => o.code) || []
    },
    /**
     * @description: 判断当前用户身份
     * @param {*}
     * @return {*}
     */    
    userRole() {
      return {
        // 是否是前期采购员
        isQQCG: this.checkUserRole(qianqicaigou),
        // 是否是专业采购员
        isZYCG: this.checkUserRole(zhuanyecaigou)
      }
    }
  },
  methods: {
    /**
     * @description: 判断角色身份
     * @param {*} roleList
     * @return {*}
     */
    checkUserRole(roleList=[]) {
      const roleArray = window._.intersection(this.roleList,roleList)
      return Boolean(roleArray.length)
    }
  }
}