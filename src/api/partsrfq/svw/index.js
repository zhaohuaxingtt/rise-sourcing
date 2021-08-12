
 import axios from '@/utils/axios'

 const requst = axios(process.env.VUE_APP_SUPPLIER_SVW)

 
 // 总览
 export function marketOverview(data) {
   return requst({
     url: '/web/aon/marketOverview/marketOverview',
     method: 'POST',
     data: data
   })
 }
  // 保存总览
  export function saveMarketOverview(data) {
    return requst({
      url: '/web/aon/marketOverview/marketOverviewSave',
      method: 'POST',
      data: data
    })
  }
 
 
 