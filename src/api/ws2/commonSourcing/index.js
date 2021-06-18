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
