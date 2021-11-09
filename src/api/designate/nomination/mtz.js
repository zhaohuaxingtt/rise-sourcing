/*
 * @Author: your name
 * @Date: 2021-11-08 19:29:42
 * @LastEditTime: 2021-11-09 16:58:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\api\designate\nomination\mtz.js
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_MTZ)

export function getFlowTypeList(parmars) {//mtz定点流程类型下拉
    return requst({
        url: '/mtzNomiList/getFlowTypeList',
        method: 'POST',
        data: parmars,
    })
}

export function getLocationApplyStatus(parmars) {//mtz定点申请状态下拉
    return requst({
        url: '/mtzNomiList/getLocationApplyStatus',
        method: 'POST',
        data: parmars,
    })
}

export function getAppTypeTypeList(parmars) {//mtz申请类型下拉
  return requst({
      url: '/mtzNomiList/getAppTypeTypeList',
      method: 'POST',
      data: parmars,
  })
}

// 获取table数据
export function getTableData(parmars) {
  return requst({
      url: '/mtzNomiList/pageMtzNomi',
      method: 'POST',
      data: parmars,
  })
}