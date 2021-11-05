/*
 * @Author: yuszhou
 * @Date: 2021-04-21 16:39:36
 * @LastEditTime: 2021-05-07 11:44:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\api\rfqManageMent\mouldOffer\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER_RFQLIST)

/**
 * @description: 待办rfq供应商列表
 * @param {*} parmars
 * @return {*}
 */
export function findByRfqs(parmars) {
    return requst({
        url: '/rfqs/findByRfqs',
        method: 'POST',
        data: parmars
    })
}

/**
 * @description: 更新rfq
 * @param {*} parmars
 * @return {*}
 */
export function editRfqData(parmars) {
    return requst({
        url: '/rfqs/updateRfq',
        method: 'PATCH',
        data: parmars
    })
}
/**
 * @description: 更新rfq
 * @param {*} parmars
 * @return {*}
 */
 export function quotations(parmars) {
    return requst({
        url: '/rfq-quotations',
        method: 'POST',
        data: parmars
    })
}
/**
 * @description: 更新rfq
 * @param {*} parmars
 * @return {*}
 */
 export function findDropDownBox(parmars) {
    return requst({
        url: '/rfqs/findDropDownBox',
        method: 'POST',
        data: parmars
    })
}