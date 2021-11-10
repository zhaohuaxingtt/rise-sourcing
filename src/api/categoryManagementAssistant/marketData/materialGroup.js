/*
 * @Author: 舒杰
 * @Date: 2021-08-10 15:52:22
 * @LastEditTime: 2021-09-06 10:44:51
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\marketData\materialGroup.js
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon');

//材料组定位
export function materialGroupPosition(params) {
  return request({
    url: '/MaterialGroupPositioning/materialGroupPosition',
    method: 'POST',
    data: params,
  });
}

//保存材料组建议和方案pdf
export function saveMaterialGroupScheme(params) {
  return request({
    url: '/MaterialGroupPositioning/saveMaterialGroupScheme',
    method: 'POST',
    data: params,
  });
}

//重置(编辑问题和建议的时候)
export function resettingSuggest(params) {
  return request({
    url: '/MaterialGroupPositioning/resettingSuggest',
    method: 'POST',
    data: params,
  });
}
