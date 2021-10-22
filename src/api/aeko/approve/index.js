/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-27 11:38:20
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-14 15:35:36
 * @Description: aeko 审批
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'

const requst_sourcing = axios(process.env.VUE_APP_NEGO)
const requst = axios(process.env.VUE_APP_PARTS)
const fileRequst = download(process.env.VUE_APP_PARTS)

// 列表查询
export function getApproveDistributionPage(data) {
  return requst({
    url: '/aeko/approve/distribution/page',
    method: 'POST',
    data,
  })
}

// 分派
export function approveDistributionSave(data) {
  return requst({
    url: '/aeko/approve/distribution/save',
    method: 'POST',
    data,
  })
}

// 获取角色用户列表
export function getRoleUserList(params) {
  return requst({
    url: '/aeko/purchasing/search-chief',
    method: 'GET',
    params,
  })
}

// 获取对应AEKO 下的前期采购股长
export function getChiefUserList(params) {
  return requst({
    url: '/aeko/purchasing/search-chief-param',
    method: 'GET',
    params,
  })
}

//查询AKEO已审批列表
export function queryApproved(params) {
  return requst({
    url: '/aeko/approvedPage',
    method: 'POST',
    data: params
  })
}

//查询AKEO待审批列表
export function pendingApprovalList(params) {
  return requst({
    url: '/aeko/approve/distribution/approvalPendingPage',
    method: 'POST',
    data: params
  }
  )
}

//审批单
export  function queryAKEOApprovalForm(data){
  return requst({
        url: `/aeko/auditForm`,
        method: 'POST',
        data:data
      }
  )
}
//已审批审批单
export  function getAKEOApprovalForm (data){
  return requst({
        url: `/aeko/approved/auditForm`,
        method: 'POST',
        data:data
      }
  )
}

// 查询CBD汇总表
export function alterationCbdSummary({ workFlowId }) {
  return requst_sourcing({
    url: `/aeko/get/alterationCbdSummarySnapshot/${workFlowId}`,
    method: 'GET',
  })
}

// 切换零件下拉框接口
export function getSwitchParts({ workFlowId }) {
  return requst({
    url: `/aeko/purchasing/aekopart/getSwitchParts/${workFlowId}`,
    method: 'GET',
  })
}

// 查询CBD汇总表其余数据
export function cbdDataQuery({ workFlowId, quotationId }) {
  return requst_sourcing({
    url: `/aeko/get/cbdDataQuery/${workFlowId}/${quotationId}`,
    method: 'GET',
  })
}

//审批
export  function  aekoAudit(data){
  return requst({
    url:`/aeko/aekoAudit`,
    method:'POST',
    data:data
  })
}

//转派
export  function  transferAEKO(data){
  return requst({
    url:`/aeko/approve/distribution/reassignment`,
    method:'POST',
    data:data
  })
}

//CSF分派
export function queryApprovalStatus(id){
  return requst({
    url:`/aeko/approve/distribution/getApprovalStatus/${id}`,
    method:'GET',
  })
}
