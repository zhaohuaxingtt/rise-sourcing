/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-06-03 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)
console.log(JSON.str)

// 获取定点管理列表
export function getNominationList(params) {
  return requst({
      url: `/nominate-apps/page`,
      method: "post",
      data: params
  })
}

// 批量撤回
export function batchRevoke(data) {
  return requst({
    url: `/nominate-apps/recall`,
    method: "post",
    data
})
}

// 批量删除
export function batchDelete(data) {
  return requst({
    url: `/nominate-apps/delete`,
    method: "post",
    data
})
}

// 导出
export function nominatExport(data) {
  return requst({
    url: `/nominate-apps/export`,
    method: "post",
    data
})
}

// 提交
export function nominatSubmit(data) {
  return requst({
    url: `/nominate-apps/submit`,
    method: "post",
    data
})
}

// 冻结
export function nominateRreeze(data) {
  return requst({
    url: '/nominate-apps/freeze',
    method: "post",
    data
  })
}

// 解冻
export function nominateUnRreeze(data) {
  return requst({
    url: '/nominate-apps/unfreeze',
    method: "post",
    data
  })
}

// 定点确认
export function nominateConfirm(data) {
  return requst({
    url: '/nominate-apps/nominate',
    method: "post",
    data
  })
}

// 获取车型项目
export function getCarTypePro(data) {
  return requst({
    url: '/part-src-prjs/car-type-pro',
    method: "GET"
    
  })
}


