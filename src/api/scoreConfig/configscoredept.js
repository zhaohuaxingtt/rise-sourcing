/*
 * @Author: wentliao
 * @Date: 2021-12-31 11:06:37
 * @Description: 评分部门设置
 */
import axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_SOURCING)

// 获取评分部门列表
export function getListSysRateDepart(data) {
  return requst({
    url: "/rfq-rate-departs/listSysRateDepart",
    method: "POST",
    data,
  })
}

// 根据标签获取所有的部门  
export function listDepartByTag(data) {
  return requst({
    url: `/rfq-rate-departs/listDepartByTag/${data.tagId}`,
    method: "POST",
  })
}

// 根据角色code获取相关用户数据  
export function listUserByRoleCode(params) {
  return requst({
    url: `/rfq-rate-departs/listUserByRoleCode/${params.roleCode}`,
    method: "GET",
  })
}

// 根据角色code获取相关用户数据
export function findRaterByCurrentUser() {
  return requst({
    url: `/rfq-sqe-ratings/findRaterByCurrentUser`,
    method: "GET",
  })
}


// 删除部门
export function departsDelete(data) {
  return requst({
    url: '/rfq-rate-departs/deleteSysRateDepart',
    method: 'DELETE',
    data,
  })
}


// 评分部门划定-新增
export function setSysRateDepart(data) {
  return requst({
    url: '/rfq-rate-departs/setSysRateDepart',
    method: "POST",
    data,
  })
}

// 编辑评分部门 
export function updateSysRateDepart(data) {
  return requst({
    url: '/rfq-rate-departs/updateSysRateDepart',
    method: 'PUT',
    data,
  })
}

// 根据部门id查询上级部门   
export function getParentDeptNum(params) {
  return requst({
    url: `/rfq-rate-departs/getParentsDepNum/${params.parentDeptId}`,
    method: "GET",
  })
}