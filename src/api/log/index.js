import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)

export function queryByPage(params) {
  return requst({
    url: '/itLog/inner/queryByPage',
    method: 'GET',
    params: params
  })
}
