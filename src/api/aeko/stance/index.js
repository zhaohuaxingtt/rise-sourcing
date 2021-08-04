/*
 * @Author: wentliao
 * @Date: 2021-07-30 15:59:41
 * @Description: aeko-linie-表态相关接口
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_PARTS)

// 获取查询
export function getLiniePage(data) {
    return requst({
      url: '/aeko/liniePage',
      method: 'POST',
      data,
    })
  }