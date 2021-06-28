import axios from '@/utils/axios'

const VUE_APP_BMAPPROVE = axios(process.env.VUE_APP_BMAPPROVE);

// 确认申请
export function bmConfirm(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmConfirm',
      method: 'POST',
      data: parmars
  })
}

// 作废
export function bmCancel(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmCancel',
      method: 'POST',
      data: parmars
  })
}

//  详情保存
export function bmDetailUpdate(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmDetailUpdate',
      method: 'POST',
      data: parmars
  })
}

// 零件号列表
export function getBmPartsList(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/getBmPartsList',
      method: 'GET',
      params: parmars
  })
}

// BM详情
export function getBmDetailById(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/getBmDetailById',
      method: 'GET',
      params: parmars
  })
}

//  Aeko减值BM单
export function findBmAekoMinusList(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/findBmAekoMinusList',
      method: 'POST',
      data: parmars
  })
}

//  Aeko增值BM单
export function findBmAekoAddList(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/findBmAekoAddList',
      method: 'POST',
      data: parmars
  })
}

//  待确认BM单列表
export function findBmWaitConfirmList(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/findBmWaitConfirmList',
      method: 'POST',
      data: parmars
  })
}

// table数量
export function bmTableCount(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmTableCount',
      method: 'GET',
      params: parmars
  })
}

// 采购工厂列表
export function getProductionFactoryPullDown(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/getProductionFactoryPullDown',
      method: 'GET',
      params: parmars
  })
}

// 专业科室列表
export function deptPullDown(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/deptPullDown',
      method: 'GET',
      params: parmars
  })
}

//  所有BM申请
export function findAllBmList(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/findAllBmList',
      method: 'POST',
      data: parmars
  })
}

// linle下拉列表
export function liniePullDown(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/liniePullDown',
      method: 'GET',
      params: parmars
  })
}

// 车型项目下拉列表
export function bmCarTypePullDown(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmCarTypePullDown',
      method: 'GET',
      params: parmars
  })
}

// Aeko类型下拉
export function bmAekoTypePullDown(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmAekoTypePullDown',
      method: 'GET',
      params: parmars
  })
}

// BM单状态
export function bmStatusPullDown(parmars) {
  return VUE_APP_BMAPPROVE({
      url: '/bmStatusPullDown',
      method: 'GET',
      params: parmars
  })
}