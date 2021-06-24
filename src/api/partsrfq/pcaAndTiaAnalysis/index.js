/*
 * @Author: moxuan
 * @Description: pca tia
 */

import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_VP_ANALYSE)

//分页查询rfqKM分析报告
export function getRfqKmInfo(params) {
  return request({
    url: '/costAnalysisTool/rfq/getRfqKmInfo',
    method: 'POST',
    data: params
  })
}
