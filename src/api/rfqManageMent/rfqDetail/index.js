/*
 * @Author: your name
 * @Date: 2021-04-21 16:39:36
 * @LastEditTime: 2021-05-06 16:03:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\api\rfqManageMent\mouldOffer\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER_RFQLIST)
const requstBjd = axios(process.env.VUE_APP_SUPPLIER_CBHUIZ)
// 查询RFQ信息
export function findByRfqs(parmars) {
    return requst({
        url: '/rfqs/findByRfqs',
        method: 'POST',
        data: parmars
    })
}
export function getOneRfq(parmars) {
    return requst({
        url: `/rfqs/getOneRfq/${parmars}`,
        method: 'GET'
    })
}
/**
 * @description: 获取报价成本汇总界面数据 
 * @param {*} parmars
 * @return {*}
 */
export function getCostSummary(parmars) {
    return requstBjd({
        url: '/part/cost-summary/getCostSummary',
        method: 'POST',
        data: parmars
    })
}
/**
 * @description: 获取报价成本汇总界面数据 
 * @param {*} parmars
 * @return {*}
 */
 export function packageTransport(quId) {
    return requstBjd({
        url: `/part/quotation/package-transport/${quId}`,
        method: 'GET'
    })
}
// 查询供应商评分附件
export function getAllAnnex(parmars) {
    return requst({
        url: '/supplier/getAllAnnex',
        method: 'POST',
        data: parmars
    })
}

// 查询时间计划信息
export function findTimePlan(params) {
    return requst({
        url: '/time-plan',
        method: 'POST',
        data: params
    })
}
