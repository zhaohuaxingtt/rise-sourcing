/*
 * @Author: moxuan
 * @Date: 2021-03-18 17:07:22
 */

import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_DIC)
export function getDictByCode(code) {
    return requst({
        url: `/dict?code=${code}`,
        method: 'GET'
    })
}