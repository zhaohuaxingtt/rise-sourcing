/*
 * @Author: 舒杰
 * @Date: 2021-08-10 15:52:22
 * @LastEditTime: 2021-08-10 17:36:18
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\marketData\materialGroup.js
 */


import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

//定位材料组所在象限信息
export function findMaterialGroupQuadrant(params) {
  return request({
    url: '/piAnalysisScheme/findMaterialGroupQuadrant',
    method: 'POST',
    data: params,
  });
}

//材料组定位
export function materialGroupPosition(params) {
   return request({
     url: '/piAnalysisScheme/materialGroupPosition',
     method: 'POST',
     data: params,
   });
}

//保存材料组建议和方案pdf
export function saveMaterialGroupScheme(params) {
   return request({
     url: '/piAnalysisScheme/saveMaterialGroupScheme',
     method: 'POST',
     data: params,
   });
 }