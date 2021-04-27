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
//投资清单-根据车型下拉列表选择 回显项目类型,定点类型,车型类别
export function findProjectDetailById(parmars) {
    return requst({
        url: '/web/buildInvestment/findProjectDetailById',
        method: 'GET',
        params: parmars
    })
}
//投资清单-根据车型下拉列表选择 回显项目类型,定点类型,车型类别
export function GetOtherCarTypeAlternative(parmars) {
    return requst({
        url: '/web/buildInvestment/GetOtherCarTypeAlternative',
        method: 'GET',
        params: parmars
    })
}
//投资清单-参考车型项目-回显
export function getRelationCarTypeById(parmars) {
    return requst({
        url: '/web/refcartypepro/getRelationCarTypeById',
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
//新增投资清单
export function ConfirmCustomerCarTypeSelect(parmars) {
    return requst({
        url: 'web/cartype/ConfirmCustomerCarTypeSelect',
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
//删除投资清单-删除材料组
export function deleteList(parmars) {
    return requst({
        url: '/web/buildInvestment/delete',
        method: 'POST',
        data: parmars
    })
}
//保存自定义车型项目
export function saveCustomCart(parmars) {
    return requst({
        url: '/web/cartype/saveCustomCart',
        method: 'POST',
        data: parmars
    })
}
//投资清单-配置参考车型项目
export function saveRefcartypepro(parmars) {
    return requst({
        url: '/web/refcartypepro/save',
        method: 'POST',
        data: parmars
    })
}
//更新投资清单-更新材料组
export function updateBuildInvestment(parmars) {
    return requst({
        url: '/web/buildInvestment/update',
        method: 'POST',
        data: parmars
    })
}
//生成投资清单按钮-生成投资清单
export function saveInvestBuildBottom(parmars) {
    return requst({
        url: '/web/investment/saveInvestBuildBottom',
        method: 'POST',
        data: parmars
    })
}
