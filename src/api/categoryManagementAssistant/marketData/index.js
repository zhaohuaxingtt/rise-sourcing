/*
 * @Author: moxuan
 * @Description: 市场数据
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

// --原材料--

//市场数据原材料下拉列表
export function getRawMaterialGroupSelectList(params) {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroup',
    method: 'POST',
    data: params,
  });
}

//市场数据原材料数据
export function getrawMaterialGroupData(params) {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroupDataRel',
    method: 'POST',
    data: params,
  });
}

//市场数据原材料获取上次操作查询条件
export function getRecentRawMaterialScheme(params) {
  return request({
    url: '/cmMdRawMaterialEntity/getRecentRawMaterialScheme',
    method: 'POST',
    data: params,
  });
}

//保存市场数据原材料查询条件和方案报告
export function saveRawMaterialScheme(params) {
  return request({
    url: '/cmMdRawMaterialEntity/saveRawMaterialScheme',
    method: 'POST',
    data: params,
  });
}

// --劳动力--

//市场数据劳动力下拉列表
export function getLabourGroupSelectList() {
  return request({
    url: '/cmMdLabourEntity/labourGroup',
    method: 'GET',
  });
}

//市场数据劳动力数据
export function getLabourGroupData(params) {
  return request({
    url: '/cmMdLabourEntity/labourGroupData',
    method: 'POST',
    data: params,
  });
}

//市场数据劳动力获取上次操作查询条件
export function getRecentLabourScheme(params) {
  return request({
    url: '/cmMdLabourEntity/getRecentLabourScheme',
    method: 'POST',
    data: params,
  });
}

//保存市场数据劳动力查询条件和方案报告
export function saveLabourScheme(params) {
  return request({
    url: '/cmMdLabourEntity/saveLabourScheme',
    method: 'POST',
    data: params,
  });
}

// --能源--

//市场数据能源下拉列表
export function getEnergyGroupSelectList(params) {
  return request({
    url: '/cmMdEnergyEntity/energyGroup',
    method: 'POST',
    data: params,
  });
}

//市场数据能源数据
export function getEnergyGroupData(params) {
  return request({
    url: '/cmMdEnergyEntity/energyGroupDataRel',
    method: 'POST',
    data: params,
  });
}

//市场数据能源获取上次操作查询条件
export function getRecentEnergyScheme(params) {
  return request({
    url: '/cmMdEnergyEntity/getRecentEnergyScheme',
    method: 'POST',
    data: params,
  });
}

//保存市场数据能源查询条件和方案报告
export function saveEnergyScheme(params) {
  return request({
    url: '/cmMdEnergyEntity/saveEnergyScheme',
    method: 'POST',
    data: params,
  });
}
