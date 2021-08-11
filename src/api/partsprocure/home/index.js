/*
 * @Author: yuszhou
 * @Date: 2021-02-25 11:07:22
 * @LastEditTime: 2021-08-10 19:22:23
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目创建模块API
 * @FilePath: \rise\src\api\partsprocure\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PART_PROCURE)
//获取零件采购列表。
export function getTabelData(parmars){
  return requst({
    url:'/purchasing-project-parts/dim-search',
    method:'POST',
    data:parmars
  })
}
//获取零件采购列表。
export function getProjectDetail(parmars){
  return requst({
    url:`/purchasing-project-parts/${parmars}`,
    method:'GET'
  })
}
// 获取申请目标价记录
export function getTargetPrice(params) {
  return requst({
    url: '/part-src-prjs/getTargetPrice',
    method: 'POST',
    data: params
  })
}
export function getAllTable(parmars){
  return requst({
    url:'/part-src-prjs?'+parmars,
    method:'GET'
  })
}
//转派零件采购项目
export function changeProcure(parmars){
  return requst({
    url:'/purchasing-project-parts/forward',
    method:'PATCH',
    data:parmars
  })
}
//生成零件采购项目号
export function generateFs(parmars){
  return requst({
    url:'/purchasing-project-parts/generate-fs',
    method:'PATCH',
    data:parmars
  })
}
//取消零件采购项目
export function cancelApi(parmars){
  return requst({
    url:'/purchasing-project-parts/cancel',
    method:'PATCH',
    data:parmars
  }) 
}
//启动零件采购项目
export function startProcure(data){
  return requst({
    url:'/purchasing-project-parts/start',
    method:'PATCH',
    data:data
  })
}
//结束零件采购项目
export function closeProcure(data){
  return requst({
    url:'/purchasing-project-parts/close',
    method:'PATCH',
    data:data
  })
}