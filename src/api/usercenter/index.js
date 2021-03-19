/*
 * @Author: your name
 * @Date: 2021-03-18 20:15:17
 * @LastEditTime: 2021-03-18 20:25:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\usercenter\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_USER_CENTER)

export function purchaseUsers(parmars) {
    return requst({
        url: '/sapUserController/purchaseUsers',
        method: 'GET',
        params: parmars
    })
}

export function getGraderIdByDept(deptNUm) {
    return requst({
        url: `/sapUserController/raters?deptNUm=${deptNUm}`,
        method: 'GET'
    })
}