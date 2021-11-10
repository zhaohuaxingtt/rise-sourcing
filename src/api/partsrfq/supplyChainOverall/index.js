/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 10:06:24
 * @LastEditors: zbin
 * @Descripttion: your project
 */
/**
 * @Author: shujie
 * @createTime: 2021-6-28 10:43:43 
 * @Description:报告清单
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
const requstDIC = axios(process.env.VUE_APP_DIC)

// 查询-供应链地图
export function supplierAddress(parmars) {
  return requst({
    url: '/nTier/supplierAddress',
    method: 'POST',
    data: parmars
  })
}

// 保存
export function nTierSave(parmars) {
  return requst({
    url: '/nTier/nTierSave',
    method: 'POST',
    data: parmars
  })
}

// 用户材料组
export function userCategory(parmars) {
  return requst({
    url: '/nTier/userCategory',
    method: 'POST',
    data: parmars
  })
}

// 供应链卡片
export function nTierCard(parmars) {
  return requst({
    url: '/nTier/nTierCard',
    method: 'POST',
    data: parmars
  })
}

//城市信息查询
export function getCityInfo(params) {
  return requstDIC({
    url: `/cityInfo`,
    method: 'GET',
    params
  })
}
// ntier--查询上一次筛选条件
export function nTierParamInit(params) {
  return requst({
    url: `/nTier/nTierParamInit`,
    method: 'POST',
    data: params
  })
}
