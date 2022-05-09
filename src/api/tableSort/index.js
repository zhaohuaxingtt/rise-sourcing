import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_USER_CENTER)

// 获取保存的表头
export function getUserListMemory(data){
  return requst({
    url: '/getUserListMemory',
    method: 'POST',
    data
  })
}

// 保存表头
export function configUserListMemory(data) {
  return requst({
    url: '/configUserListMemory',
    method: 'POST',
    data
  }) 
}