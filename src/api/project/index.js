/*
 * @Author: Luoshuang
 * @Date: 2021-07-29 15:30:08
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-01 17:42:17
 * @Description: 项目管理相关接口
 * @FilePath: \front-web\src\api\project\index.js
 */

import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PROJECTMGT)
const downloadRequst = axiosDownload(process.env.VUE_APP_PROJECTMGT)
const partsRequest = axios(process.env.VUE_APP_PARTSPROCURE)

// 产品组排程-获取车型项目下拉
export function getCarTypePro(params) {
  return requst({
    url: '/car-type',
    method: 'GET',
    params
  })
}

// 产品组排程-获取车型项目节点列表
export function getCarTypeProPepTimeNode(cartypeProId) {
  return requst({
    url: `/car-type/pepTimeNode/${cartypeProId}`,
    method: 'GET',
  })
}

// 获取产品组周期视图
export function getProductGroupInfoList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/info/${cartypeProId}`,
    method: 'GET'
  })
}

// 获取产品组节点视图
export function getProductGroupNodeInfoList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/infoNode/${cartypeProId}`,
    method: 'GET'
  })
}

// 保存产品组周期视图
export function saveProductGroupInfoList(params) {
  return requst({
    url: `/product-group-schedule/info`,
    method: 'POST',
    data: params
  })
}

// 获取概览列表
export function getOverview() {
  return requst({
    url: '/car-type/user/overview',
    method: 'GET'
  })
}


// 获取用户最后一次操作的车型项目 type: 1-产品组  2-零件
export function getLastOperateCarType(type = 1) {
  return requst({
    url: '/car-type/userLastOperate/' + type,
    method: 'GET'
  })
}


// 获取可选择车型列表
export function getSelectCarType(carTypeProId = '') {
  return requst({
    url: '/car-type/user?carTypeProId='+carTypeProId,
    method: 'GET'
  })
}

// 更新可选择车型列表
export function updateSelectCarType(params) {
  return requst({
    url: '/car-type/attention',
    method: 'PUT',
    data: params
  })
}

// 根据车型项目id查询项目采购员
export function getBuyer(carTypeProjectId) {
  return requst({
    url: `/progress-confirm/user/${carTypeProjectId}`,
    method: 'GET'
  })
}

// 查询询价采购员下拉
export function getFsUserList(params) {
  return requst({
    url: '/progress-confirm/user?ids='+params.join(','),
    method: 'GET',
  })
}

export function deliveryProduct(params) {
  return requst({
    url: '/progress-confirm/productGroupSchedule',
    method: 'POST',
    data: params
  })
}

// 获取产品组选择弹窗列表
export function getProductSelectList(cartypeProId) {
  return requst({
    url: `/product-group-schedule/select/${cartypeProId}`,
    method: 'GET'
  })
}

// 获取车型算法配置
export function getCarConfig(cartypeProId) {
  return requst({
    url: `/project-group-config/carTypePro/${cartypeProId}`,
    method: 'GET'
  })
}

// 保存车型算法配置
export function updateCarConfig(params) {
  return requst({
    url: `/project-group-config/carTypePro`,
    method: 'POST',
    data: params
  })
}

// 保存选择的产品组
export function saveProductSelectList(params) {
  return requst({
    url: '/product-group-schedule/select',
    method: 'POST',
    data: params
  })
}

// 进度确认汇总-分页列表
export function getProductGroup(params) {
  return requst({
    url: '/progress-confirm/productGroupSchedule',
    method: 'GET',
    params
  })
}

// 获取所有询价采购员
export function getAllFS() {
  return requst({
    url: '/progress-confirm/user/allFs',
    method: 'GET'
  })
}

// 获取所有项目采购员
export function getAllProPurchaser() {
  return requst({
    url: '/progress-confirm/user/allProPurchaser',
    method: 'GET'
  })
}

// 排程退回
export function returnSchedule(params, remark) {
  return requst({
    url: '/progress-confirm/productGroupSchedule/return?remark='+remark,
    method: 'PUT',
    data: params
  })
}

// 排程确认
export function confirmSchedule(params) {
  return requst({
    url: '/progress-confirm/productGroupSchedule/confirm',
    method: 'POST',
    data: params
  })
}

// 排程转派
export function transferSchedule(params, fsId) {
  return requst({
    url: '/progress-confirm/productGroupSchedule/transfer?fsId='+fsId,
    method: 'POST',
    data: params
  })
}

