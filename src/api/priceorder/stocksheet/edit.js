import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_WS2)

//获取车型下拉列表-SOP时间小于当前时间列表
export function getCartypePulldown(parmars) {
    return requst({
        url: '/web/buildInvestment/getCartypePulldown',
        method: 'GET',
        params: parmars
    })
}
//投资清单-车型项目右边三个下拉列表
export function findProjectTypeDetailPulldown(parmars) {
    return requst({
        url: '/web/buildInvestment/findProjectTypeDetailPulldown',
        method: 'GET',
        params: parmars
    })
}
//生成投资清单条件查询
export function findInvestmentBuild(parmars) {
    return requst({
        url: '/web/buildInvestment/findInvestmentBuild',
        method: 'POST',
        data: parmars
    })
}
//添加行材料组列表
export function findAddColumnInvestmentBuild(parmars) {
    return requst({
        url: '/web/buildInvestment/findAddColumnInvestmentBuild',
        method: 'POST',
        data: parmars
    })
}
//保存投资清单-添加材料组
export function saveList(parmars) {
    return requst({
        url: '/web/buildInvestment/save',
        method: 'POST',
        data: parmars
    })
}
