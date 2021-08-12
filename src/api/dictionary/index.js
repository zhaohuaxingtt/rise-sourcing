/*
 * @Author: moxuan
 * @Date: 2021-03-18 17:07:22
 */

import axios from '@/utils/axios'
import { serialize } from "@/utils"

const requst = axios(process.env.VUE_APP_DIC)
export function getDictByCode(code) {
    return requst({
        url: `/dict?code=${code}`,
        method: 'GET'
    })
}

export function getDeptByDeptType(type) {
    return requst({
        url: `/dept?type=${type}`,
        method: 'GET'
    })
}

// 字典
export function selectDictByKeys(params) {
    return requst({
        url: `/selectDictByKeys?${ serialize(params, Array) }`,
        method: 'GET'
    })
}

//原产国
export function selectDictByKeyss(type) {
    return requst({
        url: `/selectDictByKeys?keys=${type}`,
        method: 'GET'
    })
}
//查询采购工厂
export function procureFactorySelectVo(type) {
    return requst({
        url: `/procureFactorySelectVo`,
        method: 'POST'
    })
}
