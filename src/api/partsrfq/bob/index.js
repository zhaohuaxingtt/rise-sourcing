/*
 * @Author: xuxin
 * @Date: 2021-05-21 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: bob
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_BOB)

export function getBobLevelOne(parmars) {
    return requst({
        url: '/bobLevelOne/histogram',
        method: 'POST',
        data: parmars
    })
}