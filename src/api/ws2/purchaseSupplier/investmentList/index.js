import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMSUPPLIER = axios(process.env.VUE_APP_TOOLING + '/bmSupplier')
const INVESTMENTFile = axiosFile(process.env.VUE_APP_TOOLING  + '/investment')
//bm单流水号查看详情
export function moldHeaderByBmSerial(parmars) {
    return VUE_APP_BMSUPPLIER({
        url: '/moldHeaderByBmSerial',
        method: 'GET',
        params: parmars
    })
}

//模具投资清单视图列表
export function findModelViewList(data) {
    return VUE_APP_BMSUPPLIER({
        url: '/findModelViewList',
        method: 'POST',
        data: data
    })
}

//模具投资清单视图分页列表
export function findBmViewPageList(data) {
    return VUE_APP_BMSUPPLIER({
        url: '/findBmViewPageList',
        method: 'POST',
        data: data
    })
}

//模具投资清单供应商退回
export function bmSupplierBack(data) {
    return VUE_APP_BMSUPPLIER({
        url: '/bmSupplierBack',
        method: 'POST',
        data: data
    })
}

//模具投资清单供应商退回
export function bmSupplierConfirm(data) {
    return VUE_APP_BMSUPPLIER({
        url: '/bmSupplierConfirm',
        method: 'POST',
        params: data
    })
}

