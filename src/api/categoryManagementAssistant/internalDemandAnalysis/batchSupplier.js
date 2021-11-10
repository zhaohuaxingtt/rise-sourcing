/*
 * @Author: 舒杰
 * @Date: 2021-08-05 19:04:35
 * @LastEditTime: 2021-08-05 19:37:36
 * @LastEditors: 舒杰
 * @Description: 批量供应商概览
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\batchSupplier.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon');

//获取品类管理-产量总览pbi的信息
export function getCmSupplierPbi() {
  return request({
      url: '/batchOverview/getCmSupplierPbi',
      method: 'GET'
    });
}