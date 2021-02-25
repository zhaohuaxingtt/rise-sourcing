/*
 * @Author: yuszhou
 * @Date: 2021-02-25 11:07:22
 * @LastEditTime: 2021-02-25 11:08:48
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目创建模块API
 * @FilePath: \rise\src\api\partsprocure\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_MOCK)

//获取零件采购列表。
export function getTabelData(parmars){
  return requst({
    url:'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/ui/table',
    method:'POST',
    data:parmars
  })
}