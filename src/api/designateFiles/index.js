/*
 * @Author: Luoshuang
 * @Date: 2021-06-02 14:54:29
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 15:12:43
 * @Description: 附件相关api
 * @FilePath: \front-web\src\api\designateFiles\index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_PROCUREMENTREQUIREMENT_ZZB)

// 获取附件列表数据
export function getAffixList(params) {
  return requst({
      url: '/affix/list',
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