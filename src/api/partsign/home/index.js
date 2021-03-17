/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:55:16
 * @LastEditTime: 2021-03-17 22:08:05
 * @LastEditors: Please set LastEditors
 * @Description: 零件号签收列表
 * @FilePath: \rise\src\api\partsign\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_PARTS)

//获取信息单列表接口。
export function getTabelData(parmars){
  return requst({
    url:'/tp-records',
    method:'POST',
    data:{
      tpRecordsSenario:parmars
    }
  })
}
//获取列表上方Group信息
export function getPageGroup(userId){
  return requst({
    url:'/tp-records',
    method:'POST',
    data:{
      groupStatSenario:userId
    }
  })
}
//签收和退回新建信息单
export function qstuihui(data){
  return requst({
    url:'/tp-records',
    method:'PATCH',
    data:data
  })
}
export function getInquiryBuyerList(parmars){
  return requst({
    url:'https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/getUserList',
    method:'GET',
    data:parmars
  })
}
