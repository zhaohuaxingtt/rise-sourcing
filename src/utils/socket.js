export function socket(userId) {
  const socket = new window.SockJS(`http://10.160.137.37:8014/websocket/${ userId }`)
  const stompClient = window.Stomp.over(socket)
  return stompClient
}