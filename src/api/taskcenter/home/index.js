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