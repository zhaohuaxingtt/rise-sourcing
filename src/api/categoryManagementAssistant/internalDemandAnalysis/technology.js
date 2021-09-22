/*
 * @Author: 舒杰
 * @Date: 2021-08-04 20:05:48
 * @LastEditTime: 2021-09-13 19:15:06
 * @LastEditors: 舒杰
 * @Description: 技术路线
 * @FilePath: \front-sourcing\src\api\categoryManagementAssistant\internalDemandAnalysis\technology.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

//分页查询
export function technologyFile(params) {
  return request({
      url: '/technologyFile/page',
      method: 'POST',
      data:params
    });
}
//新增
export function technologyAdd(params) {
  return request({
      url: '/technologyFile/add',
      method: 'POST',
      data:params
    });
}
//删除
export function technologyDelete(params) {
  return request({
      url: '/technologyFile/delete',
      method: 'POST',
      data:params
    });
}

// 模板路径
export function template(params) {
  return request({
      url: '/technologyFile/template',
      method: 'GET',
      params
    });
}

