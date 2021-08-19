/*
 * @Author: your name
 * @Date: 2021-05-28 17:30:52
 * @LastEditTime: 2021-08-19 12:54:49
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料api - attach
 * @FilePath: \front-web\src\api\designate\index.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取决策资料 - 文件列表
export function getdDecisiondataList(params) {
  return requst({
      url: `/file-histories/page/${params.nomiAppId}/${params.sortColumn}/${params.isAsc}/${params.fileType}/${params.pageNo}/${params.pageSize}`,
      method: "GET"
  })
}

export function getdDecisiondataListAll(params) {
  return requst({
      url: `/file-histories/file-history/${params.nomiAppId}/${params.sortColumn}/${params.isAsc}/${params.fileType}`,
      method: "GET"
  })
}

// 获取决策资料 - 上传文件
export function uploadfile(data) {
  return requst({
      url: `/file-histories/upload-file`,
      method: "POST",
      data
  })
}

// 获取决策资料 - 批量删除图纸
export function batchDeletefile(data) {
  return requst({
      url: `/file-histories/delete-files`,
      method: "DELETE",
      data
  })
}

// 获取决策资料 - 更新排序
export function updateSort(data) {
  return requst({
      url: `/file-histories/update-sort/${data.fileId}/${data.isUp}`,
      method: "PATCH",
      data
  })
}