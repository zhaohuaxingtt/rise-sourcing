/*
 * @Author: 舒杰
 * @Date: 2021-08-05 19:04:35
 * @LastEditTime: 2021-08-05 19:05:27
 * @LastEditors: 舒杰
 * @Description: 产量总览
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\output.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon');

//获取品类管理-产量总览pbi的信息

export function getCmOutputPbi() {
  return request({
      url: '/batchOverview/getCmOutputPbi',
      method: 'GET'
    });
}