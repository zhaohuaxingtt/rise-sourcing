/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2022-01-19 15:40:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 供应商列表分页
export function getSupplierList(params) {
  return requst({
      url: `/supplier/findSupplierPage`,
      method: "GET",
      params
  })
}

// 供应商列表分页
export function getSingleSupplierList(params) {
  return requst({
      url: `/exclusiveSupplier/findExclusiveSupplierPage`,
      method: "GET",
      params
  })
}

// 保存供应商列表
export function addSuppliersInfo(data) {
  return requst({
      url: `/supplier/addSuppliersInfo`,
      method: "POST",
      data
  })
}

// 保存单一供应商列表
export function addsingleSuppliersInfo(data) {
  return requst({
      url: `/exclusiveSupplier/addExclusiveSupplier`,
      method: "POST",
      data
  })
}

// 根据rfq号查询零件的供应商列表
export function getRfqSupplierList(params) {
  return requst({
      url: `/nego-assistant/supplierListOrderByTTo`,
      method: "GET",
      params
  })
}

// 导出单一供应商列表
export function exportExclusiveSuppliersList(data) {
  return requst({
      url: `/exclusiveSupplier/exportExclusiveSuppliersList`,
      method: "POST",
      data
  })
}

// 供应商查询
export function getPartSupplierList(params) {
  return requst({
    url: `/rs/suppliers/${ params.nominateAppId }/${ params.rfqId }/${ params.fsnrGsnrNum }`,
    method: "GET"
  })
}