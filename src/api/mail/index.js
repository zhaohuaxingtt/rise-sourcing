import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_MAIL)
import { getSocket } from '@/utils/webSocket'
import store from '@/store'

/*单条消息清除 */
export function removeMailById(params) {
  return requst({
    url: '/InMail/cleanInMailByIds',
    method: 'GET',
    params: params
  })
}

/*根据tab全部清除 */
export function removeMailBatch(data) {
  return requst({
    url: '/InMail/cleanInMail',
    method: 'POST',
    data: data
  })
}

/*单条消息已读 */
export function readMailById(params) {
  return requst({
    url: '/InMail/readMessageByIds',
    method: 'GET',
    params: params
  })
}

/*根据tab全部已读 */
export function readMailBatch(data) {
  return requst({
    url: '/InMail/readMessage',
    method: 'POST',
    data: data
  })
}

/*获取tab下的subType下拉列表 */
export function getTypeOptionsByTab(params) {
  return requst({
    url: '/InMail/getInMailSubType',
    method: 'GET',
    params: params
  })
}

/* 获取tab下mail列表 */
export function getMailList(data) {
  return requst({
    url: '/InMail/getInMailPage',
    method: 'POST',
    data: data
  })
}

/*获取tab下的未读数 */
export function getUnreadCount(data) {
  return requst({
    url: '/InMail/countCount',
    method: 'POST',
    data: data
  })
}

/*获取未读数total */
export function getUnreadTotal(params) {
  return requst({
    url: '/InMail/countUnReadInMail',
    method: 'GET',
    params: params
  })
}

export const getHomeSocket = () => process.env.VUE_APP_SOCKET + store.state.permission?.userInfo?.accountId

/* 实时获取消息 */

export const getHomeSocketMessage = onMessage => {
  console.log('store', store.state)
  return getSocket(getHomeSocket, message => {
    onMessage(message)
  })
}
