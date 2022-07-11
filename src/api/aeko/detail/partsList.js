/*
 * @Author: wentliao
 * @Date: 2021-08-03 14:20:04
 * @Description: 详情页--零件清单相关接口
 */


import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PR)
const requst_part = axios(process.env.VUE_APP_PART_API) // 零件服务

// 零件清单分页查询  
export function getPartPage(data) {
  return requst({
    url: '/aeko/part/page',
    method: 'POST',
    data,
  })
}

// 删除零件
export function deletePart(data) {
  return requst({
    url: '/aeko/part/delete',
    method: 'POST',
    data,
  })
}

// 分配科室
export function assignDept(data) {
  return requst({
    url: '/aeko/part/assign-dept',
    method: 'POST',
    data,
  })
}

// 分派采购员   
export function assignLinie(data) {
  return requst({
    url: '/aeko/part/assign-linie',
    method: 'POST',
    data,
  })
}

// 科室退回  
export function deptRollback(data) {
  return requst({
    url: '/aeko/part/dept-rollback',
    method: 'POST',
    data,
  })
}

// 根据零件号查询主数据信息
export function getpartInfo(params) {
  return requst({
    url: `/aeko/partCf/${params.partNum}`,
    method: 'GET',
    params,
  })
}

// 获取涉及PID列表
export function getPidList(params) {
  return requst({
    url: `/aeko/pid/${params.requirementAekoId}`,
    method: 'GET',
    params,
  })
}

// 新增aeko零件保存
export function addPart(data) {
  return requst({
    url: '/aeko/add-part',
    method: 'POST',
    data,
  })
}


// 零件清单内获取车型及车型项目的下拉框 
export function partListGetCartype(requirementAekoId) {
  return requst({
    url: `/aeko/part/getCartype/${requirementAekoId}`,
    method: 'GET',
  })
}

// 内容状态下拉框
export function searchContentStatus(params) {
  return requst({
    url: '/aeko/purchasing/search-content-status',
    method: 'GET',
    params,
  })
}


// 从AEKO查看跳转至零件清单的列表查询
export function getPartViewList(data) {
  return requst({
    url: '/aeko/aeko-content/part/view',
    method: 'POST',
    data,
  })
}

// 转派采购员
export function assignContent(data) {
  return requst({
    url: '/aeko/cover/assignContent',
    method: 'POST',
    data,
  })
}

// 变更车型项目
export function changePartProject(data) {
  return requst({
    url: '/aeko/part/changePartProject',
    method: 'POST',
    data,
  })
}

// 根据PID获取产品家族
export function productFamilyCartTypeAndCarTypePro(data) {
  return requst_part({
    url: '/api/productFamilyCartTypeAndCarTypePro',
    method: 'POST',
    data,
  })
}

// 获取车型项目
export function cartypeProByCondition(data) {
  return requst_part({
    url: '/api/cartypeProByCondition',
    method: 'POST',
    data,
  })
}

// 获取车型
export function cartypeListByCondition(data) {
  return requst_part({
    url: '/api/cartypeListByCondition',
    method: 'POST',
    data,
  })
}