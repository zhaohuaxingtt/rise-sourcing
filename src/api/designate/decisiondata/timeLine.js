/*
 * @Author: wentliao
 * @Date: 2021-06-06 13:59:55
 * @Description: timeline相关接口
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取详情
export function getTimeaxis(id) {
    return requst({
        url: `/normi-timeaxis/${id}`,
        method: "GET",
    })
  }

  // 保存
  export function saveTimeaxis(data) {
    return requst({
        url: '/normi-timeaxis/save',
        method: "POST",
        data,
    })
  }

  
// 获取定点申请时间轴
export function getTimeline(nomiAppId){
  return requst({
      url: `/nomi-car-project-time-axis/${nomiAppId}`,
      method: 'GET',
  })
}
// 通过定点申请id和车型项目查询时间轴
export function getNomiCarProjectTimeAxis(nomiAppId,carProjectId){
  return requst({
      url: `/nomi-car-project-time-axis/getNomiCarProjectTimeAxis/${nomiAppId}/${carProjectId}`,
      method: 'GET',
  })
}
// 更新定点申请时间轴
export function updateTimeline(data){
  return requst({
      url: `/nomi-car-project-time-axis/update`,
      method: 'POST',
      data
  })
}