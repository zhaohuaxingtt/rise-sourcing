/*
 * @Author: 舒杰
 * @Description: 内部需求分析概览
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

// --原材料--

//市场数据原材料下拉列表
export function getRawMaterialGroupSelectList() {
  return request({
    url: '/cmMdRawMaterialEntity/rawMaterialGroup',
    method: 'GET',
  });
}