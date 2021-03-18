import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)

export function getCountInfo(parmars) {
  return requst({
    url: '/task/inner/getCountInfo',
    method: 'GET',
    data: parmars
  })
}

export function getTaskList(parmars) {
  return requst({
    url: '/task/inner/getTaskList',
    method: 'POST',
    params: parmars
  })
}