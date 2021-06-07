/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-06-03 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 供应商列表分页
export function getSupplierList(params) {
  return requst({
      url: `/supplier/findSupplierPage`,
      method: "GET",
      params
  })
}

// 供应商列表分页
export function getSingleSupplierList(params) {
  return requst({
      url: `/exclusiveSupplier/findExclusiveSupplierPage`,
      method: "GET",
      params
  })
}