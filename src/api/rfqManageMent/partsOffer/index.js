/*
 * @Author: your name
 * @Date: 2021-04-21 16:39:36
 * @LastEditTime: 2021-05-08 16:34:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\api\rfqManageMent\mouldOffer\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER_DL)
// 查询报价状态
export function findPartQuotations(parmars) {
  return requst({
    url: '/part-quotations',
    method: 'POST',
    data: parmars
  })
}

//查询零件清单列表
export function findPartsList({rfqId, round, pageNo, pageSize}) {
  return requst({
    url: `/parts-quotations/partsList/${rfqId}/${round}/${pageNo}/${pageSize}`,
    method: 'GET',
  })
}

//提交零件清单列表
export function putPartsList(params) {
  return requst({
    url: '/parts-quotations/putPartList',
    method: 'PUT',
    data: params
  })
}