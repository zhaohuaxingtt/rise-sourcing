import axios from '@/utils/axios'
import download from '@/utils/axios.download'
const requestStockSheet = axios(process.env.VUE_APP_PURCHASE)
const requstDic = axios(process.env.VUE_APP_DIC)
const downLoad = download(process.env.VUE_APP_SOURCING)
// 采购申请列表分页查询接口
export function findNormalPrByPage(data) {
    return requestStockSheet({
        url: '/pr/normalPr/findByPage',
        method: 'POST',
        data: data
    })
}

// 根据id删除零件信息接口
export function deleteNormalPr(data) {
    return requestStockSheet({
        url: '/pr/normalPr/delete',
        method: 'POST',
        data: data
    })
}

// 采购申请详情查询接口
export function findNormalPrById(data) {
    return requestStockSheet({
        url: '/pr/normalPr/findById',
        method: 'GET',
        params: data
    })
}

// 保存或者更新零件信息接口
export function saveOrUpdate(data) {
    return requestStockSheet({
        url: '/pr/normalPr/saveOrUpdate',
        method: 'POST',
        data: data
    })
}

// 采购申请转派操作
export function toOwner(data) {
    return requestStockSheet({
        url: '/pr/normalPr/toOwner',
        method: 'POST',
        data: data
    })
}

//从SAP手动导入采购申请数据接口
export function sapRefresh(data) {
    return requestStockSheet({
        url: '/pr/normalPr/sapRefresh',
        method: 'POST',
        data: data
    })
}


//采购工厂仓库WEB接口信息
export function inventoryLocation(data) {
    return requstDic({
        url: '/inventoryLocation',
        method: 'POST',
        data: data
    })
}

//导出
export function applyExport(data) {
    return requestStockSheet({
        url: `/pr/normalPr/applyExport?riseCode=${data}`,
        method: 'POST',
        responseType: 'blob'
    })
}

//导入
export function applyImport(data) {
    return requestStockSheet({
        url: `/pr/normalPr/applyImport`,
        method: 'POST',
        data: data
    })
}

//导入
export function validationPart(data) {
    return requestStockSheet({
        url: `pr/normalPr/part/validation?partNum=${data}`,
        method: 'GET',
    })
}

//采购组配置信息查询
export function purchaseGroup(data) {
    return requstDic({
        url: '/purchaseGroup',
        method: 'GET',
        params: data
    })
}

//采购申请关闭操作
export function applyClose(data) {
    return requestStockSheet({
        url: '/pr/normalPr/applyClose',
        method: 'POST',
        data: data
    })
}

//采购申请转定点接口
export function toNomination(data) {
    return requestStockSheet({
        url: '/pr/normalPr/toNomination',
        method: 'POST',
        data: data
    })
}
export function exportExcelOneSteel(data) {
    return downLoad({
        url: `/steelDemand/exportExcelOneSteel`,
        method: 'post',
        data:data
    })
}