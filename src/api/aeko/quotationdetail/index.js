/*
 * @Author: wentliao
 * @Date: 2021-09-01 11:04:35
 * @Description: 报价单相关接口
 */


import router from '../../../router/index'

const supplierId = () => router.currentRoute.query.supplierId ? router.currentRoute.query.supplierId : ''

import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_RFQ)
const requstFile = axiosFile(process.env.VUE_APP_RFQ)
const requstTooling = axios(process.env.VUE_APP_BMMOLD)

export function bnkSupplierToken(params) {
    return requst({
        url: '/part/bnkSupplierToken',
        method: 'GET',
        params,
    })
}

// 获取CBD调整部分下拉列表
export function getAekoCarDosage() {
    return requst({
        url: `/aeko/cbd-select`,
        method: 'GET',
    })
}

// 获取报价单详情 
export function getQuotationInfo(quotationId) {
    return requst({
        url: `/aeko/get/part-info/${quotationId}`,
        method: 'GET',
    })
}

// 获取AEKO报价单汇总数据
export function getAekoQuotationSummary(params) {
    return requst({
        url: `/aeko/get/quotation-summary/${params.quotationId}`,
        method: 'GET',
    })
}

// 终止费-保存
export function saveTerminationPrice(data) {
    return requst({
        url: `/part/terminationPrice?supplierId=${supplierId()}&quotationId=${data.quotationId}`,
        method: 'POST',
        data,
    })
}

// 保存AEKO 报价单数据
export function saveAekoQuotationSummary(data) {
    return requst({
        //url: `/aeko/save/quotation-summary`,
        url: '/aeko/save/aPirce',
        method: 'POST',
        data,
    })
}

// 导出AEKO报价
export function exportQuotation(params) {
    return requstFile({
        url: `/aeko/get/exportQuotation/${params.quotationId}`,
        method: 'GET'
    })
}

// 提交AEKO报价
export function submitAekoQuotation(params) {
    return requst({
        url: `/aeko/submit/quotation/${params.quotationId}/${params.objectAekoId}`,
        method: 'GET'
    })
}

// 获取AEKO变动值汇总表
export function getAekoCbdPriceSum(params) {
    return requst({
        url: `/aeko/get/aekoCbdPriceSum/${params.quotationId}`,
        method: 'GET'
    })
}

// 保存AEKO变动值汇总表
export function saveAekoCbdPriceSum(data) {
    return requst({
        url: `/aeko/save/aekoCbdPriceSum`,
        method: 'POST',
        data,
    })
}

// 获取原零件CBD
export function getMoldCbd(data) {
    return requstTooling({
        url: `/getMoldCbd`,
        method: 'POST',
        data,
    })
}

// 获取模具费
export function getMoulds(params) {
    return requst({
        url: `/aeko/mould/get/mould/${params.quotationId}`,
        method: 'GET'
    })
}

// 保存模具费
export function saveMoulds(data) {
    return requst({
        url: `/aeko/mould/save/moulds`,
        method: 'POST',
        data,
    })
}

// 查询关联零件
export function getMouldParts(params) {
    return requst({
        url: `/aeko/mould/get/mould/getMouldParts/${params.quotationId}`,
        method: 'GET'
    })
}

// 保存关联零件
export function saveMouldParts(data) {
    return requst({
        url: `/aeko/mould/save/mould/mouldParts/${data.quotationId}`,
        method: 'POST',
        data: data.list,
    })
}

//  A价变动CBD有效无效更新
export function updateCbdCanEdit(data) {
    return requst({
        url: '/aeko/update/cbd_can_edit',
        method: 'POST',
        data,
    })
}