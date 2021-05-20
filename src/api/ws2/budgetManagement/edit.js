import axios from '@/utils/axios'

const INVESTMENT = axios(process.env.VUE_APP_INVESTMENT)
const CARTYPE = axios(process.env.VUE_APP_CARTYPE)
const REFCARTYPEPRO = axios(process.env.VUE_APP_REFCARTYPEPRO)
const BUILDINVESTMENT = axios(process.env.VUE_APP_BUILDINVESTMENT)

//获取车型下拉列表-SOP时间小于当前时间列表
export function getCartypePulldown(parmars) {
    return BUILDINVESTMENT({
        url: '/getCartypePulldown',
        method: 'GET',
        params: parmars
    })
}

//投资清单-车型项目右边三个下拉列表
export function findProjectTypeDetailPulldown(parmars) {
    return BUILDINVESTMENT({
        url: '/findProjectTypeDetailPulldown',
        method: 'GET',
        params: parmars
    })
}

//投资清单-根据车型下拉列表选择 回显项目类型,定点类型,车型类别
export function findProjectDetailById(parmars) {
    return BUILDINVESTMENT({
        url: '/findProjectDetailById',
        method: 'GET',
        params: parmars
    })
}

//投资清单-根据车型下拉列表选择 回显项目类型,定点类型,车型类别
export function GetOtherCarTypeAlternative(parmars) {
    return BUILDINVESTMENT({
        url: '/GetOtherCarTypeAlternative',
        method: 'GET',
        params: parmars
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

//添加行材料组列表
export function findAddColumnInvestmentBuild(parmars) {
    return BUILDINVESTMENT({
        url: '/findAddColumnInvestmentBuild',
        method: 'POST',
        data: parmars
    })
}

//保存投资清单-添加材料组
export function saveList(parmars) {
    return BUILDINVESTMENT({
        url: '/save',
        method: 'POST',
        data: parmars
    })
}

//删除投资清单-删除材料组
export function deleteList(parmars) {
    return BUILDINVESTMENT({
        url: '/delete',
        method: 'POST',
        data: parmars
    })
}

//更新投资清单-更新材料组
export function updateBuildInvestment(parmars) {
    return BUILDINVESTMENT({
        url: '/update',
        method: 'POST',
        data: parmars
    })
}

//新增投资清单
export function ConfirmCustomerCarTypeSelect(parmars) {
    return CARTYPE({
        url: '/ConfirmCustomerCarTypeSelect',
        method: 'POST',
        data: parmars
    })
}

//保存自定义车型项目
export function saveCustomCart(parmars) {
    return CARTYPE({
        url: '/saveCustomCart',
        method: 'POST',
        data: parmars
    })
}

//投资清单-参考车型项目-回显
export function getRelationCarTypeById(parmars) {
    return REFCARTYPEPRO({
        url: '/getRelationCarTypeById',
        method: 'GET',
        params: parmars
    })
}

//投资清单-配置参考车型项目
export function saveRefcartypepro(parmars) {
    return REFCARTYPEPRO({
        url: '/save',
        method: 'POST',
        data: parmars
    })
}

//生成投资清单按钮-生成投资清单
export function saveInvestBuildBottom(parmars) {
    return INVESTMENT({
        url: '/saveInvestBuildBottom',
        method: 'POST',
        data: parmars
    })
}
