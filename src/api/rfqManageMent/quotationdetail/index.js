/*
 * @Author: ldh
 * @Date: 2021-04-26 17:27:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-12 16:55:29
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\api\rfqManageMent\quotationdetail\index.js
 */
import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_QUOTATION)
const requstxw = axios(process.env.VUE_APP_SUPPLIER_WDL)
const requstFile = axiosFile(process.env.VUE_APP_QUOTATION)
const requstPart = axios(process.env.VUE_APP_SUPPLIER_RFQLIST)
const requstdl = axios(process.env.VUE_APP_QUOTATION_DL)

// 获取零件基础信息
export function getPartsQuotations(params) {
  return requst({
    url: `/part/parts-quotations/${ params.rfqId }/${ params.round }`,
    method: 'GET'
  })
}

// 提交报价单
export function submitPartsQuotation(params) {
  return requst({
    url: '/part/submit-partsQuotation',
    method: 'POST',
    data: params
  })
}

// 获取RFQ、零件采购项目、报价单状态
export function getStates(params) {
  return requst({
    url: '/part/quotation/getStates',
    method: 'POST',
    data: params
  })
}

// 获取零件信息与要求数据
export function getInfoRequirement(params) {
  return requstPart({
    url: '/info-requirement',
    method: 'POST',
    data: params
  })
}

// 获取全量供应商场地
export function getSupplierInfo(params) {
  return requst({
    url: '/part/getSupplierInfo',
    method: 'POST',
    data: params
  })
}

// 获取供应商场地
export function getSupplierPartLocation(params) {
  return requst({
    url: '/supplier-part-location',
    method: 'POST',
    data: params
  })
}

// 保存供应商场地
export function saveSupplierPartAddLocation(params) {
  return requst({
    url: '/supplier-part-addLocation',
    method: 'POST',
    data: params
  })
}

// 获取生产能力
export function getSupplierPlantCaps(params) {
  return requst({
    url: '/supplier-plant-caps',
    method: 'POST',
    data: params
  })
}

// 保存生产能力
export function saveSupplierPlantCap(params) {
  return requst({
    url: '/supplier-plant-cap',
    method: 'POST',
    data: params
  })
}

// 下载cbd模板
export function cbdDownloadFile(params) {
  return requstFile({
    url: `/part/cbd/downLoadFile/${ params.rfqId }/${ params.round }?supplierId=${params.supplierId}`,
    method: 'GET',
    params: {
      partNum: params.partNum
    }
  })
}

// 上传报价
export function uploadModuleCbd(params) {
  return requst({
    url: '/part/cbd/uploadModuleCbd',
    method: 'POST',
    data: params
  })
}

// 获取模具费用
export function getMouldFee(params) {
  return requst({
    url: '/part/getMouldFee',
    method: 'POST',
    data: params
  })
}

// 获取开发费用
export function getDevFee(params) {
  return requst({
    url: '/part/getDevFee',
    method: 'POST',
    data: params
  })
}

// 保存模具费用和开发费用
export function saveModuleDevFee(params) {
  return requst({
    url: '/part/module-dev-fee',
    method: 'POST',
    data: params
  })
}

// 查询工装样件
export function getToolingSample(quotationId) {
  return requst({
    url: `/part/tooling-sample/${ quotationId }`,
    method: 'GET'
  })
}

// 保存工装样件
export function saveToolingSample(params) {
  return requst({
    url: '/part/tooling-sample',
    method: 'POST',
    data: params
  })
}

// 保存包装运输操作费
export function savePackageTransport(params) {
  return requst({
    url: '/part/quotation/package-transport',
    method: 'PUT',
    data: params
  })
}

// 获取包装运输操作费
export function getPackageTransport({quotationId}) {
  return requst({
    url: `/part/quotation/package-transport/${quotationId}`,
    method: 'GET'
  })
}
// 获取cbd
export function findFiles(parmars) {
  return requstxw({
    url: '/file/fileHistory',
    method: 'POST',
    data: parmars
  })
}

