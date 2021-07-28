import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMMOLD = axios(process.env.VUE_APP_BMMOLD)
const BMMOLDFile = axiosFile(process.env.VUE_APP_BMMOLD)
//bm单流水号查看详情
export function moldHeaderByBmSerial(parmars) {
    return VUE_APP_BMMOLD({
        url: '/moldHeaderByBmSerial',
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
        url: '/export',
        method: 'POST',
        data: data
    })
}
