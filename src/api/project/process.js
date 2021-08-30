/*
 * @Author: haojiang
 * @Date: 2021-08-26 11:06:24
 * @LastEditTime: 2021-08-27 17:29:17
 * @LastEditors: Please set LastEditors
 * @Description: 项目管理-项目进度监控接口
 * @FilePath: /front-web/src/api/project/process.js
 */


import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PROJECTMGT)

// 项目进度监控-获取
export function getDelayGradeConfig(params) {
  return requst({
    url: '/delay-grade-config',
    method: 'GET',
    params
  })
}

// 项目进度监控-获取
export function saveDelayGradeConfig(data) {
  return requst({
    url: '/delay-grade-config/delayGrade',
    method: 'POST',
    data
  })
}

// 项目进程监控数据
export function getProjectProgressMonitor(params) {
  return requst({
    url: `/project-progress-monitor/carModelStatus/${params.carTypeProjectId}`,
    method: 'GET',
    params
  })
}

// 上一次查看的车型项目
export function getLastCarType(params) {
  return requst({
    url: `/project-progress-monitor/lastCarType`,
    method: 'GET',
    params
  })
}
