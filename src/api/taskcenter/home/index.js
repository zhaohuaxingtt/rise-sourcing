/*
 * @Author: your name
 * @Date: 2021-03-26 18:37:43
 * @LastEditTime: 2021-03-27 17:42:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\taskcenter\home\index.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)

export function getCountInfo(params) {
  return requst({
    url: `/task/inner/getCountInfo/${ params.userNum }`,
    method: 'GET'
  })
}

export function getTaskList(parmars) {
  return requst({
    url: '/task/inner/getTaskList',
    method: 'POST',
    params: parmars
  })
}

//上传API
export function upLoad(data){
  return requst({
    url:'/upload',
    method:"POST",
    data:data
  })
}

//下载
export function download(data){
  return requst({
    url:'/download',
    method:"POST",
    data:data
  })
}