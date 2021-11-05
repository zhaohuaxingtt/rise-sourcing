/*
 * @Author: wentliao
 * @Date: 2021-06-06 13:59:55
 * @Description: timeline相关接口
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

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