/*
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-29 12:04:08
 * @LastEditTime: 2021-10-29 12:10:27
 * @LastEditors:  
 */
import  axios from "@/utils/axios"
const requst = axios(process.env.VUE_APP_SOURCING)

export function getMtzAttachmentPageList(data) {
    return requst({
      url:'/mtz/getMtzAttachmentPageList',
      method:'POST',
      data
    })
}
