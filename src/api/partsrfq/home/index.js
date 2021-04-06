/*
 * @Author: moxuan
 * @Date: 2021-03-15 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: rfq列表
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_RFQ)

export function getRfqDataList(parmars) {
    return requst({
        url: '/api/rfqs/findByRfqs',
        method: 'POST',
        data: parmars
    })
}

export function editRfqData(parmars) {
    return requst({
        url: '/api/rfqs/updateRfq',
        method: 'PATCH',
        data: parmars
    })
}

export function addRfq(parmars) {
    return requst({
        url: '/api/rfqs/insertRfq',
        method: 'PATCH',
        data: parmars
    })
}

export function findBySearches(type) {
    return requst({
        url: `/api/rfqs/findBySearches/${type}`,
        method: 'GET'
    })
}

//启动询价
export function insertRfq(parmars) {
    return requst({
        url: '/api/rfqs/insertRfq',
        method: 'PATCH',
        data: {
            insertRfqPackage: {
                ...parmars,
                ...{
                    operationType: '3',
                    userId: store.state.permission.userInfo.id || '',
                    userName: store.state.permission.userInfo.userName
                }
            }
        }
    })
}
