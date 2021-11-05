/*
 * @Author: your name
 * @Date: 2021-04-21 16:39:36
 * @LastEditTime: 2021-04-21 16:39:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-supplier\src\api\rfqManageMent\workedRfq\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER_RFQLIST)

/**
 * @description: 查询已结束RFQ信息
 * @param {*} parmars
 * @return {*}
 */
export function getWorkedList(parmars) {
  return requst({
      url: '/rfqs/findByRfqs',
      method: 'POST',
      data: parmars
  })
}

/**
 * @description: 查询定点状态下拉框数据
 * @param {*} parmars
 * @return {*}
 */
export function getDownBoxList(parmars) {
  return requst({
      url: '/rfqs/findDropDownBox',
      method: 'POST',
      data: parmars
  })
}