/*
 * @Author: 舒杰
 * @Date: 2021-08-05 19:04:35
 * @LastEditTime: 2021-08-05 19:49:58
 * @LastEditors: 舒杰
 * @Description: 车型价格对比
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\carPrice.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);
//获取品类管理-车型价格对比pbi的信息
export function getCmCarTypePricePbi() {
  return request({
      url: '/batchOverview/getCmCarTypePricePbi',
      method: 'GET'
    });
}