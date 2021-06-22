/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 15:15:44
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_RFQ)

export function powerBiUrl(parmars) {
    return requst({
        url: '/batchOverview/getSupplierPbi',
        method: 'GET',
    })
}