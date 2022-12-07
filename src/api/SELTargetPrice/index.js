/*
 * @Author: Luoshuang
 * @Date: 2021-11-08 14:34:58
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-07 14:36:12
 * @Description: 模具目标价相关接口
 * @FilePath: \front-sourcing\src\api\modelTargetPrice\index.js
 */

import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_SOURCING)
const requestDownload = axiosDownload(process.env.VUE_APP_SOURCING)

// sel单据批量确认
export function comfirmBatch(data) {
  return request({
    url: '/nominate/sel/comfirm-batch',
    method: 'POST',
    data
  })
}

// 申请sel目标价
export function applySelTargetPrice(data) {
  return request({
    url: '/sel_target_price/apply-sel-target-price-list',
    method: 'POST',
    data
  })
}

// 审批驳回
export function approvalReturn(data) {
  return request({
    url: '/sel_target_price/approvalReturn',
    method: 'POST',
    data
  })
}

// 指派sel目标价
export function assignSelTargetPrice(data) {
  return request({
    url: '/sel_target_price/assignSelTargetPrice',
    method: 'POST',
    data
  })
}


// 导出申请sel目标价记录
export function exportSelTargetPriceTask(data) {
  return requestDownload({
    url: '/sel_target_price/export-sel-target-price-task',
    method: 'POST',
    data
  })
}

// 导出维护目标价列表
export function exportSelMaintainedList(data) {
  return requestDownload({
    url: '/sel_target_price/exportSelMaintainedList',
    method: 'POST',
    data
  })
}

// 查询sel目标价
export function getSelTargetPriceTask(data) {
  return request({
    url: '/sel_target_price/get-sel-target-price-task',
    method: 'POST',
    data
  })
}

// 查询cffce用户
export function getCFECUserList(data) {
  return request({
    url: '/sel_target_price/getCFECUserList',
    method: 'POST',
    data
  })
}

// 通过审批 可以不写备注
export function passApproval(data) {
  return request({
    url: '/sel_target_price/passApproval',
    method: 'POST',
    data
  })
}

// 通过审批还需要添加备注 必须填写备注
export function passApprovalAndRemark(data) {
  return request({
    url: '/sel_target_price/passApprovalAndRemark',
    method: 'POST',
    data
  })
}

// sel目标价财务查询列表
export function selCfCESearchPage(data) {
  return request({
    url: '/sel_target_price/selCfCESearchPage',
    method: 'POST',
    data
  })
}

// 无目标价设置
export function setNullSelTargetPrice(data) {
  return request({
    url: '/sel_target_price/setNullSelTargetPrice',
    method: 'POST',
    data
  })
}

// 签收sel目标价
export function signSelTargetPrice(data) {
  return request({
    url: '/sel_target_price/signSelTargetPrice',
    method: 'POST',
    data
  })
}

// 提交sel目标价
export function submitSelTargetPrice(data) {
  return request({
    url: '/sel_target_price/submitSelTargetPrice',
    method: 'POST',
    data
  })
}

// 签收sel目标价
export function transferSelTargetPrice(data) {
  return request({
    url: '/sel_target_price/transferSelTargetPrice',
    method: 'POST',
    data
  })
}

// 导入目标价接口
export function uploadSelTargetFile(data) {
  return request({
    url: '/sel_target_price/uploadSelTargetFile',
    method: 'POST',
    data
  })
}

// 申请sel目标价记录
export function applySelTargetPriceRecordList(data) {
  return request({
    url: '/sel_target_price/apply-sel-target-price--record-list',
    method: 'POST',
    data
  })
}

// 导出sel目标价申请记录
export function exportSelTargetPriceRecordList(data) {
  return requestDownload({
    url: '/sel_target_price/export-sel-target-price--record-list',
    method: 'POST',
    data
  })
}
