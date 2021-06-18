import axios from '@/utils/axios'

const INVESTMENTHISTORYPARTS = axios(process.env.VUE_APP_INVESTMENTHISTORYPARTS)
//获取专业科室下拉列表
export function getInvestmentHistoryParts(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/getInvestmentHistoryParts',
        method: 'POST',
        data: parmars
    })
}
export function getInvestmentHistoryMaterial(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/getInvestmentHistoryMaterial',
        method: 'POST',
        data: parmars
    })
}
export function applyAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/applyAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function nomiAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/nomiAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function baAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/baAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function bmAmountDetail(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/bmAmountDetail',
        method: 'POST',
        data: parmars
    })
}
export function getCardDetailPulldown(parmars) {
    return INVESTMENTHISTORYPARTS({
        url: '/getCardDetailPulldown',
        method: 'GET',
        params: parmars
    })
}
