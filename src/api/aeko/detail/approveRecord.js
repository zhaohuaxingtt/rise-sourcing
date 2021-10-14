/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-28 14:01:48
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-11 17:29:15
 * @Description: 审批记录
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)
const approve = axios(process.env.VUE_APP_APPROVAL)

// 是否有拒绝或补充材料状态的记录  
export function aekoAuditSupplementalresult(data) {
  return requst({
    url: `/aeko/audit/file/supplementalresult/${data.manageId}/${data.linieId}`,
    method: 'GET',
  })
}

// 获取审批记录
export function findHistoryByAeko(data) {
  return approve({
    url: `/aeko/findHistoryByAeko`,
    method: 'POST',
    data
  })
}

// 提交审批记录
export function submitForApproval(data) {
  return requst({
    url: `aeko/audit/file/submitForApproval`,
    method: 'POST',
    data
  })
}