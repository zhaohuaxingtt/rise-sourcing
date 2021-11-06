/*
 * @Author: your name
 * @Date: 2021-06-30 14:53:52
 * @LastEditTime: 2021-11-06 14:14:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\steelDemandCreation\home\index.js
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SOURCING)
const downLoad = download(process.env.VUE_APP_SOURCING)
/**
 * @description: 待办rfq供应商列表
 * @param {*} parmars
 * @return {*}
 */
export function steeldemandcreation(parmars) {
    return requst({
        url: '/steelDemand/steelDemandPage',
        method: 'POST',
        data: parmars
    })
}
export function downloadExcelBatch() {
    return downLoad({
        url: '/steelDemand/downloadExcelSteelBatch',
        method: 'GET'
    })
}
export function printTransferOrderBatch(id) {
    return downLoad({
        url: `/steelDemand/printTransferOrderBatch?nominateId=${id}`,
        method: 'GET'
    })
}
export function printTransferOrderOne(id) {
    return downLoad({
        url: `/steelDemand/printTransferOrderOne?nominateId=${id}`,
        method: 'GET'
    })
}
