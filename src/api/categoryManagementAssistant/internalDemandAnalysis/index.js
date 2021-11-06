/*
 * @Author: 舒杰
 * @Date: 2021-08-12 09:58:50
 * @LastEditTime: 2021-09-07 17:27:53
 * @LastEditors: 舒杰
 * @Description: 内部需求分析概览
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\index.js
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/aon/web/aon');

// --原材料--

//市场数据原材料下拉列表
export function getRawMaterialGroupSelectList() {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroup',
    method: 'GET',
  });
}

// 内部需求分析保存方案和方案报告
export function categoryAnalysis(params) {
  return request({
     url: '/categoryAnalysis/categoryAnalysis',
     method: 'POST',
     data: params
  });
}

// 获取内部需求分析操作记录 最近方案信息
export function getCategoryAnalysis(params) {
  return request({
     url: '/categoryAnalysis/getCategoryAnalysis',
     method: 'POST',
     data: params
  });
}

