/*
 * @Author: Luoshuang
 * @Date: 2021-06-04 14:41:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-06 12:18:22
 * @Description: rs单相关接口
 * @FilePath: \front-web\src\api\designate\decisiondata\rs.js
 */
import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SOURCING)
const requestDownload = axiosDownload(process.env.VUE_APP_SOURCING)
const requestMtz = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 读取报价单
export function readQuotation(params) {
  return requst({
    url: '/rs/syn-record-detail',
    method: "POST",
    data: params
  })
}

// rs单列表查询
export function getList(nominateAppId) {
  return requst({
    url: '/rs/listRs?nominateAppId='+nominateAppId,
    method: "GET"
  })
}

// 手工维护RS单列表查询
export function manualListRs(nominateAppId) {
  return requst({
    url: '/rs/manualListRs?nominateAppId='+nominateAppId,
    method: "GET"
  })
}   

// 获取备注信息
export function getRemark(nominateAppId) {
  return requst({
    url: '/rs/queryRsRemarkById?nominateAppId='+nominateAppId,
    method: 'GET'
  })
}

// 修改备注
export function updateRemark(params) {
  return requst({
    url: '/rs/updateRsRemark',
    method: 'POST',
    data: params
  })
}

// 修改RS单
export function updateRS(params) {
  return requst({
    url: '/rs/update',
    method: 'POST',
    data: params
  })
}

export function exportTransformSheet(nominateAppId) {
  return requestDownload({
    url: '/rs/exportTransformSheet?nominateAppId='+nominateAppId,
    method: 'GET'
  })
}

// RS维护列表-下载模板
export function downloadRSDoc(params) {
  return requestDownload({
    url: '/rs/downLoadNomiRsDoc',
    method: 'POST',
    data: params
  })
}
// 修改RS单
export function getPrototypeList(params) {
  return requst({
    url: `/rs/queryRsSampleById/${params}`,
    method: 'GET'
  })
}

// 获取部门审批列表
export function getDepartApproval(nominateAppId) {
  return requst({
    url: `/nominate/nomi-approval-process/depart-approval/${nominateAppId}`,
    method: 'GET'
  })
}

// 获取汇率
export function searchRsPageExchangeRate(nominateId) {
  return requst({
    url: `/nominate/search-rs-page-exchange-rate/${ nominateId }`,
    method: 'POST'
  })
}

// 权限获取RS数据
export function reviewListRs(nominateAppId) {
  return requst({
    url: `/rs/reviewListRs?nominateAppId=${ nominateAppId }`,
    method: 'GET'
  })
}

//mtz申请单信息
export function getAppFormInfo(parmars) {
  //mtz申请单信息
  return requestMtz({
    url: '/mtzAppNomi/getAppFormInfo',
    method: 'POST',
    data: parmars
  })
}

//维护MTZ原材料规则-分页查询
export function pageAppRule(parmars) {
  return requestMtz({
    url: '/mtzAppNomi/pageAppRule',
    method: 'POST',
    data: parmars
  })
}

//维护MTZ零件主数据-分页查询
export function pagePartMasterData(parmars) {
  return requestMtz({
    url: '/mtzAppNomi/pagePartMasterData',
    method: 'POST',
    data: parmars
  })
}

//用量单位下拉
export function approvalList(params) {
  return requestMtz({
    url: '/mtzAppNomiDecisionData/approvalList',
    method: 'POST',
    data: params
  })
}

// 决策资料-保存备注
export function fetchSaveCs1Remark(parmars) {
  return requestMtz({
    url: '/mtzAppNomi/saveCs1Remark',
    method: 'POST',
    data: parmars
  })
}

// 决策资料-会外流转单-查询部门
export function fetchSignPreviewDept(parmars) {
  return requestMtz({
    url: '/mtzAppNomiApprove/queryApprovalDepartment',
    method: 'POST',
    data: parmars
  })
}

// mtz单-审批详情(上会&流转)
export function getApproveRsMtzDetail(params) {
  return requst({
    url: `/mtz/approveRs/mtzDetail`,
    method: 'GET',
    params
  })
}

// mtz单-审批详情(上会&流转)
export function getApproveSignMtzDetail(params) {
  return requst({
    url: `/mtz/approveSign/mtzDetail`,
    method: 'GET',
    params
  })
}

// 更新流转RS单行备注
export function updateRsMemo(data) {
  return requst({
    url: `/rs/updateRsMemo`,
    method: 'POST',
    data
  })
}