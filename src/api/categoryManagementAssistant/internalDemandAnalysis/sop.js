/*
 * @Author: 舒杰
 * @Date: 2021-08-04 20:05:48
 * @LastEditTime: 2021-09-08 15:05:38
 * @LastEditors: 舒杰
 * @Description: SOP进度轴
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\sop.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon');

//查询SOP进度轴
export function sopList(params) {
  return request({
      url: '/sopPipeLine/sopList',
      method: 'POST',
      data:params
    });
}
//SOP车型项目
export function carTypeProList(params) {
   return request({
       url: '/sopPipeLine/carTypeProList',
       method: 'POST',
       data:params
     });
}
 //SOP进度轴保存
export function sopPipeLineSave(params) {
   return request({
       url: '/sopPipeLine/sopPipeLineSave',
       method: 'POST',
       data:params
     });
}
 
 //SOP查询参数
 export function sopParamInit(params) {
  return request({
      url: '/sopPipeLine/sopParamInit',
      method: 'POST',
      data:params
    });
}


