/*
 * @Author: 舒杰
 * @Date: 2021-08-09 09:44:34
 * @LastEditTime: 2021-08-09 09:47:16
 * @LastEditors: 舒杰
 * @Description: 外部供应市场分析-行业报告
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\externalSupplyMarketAnalysis\industryReport.js
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

//获取行业研究报告
export function getReport(params) {
   return request({
      url: '/industryReport/getReport',
      method: 'POST',
      data:params
   });
}

//获取行业研究报告
export function saveReport(params) {
   return request({
      url: '/industryReport/saveReport',
      method: 'POST',
      data:params
   });
}
//上传报告
export function uploadReport(params) {
   return request({
      url: '/industryReport/uploadReport',
      method: 'POST',
      data:params
   });
}
