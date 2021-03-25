/*
 * @Author: your name
 * @Date: 2021-03-18 20:15:17
 * @LastEditTime: 2021-03-25 13:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\usercenter\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_USER_CENTER)

export function purchaseUsers(parmars) {
    return requst({
        url: '/web/purchaseUsers',
        method: 'GET',
        params: parmars
    })
}

export function getGraderIdByDept(deptNUm) {
    return requst({
        url: `/web/raters?deptNUm=${deptNUm}`,
        method: 'GET'
    })
}

export function getSystemMeun(){
    return requst({
        url:'/web/userPermission',
        method:'GET'
    })
}

//模拟登陆接口，返回token
export function login(data){
    return requst({
        url:'/web/login',
        method:"post",
        data:data
    })
}

export function getUserInfoByToken(){
    return requst({
        url:'/web/getUserInfoByToken',
        method:"GET",
    })
}