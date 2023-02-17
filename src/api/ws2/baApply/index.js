/*
 * @Author: your name
 * @Date: 2021-07-12 20:18:28
 * @LastEditTime: 2021-11-06 14:13:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\api\ws2\baApply\index.js
 */
import axios from '@/utils/axios';

const VUE_APP_APPLY = axios(process.env.VUE_APP_TOOLING + '/baPartsApply');
const VUE_APP_CARTYPE = axios(process.env.VUE_APP_TOOLING + '/cartype')

//  ba申请-车型列表
export function findCarTypeList(parmars) {
    return VUE_APP_APPLY({
        url: '/findCarTypeList',
        method: 'POST',
        data: parmars
    })
}

//  采购工厂列表
export function getPurchaseFactoryPullDown(parmars) {
    return VUE_APP_APPLY({
        url: '/getPurchaseFactoryPullDown',
        method: 'GET',
        data: parmars
    })
}

//  模具预算状态下拉
export function getBudgetStatusPullDown(parmars) {
    return VUE_APP_APPLY({
        url: '/getBudgetStatusPullDown',
        method: 'GET',
        data: parmars
    })
}

//  ba申请-车型列表
export function findBaPartsList(parmars) {
    return VUE_APP_APPLY({
        url: '/findBaPartsList',
        method: 'POST',
        data: parmars
    })
}

//  模具预算状态下拉
export function getBaAccountType(parmars) {
    return VUE_APP_APPLY({
        url: '/getBaAccountType',
        method: 'GET',
        data: parmars
    })
}

//  BA账户类型
export function getBaAccountTypePullDown(parmars) {
    return VUE_APP_APPLY({
        url: '/getBaAccountTypePullDown',
        method: 'GET',
        data: parmars
    })
}

//  获取车型列表下拉
export function getBaCarPullDown(parmars) {
    return VUE_APP_APPLY({
        url: '/getBaCarPullDown',
        method: 'GET',
        data: parmars
    })
}
//  获取车型列表下拉
export function getBaCarPullDown2(parmars) {
    return VUE_APP_APPLY({
        url: '/getBaCarPullDown2',
        method: 'GET',
        data: parmars
    })
}

// 获取生产工厂下拉列表
export function getProductionFactoryPullDown() {
    return VUE_APP_CARTYPE({
        url: '/getPurchaseFactoryPullDown',
        method: 'GET',
    })
}

// 获取生产工厂下拉列表
export function getProductionFactoryPullDown1() {
    return VUE_APP_CARTYPE({
        url: '/getProductionFactoryPullDown',
        method: 'GET',
    })
}


//  ba申请-科室
export function getDeptList(data) {
    return VUE_APP_APPLY({
        url: '/getDeptList',
        method: 'GET',
        params: data
    })
}

//  ba申请-供应商
export function getSupplierList(data) {
    return VUE_APP_APPLY({
        url: '/getSupplierList',
        method: 'GET',
        params: data
    })
}

//  BA申请-零件状态修改
export function updatePartsApply(parmars) {
    return VUE_APP_APPLY({
        url: '/updatePartsApply',
        method: 'POST',
        data: parmars
    })
}