import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)
const requstPartResource = axios(process.env.VUE_APP_DIC)
// VUE_APP_PARTSPROCURE
// VUE_APP_PART_PROCURE wenpeng
// VUE_APP_PARTS

// 采购项目-获取材料组信息
export function getMaterialGroup(params){
  return requst({
    url: '/materialGroup',
    method: 'GET',
    params: params
  })
}

// 采购项目-获取材料组信息
export function getMeterialStuff(params){
  return requst({
    url: '/meterialStuff',
    method: 'GET',
    params: params
  })
}

// 设置工艺组
export function putMaterialGroup(params){
  return requst({
    url: '/materialGroup',
    method: 'PUT',
    params: params
  })
}

// 获取tp单数据
export function getTpInfo(params){
  return requst({
    url: '/tp-records/tpInfo',
    method: 'POST',
    data:{
      tpRecordsScenes: params
    }
  })
}

// 获取附件
export function getInfoAnnexPage(params) {
  return requst({
    url: '/tp-records/tpInfo/getInfoAnnexPage',
    method: 'GET',
    params: params
  })
}

// 删除附件
export function deleteFile(params) {
  return requst({
    url: '/tp-records/tpInfo/file',
    method: 'DELETE',
    data: params
  })
}

// 获取产量计划
export function getOutputPlan(params) {
  return requst({
    url: '/api/part-src-prjs',
    method: 'GET',
    params: params
    // partOutputPlanReqDTO.purchaseProjectId
  })
}

// 更新产量计划
export function updateOutputPlan(params) {
  return requst({
    url: '/api/part-src-prjs',
    method: 'POST',
    data: params
  })
}

// 获取零件详情-每车用量
export function getPerCarDosageInfo(params) {
  return requst({
    url: '/tp-records/perCarDosage/info',
    method: 'POST',
    data: params
  })
}

// 获取零件详情-获取所有版本
export function getPerCarDosageVersion(params) {
  return requst({
    url: '/tp-records/perCarDosage/version',
    method: 'POST',
    data: params
  })
}

//拆分采购工厂
export function purchaseFactory(params){
  return requstPartResource({
    url: '/purchaseFactory',
    method: 'GET',
    params: params
  })
}