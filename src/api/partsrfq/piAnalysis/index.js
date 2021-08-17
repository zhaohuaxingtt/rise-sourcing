/*
 * @Author: youyuan
 * @Date: 2021-08-13 17:27:07
 * @LastEditTime: 2021-08-16 17:56:49
 * @LastEditors: Please set LastEditors
 * @Description: PI分析库相关接口
 * @FilePath: \front-web\src\api\partsrfq\piAnalysis\index.js
 */
import axios from '@/utils/axios';

const request = axios(process.env.VUE_APP_AON);

// 分页查询分析库列表数据
export function getAnalysisList(params) {
  return request({
    url: '/piAnalysisScheme/page',
    method: 'POST',
    data: params,
  });
}

// 置顶方案
export function fetchAnalysisStick(params) {
  return request({
    url: '/piAnalysisScheme/stick',
    method: 'PUT',
    data: params,
  });
}

// 保存编辑方案
export function fetchAnalysisSave(params) {
  return request({
    url: '/piAnalysisScheme/updatePi',
    method: 'POST',
    data: params,
  });
}

// 删除方案
export function fetchAnalysisDel(params) {
  return request({
    url: '/piAnalysisScheme/updatePi',
    method: 'PUT',
    data: params,
  });
}
// 原材料价格总览列表页
export function getRawMateriaList(params) {
  return request({
    url: '/cmMdRawMaterialEntity/page',
    method: 'POST',
    data: params,
  });
}
// 原材料价格总览-原材料名称
export function getRawMateriaDetail(params) {
  return request({
    url: '/piAnalysisScheme/selectByPage',
    method: 'POST',
    data: params,
  });
}
// 新增方案时或者全量零件信息
export function getAllAddPart(params) {
  return request({
    url: '/piAnalysisScheme/getPartsList',
    method: 'POST',
    data: params,
  });
}
// 提交零件数据生成新的方案
