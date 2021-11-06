/*
 * @Author: moxuan
 * @Date: 2021-03-15 17:07:22
 * @LastEditors: Please set LastEditors
 * @Description: rfq列表
 */

import axios from '@/utils/axios'
import store from "@/store";

const requst = axios(process.env.VUE_APP_SOURCING)
const partsRequst = axios(process.env.VUE_APP_PARTSPROCURE)

//物流要求，分页查询
export function pageByRfqId(parmars) {
    return requst({
        url: '/logistic/pageByRfqId',
        method: 'POST',
        data: parmars
    })
}

//参考产量
export function outputpPageByRfqId(parmars) {
    return requst({
        url: '/part-output/pageByRfqId',
        method: 'POST',
        data: parmars
    })
}
// 获取rfq轮次
export function pageRfqRound(parmars) {
    return requst({
        url: '/bdl/pageRfqRound',
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
//询价图纸 type 12
export function pageInquiryDrawingsByRfqId(params) {
    return requst({
        url: '/getRfq/pageInquiryDrawingsByRfqId',
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
//置顶rfq
export function setRfqTop(parmars) {
    return requst({
        url: '/rfq-top/setRfqTop',
        method: 'PATCH',
        data: parmars
    })
}
export function ratingTranslate(parmars) {
    return requst({
        url: '/rfq-part-ratings/update',
        method: 'PATCH',
        data: parmars
    })
}
//修改rfq信息
export function updateRfqInfo(parmars) {
    return requst({
        url: '/rfq/updateRfqInfo',
        method: 'PATCH',
        data: parmars
    })
}
// 保存rfq信息
export function updateRfqBdl(parmars) {
    return requst({
        url: '/bdl/updateRfqBdl',
        method: 'PATCH',
        data: parmars
    })
}
//修改rfq状态
export function modification(parmars) {
    return requst({
        url: '/rfq/modification',
        method: 'PATCH',
        data: parmars
    })
}
export function rfqRoundCreated(parmars) {
    return requst({
        url: '/rfqRound/create',
        method: 'PATCH',
        data: parmars
    })
}
//为type2
export function addRfq(parmars) {
    return requst({
        url: '/rfq/insertRfq',
        method: 'PATCH',
        data: parmars
    })
}
//拆分insterRfq接口 对应原来 type1
export function insertRfqPart(parmars){
    return requst({
        url: '/rfq/insertRfqPart',
        method: 'PATCH',
        data: parmars
    })
}
//拆分insterRfq接口 对应原来 type3
export function insertRfqAndPartInfo(parmars){
    return requst({
        url: '/rfq/insertRfqAndPartInfo',
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
        url: '/rfq/insertRfqAndPartInfo',
        method: 'PATCH',
        data:parmars.rfqPartDTOList.map(r=>{return {...r,...{userId:store.state.permission.userInfo.id || '',userName: store.state.permission.userInfo.userName}}})
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

// 查询时间计划列表
export function getTimePlanList({rfqId, pageSize, pageNo}) {
    return requst({
        url: `/time-plan/list/${rfqId}/${pageSize}/${pageNo}`,
        method: 'GET'
    })
}

// 保存时间计划列表
export function saveTimePlanList(params) {
    return requst({
        url: '/time-plan/save',
        method: 'POST',
        data: params
    })
}

// 获取物流要求详情
export function partLogisticByFs(params){
    return requst({
        url: '/logistic/partLogisticByFs',
        method: 'POST',
        data: params
    })
}