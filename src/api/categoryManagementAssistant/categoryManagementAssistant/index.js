/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-09 15:18:11
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import axios from '@/utils/axios';
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon');
const requestDownload = axiosDownload(process.env.VUE_APP_POWEBI_KPI + '/web/aon')


//报告清单---导出
export function categoryReportExport(params) {
  return requestDownload({
    url: `/categoryReport/export`,
    method: 'POST',
    data: params
  });
}
//报告清单---列表
export function categoryReport(par) {
  return request({
    url: `/categoryReport?categoryCode=${par}`,
    method: 'GET',
  });
}
//查看历史---列表
export function getReportList(params) {
  return request({
    url: `/categoryReport/getReportList`,
    method: 'POST',
    data: params
  });
}
//获取内部需求分析操作记录 最近方案信息
export function getCategoryAnalysis(params) {
  return request({
    url: `/categoryAnalysis/getCategoryAnalysis`,
    method: 'POST',
    data: params
  });
}