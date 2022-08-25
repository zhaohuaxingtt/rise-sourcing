import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PROJECTMGT)
const requstToolingApi = axios(process.env.VUE_APP_TOOLING)

const downloadRequst = axiosDownload(process.env.VUE_APP_PROJECTMGT)

// Tooling cost
export function findCartypePro(data) {
  return requstToolingApi({
    url: '/cartype/findCartypePro',
    method: 'POST',
    data
  })
}

// 材料成本维护-Calculation Model VSI
export function modifyCalculationModelVSI(data) {
  return requst({
    url: '/project-progress-report/modifyCalculationModelVSI',
    method: 'POST',
    data
  })
}

// 材料成本维护-材料成本报告维护信息查询
export function getProjectProgressReportDetail(data) {
  return requst({
    url: '/project-progress-report/getProjectProgressReportDetail',
    method: 'POST',
    data
  })
}

// 材料成本维护-新增材料成本报告维护信息
export function createProjectProgressReport(data) {
  return requst({
    url: '/project-progress-report/createProjectProgressReport',
    method: 'POST',
    data
  })
}

// 材料成本维护-编辑材料成本报告维护信息
export function modifyProjectProgressReport(data) {
  return requst({
    url: '/project-progress-report/modifyProjectProgressReport',
    method: 'POST',
    data
  })
}

// 材料成本维护-删除材料成本报告维护信息
export function removeProjectProgressReport(data) {
  return requst({
    url: '/project-progress-report/removeProjectProgressReport',
    method: 'POST',
    data
  })
}

// 材料成本维护-定点零件号弹窗查询
export function getPartInfoByVsiNumAndNomiPartNUM(data) {
  return requst({
    url: '/project-progress-report/getPartInfoByVsiNumAndNomiPartNUM',
    method: 'POST',
    data
  })
}

// 材料成本维护-获取默认车型项目id
export function getDefaultCarTypePro(params) {
  return requst({
    url: '/project-progress-report/getDefaultCarTypePro',
    method: 'GET',
    params
  })
}

// 材料成本维护-Calculation Model VSI数据查询
export function getCalculationModelVSI(params) {
  return requst({
    url: '/project-progress-report/getCalculationModelVSI',
    method: 'GET',
    params
  })
}

// 材料成本维护-下载上传模板
export function downloadFile(data) {
  return requst({
    url: '/project-progress-report/downloadFile',
    method: 'POST',
    data
  })
}

// 材料成本维护-上传
export function uploadFile(data) {
  return requst({
    url: '/project-progress-report/uploadFile',
    method: 'POST',
    data
  })
}

// 材料成本维护-获取vmset下拉框
export function getvmSetList(params) {
  return requst({
    url: '/project-progress-report/getvmSetList',
    method: 'GET',
    params
  })
}

// 材料成本维护-材料成本报告BoB统计信息
export function getReportBobOverview(data) {
  return requst({
    url: '/project-progress-report/getReportBobOverview',
    method: 'POST',
    data
  })
}