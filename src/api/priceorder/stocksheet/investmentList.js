import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_WS2)
//获取版本号下拉列表——按照版本创建时间降序
export function getInvestmentVerisionList(parmars) {
    return requst({
        url: '/web/investmentVerision/getInvestmentVerisionList',
        method: 'GET',
        params: parmars
    })
}
//获取专业科室下拉列表
export function getDepartmentsList(parmars) {
    return requst({
        url: '/web/investment/getDepartmentsList',
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
//获取投资清单数据分析数据
export function getInvestmentData(parmars) {
    return requst({
        url: '/web/InvestmentOrder/getInvestmentData',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单条件查询
export function findInvestmentList(parmars) {
    return requst({
        url: '/web/investment/findInvestmentList',
        method: 'POST',
        data: parmars
    })
}
