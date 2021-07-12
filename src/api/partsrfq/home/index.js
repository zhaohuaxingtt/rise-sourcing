/*
 * @Author: moxuan
 * @Date: 2021-03-15 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: rfq列表
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_RFQ)
const partsRequst = axios(process.env.VUE_APP_PARTSPROCURE)

export function getRfqDataList(parmars) {
    return requst({
        url: '/rfqs/findByRfqs',
        method: 'POST',
        data: parmars
    })
}

export function getRfqList(params) {
    return requst({
        url: '/getRfq/getRfqBaseInfoScenes',
        method: 'POST',
        data: params
    })
}

export function editRfqData(parmars) {
    return requst({
        url: '/rfqs/updateRfq',
        method: 'PATCH',
        data: parmars
    })
}

export function addRfq(parmars) {
    return requst({
        url: '/rfqs/insertRfq',
        method: 'PATCH',
        data: parmars
    })
}

export function findBySearches(type) {
    return requst({
        url: `/rfqs/findBySearches/${type}`,
        method: 'GET'
    })
}

//启动询价
export function insertRfq(parmars) {
    return requst({
        url: '/rfqs/insertRfq',
        method: 'PATCH',
        data: {
            insertRfqPackage: {
                ...parmars,
                ...{
                    operationType: '3',
                    userId: store.state.permission.userInfo.id || '',
                    userName: store.state.permission.userInfo.userName
                }
            }
        }
    })
}

export function getAllScoringDepartmentInfo(parmars) {
    return requst({
        url: '/supplier/getAllScoringDepartmentInfo',
        method: 'POST',
        data: parmars
    })
}

// 获取寻源执行子菜单待办数
export function getAgentTasksNum(options) {
    return requst({
        url: '/getAgentTasksNum',
        method: 'GET',
        ...options
    })
}

// 获取车型字典
export function getCartypeDict() {
    return partsRequst({
        url: '/cartypeDict',
        method: 'GET',
    })
}

// 批量更新供应商生产地
export function updateBatchSupplierProducePlace(params) {
    return requst({
        url: '/supplier/updateBatchSupplierProducePlace',
        method: 'PUT',
        data: params
    })
}
