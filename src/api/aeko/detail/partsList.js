/*
 * @Author: wentliao
 * @Date: 2021-08-03 14:20:04
 * @Description: 详情页--零件清单相关接口
 */


import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

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
