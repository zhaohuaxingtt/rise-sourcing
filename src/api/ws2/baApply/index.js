import axios from '@/utils/axios';

const VUE_APP_APPLY = axios(process.env.VUE_APP_APPLY);

//  ba申请-车型列表
export function findCarTypeList(parmars) {
  return VUE_APP_APPLY({
      url: '/findCarTypeList',
      method: 'POST',
      data: parmars
  })
}

//  采购工厂列表
export function getPurchaseFactoryPullDown(parmars) {
  return VUE_APP_APPLY({
      url: '/getPurchaseFactoryPullDown',
      method: 'GET',
      data: parmars
  })
}

//  模具预算状态下拉
export function getBudgetStatusPullDown(parmars) {
  return VUE_APP_APPLY({
      url: '/getBudgetStatusPullDown',
      method: 'GET',
      data: parmars
  })
}

//  ba申请-车型列表
export function findBaPartsList(parmars) {
  return VUE_APP_APPLY({
      url: '/findBaPartsList',
      method: 'POST',
      data: parmars
  })
}

//  模具预算状态下拉
export function getBaAccountType(parmars) {
  return VUE_APP_APPLY({
      url: '/getBaAccountType',
      method: 'GET',
      data: parmars
  })
}

//  BA账户类型
export function getBaAccountTypePullDown(parmars) {
  return VUE_APP_APPLY({
      url: '/getBaAccountTypePullDown',
      method: 'GET',
      data: parmars
  })
}

//  获取车型列表下拉
export function getBaCarPullDown(parmars) {
  return VUE_APP_APPLY({
      url: '/getBaCarPullDown',
      method: 'GET',
      data: parmars
  })
}