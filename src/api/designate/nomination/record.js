/*
 * @Description: 定点记录
 * @Author: lt
 * @Date: 2021-10-22 10:51:43
 * @LastEditTime: 2021-11-06 12:09:26
 * @LastEditors: Please set LastEditors
 */
import axios from "@/utils/axios"
import axiosFile from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_SOURCING)
const fileRequest = axiosFile(process.env.VUE_APP_SOURCING)
//定点管理-定点记录分页查询
export function getNomiApplicationPageList(data) {
    return request({
        url:'/nominate-apps/getNomiApplicationPageList',
        method:'POST',
        data
    })
}
//定点管理-导出定点记录excel
export function exportNomiRecordExcel(data) {
  return fileRequest({
    url:'/nominate-apps/exportNomiRecordExcel',
    method:'POST',
    data
  })
}

// 定点管理-定点记录详情
export function getNomiRecordDetailPageList(data) {
  return request({
    url:'/nominate-apps/getNomiRecordDetailPageList',
    method:'POST',
    data
  })
}