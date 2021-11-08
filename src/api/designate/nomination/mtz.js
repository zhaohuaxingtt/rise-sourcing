import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_MTZ)

export function getFlowTypeList(parmars) {//mtz定点流程类型下拉
    return requst({
        url: '/mtzNomiList/getFlowTypeList',
        method: 'POST',
        data: parmars,
    })
}

export function getLocationApplyStatus(parmars) {//mtz定点申请状态下拉
    return requst({
        url: '/mtzNomiList/getLocationApplyStatus',
        method: 'POST',
        data: parmars,
    })
}