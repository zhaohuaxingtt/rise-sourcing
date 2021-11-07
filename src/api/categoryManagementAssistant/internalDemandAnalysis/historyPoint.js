/*
 * @Author: 舒杰
 * @Date: 2021-08-12 10:33:56
 * @LastEditTime: 2021-08-13 10:25:07
 * @LastEditors: 舒杰
 * @Description: 历史定点记录
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\historyPoint.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon');

// 定点历史记录保存
export function nomiSave(params) {
   return request({
      url: '/nomiHistory/nomiSave',
      method: 'POST',
      data: params
   });
}

// 定点的供应商
export function nomiSupplier(params) {
   return request({
      url: '/nomiHistory/nomiSupplier?categoryCode='+params,
      method: 'GET'
   });
}

// 定点历史记录分页查询
export function page(params) {
   return request({
      url: '/nomiHistory/page',
      method: 'POST',
      data: params
   });
}

// 定点历史记录查询参数接口
export function nomiHistoryParamInit(params) {
   return request({
      url: '/nomiHistory/nomiHistoryParamInit',
      method: 'POST',
      data: params
   });
}

