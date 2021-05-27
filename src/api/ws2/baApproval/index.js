import axios from '@/utils/axios'

const VUE_APP_BAAPPROVE = axios(process.env.VUE_APP_BAAPPROVE)


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