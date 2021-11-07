/*
 * @Author: your name
 * @Date: 2021-07-12 20:18:28
 * @LastEditTime: 2021-11-06 12:52:18
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\api\ws2\budgetApproval\index.js
 */
import axios from '@/utils/axios'

const VUE_APP_BUDGET = axios(process.env.VUE_APP_TOOLING  + '/budget')
//分页条件审批列表
export function pageApproval(parmars) {
    return VUE_APP_BUDGET({
        url: '/pageApproval',
        method: 'POST',
        data: parmars
    })
}
//审批预算页车型项目下拉信息
export function carCombo(parmars) {
    return VUE_APP_BUDGET({
        url: '/approval/carCombo',
        method: 'POST',
        data: parmars
    })
}
//审批预算页预算状态下拉信息
export function statusCombo(parmars) {
    return VUE_APP_BUDGET({
        url: '/approval/statusCombo',
        method: 'POST',
        data: parmars
    })
}
//转派采购员/申请人
export function applyUserCombo(parmars) {
    return VUE_APP_BUDGET({
        url: '/assign/applyUserCombo',
        method: 'POST',
        data: parmars
    })
}
//转派
export function assign(parmars) {
    return VUE_APP_BUDGET({
        url: '/apply/assign',
        method: 'POST',
        data: parmars
    })
}
//拒绝
export function reject(parmars) {
    return VUE_APP_BUDGET({
        url: '/apply/reject',
        method: 'POST',
        data: parmars
    })
}
//批准前提示
export function alert(parmars) {
    return VUE_APP_BUDGET({
        url: '/ratify/alert',
        method: 'POST',
        data: parmars
    })
}
//批准
export function ratify(parmars) {
    return VUE_APP_BUDGET({
        url: '/apply/ratify',
        method: 'POST',
        data: parmars
    })
}
//根据RFQ查询
export function detail(parmars) {
    return VUE_APP_BUDGET({
        url: '/part/detail',
        method: 'POST',
        data: parmars
    })
}
//查询申请明细
export function applyDetail(parmars) {
    return VUE_APP_BUDGET({
        url: '/apply/detail',
        method: 'POST',
        data: parmars
    })
}
export function getCardDetailPulldown(parmars) {
    return VUE_APP_BUDGET({
        url: '/getCardDetailPulldown',
        method: 'GET',
        params: parmars
    })
}