//下载成本汇总模板
export function downPartCbdLoadFile(parmars) {
  return requstFile({
    url: '/cbd-files/partCbdFile',
    method: 'POST',
    data: parmars
  })
}
//解析成本汇总模块
export function cbdfiles(parmars) {
  return requstxw({
    url: '/cbd-files/uploadPartCbd',
    method: 'POST',
    data: parmars
  })
}
export function partsQuotations(rfqId,lv) {
  return requstxw({
    url: `/part/parts-quotations/${rfqId}/${lv}`,
    method: 'GET'
  })
}

// 获取关联零件列表
export function getMouldPartList(params) {
  return requstdl({
    url: '/mould-parts-list',
    method: 'POST',
    data: params
  })
}

// 获取关联零件列表
export function copyPartsQuotation(params) {
  return requstxw({
    url: '/part/copy-partsQuotation',
    method: 'POST',
    data: params
  })
}

// 获取关联零件列表
export function postCostSummary(params) {
  return requstxw({
    url: '/part/cost-summary/postCostSummary',
    method: 'POST',
    data: params
  })
}
// 保存关联零件列表
export function saveMouldPartList(params) {
  return requstdl({
    url: '/mould-parts',
    method: 'POST',
    data: params
  })
}

// 获取rfq下所有模具
export function getAllMouldFee(params) {
  return requst({
    url: '/part/getAllMouldFee',
    method: 'POST',
    data: params
  })
}

// 获取rfq所有零件号和fs号
export function getAllPartForMould(params) {
  return requst({
    url: `/part/getAllPartForMould/${ params.rfqId }`,
    method: 'GET',
  })
}

// 保存rfq下报价
export function saveModuleFee(params) {
  return requst({
    url: '/part/module-fee',
    method: 'POST',
    data: params
  })
}
// 保存rfq下报价
export function deleteFile(params) {
  return requstxw({
    url: '/file/deleteFiles',
    method: 'POST',
    data: params
  })
}

// 获取降价信息
export function getLtcPlan(quotationId) {
  return requst({
    url: `/part/ltc-plan/${quotationId}`,
    method: 'GET',
  })
}

// 保存降价计划
export function saveLtcPlan(data) {
  return requst({
    url: '/part/ltc-plan/save',
    method: 'POST',
    data,
  })
}

// 获取报价单备注
export function getComments(params) {
  return requst({
    url: `/part/comments/${ params.quotationId }`,
    method: 'GET'
  })
}

// 保存报价单备注
export function saveComments(data) {
  return requst({
    url: '/part/comments',
    method: 'POST',
    data,
  })
}

// 获取附件列表
export function getFileHistory(data) {
  return requst({
    url: '/file/fileHistory',
    method: 'POST',
    data,
  })
}

// 关联附件
export function uploadFileList(data) {
  return requst({
    url: '/file/uploadFileList',
    method: 'POST',
    data,
  })
}

// 删除附件
export function deleteFiles(data) {
  return requst({
    url: '/file/deleteFiles',
    method: 'POST',
    data,
  })
}

// 获取送样进度
export function getSampleProgress(params) {
  return requst({
    url: `/part/sample-progress/${ params.quotationId }`,
    method: 'GET'
  })
}

// 保存送样进度
export function saveSampleProgress(data) {
  return requst({
    url: '/part/sample-progress',
    method: 'POST',
    data,
  })
}

// 引用批量价格
export function quoteBatchPrice(data) {
  return requst({
    url: '/part/quoteBatchPrice',
    method: 'POST',
    data,
  })
}

// 取消引用批量价格
export function cancelQuoteBatchPrice(params) {
  return requst({
    url: `/part/cancelQuoteBatchPrice/${ params.quotationId }`,
    method: 'PATCH',
  })
}