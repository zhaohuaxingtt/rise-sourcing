// 岗位管理网络请求模块
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_POSITION)
const requestOrg = axios(process.env.VUE_APP_ORGANIZATION)
const requestOrigin = axios()

//通过deptId，positionCode， fullNameZh查找岗位列表
export function GetOrgList(data) {
  return requestOrg({
    url: '/web/dept/treeList',
    method: 'post',
    data: data
  })
}

// 下属岗位分配获取dept 详情
export function GetOrgDetail(data) {
  return requestOrg({
    url: '/web/dept/detail',
    method: 'get',
    params: data
  })
}

//通过deptId，positionCode， fullNameZh查找岗位列表
export function getPositionListByParams(data) {
  return request({
    url: '/web/position/pageList',
    method: 'post',
    data: data
  })
}

//获取岗位标签
export function GetTagsByCatagory(data) {
  return request({
    url: '/web/tag/list',
    method: 'post',
    data: data
  })
}

//获取权限维度列表（岗位）
export function GetPositionPermissionList(data) {
  return request({
    url: '/web/permission/positionPermissionList',
    method: 'get',
    params: data
  })
}

//获取角色列表
export function GetRoleList(data) {
  return request({
    url: '/web/role/dropDownList',
    method: 'post',
    data: data
  })
}

//获取岗位详情
export function GetPositionDetail(data) {
  return request({
    url: '/web/position/detail',
    method: 'get',
    params: data
  })
}

//新建岗位保存
export function SavePosition(data) {
  return request({
    url: '/web/position/save',
    method: 'post',
    data: data
  })
}

//更新岗位保存
export function UpdatePosition(data) {
  return request({
    url: '/web/position/update',
    method: 'post',
    data: data
  })
}

//批量删除岗位
export function DeletePosition(data) {
  return request({
    url: '/web/position/deleteBatch',
    method: 'post',
    data: data
  })
}

//获取下属岗位列表
export function GetSubPositionList(data) {
  return request({
    url: '/web/position/subPositionList',
    method: 'post',
    data: data
  })
}

//获取可选用户
export function GetSubPositionsUserList(data) {
  return request({
    url: '/web/position/subPositionsUserList',
    method: 'get',
    params: data
  })
}
/////////////////////////////////////////////
export function GetSubDOptions(data) {
  return requestOrigin({
    // url: '/subPosApi/options',
    url: '/web/position/mpOptionsForOrg',
    method: 'post',
    data: data
  })
}

export function GetSubList(data) {
  return requestOrigin({
    url: '/web/position/positionList',
    method: 'post',
    data: data
  })
}

export function GetUndistributed(data) {
  return requestOrigin({
    // url: '/subPosApi/unDistributed',
    url: '/web/position/unDistributed',
    method: 'post',
    data: data
  })
}
