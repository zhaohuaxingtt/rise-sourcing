import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const INVESTMENT = axios(process.env.VUE_APP_TOOLING  + '/investment')
const INVESTMENTFile = axiosFile(process.env.VUE_APP_TOOLING  + '/investment')
const INVESTMENTVERSION = axios(process.env.VUE_APP_TOOLING  + '/investmentVerision')
const BUILDINVESTMENT = axios(process.env.VUE_APP_TOOLING  + '/buildInvestment')
const INVESTMENTORDER = axios(process.env.VUE_APP_TOOLING  + '/InvestmentOrder')
const VUE_APP_REFCARTYPEPRO = axios(process.env.VUE_APP_TOOLING  + '/refcartypepro')
 const VUE_APP_CSBUDGET = axios(process.env.VUE_APP_TOOLING + '/CSBudget')
//获取专业科室下拉列表
export function getDepartmentsList(parmars) {
    return INVESTMENT({
        url: '/getDepartmentsList',
        method: 'GET',
        params: parmars
    })
}
//获取专业科室下拉列表
export function proDeptPullDown(parmars) {
    return INVESTMENT({
        url: '/proDeptPullDown',
        method: 'GET',
        params: parmars
    })
}
//模具投资清单条件查询
export function findInvestmentList(parmars) {
    return INVESTMENT({
        url: '/findInvestmentList',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单条件下载
export function exportInvestmentList(parmars) {
    return INVESTMENTFile({
        url: '/exportInvestmentList',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单-添加行
export function investmentSave(parmars) {
    return INVESTMENT({
        url: '/save',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单-刪除投资清单
export function investmentDelete(data, parmars) {
    return INVESTMENT({
        url: '/delete',
        method: 'POST',
        data: data,
        params: parmars,
    })
}
//模具投资清单-保存编辑内容
export function investmentUpdate(parmars) {
    return INVESTMENT({
        url: '/update',
        method: 'POST',
        data: parmars
    })
}
//模具投资清单-保存为新版本
export function saveNewVersion(parmars) {
    return INVESTMENT({
        url: '/saveNewVersion',
        method: 'POST',
        data: parmars
    })
}
//获取linie下拉
export function liniePullDownByDept(parmars) {
    return INVESTMENT({
        url: '/liniePullDownByDept',
        method: 'POST',
        data: parmars
    })
}
//获取版本号下拉列表——按照版本创建时间降序
export function getInvestmentVerisionList(parmars) {
    return INVESTMENTVERSION({
        url: '/getInvestmentVerisionList',
        method: 'GET',
        params: parmars
    })
}
//投资清单-添加行-模具属性下拉
export function getModelProtitesPullDown(parmars) {
    return BUILDINVESTMENT({
        url: '/getModelProtitesPullDown',
        method: 'GET',
        params: parmars
    })
}
//预算-自定义车型关联主数据车型
export function relationMainCarType(parmars) {
    return BUILDINVESTMENT({
        url: '/relationMainCarType',
        method: 'GET',
        params: parmars
    })
}
 //获取车型预算
export function getCarTypeBudget(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/getCarTypeBudget/' + parmars,
        method: 'GET',
    })
}
//预算合并
export function budgetMerge(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/budgetMerge/' + parmars,
    method: 'GET',
    })
}

//生成投资清单条件查询
export function findInvestmentBuild(parmars) {
    return BUILDINVESTMENT({
        url: '/findInvestmentBuild',
        method: 'POST',
        data: parmars
    })
}
//获取投资清单数据分析数据
export function getInvestmentData(parmars) {
    return INVESTMENTORDER({
        url: '/getInvestmentData',
        method: 'POST',
        data: parmars
    })
}
//投资清单-参考车型项目列表
export function searchRelationCarTypeList(parmars) {
    return VUE_APP_REFCARTYPEPRO({
        url: '/searchRelationCarTypeList',
        method: 'POST',
        data: parmars
    })
}
//投资清单-参考车型项目零件列表
export function relationCarTypePartsList(parmars) {
    return VVUE_APP_REFCARTYPEPRO({
        url: '/relationCarTypePartsList',
        method: 'POST',
        params: parmars
    })
}
//投资清单-应用参考车型项目
export function applyRefCarType(id, data) {
    return INVESTMENT({
        url: '/applyRefCarType/' + id,
        method: 'POST',
        data: data
    })
}
//Common预算保存
export function commonSave(data) {
    return VUE_APP_CSBUDGET({
        url: '/commonSave',
        method: 'POST',
        data: data
    })
}


