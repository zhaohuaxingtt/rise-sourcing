/*
 * @Author: yuszhou
 * @Date: 2021-02-25 11:07:22
 * @LastEditTime: 2021-11-22 17:48:50
 * @LastEditors:  
 * @Description: 零件采购项目创建模块API
 * @FilePath: \rise\src\api\partsprocure\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SOURCING)
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
export function getPartslistButch(parmars){
  return requst({
    url:'/part-output/record/list',
    method:'POST',
    data:parmars
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
//单个更新保存零件采购项目
export function updateProcure(data){
  return requst({
    url:'/purchasing-project-parts/update',
    method:'PATCH',
    data:data
  })
}
//单个更新保存零件采购项目
export function updateProcureButch(data){
  return requst({
    url:'/purchasing-project-parts/batch-update',
    method:'PATCH',
    data:data
  })
}
//批量材料组工艺组保存
export function batchUpdateStuff(data){
  return requst({
    url:'/purchasing-project-parts/batch-update/stuff',
    method:'PATCH',
    data:data
  })
}
//拆分采购工厂
export function splitFactorySave(data){
  return requst({
    url:'/purchasing-project-parts/update',
    method:'PATCH',
    data:data
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
//通过车型id查询车型配置

export function searchCarTypeConfig(data) {
  return requst({
    url:`/purchasing-project-parts/search-car-type-config/${data}`,
    method:'GET',
  })
}


//通过零件采购项目查询车型
export function searchCarType(id) {
  return requst({
    url:`/purchasing-project-parts/search-car-type/${id}`,
    method:'GET'
  })
}