/*
 * @Author: your name
 * @Date: 2021-03-18 20:15:17
 * @LastEditTime: 2021-06-28 21:52:13
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

export function sendKey(data){
    return requst({
        url:'http://10.122.18.136:8088/i18n/addTranslationMap',
        method:"POST",
        data:{
            cliant:'sourcing',
            dataList:data
        }
    })
}

//根据条件，分页查询用户
export function getSapUserPageList(data){
    return requst({
        url:'/sapUser/pageList',
        method:"post",
        data:data
    })
}
//查询特殊身份部门信息（多个）,查linie时tagId传4
export function getDeptListByTag(parmars){
    return requst({
        url:'/api/dept/getDeptListByTag',
        method:"GET",
        params:parmars,
    })
}
//根据用户身份查询用户列表（可添加部门筛选）,查linie时tagId传4
export function getUserListByTag(parmars){
    return requst({
        url:'/api/getUserListByTag',
        method:"GET",
        params:parmars,
    })
}