/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-28 14:01:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 09:56:11
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

// AEKO查看-获取审批记录
export function getHistoricByParams(data) {
  return approve({
    url: '/history/getHistoricByParams',
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

// 审批附件上传
export function auditFileSave(data) {
  return requst({
    url: '/aeko/audit/file/saveExplainFile',
    method: 'POST',
    data,
  })
}

// 审批附件删除
export function auditFileDelete(data) {
  return requst({
    url: '/aeko/audit/file/delExplainFile',
    method: 'DELETE',
    data,
  })
}