import axios from '@/utils/axios'
import axiosFile from "@/utils/axios.download";

const VUE_APP_CSBUDGET = axios(process.env.VUE_APP_TOOLING + '/CSBudget')
const MODELCARFile = axiosFile(process.env.VUE_APP_TOOLING + '/CSBudget')

//分页条件审批列表
// export function pageApproval(parmars) {
//     return VUE_APP_CSBUDGET({
//         url: '/pageCarTypePackage',
//         method: 'POST',
//         data: parmars
//     })
// }
//条件查询车型包信息
export function pageCarTypePackage(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/pageCarTypePackage',
        method: 'POST',
        data: parmars
    })
}
//车型包排序值上移、下移
export function dataMove(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/dataMove',
        method: 'POST',
        data: parmars
    })
}
//修改材料组信息
export function updateCateGory(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/updateCateGory',
        method: 'POST',
        data: parmars
    })
}
//CommonSourcing预算管理数据
export function commonSourcingView(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/commonSourcingView',
        method: 'POST',
        data: parmars
    })
}
//下载
export function commonSourcingExport(parmars) {
    return MODELCARFile({
        url: '/export',
        method: 'POST',
        data: parmars
    })
}
//发送项目管理员
export function sendToAdmin(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/sendToAdmin',
        method: 'POST',
        data: parmars
    })
}
//修改定点分配详情信息
export function updatePackageShareAmount(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/updatePackageShareAmount',
        method: 'POST',
        data: parmars
    })
}
//车型包下拉信息
export function carTypePackageCombo(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/carTypePackageCombo',
        method: 'GET',
        params: parmars
    })
}
//根据车型包ID查询版本信息下拉
export function packageVersionCombo(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/packageVersionCombo',
        method: 'GET',
        params: parmars
    })
}
//获取科室下拉信息
export function getDepartmentsCombo(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/getDepartmentsCombo',
        method: 'GET',
        params: parmars
    })
}
//材料组数据字典
export function cateGoryCombo(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/cateGoryCombo',
        method: 'GET',
        params: parmars
    })
}
//车型包版本另存为
export function saveAsVersion(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/saveAsVersion',
        method: 'GET',
        params: parmars
    })
}
//查看目标预算详情
export function partsPackageBudgetDetail(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/partsPackageBudgetDetail/' + parmars ,
        method: 'GET',
    })
}
//查看定点分配预算详情
export function partsPackageShareDetail(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/partsPackageShareDetail/' + parmars ,
        method: 'GET',
    })
}