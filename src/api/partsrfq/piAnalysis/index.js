/*
 * @Author: youyuan
 * @Date: 2021-08-13 17:27:07
 * @LastEditTime: 2021-08-14 09:55:12
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
    method: 'PUT',
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