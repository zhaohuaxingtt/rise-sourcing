/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-28 14:01:48
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-28 14:03:25
 * @Description: 审批记录
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

// 零件清单分页查询  
export function getAuditFilePage(data) {
  return requst({
    url: '/aeko/audit/file/page',
    method: 'POST',
    data,
  })
}