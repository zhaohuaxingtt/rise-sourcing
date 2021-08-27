import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMCHANGE = axios(process.env.VUE_APP_BMCHANGE)
const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_BMAPPROVE)
const BMMOLDFile = axiosFile(process.env.VUE_APP_BMMOLD)
const common = axios(process.env.VUE_APP_BASE_UPLOAD_API);

//变更单详情-基础信息【供应商】
export function basicsInfoSupplier(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/basicsInfoSupplier',
        method: 'GET',
        params: parmars
    })
}

//工艺类型
export function craftTypes(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/craftTypes',
        method: 'GET',
        params: parmars
    })
}

//资产分类
export function assetTypes(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/assetTypes',
        method: 'GET',
        params: parmars
    })
}

//变更单详情-模具列表【专业采购员】
    export function mouldListSupplier(data) {
    return VUE_APP_BMCHANGE({
        url: '/mouldListSupplier',
        method: 'POST',
        data: data
    })
}

//供应商变更确认
    export function supplierToConfirm(bmChangeId, bmId) {
    return VUE_APP_BMCHANGE({
        url: `/supplierToConfirm/${bmChangeId}/${bmId}`,
        method: 'POST',
        data: ''
    })
}
