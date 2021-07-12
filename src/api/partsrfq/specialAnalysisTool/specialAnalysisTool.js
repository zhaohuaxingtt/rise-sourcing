/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 15:15:44
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_AON,600000)

export function totalBobOverview(parmars) {
  return requst({
    url: '/batchOverview/totalBobOverview',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
export function totalVolumePricingOverview(parmars) {
  return requst({
    url: '/batchOverview/totalVolumePricingOverview',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
export function totalOverview(parmars) {
  return requst({
    url: '/batchOverview/totalOverview',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
export function pageRfqBaseInfo(parmars) {
  return requst({
    url: '/costAnalysisTool/rfq/pageRfqBaseInfo',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
