import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_BASE_URL)

// 获取消息数量
export function getCountInMail(parmars) {
  return requst({
    url: '/sys/message/sysMessage/countInMail',
    method: 'GET',
    params: parmars
  })
}

// 获取消息列表
export function queryByPage(parmars, options) {
  return requst({
    url: '/sys/message/sysMessage/queryByPage',
    method: 'GET',
    params: parmars,
    ...options
  })
}

// 逻辑删除消息
export function batchLogicDeleteMsgById(parmars) {
  return requst({
    url: '/sys/message/sysMessage/batchLogicDeleteMsgById',
    method: 'DELETE',
    params: parmars
  })
}
