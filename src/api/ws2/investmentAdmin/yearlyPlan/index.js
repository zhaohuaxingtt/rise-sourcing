import axios from '@/utils/axios';
import axiosFile from '@/utils/axios.download';

const requestFile = axiosFile(process.env.VUE_APP_PLANYEAR);

const VUE_APP_PLANYEAR = axios(process.env.VUE_APP_PLANYEAR);

//  手工调整清单下载
export function exportPlanCommutityList(params) {
    return requestFile({
      url: `/exportPlanCommutityList/${params.versionId}`,
      method: 'GET',
      params: params,
    })
}

//  保存手工调整数据
export function saveCommutityAmualData(params) {
    return VUE_APP_PLANYEAR({
        url: `/saveCommutityAmualData`,
        method: 'POST',
        data: params
    })
}

//  手工调整数据列表
export function queryPlanYearCommutity(params) {
    return VUE_APP_PLANYEAR({
        url: `/queryPlanYearCommutity/${params.versionId || 0}`,
        method: 'GET',
        // params: params
    })
}

//  付款比柱状图
export function queryPlanPercentage(params) {
    return VUE_APP_PLANYEAR({
        url: `/queryPlanPercentage/${params.versionId || 0}`,
        method: 'GET',
        // params: params
    })
}

//  系统计算清单下载
export function downloadExport(params) {
    return requestFile({
      url: `/exportPlanSystemList/${params.versionId}`,
      method: 'GET',
      data: params,
    })
}

//  查询系统计算列表
export function queryPlanYearSystem(params) {
    return VUE_APP_PLANYEAR({
        url: `/queryPlanYearSystem/${params.versionId || 0}`,
        method: 'GET',
        // params: params
    })
}

//  保存为新版本
export function saveNewVersion(params) {
    return VUE_APP_PLANYEAR({
        url: `/saveNewVersion/${params.versionId || 0}`,
        method: 'POST',
        data: params
    })
}

//  刷新
export function refreshVersion(params) {
    return VUE_APP_PLANYEAR({
        url: `/refreshVersion/${params.versionId || 0}`,
        method: 'GET',
        // params: params
    })
}

//  获取版本号
export function queryPlanVersionList(params) {
    return VUE_APP_PLANYEAR({
        url: '/queryPlanVersionList',
        method: 'GET',
        params: params
    })
}

//  保存
export function saveVersion(params) {
    return VUE_APP_PLANYEAR({
        url: `/saveVersion/${params.versionId || 0}`,
        method: 'POST',
        data: params
    })
}