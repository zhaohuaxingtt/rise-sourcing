/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-28 14:01:48
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-28 17:34:02
 * @Description: 审批附件
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// 分页查询审批附件
export function getAuditFilePage(data) {
  return requst({
    url: '/aeko/audit/file/page',
    method: 'POST',
    data,
  })
}

// 审批附件上传
export function auditFileSave(data) {
  return requst({
    url: '/aeko/audit/file/save',
    method: 'POST',
    data,
  })
}

// 审批附件信息更新
export function auditFileUpdate(data) {
  return requst({
    url: '/aeko/audit/file/update',
    method: 'PUT',
    data,
  })
}

// 审批附件删除
export function auditFileDelete(data) {
  return requst({
    url: '/aeko/audit/file/delete',
    method: 'DELETE',
    data,
  })
}