/*
 * @Author: wentliao
 * @Date: 2021-08-02 10:32:38
 * @Description: aeko描述页相关接口
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PARTS)


// 获取aeko描述详情
export function getAekoDesc(params) {
    return requst({
      url: '/aeko/purchasing/desc',
      method: 'GET',
      params,
    })
  }


  // aeko审批 零件清单分页查询
  export function getPartAuditPage(data) {
    return requst({
      url: '/aeko/part/auditPage',
      method: 'POST',
      data,
    })
  }