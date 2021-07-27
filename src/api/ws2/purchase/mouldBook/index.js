import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_BMVIEW = axios(process.env.VUE_APP_BMVIEW)
const VUE_APP_BMVIEW_FILE = axiosFile(process.env.VUE_APP_BMVIEW)

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