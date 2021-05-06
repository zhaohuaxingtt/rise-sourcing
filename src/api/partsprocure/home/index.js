/*
 * @Author: yuszhou
 * @Date: 2021-02-25 11:07:22
 * @LastEditTime: 2021-04-27 21:43:55
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
    url:'/part-src-prjs',
    method:'GET',
    params:parmars
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
// 获取零件采购 group下拉数据
export function getProcureGroup(parmars){
	return requst({
		url:"/part-src-prjs/drop-down-box-infos",
		method:'POST',
		data:parmars
	})
}

export function getAllTable(parmars){
  return requst({
    url:'/part-src-prjs?'+parmars,
    method:'GET'
  })
}
//修改零件采购项目相关信息
export function changeProcure(parmars){
  return requst({
    url:'/part-src-prjs',
    method:'PATCH',
    data:parmars
  })
}
