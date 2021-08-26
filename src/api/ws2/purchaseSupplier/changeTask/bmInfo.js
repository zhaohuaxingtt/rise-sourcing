import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMCHANGE = axios(process.env.VUE_APP_BMCHANGE)
const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_BMAPPROVE)
const BMMOLDFile = axiosFile(process.env.VUE_APP_BMMOLD)
//变更单详情-基础信息【专业采购员】
export function basicsInfo(parmars) {
    return VUE_APP_BMCHANGE({
        url: '/basicsInfo',
        method: 'GET',
        params: parmars
    })
}

//变更单详情-基础信息【专业采购员】
export function mouldList(data) {
    return VUE_APP_BMCHANGE({
        url: '/mouldList',
        method: 'POST',
        data: data
    })
}
