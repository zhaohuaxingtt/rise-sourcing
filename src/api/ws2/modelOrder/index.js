import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'
//--------------------采购订单----------------------------------//
const pushOrder = axios(process.env.VUE_APP_PURCHASE);
const pushOrderRequestExcel = axiosFile(process.env.VUE_APP_PURCHASE)
const requestSupplierService = axios(process.env.VUE_APP_SUPPLIER)
const requstPartResource = axios(process.env.VUE_APP_DIC)

const bmReq = axios(process.env.VUE_APP_TOOLING + '/bm')

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

// 通过供应商SAPCode,查询供应商信息
export function getSupplierInfoQuery(data) {
    return requestSupplierService({
        url: "/register/basic/supplierInfoQuery",
        method: "POST",
        data: data
    })
}
/**
 * 查询采购组列表 通过部门code
 * @param data
 * @returns {*}
 */
export function queryPurchaseGroup(data) {
    return requstPartResource({
        url: '/purchaseGroup',
        method: 'GET',
        params: data
    })
}

/**
 * 创建采购订单
 */
export function createPurchaseOrder(data) {
    return pushOrder({
        url: '/purchaseOrder/save',
        method: 'POST',
        data: data
    })
}
/**
 * 获取采购订单详情
 * parmars data :{orderId : 1}
 */
export function getPurchaseOrderDetails(data) {
    return pushOrder({
        url: '/purchaseOrder/findById',
        method: 'POST',
        params: data
    })
}
/**
 * 检查当前用户是否包含当前框架的采购组
 */
export function queryPurchasingGroup(selfPurchasingGroup) {
    return pushOrder({
        url: '/common/checkUserGroupBelongToCurrentUser',
        method: 'POST',
        params: { purchaseGroup: selfPurchasingGroup }
    })

}

/**
 * 采购订单主数据更新
 */
export function updatePurchaseOrderById(params) {
    return pushOrder({
        url: '/purchaseOrder/update',
        method: 'POST',
        params: params
    })
}

/***
 * 保存采购订单项次
 */
export function savaPurchaseOrderItem(data) {
    return pushOrder({
        url: '/purchaseOrder/saveForItem',
        method: 'POST',
        params: { orderId: data.orderId },
        data: data.purchaseOrderEntityItemDtos
    })
}

/**
 * 查询采购订单项次列表
 */
export function getPurchaseOrderLineList(data) {
    return pushOrder({
        url: '/purchaseOrder/findItemByParams',
        method: 'POST',
        params: data
    })
}
/**
 * 版本升级
 */
export function versionUpgradeByOrder(orderId) {
    let params = { orderId: orderId }
    return pushOrder({
        url: '/purchaseOrder/upgradeVersion',
        method: 'POST',
        params: params
    })
}

//采购工厂仓库WEB接口信息
export function inventoryLocation(data) {
    return requstPartResource({
        url: '/inventoryLocation',
        method: 'POST',
        data: data
    })
}


/**
 * 读取价格---采购订单
 */
export function readByPurchaseOrderPrice(params) {
    return pushOrder({
        url: '/purchaseOrder/getPriceFromPriceLedger',
        method: 'POST',
        params: params
    })
}

/**
 * 采购订单恢复项次
 */
export function recoveryItemByPurchaseOrder(itemIdList) {
    return pushOrder({
        url: '/purchaseOrder/cancelDeleteItem',
        method: 'POST',
        data: itemIdList
    })
}
/**
 * 删除订单项次
 */
export function deleteItemByPurchaseOrder(itemIdList) {
    return pushOrder({
        url: '/purchaseOrder/deleteItem',
        method: 'POST',
        data: itemIdList
    })
}
/**
 * 单项次保存
 */
export function updatepurchaseOrderByOneItem(data) {
    return pushOrder({
        url: '/purchaseOrder/saveItem',
        method: 'POST',
        data: data
    })
}

/**
 * 采购订单GRIr明细
 */
export function queryGRIRPurchaseOrder(params) {
    return pushOrder({
        url: '/purchaseOrder/getDetailData',
        method: 'POST',
        params: params
    })
}
/**
 * 导出GR/IR
 */
export function exportGrIrDetailData(params) {
    return pushOrderRequestExcel({
        url: '/purchaseOrder/exportGrIrDetailData',
        method: 'POST',
        params: params
    })
}

// 采购申请列表分页查询接口
export function findNormalPrByPage(data) {
    return pushOrder({
        url: '/pr/normalPr/findByPage',
        method: 'POST',
        data: data
    })
}

//获取模具BM号
// 采购申请列表分页查询接口
export function queryModelBmInfo( bmNum ) {
    let params={"bmNum":bmNum}
    return bmReq({
        url: '/getBmByBmNum',
        method: 'GET',
        params: params
    })
}

