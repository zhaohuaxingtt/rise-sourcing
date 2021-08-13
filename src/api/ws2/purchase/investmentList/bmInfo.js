import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMMOLD = axios(process.env.VUE_APP_BMMOLD)
const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_BMAPPROVE)
const BMMOLDFile = axiosFile(process.env.VUE_APP_BMMOLD)
//bm单流水号查看详情
export function moldHeaderByBmSerial(parmars) {
    return VUE_APP_BMMOLD({
        url: '/moldHeaderByBmSerial',
        method: 'GET',
        params: parmars
    })
}

//资产分类编号集合
export function assetTypes(parmars) {
    return VUE_APP_BMMOLD({
        url: '/assetTypes',
        method: 'GET',
        params: parmars
    })
}

//工艺类型集合
export function craftTypes(parmars) {
    return VUE_APP_BMMOLD({
        url: '/craftTypes',
        method: 'GET',
        params: parmars
    })
}

//模具投资清单视图列表
export function findMoldViewList(data) {
    return VUE_APP_BMMOLD({
        url: '/findMoldViewList',
        method: 'POST',
        data: data
    })
}

//导出模具投资清单视图列表
export function bmMoldExport(data) {
    return BMMOLDFile({
        url: '/export4buyer',
        method: 'POST',
        data: data
    })
}
//模具投资清单采购员确认
export function bmBuberConfirm(data) {
    return VUE_APP_BMAPPROVE({
        url: '/bmBuberConfirm',
        method: 'POST',
        data: data
    })
}

