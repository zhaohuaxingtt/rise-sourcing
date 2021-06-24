/*
 * @Author: Hao Jiang
 * @Date: 2021-06-22 17:30:52
 * @LastEditTime: 2021-06-22 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: sel 上会复核列表部分
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取sel 复核列表
export function getSelList(params) {
  return requst({
      url: `/nominate/check/list`,
      method: "post",
      data: params
  })
}


