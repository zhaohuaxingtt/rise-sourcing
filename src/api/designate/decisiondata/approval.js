/*
 * @Author: Luoshuang
 * @Date: 2021-06-28 13:41:56
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-12 14:31:56
 * @Description: 审批流相关接口
 * @FilePath: \front-sourcing\src\api\designate\decisiondata\approval.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)
const requstUserCenter = axios(process.env.VUE_APP_USER_CENTER_API)
const requstApproval = axios(process.env.VUE_APP_APPROVAL)
const requstRfq = axios(process.env.VUE_APP_SOURCING )

// 获取审批节点列表
export function getApprovalNode(nomiAppId) {
  return requst({
    url: `/nominate/nomi-approval-process/approvalNode/${nomiAppId}`,
    method: "GET",
  })
}

// 同步
export function approvalSync(nomiAppId) {
  return requst({
    url: `/nominate/nomi-approval-process/approvalSync/${nomiAppId}`,
    method: 'GET'
  })
}

// 更新审批人节点
export function updateApprovalNode(params) {
  return requst({
    url: '/nominate/nomi-approval-process/update',
    method: 'POST',
    data: params
  })
}

export function getDept(params = {}) {
  return requst({
    url: '/nominate/nomi-approval-process/depart-list',
    method: 'POST',
    data: params
  })
}

export function getDeptSub(id) {
  return requst({
    url: '/nominate/nomi-approval-process/depart-detail?deptId='+id,
    method: 'POST',
    data: {}
  })
}

export function getDeptLeader(data) {
  return requst({
    url: '/nominate/nomi-approval-process/approval',
    method: 'POST',
    data
  })
}

export function getInstDetail(processInstanceId) {
  return requstApproval({
    url: '/taskInfo/getInstDetail?processInstanceId='+processInstanceId,
    method: 'GET'
  })
}
export function getDeptListByParam(data) {
  return requstRfq({
    url: '/nominate/nomi-approval-process/getDeptListByParam',
    method: 'GET'
  })
}
export function getSubDeptListByParam(data, grade) {
  return requstRfq({
    url: `/nominate/nomi-approval-process/getSubDeptListByParam/${ data }/${ grade }`,
    method: 'GET',
  })
}

// 获取上会类型审批流
export function getApprovalRecordMeeting(nomiAppId, processInstanceId) {
  return requstRfq({
    url: `/nominate/nomi-approval-process/getApprovalRecord/${nomiAppId}/${processInstanceId}`,
    method: 'GET'
  })
}

