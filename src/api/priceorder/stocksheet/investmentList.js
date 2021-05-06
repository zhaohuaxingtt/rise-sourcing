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
//获取专业科室下拉列表
export function proDeptPullDown(parmars) {
    return requst({
        url: '/web/investment/proDeptPullDown',
        method: 'POST',
        params: parmars
    })
}
//投资清单-添加行-模具属性下拉
export function getModelProtitesPullDown(parmars) {
    return requst({
        url: '/web/buildInvestment/getModelProtitesPullDown',
        method: 'GET',
        params: parmars
    })
}
//预算-自定义车型关联主数据车型
export function relationMainCarType(parmars) {
    return requst({
        url: '/web/buildInvestment/relationMainCarType',
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
//模具投资清单-添加行
export function investmentSave(parmars) {
    return requst({
        url: '/web/investment/save',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单-刪除投资清单
export function investmentDelete(data, parmars) {
    return requst({
        url: '/web/investment/delete',
        method: 'POST',
        data: data,
        params: parmars,
    })
}
//模具投资清单-保存编辑内容
export function investmentUpdate(parmars) {
    return requst({
        url: '/web/investment/update',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单-保存为新版本
export function saveNewVersion(parmars) {
    return requst({
        url: '/web/investment/saveNewVersion',
        method: 'POST',
        data: parmars
    })
}
//获取linie下拉
export function liniePullDownByDept(parmars) {
    return requst({
        url: '/web/investment/liniePullDownByDept',
        method: 'POST',
        data: parmars
    })
}

