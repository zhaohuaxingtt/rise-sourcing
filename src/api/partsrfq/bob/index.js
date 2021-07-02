/*
 * @Author: xuxin
 * @Date: 2021-05-21 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: bob
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_AON)

export function getBobLevelOne(parmars) {
    return requst({
        url: '/bobLevelOne/histogram',
        method: 'POST',
        data: parmars
    })
}

export function removeBobOut(parmars) {
    return requst({
        url: '/bobLevelOne/remove',
        method: 'POST',
        data: parmars
    })
}

export function addBobOut(parmars) {
    return requst({
        url: '/bobLevelOne/add',
        method: 'POST',
        data: parmars
    })
}
//费用详情查询
export function chargeRetrieve(parmars) {
    return requst({
        url: '/bobRoundDetail/chargeRetrieve',
        method: 'POST',
        data: parmars
    })
}
//费用详情下载
export function down(parmars) {
    return requst({
        url: '/bobRoundDetail/down',
        method: 'GET',
        data: parmars
    })
}

