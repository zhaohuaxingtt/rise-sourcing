/*
 * @Author: your name
 * @Date: 2021-07-28 14:58:07
 * @LastEditTime: 2021-11-16 17:22:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\aeko\detail\index.js
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'

import router from '../../../router/index'

const supplierId = ()=> router.currentRoute.query.supplierId?router.currentRoute.query.supplierId:''

const requst = axios(process.env.VUE_APP_PARTS)
const souringRequst = axios(process.env.VUE_APP_SOURCING)
const partRequst = axios(process.env.VUE_APP_PARTSPROCURE)
const priceRequst = axios(process.env.VUE_APP_PRICE_LEDGER)
const fileRequst = download(process.env.VUE_APP_PARTS)

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


// 获取指定AEKO库原零件列表
export function getAekoLibraryInfo(data) {
  return requst({
    url: '/aeko/aeko-library/info',
    method: 'POST',
    data,
  })
}


// 获取原零件的历史A价列表
// export function getAekoOriginPartAPrice(params) {
//   return requst({
//     url: '/aeko/aeko-origin-part/A-price',
//     method: 'POST',
//     data: params
//   })
// }
export function getAekoOriginPartAPrice(params) {
  return priceRequst({
    url: '/aprice/findRecordList',
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
    url: `/aeko/aeko-project-change?carTypeProjectCode=${ params.carTypeProjectCode }`,
    method: 'POST',
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

// 获取aeko采购工厂下拉框
export function getAekoOriginFactory(params) {
  return requst({
    url: `/aeko/aeko-origin-factory/${ params.objectAekoPartId }`,
    method: 'GET'
  })
}

// 发送供应商报价
export function sendSupplier(data) {
  return requst({
    // url: '/aeko/aeko-content/supplier',
    url: '/aeko/aeko-content/sendSupplierQuotation',
    method: 'POST',
    data,
  }) 
}

// 发送供应商报价之前校验一品多点 
export function sendSupplierCheck(data) {
  return requst({
    url: '/aeko/aeko-content/check',
    method: 'POST',
    data,
  }) 
}


// 导出内容表态列表数据
export function liniePartExport(data) {
  return fileRequst({
    url: '/aeko/aeko-linie-part/export',
    method: 'POST',
    data,
  }) 
}


// 内容表态--撤回
export function cancelContent(data) {
  return requst({
    url: '/aeko/cover/cancelContent',
    method: 'POST',
    data,
  }) 
}

// 内容表态--指定投资车型项目查询
export function getInvestCarProject(data) {
  return requst({
    url: '/aeko/get/aeko-invest-car-project',
    method: 'POST',
    data,
  })
}

// 内容表态--指定投资车型项目更新
export function updateInvestCarProject(data) {
  return requst({
    url: '/aeko/update/aeko-invest-car-project',
    method: 'PUT',
    data,
  })
}

// 内容表态--获取价格轴数据
export function getPriceAxis(objectAekoPartId) {
  return requst({
    url: `/aeko/price-axis/${objectAekoPartId}`,
    method: 'GET',
  })
}


// 保存开发费
export function saveModuleDevFee(params) {
  return souringRequst({
    url: `/aeko/mould/save/saveDevFee?supplierId=${supplierId()}`,
    method: 'POST',
    data: params
  })
}

// 内容表态-搜索栏-投资车型项目下拉数据
export function searchInvestCar(requirementAekoId) {
  return requst({
    url: `/aeko/purchasing/search-invest-car/project/${requirementAekoId}`,
    method: 'GET',
  })
}
// 推荐表-已审批列表查询
export function searchApproved(requirementAekoId) {
  return requst({
    url: `/aeko/view/approved/${requirementAekoId}`,
    method: 'GET',
  })
}
// 保存一对多，多对一组合
export function saveCombination(params) {
  return requst({
    url: `/aeko/save/combination`,
    method: 'POST',
    data: params
  })
}

// 修改组合名称
export function updateGroupName(params) {
  return requst({
    url: `/aeko/update/groupName`,
    method: 'POST',
    data: params
  })
}

// 取消组合名称
export function cancelCombination(params) {
  return requst({
    url: `/aeko/cancel/combination`,
    method: 'POST',
    data: params
  })
}

// 内容表态导入
export function importItemExcel(data) {
  return requst({
    url: '/aeko/importItemExcel',
    method: 'POST',
    data,
  })
}


// aeko-列表查询-linie下拉【只针对零件清单的下拉数据】
export function searchLinie(params) {
  return requst({
    url: '/aeko/purchasing/part/search-linie',
    method: 'GET',
    params,
  })
}