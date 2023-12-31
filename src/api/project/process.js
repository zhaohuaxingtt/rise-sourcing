/*
 * @Author: haojiang
 * @Date: 2021-08-26 11:06:24
 * @LastEditTime: 2023-04-14 14:51:29
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 项目管理-项目进度监控接口
 * @FilePath: \front-web\src\api\project\process.js
 */


import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PROJECTMGT)
const downloadRequst = axiosDownload(process.env.VUE_APP_PROJECTMGT)

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

// 获取独立Tips数据
export function carModelDataSource(carTypeProjectId) {
  return requst({
    url: `/project-progress-monitor/carModelDataSource/${carTypeProjectId}`,
    method: 'GET',
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

// 获取自动同步数据
export function getAutoData(carTypeProjectId) {
  return requst({
    url: `/auto-car-data/getAutoSy/${carTypeProjectId}`,
    method: 'GET',
  })
}


// 更新自动同步数据
export function updateAutoData(data) {
  return requst({
    url: `/auto-car-data/updateCarAuto`,
    method: 'POST',
    data
  })
}

// 获取项目监控明细
export function getProProgressMonitorDetail(data) {
  return requst({
    url: '/project-progress-monitor/proProgressMonitorDetail',
    method: 'POST',
    data
  })
}

// 灭灯操作
export function actionPlan(data) {
  return requst({
    url: '/project-progress-monitor/actionPlan',
    method: 'POST',
    data
  })
}

// 获取需要确认延误原因的零件列表
export function getDelayReasonConfirmList(data) {
  return requst({
    url: '/project-progress-monitor/listDelayReasonConfirm',
    method: 'POST',
    data
  })
}

// 延误原因发送确认-询价采购员
export function sendDelayReasonConfirm(data) {
  return requst({
    url: '/project-progress-monitor/sendDelayReasonConfirm',
    method: 'POST',
    data
  })
}

// 分页查询车型项目下对应零件监控状态的数据
export function pageProProgressMonitorData(data) {
  return requst({
    url: '/project-progress-monitor/pageProProgressMonitorData',
    method: 'POST',
    data
  })
}

// 导出车型项目下对应零件监控状态的数据
export function proProgressMonitorFile(data) {
  return downloadRequst({
    url: '/project-progress-monitor/proProgressMonitorFile',
    method: 'POST',
    data
  })
}

// 获取发送进度确认的零件列表
export function getProgressConfirmList(data) {
  return requst({
    url: '/project-progress-monitor/listProgressConfirm',
    method: 'POST',
    data
  })
}

// 延误原因汇总列表获取
export function getDelayReasonSummary(data) {
  return requst({
    url: '/project-progress-monitor/pageDelayReasonSummary',
    method: 'POST',
    data
  })
}

// 延误原因发送-项目采购员
export function sendDelayReason(data) {
  return requst({
    url: '/project-progress-monitor/sendDelayReason',
    method: 'POST',
    data
  })
}

// 延误原因保存-询价采购员
export function saveDelayReasonConfirm(data) {
  return requst({
    url: '/project-progress-monitor/saveDelayReasonConfirm',
    method: 'POST',
    data
  })
}

// 延误原因转派-询价采购员
export function transferDelayReasonConfirm(data) {
  return requst({
    url: '/project-progress-monitor/transferDelayReasonConfirm',
    method: 'POST',
    data
  })
}

// 延误原因退回-询价采购员
export function backDelayReasonConfirm(data) {
  return requst({
    url: '/project-progress-monitor/backDelayReasonConfirm',
    method: 'POST',
    data
  })
}

// 监控明细下载
export function downloadProjectMonitorFile(data) {
  return downloadRequst({
    url: '/project-progress-monitor/projectMonitorFile',
    method: 'POST',
    data
  })
}

// 导出延误原因汇总
export function exportDelayReasonConfirm(data) {
  return downloadRequst({
    url: '/project-progress-monitor/exportDelayReasonConfirm',
    method: 'POST',
    data
  })
}
