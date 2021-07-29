import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMSUPPLIER = axios(process.env.VUE_APP_BMSUPPLIER)
const INVESTMENTFile = axiosFile(process.env.VUE_APP_INVESTMENT)
// //获取科室下拉信息
// export function findBmViewPageList(parmars) {
//     return VUE_APP_BMSUPPLIER({
//         url: '/findBmViewPageList',
//         method: 'GET',
//         params: parmars
//     })
// }

//模具投资清单视图分页列表
export function findBmViewPageList(data) {
    return VUE_APP_BMSUPPLIER({
        url: '/findBmViewPageList',
        method: 'POST',
        data: data
    })
}

