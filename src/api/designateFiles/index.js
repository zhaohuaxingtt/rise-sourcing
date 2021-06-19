/*
 * @Author: Luoshuang
 * @Date: 2021-06-02 14:54:29
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-18 18:22:38
 * @Description: 附件相关api
 * @FilePath: \front-web\src\api\designateFiles\index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_PROCUREMENTREQUIREMENT_ZZB)
const requstSourcing = axios(process.env.VUE_APP_SOURCING_WDL)

// 获取附件列表数据
export function getAffixList(params) {
  return requst({
      url: '/affix/affix-requirements',
      method: "POST",
      data: params
  })
}

// 修改附件列表数据
export function updateAffixList(params) {
  return requst({
      url: '/affix/update',
      method: "PATCH",
      data: params
  })
}

// 模糊搜索linie
export function findBuyer(buyerName) {
  return requstSourcing({
    url: `/annex/annex-buyer-name`,
    method: 'GET',
    params: {buyerName}
  })
}

// 删除附件
export function deleteAffix(params) {
  return requst({
    url: '/affix/delete',
    method: 'DELETE',
    data: params
  })
}