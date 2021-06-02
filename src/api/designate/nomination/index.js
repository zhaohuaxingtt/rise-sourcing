/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-05-28 20:07:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)
console.log(JSON.str)

// 获取定点管理列表
export function getNominationList(params) {
  return requst({
      url: `/nominate-apps/page`,
      method: "post",
      data: params
  })
}