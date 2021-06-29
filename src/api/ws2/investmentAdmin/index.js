import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download';

const requestFile = axiosFile(process.env.VUE_APP_TOOLING);
const VUE_APP_TOOLING = axios(process.env.VUE_APP_TOOLING)

//查询版本列表（用于下拉框）
export function queryPlanVersionList() {
    return VUE_APP_TOOLING({
        url: '/planYear/queryPlanVersionList',
        method: 'GET',
    })
}

//刷新
export function refreshVersion(versionId) {
    return VUE_APP_TOOLING({
        url: `/planYear/refreshVersion/${versionId}`,
        method: 'GET',
    })
}

//保存为新版本
export function saveNewVersion(params) {
    return VUE_APP_TOOLING({
        url: `/planMonth/saveNewVersion/${params.versionId}`,
        method: 'POST',
        data: params
    })
}
  
//下载月度计划
export function exportPlanCommutityList(params) {
    return requestFile({  
        url: `/planMonth/exportPlanCommutityList/${params.versionId}?planType=${params.planType}`,
        method: 'POST',
    })
}

//查询月度计划列表数据
export function queryPlanMonthList(params) {
    return VUE_APP_TOOLING({
        url: `/planMonth/queryPlanMonthList/${params.versionId}?planType=${params.planType}`,
        method: 'GET',
    })
}

//保存月度计划数据
export function saveMonthData(params) {
    return VUE_APP_TOOLING({
        url: `/planMonth/saveMonthData/${params.versionId}?planType=${params.planType}`,
        method: 'POST',
        data: params.dataList
    })
}

//月度数据导入
export function importMonthData(params) {
    return VUE_APP_TOOLING({
        url: `/planMonth/importMonthData/${params.versionId}`,
        method: 'POST',
        data: params.data
    })
}