/*
 * @Author: your name
 * @Date: 2021-03-18 20:15:17
 * @LastEditTime: 2021-04-28 16:14:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\api\usercenter\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_USER_CENTER)

export function purchaseUsers(parmars) {
    return requst({
        url: '/purchaseUsers',
        method: 'GET',
        params: parmars
    })
}

export function getGraderIdByDept(deptNUm) {
    return requst({
        url: `/raters?deptNUm=${deptNUm}`,
        method: 'GET'
    })
}

export function getSystemMeun(){
    return requst({
        url:'/userPermission',
        method:'GET'
    })
}

//模拟登陆接口，返回token
export function login(data){
    return requst({
        url:'/login',
        method:"post",
        data:data
    })
}

export function getUserInfoByToken(){
    return requst({
        url:'/getUserInfoByToken',
        method:"GET",
    })
}