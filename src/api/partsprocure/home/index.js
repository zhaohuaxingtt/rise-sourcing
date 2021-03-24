/*
 * @Author: yuszhou
 * @Date: 2021-02-25 11:07:22
 * @LastEditTime: 2021-03-24 17:16:42
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目创建模块API
 * @FilePath: \rise\src\api\partsprocure\home\index.js
 */
import axios from '@/utils/axios'
import store from '@/store'
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

//启动询价
export function insertRfq(parmars){
  return requst({
    url:'/api/rfqs/insertRfq',
    method:'PATCH',
    data:{
      insertRfcPackage:{...parmars,...{operationType:3,userId:store.state.permission.userInfo.id || '',userName:store.state.permission.userInfo.userName}}
    }
  })
}
//添加询价零件
export function rfqAddPart(parmars){
  return requst({
    url:'/api/rfqs/insertRfq',
    method:'PATCH',
    data:{
      insertRfcPackage:{...parmars,...{operationType:1,userId:store.state.permission.userInfo.id || '',userName:store.state.permission.userInfo.userName}}
    }
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