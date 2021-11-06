/*
 * @Author: 舒杰
 * @Date: 2021-08-05 19:04:35
 * @LastEditTime: 2021-08-14 13:55:01
 * @LastEditors: 舒杰
 * @Description: 车型价格对比
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\carPrice.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon');
//获取品类管理-车型价格对比pbi的信息
export function getCmCarTypePricePbi() {
  return request({
      url: '/batchOverview/getCmCarTypePricePbi',
      method: 'GET'
    });
}


// 根据材料组编号获取对应的在供车型
export function carTypeByCategoryCode(params) {
  return request({
     url: '/sopPipeLine/carTypeByCategoryCode',
     method: 'POST',
     data: params
  });
}

