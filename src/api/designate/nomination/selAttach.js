/*
 * @Author: Hao Jiang
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-06-03 11:12:59
 * @LastEditors: Please set LastEditors
 * @Description: sel 上会复核附件部分
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取sel 复核附件列表
export function getNomiSelAttachList(params) {
  return requst({
      url: `/nominate/sel/list/${params.hostId}/${params.sortColumn}/${params.isAsc}/${params.fileType}`,
      method: "post",
      data: params
  })
}

// sel单据上传
export function batchUploadSelAttach(params) {
  return requst({
      url: `/nominate/sel/upload`,
      method: "post",
      data: params
  })
}

// sel单据删除
export function batchDeleteSelAttach(params) {
  return requst({
      url: `/nominate/sel/delete`,
      method: "post",
      data: params
  })
}


