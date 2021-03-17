import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_URL)

export function getAllTaskType(parmars) {
  return requst({
    url: '/api/task/inner/getAllTaskType',
    method: 'GET',
    data: parmars
  })
}