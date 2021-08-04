/*
 * @Author: moxuan
 * @Description: 市场数据
 */

import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

//市场数据原材料下拉列表
export function getRawMaterialGroupSelectList() {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroup',
    method: 'GET',
  });
}

//市场数据原材料数据
export function getrawMaterialGroupData(params) {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroupData',
    method: 'POST',
    data: params,
  });
}

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

//市场数据能源下拉列表
export function getEnergyGroupSelectList() {
  return request({
    url: '/cmMdEnergyEntity/energyGroup',
    method: 'GET',
  });
}

//市场数据能源数据
export function getEnergyGroupData(params) {
  return request({
    url: '/cmMdLabourEntity/energyGroupData',
    method: 'POST',
    data: params,
  });
}
