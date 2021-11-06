/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 20:49:33
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon')

// pbi-采购金额总览
export function getPurchaseAmountPbi(parmars) {
    return requst({
        url: '/batchOverview/getPurchaseAmountPbi',
        method: 'GET',
        data: parmars
    })
}
