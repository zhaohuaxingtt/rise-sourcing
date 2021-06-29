/*
 * @Author: Luoshuang
 * @Date: 2021-06-28 13:41:56
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-28 19:37:59
 * @Description: 审批流相关接口
 * @FilePath: \front-web\src\api\designate\decisiondata\approval.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING_ZDH)
const requstUserCenter = axios(process.env.VUE_APP_USER_CENTER_M)
const requstApproval = axios(process.env.VUE_APP_APPROVAL)

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

export function getDept() {
  return requstUserCenter({
    url: '/api/dept/getDeptListByIdList',
    method: 'GET'
  })
}

export function getDeptSub(id) {
  return requstUserCenter({
    url: '/api/dept/detail?id='+id,
    method: 'GET'
  })
}

export function getInstDetail(processInstanceId) {
  return requstApproval({
    url: '/taskInfo/getInstDetail?processInstanceId='+processInstanceId,
    method: 'GET'
  })
}