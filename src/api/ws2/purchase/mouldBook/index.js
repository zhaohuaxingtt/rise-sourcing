import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMVIEW = axios(process.env.VUE_APP_BMVIEW)
const VUE_APP_BMVIEW_FILE = axiosFile(process.env.VUE_APP_BMVIEW)

const VUE_APP_BMMOLD = axios(process.env.VUE_APP_BMMOLD)
const VUE_APP_BMMOLD_FILE = axiosFile(process.env.VUE_APP_BMMOLD)

const VUE_APP_MOLDVIEW = axios(process.env.VUE_APP_MOLDVIEW)
const VUE_APP_MOLDVIEW_FILE = axiosFile(process.env.VUE_APP_MOLDVIEW)

//模具视图-导出
export function moldViewExport(parmars) {
  return VUE_APP_MOLDVIEW_FILE({
      url: '/moldViewExport',
      method: 'POST',
      data: parmars
  })
}

// 模具视图-车型项目
export function moldViewCarTypePullDown(parmars) {
  return VUE_APP_MOLDVIEW({
      url: '/moldViewCarTypePullDown',
      method: 'GET',
      params: parmars
  })
}

// 模具视图-列表
export function findMoldViewPage(parmars) {
  return VUE_APP_MOLDVIEW({
      url: '/findMoldViewPage',
      method: 'POST',
      data: parmars
  })
}

// 模具视图-科室下拉
export function moldViewDeptPullDown(parmars) {
  return VUE_APP_MOLDVIEW({
      url: '/moldViewDeptPullDown',
      method: 'GET',
      params: parmars
  })
}

// 点击订单号权限判断
export function getOrderNumPermission(parmars) {
  return VUE_APP_BMVIEW({
      url: '/getOrderNumPermission',
      method: 'GET',
      params: parmars
  })
}

// 工艺类型集合
export function craftTypes(parmars) {
  return VUE_APP_BMMOLD({
      url: '/craftTypes',
      method: 'GET',
      params: parmars
  })
}

// 资产分类集合
export function assetTypes(parmars) {
  return VUE_APP_BMMOLD({
      url: '/assetTypes',
      method: 'GET',
      params: parmars
  })
}

//导出详情列表
export function exportsTableList(parmars) {
  return VUE_APP_BMMOLD_FILE({
      url: '/export',
      method: 'POST',
      data: parmars
  })
}

//详情列表
export function findMoldList4Ledger(parmars) {
  return VUE_APP_BMMOLD({
      url: '/findMoldList4Ledger',
      method: 'POST',
      data: parmars
  })
}

//LINIE下拉
export function bmViewLiniePullDown(parmars) {
  return VUE_APP_BMVIEW({
      url: '/bmViewLiniePullDown',
      method: 'GET',
      params: parmars
  })
}

//是否有跳转详情权限
export function isPermission(parmars) {
  return VUE_APP_BMVIEW({
      url: '/isPermission',
      method: 'GET',
      params: parmars
  })
}

//bm车型下拉列表
export function detailByBmSerial(parmars) {
  return VUE_APP_BMVIEW({
      url: '/detailByBmSerial',
      method: 'GET',
      params: parmars
  })
}

//bmtable列表
export function findBmViewPageList(parmars) {
  return VUE_APP_BMVIEW({
      url: '/findBmViewPageList',
      method: 'POST',
      data: parmars
  })
}

//bm车型下拉列表
export function bmViewCarTypePullDown(parmars) {
    return VUE_APP_BMVIEW({
        url: '/bmViewCarTypePullDown',
        method: 'GET',
        params: parmars
    })
}

//bm科室下拉列表
export function bmViewDeptPullDown(parmars) {
  return VUE_APP_BMVIEW({
      url: '/bmViewDeptPullDown',
      method: 'GET',
      params: parmars
  })
}

//bm导出
export function bmViewExport(parmars) {
  return VUE_APP_BMVIEW_FILE({
      url: '/bmViewExport',
      method: 'POST',
      data: parmars
  })
}

//bm科室下拉列表
export function bmViewMoldInvestmentListStatusPullDown(parmars) {
  return VUE_APP_BMVIEW({
      url: '/bmViewMoldInvestmentListStatusPullDown',
      method: 'GET',
      params: parmars
  })
}

//bm科室下拉列表
export function bmViewSupplierPullDown(parmars) {
  return VUE_APP_BMVIEW({
      url: '/bmViewSupplierPullDown',
      method: 'GET',
      params: parmars
  })
}

//bm科室下拉列表
export function bmChangeOrderList(parmars) {
  return VUE_APP_BMVIEW({
      url: '/bmChangeOrderList',
      method: 'GET',
      params: parmars
  })
}