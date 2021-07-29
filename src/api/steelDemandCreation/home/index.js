/*
 * @Author: your name
 * @Date: 2021-06-30 14:53:52
 * @LastEditTime: 2021-07-28 15:46:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\steelDemandCreation\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER_RFQLIST)

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