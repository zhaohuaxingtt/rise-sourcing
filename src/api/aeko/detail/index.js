/*
 * @Author: your name
 * @Date: 2021-07-28 14:58:07
 * @LastEditTime: 2021-08-06 15:35:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\aeko\detail\index.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PARTS)
const partRequst = axios(process.env.VUE_APP_PARTSPROCURE)

export function getAekoLiniePartInfo(params) {
  return requst({
    url: '/aeko/aeko-linie-part/info',
    method: 'POST',
    data: params
  })
}

// 无关相关切换
export function patchAekoReference(params) {
  return requst({
    url: `/aeko/aeko-reference`,
    method: 'PATCH',
    data: params
  })
}

// 重置表态
export function patchAekoReset(params) {
  return requst({
    url: `/aeko/aeko-reset`,
    method: 'PATCH',
    data: params
  })
}

// 提交表态
export function patchAekoContent(params) {
  return requst({
    url: `/aeko/aeko-content`,
    method: 'PATCH',
    data: params
  })
}

// 判断当前用户是否拥有跳转原零件列表的权限
export function judgeRight(params) {
  return partRequst({
    url: '/judgeRight',
    method: 'POST',
    data: params
  })
}

// 获取指定台账库原零件列表
export function getAekoOriginPartInfo(params) {
  return requst({
    url: '/aeko/aeko-origin-part/info',
    method: 'POST',
    data: params
  })
}

// 获取原零件的历史A价列表
export function getAekoOriginPartAPrice(params) {
  return requst({
    url: '/aeko/aeko-origin-part/A-price',
    method: 'POST',
    data: params
  })
}

// 保存原零件A价
export function saveAekoOriginPart(params) {
  return requst({
    url: '/aeko/aeko-origin-part',
    method: 'POST',
    data: params
  })
}

// 获取Aeko车型项目
export function getAekoCarProject(params) {
  return requst({
    url: `/aeko/aeko-car-project/${ params.objectAekoPartId }`,
    method: 'GET',
  })
}

// 获取每车用量列表
export function getAekoCarDosage(params) {
  return requst({
    url: `/aeko/aeko-car-dosage`,
    method: 'POST',
    data: params
  })
}

// 根据车型项目获取每车用量数据
export function getAekoCarDosageByCarTypeProjectCode(params) {
  return requst({
    url: `/aeko/aeko-project-change/${ params.carTypeProjectCode }`,
    method: 'GET'
  })
}

// 获取每车用量列表
export function saveAekoCarDosage(params) {
  return requst({
    url: `/aeko/aeko-car-dosage/save`,
    method: 'PATCH',
    data: params
  })
}

// 获取以登陆人为范围的aeko下的零件列表
export function getAekoContentPart(params) {
  return requst({
    url: '/aeko/aeko-content/part',
    method: 'POST',
    data: params
  }) 
}

// 获取AEKO详情 
export function getAekoDetail(params) {
  return requst({
    url: '/aeko/purchasing/detail',
    method: 'GET',
    params,
  })
}