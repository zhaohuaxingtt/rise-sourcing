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
  return downloadRequst({
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

// 材料成本维护-供应商EM完成情况报告
export function getSupplierEmOntimeInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getSupplierEmOntimeInfo',
    method: 'POST',
    data
  })
}

// 材料成本维护-供应商OTS完成情况报告
export function getSupplierOtsOntimeInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getSupplierOtsOntimeInfo',
    method: 'POST',
    data
  })
}

// 材料成本维护-FG组定点完成情况报告
export function getFGNomiOntimeInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getFGNomiOntimeInfo',
    method: 'POST',
    data
  })
}

// 材料成本维护-Commodity Em完成情况报告
export function getCommodityEmOntimeInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCommodityEmOntimeInfo',
    method: 'POST',
    data
  })
}

// 材料成本维护-Commodity完成情况报告
export function getCommodityOntimeInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCommodityOntimeInfo',
    method: 'POST',
    data
  })
}
// 材料成本维护-刷新定点零件号
export function refreshNomiPartNum(data) {
  return requst({
    url: '/project-progress-report/refreshNomiPartNum',
    method: 'POST',
    data
  })
}

// 材料成本维护-根据VSI参考零件号/定点零件号+车型项目id查询定点记录/aeko记录
export function getPartInfoByVsiNumOrNomiPartNUM(data) {
  return requst({
    url: '/project-progress-report/getPartInfoByVsiNumOrNomiPartNUM',
    method: 'POST',
    data
  })
}

// 材料成本维护-供应商EM完成情况明细分页查询
export function getSupplierEmOntimePage(data) {
  return requst({
    url: '/project-performance-analysisc-report/getSupplierEmOntimePage',
    method: 'POST',
    data
  })
}

// 材料成本维护-供应商OTS完成情况分页查询
export function getSupplierOtsOntimePage(data) {
  return requst({
    url: '/project-performance-analysisc-report/getSupplierOtsOntimePage',
    method: 'POST',
    data
  })
} 
// 材料成本维护-FG组定点完成情况分页查询
export function getFGNomiOntimePage(data) {
  return requst({
    url: '/project-performance-analysisc-report/getFGNomiOntimePage',
    method: 'POST',
    data
  })
}

// 材料成本维护-Commodity Em完成情况分页查询
export function getCommodityEmOntimePage(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCommodityEmOntimePage',
    method: 'POST',
    data
  })
}
// 材料成本维护-Commodity完成情况分页查询
export function getCommodityOntimePage(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCommodityOntimePage',
    method: 'POST',
    data
  })
}
// 材料成本维护-项目管理分析导出
export function exprotProjectAnalysisc(data) {
  return downloadRequst({
    url: '/project-performance-analysisc-report/exprotProjectAnalysisc',
    method: 'POST',
    data
  })
}
// 材料成本维护-导出
export function exportProjectProgressReport(data) {
  return downloadRequst({
    url: '/project-progress-report/exportProjectProgressReport',
    method: 'POST',
    data
  })
}
// 材料成本维护-导出
export function exportErrorInfo(data) {
  return downloadRequst({
    url: '/project-progress-report/exportErrorInfo',
    method: 'POST',
    data
  })
}

// 车型项目Em准时完成情况报告
export function getCarProjectEmOntimeDTOInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCarProjectEmOntimeDTOInfo',
    method: 'POST',
    data
  })
}

// 车型项目定点准时完成情况报告
export function getCarProjectNomOntimeDTOInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCarProjectNomOntimeDTOInfo',
    method: 'POST',
    data
  })
}

// 车型项目ots准时完成情况报告
export function getCarProjectOTSOntimeDTOInfo(data) {
  return requst({
    url: '/project-performance-analysisc-report/getCarProjectOTSOntimeDTOInfo',
    method: 'POST',
    data
  })
}