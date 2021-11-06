// 岗位管理网络请求模块
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_POSITION)

//通过deptId，positionCode， fullNameZh查找岗位列表
export function fetchPositionList(data) {
  return request({
    url: '/web/position/apply/pageList',
    method: 'post',
    data,
  })
}

//批量删除岗位
export function deletePosition(data) {
  return request({
    url: '/web/position/apply/deleteBatch',
    method: 'post',
    data,
  })
}

//岗位选择列表
export function fetchPositionDropdownList(data) {
  return request({
    url: '/web/position/pageList',
    method: 'post',
    data,
  })
}

//添加岗位代理
export function applyPositionAgent(data) {
  return request({
    url: '/web/position/apply/submit',
    method: 'post',
    data,
  })
}


//岗位代理，轮岗保存，编辑
export function positionAgentSave(data) {
  return request({
    url: '/web/position/apply/saveOrUpdate',
    method: 'post',
    data,
  })
}


//轮岗申请提交
export function transferPositionApply(data) {
  return request({
    url: '/web/position/apply/submit',
    method: 'post',
    data,
  })
}


// //轮岗申请保存
// export function transferPositionSave(data) {
//   return request({
//     url: '/web/position/positionRotation/saveOrUpdate',
//     method: 'post',
//     data,
//   })
// }


//岗位申请，轮岗申请详情
export function positionAgentDetail(data) {
  return request({
    url: '/web/position/apply/detail',
    method: 'get',
    params: data
  })
}

