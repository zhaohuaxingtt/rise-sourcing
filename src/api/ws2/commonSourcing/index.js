import axios from '@/utils/axios'

const VUE_APP_CSBUDGET = axios(process.env.VUE_APP_CSBUDGET)
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
//CommonSourcing预算管理数据
export function commonSourcingView(parmars) {
    return VUE_APP_CSBUDGET({
        url: '/commonSourcingView',
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
