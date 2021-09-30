/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-28 14:01:48
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-29 16:11:28
 * @Description: 审批记录
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// 是否有拒绝或补充材料状态的记录  
export function aekoAuditSupplementalresult(data) {
  return requst({
    url: `/aeko/audit/file/supplementalresult/${data.manageId}/${data.linieId}`,
    method: 'GET',
  })
}