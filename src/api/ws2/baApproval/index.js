import axios from '@/utils/axios'

const VUE_APP_BAAPPROVE = axios(process.env.VUE_APP_TOOLING  + '/baApprove')


//获取tab数量
export function getBaCount(parmars) {
    return VUE_APP_BAAPPROVE({
        url: '/getBaCount',
        method: 'GET',
        data: parmars
    })
}

//获取BA状态列表
export function getBaPullDown(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/getBaPullDown',
      method: 'GET',
      data: parmars
  })
}

//获取申请人列表
export function getApplyUserPullDown(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/getApplyUserPullDown',
      method: 'GET',
      data: parmars
  })
}

//获取采购工厂列表
export function getLocalFactoryPullDown(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/getLocalFactoryPullDown',
      method: 'GET',
      data: parmars
  })
}

//获取全部列表
export function findListConditoons(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/findListConditoons',
      method: 'POST',
      data: parmars
  })
}

//按tab获取列表
export function listByStatus(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/listByStatus',
      method: 'POST',
      data: parmars
  })
}

//修改A号
export function updateSixBa(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/updateSixBa',
      method: 'POST',
      data: parmars
  })
}

//退回申请
export function backApprove(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/backApprove',
      method: 'POST',
      data: parmars
  })
}

//明细
export function getDetail(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/detail',
      method: 'GET',
      params: parmars
  })
}

//  确认A号
export function addSixBa(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/addSixBa',
      method: 'POST',
      data: parmars
  })
}

//  确认金额
export function updateByCarId(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/updateByCarId',
      method: 'POST',
      data: parmars
  })
}

//  确认详情列表
export function confirmDetail(parmars) {
  return VUE_APP_BAAPPROVE({
      url: '/confirmDetail',
      method: 'POST',
      data: parmars
  })
}
