/*
 * @Author: your name
 * @Date: 2021-11-08 19:29:42
 * @LastEditTime: 2021-11-09 16:58:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\api\designate\nomination\mtz.js
 */
import axios from "@/utils/axios"

const request = axios(process.env.VUE_APP_MTZ)

// 获取table数据
export function getTableData(parmars) {
  return request({
      url: '/mtzNomiList/mtzNomiList',
      method: 'POST',
      data: parmars,
  })
}