/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-03 16:13:03
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-14 09:53:54
 * @Description: 前端获取当前登录用户角色身份
 */

import Vuex from 'vuex'
import {
  // 前期采购员
  qianqicaigou,
  // 专业采购员
  zhuanyecaigou,
  // 定点管理员
  dingdianguanli,
  // AEKO CSF AEKO审批分配人
  csfaekoshenpifenpei
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
        // 是否是前期采购相关角色（包含 前期采购员，前期采购股长，前期采购科长）
        isQQCG: this.checkUserRole(qianqicaigou),
        // 是否是专业采购相关角色 （包含 专业采购员，专业采购股长，专业采购科长）
        isZYCG: this.checkUserRole(zhuanyecaigou),
        // 定点管理员
        isDDGL: this.checkUserRole(dingdianguanli),
        // AEKO CSF AEKO审批分配人 
        isCSFAEKOFENPEI: this.checkUserRole(csfaekoshenpifenpei),
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