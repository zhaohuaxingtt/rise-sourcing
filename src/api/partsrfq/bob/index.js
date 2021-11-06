/*
 * @Author: xuxin
 * @Date: 2021-05-21 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: bob
 */

import axios from '@/utils/axios'
import axiosDownLoad from '@/utils/axios.download'
import store from '@/store'

const requst = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon')
const request = axiosDownLoad(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon')

export function getBobLevelOne(parmars) {
  return requst({
    url: '/bobLevelOne/histogram',
    method: 'POST',
    data: parmars,
  })
}

export function removeBobOut(parmars) {
  return requst({
    url: '/bobLevelOne/remove',
    method: 'POST',
    data: parmars,
  })
}

export function addBobOut(parmars) {
  return requst({
    url: '/bobLevelOne/add',
    method: 'POST',
    data: parmars,
  })
}
//费用详情查询
export function chargeRetrieve(parmars) {
  return requst({
    url: '/bobRoundDetail/chargeRetrieve',
    method: 'POST',
    data: parmars,
  })
}

//费用详情分组信息查询
export function getGroupInfo(parmars) {
  return requst({
    url: '/bobRoundDetail/getGroupInfo',
    method: 'POST',
    data: parmars,
  })
}

//添加至分组
export function addComponentToGroup(parmars) {
  return requst({
    url: '/bobRoundDetail/addComponentToGroup',
    method: 'POST',
    data: parmars,
  })
}
//合并
export function merge(parmars) {
  return requst({
    url: '/bobRoundDetail/merge',
    method: 'POST',
    data: parmars,
  })
}

//添加至分组
export function removeComponentFromGroup(parmars) {
  return requst({
    url: '/bobRoundDetail/removeComponentFromGroup',
    method: 'POST',
    data: parmars,
  })
}

//分组取消
export function groupedCancel(parmars) {
  return requst({
    url: '/bobRoundDetail/groupedCancel',
    method: 'POST',
    data: parmars,
  })
}

//分组完成
export function groupedSubmit(parmars) {
  return requst({
    url: '/bobRoundDetail/groupedSubmit',
    method: 'POST',
    data: parmars,
  })
}

//还原分组
export function groupTerms(parmars) {
  return requst({
    url: '/hanlp/groupTerms',
    method: 'POST',
    data: parmars,
  })
}

//费用详情下载
export function down(params) {
  return request({
    url: '/bobRoundDetail/down',
    method: 'GET',
    params,
  })
}

// 获取RFQ备注信息
export function getRfqToRemark(params) {
  return requst({
    url: `/rfqToRemarkEntity/getRfqToRemark`,
    method: 'GET',
    params,
    // data:params
  })
}
// 修改RFQ备注信息
export function modifyRfqToRemark(params) {
  return requst({
    url: `/rfqToRemarkEntity/modifyRfqToRemark`,
    method: 'POST',
    data: params,
  })
}

// 重命名分组
export function renameComponentGroup(parmars) {
  return requst({
    url: '/bobRoundDetail/renameComponentGroup',
    method: 'POST',
    data: parmars,
  })
}
// 重命名分组
export function restore(parmars) {
  return requst({
    url: '/web/aon/bobRoundDetail/restore/' + parmars,
    method: 'GET',
  })
}
