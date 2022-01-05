/*
 * @Author: 舒杰
 * @Date: 2021-08-05 19:04:35
 * @LastEditTime: 2022-01-05 10:08:11
 * @LastEditors: caopeng
 * @Description: 产量总览
 * @FilePath: \front-sourcing-new\src\api\categoryManagementAssistant\internalDemandAnalysis\output.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon');
const requstApi = axios(process.env.VUE_APP_POWEBI_KPI + '/api/aon')
//获取品类管理-产量总览pbi的信息

export function getCmOutputPbi() {
  return request({
      url: '/batchOverview/getCmOutputPbi',
      method: 'GET'
    });
}
//重置接口
export function listQuantity(parmars) {
    return requstApi({
        url: '/categoryReport/listQuantity?categoryCode='+parmars,
        method: 'GET'
      });
  }