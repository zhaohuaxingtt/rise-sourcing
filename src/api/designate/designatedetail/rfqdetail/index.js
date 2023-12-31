/*
 * @Author: Luoshuang
 * @Date: 2021-06-02 19:27:08
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 20:52:13
 * @Description: 
 * @FilePath: \front-web\src\api\designate\designatedetail\rfqdetail\index.js
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取rfq list列表数据
export function getRfqList(nominateId) {
  return requst({
      url: `/nominate-create/rfq-List?nominateId=${nominateId}`,
      method: "GET",
  })
}

// 获取零件 list列表数据
export function getPartList(nominateId) {
  return requst({
      url: `/nominate-create/part-list?nominateId=${nominateId}`,
      method: "GET",
  })
}

export function updatePart(params) {
  return requst({
    url: '/nominate-create/update-part',
    method: 'POST',
    data: params
  })
}

export function deleteRfq(params) {
  return requst({
    url: '/nominate-create/del-rfq',
    method: 'POST',
    data: params
  })
}

// RFQ&零件清单-加入申请
export function addPartNominate(data) {
  return requst({
      url: '/nominate-create/addPartNominate',
      method: "POST",
      data,
  })
}

// RFQ&零件清单-取消申请
export function cancelPartNominate(data) {
  return requst({
      url: '/nominate-create/cancelPartNominate',
      method: "POST",
      data,
  })
}

// RFQ&零件清单-零件排序
export function sortPartNominate(data) {
  return requst({
      url: '/nominate-create/sortPartNominate',
      method: "POST",
      data,
  })
}
