/*
 * @Author: ldh
 * @Date: 2021-04-26 17:27:20
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-16 10:54:14
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\rfqManageMent\quotationdetail\index.js
 */
import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'
import router from '../../../router/index'
const supplierId = ()=> router.currentRoute.query.supplierId?router.currentRoute.query.supplierId:''
const requst = axios(process.env.VUE_APP_QUOTATION)
const requstxw = axios(process.env.VUE_APP_SUPPLIER_WDL)
const requstFile = axiosFile(process.env.VUE_APP_QUOTATION)
const requstPart = axios(process.env.VUE_APP_SUPPLIER_RFQLIST)
const requstdl = axios(process.env.VUE_APP_QUOTATION_DL)
// eslint-disable-next-line no-undef
// 获取零件基础信息
export function getPartsQuotations(params) {
  return requst({
    url: `/part/parts-quotations/${ params.rfqId }/${ params.round }/${ params.supplierId }`,
    method: 'GET'
  })
}

// 提交报价单
export function submitPartsQuotation(params) {
  return requst({
    url: `/part/submit-partsQuotation?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取RFQ、零件采购项目、报价单状态
export function getStates(params) {
  return requst({
    url: `/part/quotation/getStates?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取零件信息与要求数据
export function getInfoRequirement(params) {
  return requstPart({
    url: `/info-requirement?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取全量供应商场地
export function getSupplierInfo(params) {
  return requst({
    url: `/part/getSupplierInfo?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取供应商场地
export function getSupplierPartLocation(params) {
  return requst({
    url: `/quotation/supplier-part-location?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 保存供应商场地
export function saveSupplierPartAddLocation(params) {
  return requst({
    url: `/quotation/supplier-part-addLocation?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取生产能力
export function getSupplierPlantCaps(params) {
  return requst({
    url: `/quotation/supplier-plant-caps?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 保存生产能力
export function saveSupplierPlantCap(params) {
  return requst({
    url: `/quotation/supplier-plant-cap?supplierId=${supplierId()}`,
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
    url: `/part/cbd/uploadModuleCbd?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取模具费用
export function getMouldFee(params) {
  return requst({
    url: `/part/getMouldFee?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取开发费用
export function getDevFee(params) {
  return requst({
    url: `/part/getDevFee?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 保存模具费用和开发费用
export function saveModuleDevFee(params) {
  return requst({
    url: `/part/module-dev-fee?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 查询工装样件
export function getToolingSample(quotationId) {
  return requst({
    url: `/part/tooling-sample/${ quotationId }?supplierId=${supplierId()}`,
    method: 'GET'
  })
}

// 保存工装样件
export function saveToolingSample(params) {
  return requst({
    url: `/part/tooling-sample?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 保存包装运输操作费
export function savePackageTransport(params) {
  return requst({
    url: `/part/quotation/package-transport?supplierId=${supplierId()}`,
    method: 'PUT',
    data: params
  })
}

// 获取包装运输操作费
export function getPackageTransport({quotationId}) {
  return requst({
    url: `/part/quotation/package-transport/${quotationId}?supplierId=${supplierId()}`,
    method: 'GET'
  })
}
// 获取cbd
export function findFiles(parmars) {
  return requstxw({
    url: `/file/fileHistory?supplierId=${supplierId()}`,
    method: 'POST',
    data: parmars
  })
}

//下载成本汇总模板
export function downPartCbdLoadFile(parmars) {
  return requstFile({
    url: `/cbd-files/partCbdFile?supplierId=${supplierId()}`,
    method: 'POST',
    data: parmars
  })
}
//解析成本汇总模块
export function cbdfiles(parmars) {
  return requstxw({
    url: `/cbd-files/uploadPartCbd?supplierId=${supplierId()}`,
    method: 'POST',
    data: parmars
  })
}
export function partsQuotations(rfqId,lv,supplierId) {
  return requstxw({
    url: `/part/parts-quotations/${rfqId}/${lv}/${supplierId}`,
    method: 'GET'
  })
}

// 获取关联零件列表
export function getMouldPartList(params) {
  return requstdl({
    url: `/quotation/mould-parts-list?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取关联零件列表
export function copyPartsQuotation(params) {
  return requstxw({
    url: `/part/copy-partsQuotation?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取关联零件列表
export function postCostSummary(params) {
  return requstxw({
    url: `/part/cost-summary/postCostSummary?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}
// 保存关联零件列表
export function saveMouldPartList(params) {
  return requstdl({
    url: `/quotation/mould-parts?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取rfq下所有模具
export function getAllMouldFee(params) {
  return requst({
    url: `/part/getAllMouldFee?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取rfq所有零件号和fs号
export function getAllPartForMould(params) {
  return requst({
    url: `/part/getAllPartForMould/${ params.rfqId }?supplierId=${supplierId()}`,
    method: 'GET',
  })
}

// 保存rfq下报价
export function saveModuleFee(params) {
  return requst({
    url: `/part/module-fee?supplierId=${params.supplierId}`,
    method: 'POST',
    data: params
  })
}
// 保存rfq下报价
export function deleteFile(params) {
  return requstxw({
    url: `/file/deleteFiles?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取降价信息
export function getLtcPlan(quotationId) {
  return requst({
    url: `/part/ltc-plan/${quotationId}?supplierId=${supplierId()}`,
    method: 'GET',
  })
}

// 保存降价计划
export function saveLtcPlan(data) {
  return requst({
    url: `/part/ltc-plan/save?supplierId=${supplierId()}`,
    method: 'POST',
    data,
  })
}

// 获取报价单备注
export function getComments(params) {
  return requst({
    url: `/part/comments/${ params.quotationId }?supplierId=${supplierId()}`,
    method: 'GET'
  })
}

// 保存报价单备注
export function saveComments(data) {
  return requst({
    url: `/part/comments?supplierId=${supplierId()}`,
    method: 'POST',
    data,
  })
}

// 获取附件列表
export function getFileHistory({quotationId,fileType,current,size,sortColumn=null,isAsc=false}) {
  return requst({
    url: `/file-histories/page/${quotationId}/${sortColumn}/${isAsc}/${fileType}/${current}/${size}?supplierId=${supplierId()}`,
    method: 'GET',
  })
}

// 关联附件
export function uploadFileList(data) {
  return requst({
    url: `/file/uploadFileList?supplierId=${supplierId()}`,
    method: 'POST',
    data,
  })
}

// 删除附件
export function deleteFiles(data) {
  return requst({
    url: `/file/deleteFiles?supplierId=${supplierId()}`,
    method: 'POST',
    data,
  })
}

// 获取送样进度
export function getSampleProgress(params) {
  return requst({
    url: `/part/sample-progress/${ params.quotationId }?supplierId=${supplierId()}`,
    method: 'GET'
  })
}

// 保存送样进度
export function saveSampleProgress(data) {
  return requst({
    url: `/part/sample-progress?supplierId=${supplierId()}`,
    method: 'POST',
    data,
  })
}

// 引用批量价格
export function quoteBatchPrice(data) {
  return requst({
    url: `/part/quoteBatchPrice?supplierId=${supplierId()}`,
    method: 'POST',
    data,
  })
}

// 取消引用批量价格
export function cancelQuoteBatchPrice(params) {
  return requst({
    url: `/part/cancelQuoteBatchPrice/${ params.quotationId }?supplierId=${supplierId()}`,
    method: 'PATCH',
  })
}

// DB零件-报价分析列表
export function getCostSummaryDB(params) {
  return requst({
    url: `/cost/getCostSummary?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// DB零件-报价分析列表修改
export function updateCostSummaryDB(params) {
  return requst({
    url: `/cost/updateCostSummary?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 获取供应商token
export function getSupplierToken(params) {
  return requst({
    url:`/supplier/${ params.supplierId }`,
    method: 'GET',
  })
}