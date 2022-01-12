/*
 * @Author: your name
 * @Date: 2021-07-19 13:57:20
 * @LastEditTime: 2022-01-07 14:45:24
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
//报价分析-供应商轴
export function fsSupplierAsRow(nomiId='',round='',hideList=[]){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/analysisSummaryArrayNomi`,
      //url: `https://www.fastmock.site/mock/5cd3e97d6126b18b5e16f3e499489335/api/nego-assistant/nego-analysis-summary/fs-supplier-as-row`,
      method: 'post',
      data:{
          hideList:hideList,
          rfqId:'',
          nomiId:nomiId,
          round:round
      }
  })
}