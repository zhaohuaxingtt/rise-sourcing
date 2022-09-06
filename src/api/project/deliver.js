import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PROJECTMGT)
const requstToolingApi = axios(process.env.VUE_APP_TOOLING)

const downloadRequst = axiosDownload(process.env.VUE_APP_PROJECTMGT)

const requstDic = axios(process.env.VUE_APP_DIC)

// 查询材料组
export function getDictByCode(code) {
    return requstDic({
        url: `/dict?code=${code}`,
        method: 'GET'
    })
}

// 查询材料组
export function material_group_list(params) {
    return requst({
        url: '/sample_part_list/material_group_list',
        method: 'GET',
        params
    })
}

// 查询车型项目
export function cartype_pro_List(params) {
    return requst({
        url: '/sample_part_list/cartype_pro_List',
        method: 'GET',
        params
    })
}

// 查询采购员
export function buyer_list(params) {
    return requst({
        url: '/sample_part_list/buyer_list',
        method: 'GET',
        params
    })
}

// 查询总览页所有数据
export function sample_overviewPage(data) {
    return requst({
        url: '/sample_overview/page',
        method: 'POST',
        data
    })
}

// 查询总览-零件列表-所有数据
export function sample_part_listPage(data) {
    return requst({
        url: '/sample_part_list/page',
        method: 'POST',
        data
    })
}

