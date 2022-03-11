/*
 * @Author: 舒杰
 * @Date: 2021-08-23 16:21:22
 * @LastEditTime: 2022-03-11 21:31:51
 * @LastEditors: Please set LastEditors
 * @Description: 人工成本维护
 * @FilePath: \front-sourcing\src\api\costanalysismanage\costanalysis\costMaintenance.js
 */
// 关联附件

import axios from '@/utils/axios'
import axiosDown from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_POWEBI_KPI + '/web/aon')
const requst = axiosDown(process.env.VUE_APP_SUPPLIER)

// 数据维护列表查询
export function dataMaintain(params) {
  return request({
    url: '/dataMaintain',
    method: 'POST',
    data: params,
  })
}

// 数据维护列表删除
export function delMaintain(params) {
  return request({
    url: '/dataMaintain',
    method: 'DELETE',
    data: params,
  })
}
// 新增上传
export function addMaintain(params) {
  return request({
    url: '/dataMaintain/add',
    method: 'POST',
    data: params,
  })
}

// 导出模板

export function exportTemplate(params) {
  return requst({
    url: 'supplier/localFile/webDownload?fileId=' + params,
    method: 'GET',
  })
}
