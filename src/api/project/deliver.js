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

// 延迟页-零件列表
export function delayList(data) {
    return requst({
        url: '/sample_part_list/delay/list',
        method: 'POST',
        data
    })
}

// 延迟页-级别汇总
export function level_summary(data) {
    return requst({
        url: '/sample_part_list/delay/level_summary',
        method: 'POST',
        data
    })
}

// 延迟页-原因汇总（小类）
export function reason_summary(data) {
    return requst({
        url: '/sample_part_list/delay/reason_summary',
        method: 'POST',
        data
    })
}

// 延迟页-offen图
export function delayOffen(data) {
    return requst({
        url: '/sample_part_list/delay/offen',
        method: 'POST',
        data
    })
}

// 查询车型项目材料组信息
export function getCartypeProMaterialGroup(data) {
    return requst({
        url: `/sample_part_list/web/getCartypeProMaterialGroup/${data}`,
        method: 'GET',
    })
}

// 查询车型项目零件信息
export function getCartypeProPart(data) {
    return requst({
        url: `/sample_part_list/web/getCartypeProPart/${data}`,
        method: 'GET',
    })
}

// 查询车型项目供应商信息
export function getCartypeProSupplier(data) {
    return requst({
        url: `/sample_part_list/web/getCartypeProSupplier/${data}`,
        method: 'GET',
    })
}

// 车型项目零件甘特图
export function getGanttChart(data) {
    return requst({
        url: `/sample_part_actityty/web/getGanttChart`,
        method: 'POST',
        data
    })
}

// 查询材料组及其关联的零件
export function getMaterialGroupPart(data) {
    return requst({
        url: `/sample_part_list/web/getMaterialGroupPart`,
        method: 'POST',
        data
    })
}

// 查询车型项目关联设置的heavyitem
export function getHeavyitem(params) {
    return requst({
        url: `/sample_heavyitem/web/getHeavyitem/${params}`,
        method: 'GET',
    })
}

// 设置heavyitem
export function setHeavyitem(data) {
    return requst({
        url: `/sample_heavyitem/web/setHeavyitem`,
        method: 'POST',
        data
    })
}

// 查询车型项目零件关联的节点信息
export function getPartActityty(params) {
    return requst({
        url: `/sample_part_actityty/web/getPartActityty`,
        method: 'GET',
        params
    })
}

// 根据车型项目和零件筛选条件查询零件分页
export function partsPage(data) {
    return requst({
        url: `/sample_part_actityty/web/partsPage`,
        method: 'POST',
        data
    })
}

// 根据零件编号获取节点信息
export function getPartNode(data) {
    return requst({
        url: `/sample_part_actityty/web/getPartNode`,
        method: 'POST',
        data
    })
}
