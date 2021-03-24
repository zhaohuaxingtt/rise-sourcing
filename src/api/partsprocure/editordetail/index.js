import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTSPROCURE)

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

