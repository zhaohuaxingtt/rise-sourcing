/*
 * @Autor: Hao,Jiang
 * @Date: 2021-08-30 13:48:16
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-06 14:00:55
 * @Description: 
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PROJECTMGT)

// 排程版本列表
export function getScheduleVersion(data) {
  return requst({
    url: '/schedule-version/condition',
    method: 'POST',
    data
  })
}

// 查询用户已有排程版本的车型项目
export function gescheduleVersionCarType(params) {
  return requst({
    url: `schedule-version/user`,
    method: 'GET',
    params
  })
}

// 生成排程版本文件id
export function genScheduleVersionFileId(data) {
  return requst({
    url: `/schedule-version/upload`,
    method: 'POST',
    data
  })
}