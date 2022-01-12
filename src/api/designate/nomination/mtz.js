/*
 * @Author: your name
 * @Date: 2021-11-08 19:29:42
 * @LastEditTime: 2021-11-23 21:21:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\api\designate\nomination\mtz.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 获取table数据
export function getTableData(parmars) {
  return request({
    url: '/mtzNomiList/mtzNomiList',
    method: 'POST',
    data: parmars,
  })
}

export function getMtzGenericAppId(params){
  //获取MTZ申请单号
  return request({
    url: '/commonDropDown/getMtzGenericAppId',
    method: 'POST',
    data: params
  })
}


export function getRawMaterial(params) {
  //原材料牌号下拉选择(材料小类)
  return request({
    url: '/commonDropDown/getRawMaterial',
    method: 'POST',
    data: params
  })
}


export function getCurrentUser(params) {
  //获取采购员
  return request({
    url: '/commonDropDown/getCurrentUser',
    method: 'POST',
    data: params
  })
}

export function getNominateAppIdList(parmars) {//关联单号下拉
  return request({
    url: '/mtzNomiList/getNominateAppIdList',
    method: 'POST',
    data: parmars
  })
}