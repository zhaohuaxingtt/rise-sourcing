/*
 * @Author: yuszhou
 * @Date: 2021-02-25 11:07:22
 * @LastEditTime: 2021-02-25 11:08:48
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目创建模块API
 * @FilePath: \rise\src\api\partsprocure\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PART_PROCURE)
//获取零件采购列表。
export function getTabelData(parmars){
  return requst({
    url:'/api/part-src-prjs',
    method:'GET',
    params:parmars
  })
}

//修改零件采购项目相关信息
export function changeProcure(parmars){
  return requst({
    url:'/api/part-src-prjs',
    method:'PATCH',
    data:parmars
  })
}
export function getYearScope(params) {
  return requst({
    url:'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/getYearScope',
    method:'GET',
    data:params
  })
}

export function getOutputPlan(params) {
  return requst({
    url:'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/getOutputPlan',
    method:'GET',
    data:params
  })
}