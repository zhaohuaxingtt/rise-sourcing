/*
 * @Author: your name
 * @Date: 2021-06-30 14:53:52
 * @LastEditTime: 2021-06-30 14:54:57
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
        url: 'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/steeldemandcreation',
        method: 'GET',
        data: parmars
    })
}