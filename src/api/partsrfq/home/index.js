/*
 * @Author: moxuan
 * @Date: 2021-03-15 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: rfq列表
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_MOCK)


export function getRfqDataList(parmars) {
    return requst({
        url: '/rfqs/findByRfqs',
        method: 'POST',
        data: parmars
    })
}

export function editRfqData(parmars) {
    return requst({
        url: '/rfqs/updateRfq',
        method: 'PATCH',
        data: parmars
    })
}
