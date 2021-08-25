import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'
//--------------------采购订单----------------------------------//
const pushOrder = axios(process.env.VUE_APP_BASE_WS2_CHANGEPRICE_API);
const pushOrderRequestExcel = axiosFile(process.env.VUE_APP_BASE_WS2_CHANGEPRICE_API)

/**
 * 查询采购订单数据
 */
export function getPurchaseOrder(data) {
    return pushOrder({
        url: '/purchaseOrder/findByPage',
        method: 'POST',
        data: data
    })
}

/**
 * 查询当前用户所有采购组
 */
export function findCurrentUserAllGroup() {
    return pushOrder({
        url: 'common/getAllUserGroupBelongToCurrentUser',
        method: 'POST',
    })
}

/**
 * 删除采购订单
 */
export function delPurchaseOrder(orderIdList) {
    return pushOrder({
        url: '/purchaseOrder/delete',
        method: 'POST',
        data: orderIdList
    })
}

/**
 * 导出
 */
export function exportPurchaseOrderByPage(data) {
    return pushOrderRequestExcel({
        url: '/purchaseOrder/exportPageData',
        method: 'POST',
        data: data
    })
}
/**
 * 采购订单提交
 */
export function purchaseOrderSubmission(orderId) {
    let params = { orderId: orderId }
    return pushOrder({
        url: '/purchaseOrder/submit',
        method: 'POST',
        params: params
    })
}
/**
 * 转派
 */
export function purchaseOrderTransfer(params) {
    return pushOrder({
        url: '/purchaseOrder/switchBuyer',
        method: 'POST',
        params: params
    })
}
