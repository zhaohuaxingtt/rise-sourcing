const getWs = (getWsUrl, onMessage) => {
  // 首页 socket
  let ws = new WebSocket(getWsUrl())

  let isClose = false

  const _close = () => {
    console.log('>><<Socket close>><<')
    ws.close()
    isClose = true
  }

  ws.onmessage = message => {
    console.log('>><<收到消息>><<')
    !isClose && onMessage(message && message.data && JSON.parse(message.data))
  }

  ws.onerror = () => {
    console.log('>><<Socket Error>><<')
    _close()
  }

  ws.onopen = () => {
    console.log('>><< Socket connect >><<')
  }

  return {
    close: _close
  }
}

/**
 * 获取 socket
 *  机制 4分钟重连一次
 *
 * @param getWsUrl
 * @param onMessage
 */
export const getSocket = (getWsUrl, onMessage) => {
  let isClose = false
  let timer
  let re = () => {
    let ws = getWs(getWsUrl, onMessage)

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      if (isClose) return
      ws.close()

      re()
    }, 240000)

    return ws
  }

  let ws = re()

  return () => {
    ws.close()

    isClose = true
  }
}