// 排程保存
export function saveSchedule(params) {
  return requst({
    url: '/progress-confirm/productGroupSchedule/save',
    method: 'PUT',
    data: params
  })
}

// 下载Pv/Pk文件
export function downloadPvPk(cartypeProId) {
  return downloadRequst({
    url: `/product-group-schedule/pvPkFile/${cartypeProId}`,
    method: 'GET'
  })
}

// 下载节点视图文件
export function downloadNodeView(cartypeProId) {
  return downloadRequst({
    url: '/product-group-schedule/nodeViewFile/'+cartypeProId,
    method: 'GET'
  })
}

// 获取经验常值列表
export function getExperience(productGroup) {
  return requst({
    url: `/history-progress/experience?productGroup=${productGroup}`,
    method: 'GET'
  })
}

// 正常查询匹配零件号历史进度
export function getCondition(params) {
  return requst({
    url: `/history-progress/parts/condition`,
    method: 'POST',
    data: params
  })
}

// 拟合进度查询匹配零件号历史进度
export function getFitting(params) {
  return requst({
    url: `/history-progress/parts/fitting`,
    method: 'POST',
    data: params
  })
}

// 保存展示字段
export function updateFields(params) {
  return requst({
    url: '/history-progress/fields',
    method: 'PUT',
    data: params
  })
}

// 下载历史进度文件
export function downloadHistoryProgressFile(params) {
  return downloadRequst({
    url: '/history-progress/historyProgressFile',
    method: 'POST',
    data: params
  })
}

// 验证产品组是否能发送
export function validSchedule(params) {
  return requst({
    url: '/progress-confirm/validSchedule',
    method: 'POST',
    data: params
  })
}

// 历史进度数据库-获取产品组下拉
export function getProductGroupAll(params={}) {
  return partsRequest({
    url: '/productGroupList',
    method: 'POST',
    data: params
  })
}

// 获取零件排程
export function getPartSchedule(cartypeProId) {
  return requst({
    url: `/part-schedule/info/${cartypeProId}`,
    method: 'GET'
  })
}

// 保存零件排程
export function updatePartSchedule(params) {
  return requst({
    url: '/part-schedule/info',
    method: 'POST',
    data: params
  })
}

// 获取零件排程算法
export function getPartGroupConfig(cartypeProId) {
  return requst({
    url: `/part-group-config/carTypePro/${cartypeProId}`,
    method: 'GET'
  })
}

// 更新零件排程算法
export function updatePartGroupConfig(params) {
  return requst({
    url: `/part-group-config/carTypePro`,
    method: 'POST',
    data: params
  })
}

// 发送零件排程确认
export function partProgressConfirm(params) {
  return requst({
    url: '/progress-confirm/part',
    method: 'POST',
    data: params
  })
}

// 获取询价采购员下拉框-零件排程发送FS确认
export function getFsUserListPart(params) {
  return requst({
    url: '/progress-confirm/user/part',
    method: 'GET',
    params
  })
}

// 获取零件排程进度确认列表
export function getPartScheduleList(params) {
  return requst({
    url: '/progress-confirm/part',
    method: 'GET',
    params
  })
}

// 保存零件排程确认列表
export function savePartScheduleList(params) {
  return requst({
    url: '/progress-confirm/part/save',
    method: 'PUT',
    data: params
  })
}

// 退回零件排程确认列表
export function returnPartScheduleList(params, remark) {
  return requst({
    url: '/progress-confirm/part/return?remark='+remark,
    method: 'PUT',
    data: params
  })
}

// 确认零件排程确认列表
export function confirmPartScheduleList(params) {
  return requst({
    url: '/progress-confirm/part/confirm',
    method: 'POST',
    data: params
  })
}

// 转派零件排程确认列表
export function transferPartScheduleList(params, fsId) {
  return requst({
    url: '/progress-confirm/part/transfer?fsId='+fsId,
    method: 'POST',
    data: params
  })
}

// 生成排程版本
export function addScheduleVersion(params) {
  return requst({
    url: '/schedule-version',
    method: 'POST',
    data: params
  })
}

export function exportPartSchedule(params) {
  return downloadRequst({
    url: '/part-schedule/partScheduleFile',
    method: 'POST',
    data: params
  })
}