/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 20:49:33
 * @LastEditors: caopeng
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
const requstApi = axios(process.env.VUE_APP_POWEBI_KPI + '/api/aon')

// pbi-采购金额总览
export function getPurchaseAmountPbi(parmars) {
    return requst({
        url: '/batchOverview/getPurchaseAmountPbi',
        method: 'GET',
        data: parmars
    })
}
//重置接口
export function listAmount(parmars) {
    return requstApi({
        url: '/categoryReport/listAmount?categoryCode='+parmars,
        method: 'GET'
      });
  }
