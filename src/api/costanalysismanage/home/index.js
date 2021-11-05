/*
 * @Author: your name
 * @Date: 2021-06-03 10:40:41
 * @LastEditTime: 2021-08-11 18:10:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\costanalysismanage\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)
const userCenterRequst = axios(process.env.VUE_APP_USER_CENTER_M)

// 获取下拉框数据
// type: 01-车型项目 02-零件项目类型  03-RFQ状态  04-轮次类型
export function getSelectOptions(type) {
  return requst({
    url: `/rfqs/findBySearches/${ type }`,
    method: 'GET'
  })
}

// 获取KM的RFQ列表
export function getKmRfqList(params) {
  return requst({
    url: '/km/page/rfqs',
    method: 'POST',
    data: params
  })
}

// 更新RFQ
export function updateRfq(params) {
  return requst({
      url: '/rfqs/updateRfq',
      method: 'POST',
      data: params
  })
}

// 获取全量Commodity下拉列表
export function getCommodityOptions() {
  return userCenterRequst({
    url: '/api/dept/dropDownList',
    method: 'POST',
    data: {
      isCommodity: true
    }
  })
}

// 根据Commodity查询Linie
export function getLinieOptionsByCommodity(params, options) {
  return userCenterRequst({
    url: '/api/getUserListByTag',
    method: 'GET',
    params: {
      deptId: params.deptId,
      tagId: 4
    },
    ...options
  })
}