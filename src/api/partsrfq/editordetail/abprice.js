/*
 * @Author: your name
 * @Date: 2021-07-19 13:57:20
 * @LastEditTime: 2021-07-19 13:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\editordetail\abprice.js
 */
import axios from '@/utils/axios'
const nego = axios(process.env.VUE_APP_SOURCING)
//ab价-fs横轴
export function fsPartsAsRow(mimoId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/nomi-fs-parts-as-row/${mimoId}`,
      method: 'GET'
  })
}
//ab价-fs横轴
export function gsPartsAsRow(mimoId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/nomi-gs-parts-as-row/${mimoId}`,
      method: 'GET'
  })
}
//ab价-供应商轴
export function fsSupplierAsRow(mimoId){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/nomi-fs-supplier-as-row/${mimoId}`,
      method: 'GET'
  })
}