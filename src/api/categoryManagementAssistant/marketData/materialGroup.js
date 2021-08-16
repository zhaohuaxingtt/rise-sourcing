/*
 * @Author: 舒杰
 * @Date: 2021-08-10 15:52:22
 * @LastEditTime: 2021-08-14 10:40:04
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\marketData\materialGroup.js
 */


import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

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