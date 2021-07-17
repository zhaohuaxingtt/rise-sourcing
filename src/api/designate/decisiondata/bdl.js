/*
 * @Author: Luoshuang
 * @Date: 2021-06-08 15:56:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-17 22:20:19
 * @Description: 
 * @FilePath: \front-web\src\api\designate\decisiondata\bdl.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING_WDL)

// 获取定点下rfq列表
export function readQuotation(nominateId) {
  return requst({
    url: '/supplier/findNomiRfqList?nominateId='+nominateId,
    method: "GET",
  })
}

// 根据rfq获取供应商报价列表
export function findRfqSupplierQuotationPage({nominateId,rfqId, current, size}) {
  return requst({
    url: `/supplier/findRfqSupplierQuotationPage?nominateId=${nominateId}&rfqId=${rfqId}&current=${current}&size=${size}`,
    method: "GET",
  })
}