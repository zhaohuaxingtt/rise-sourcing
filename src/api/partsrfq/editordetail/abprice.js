/*
 * @Author: your name
 * @Date: 2021-07-19 13:57:20
 * @LastEditTime: 2023-02-02 21:50:45
 * @LastEditors: 余继鹏 917955345@qq.com
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
      method: 'post',
      data:{
          hideList:hideList,
          rfqId:'',
          nomiId:nomiId,
          round:round
      }
  })
}

//supplier-横向
export function analysisSummaryNomi(data){
  return nego({
      url: `/nego-assistant/nego-analysis-summary/supplier/analysisSummaryNomi`,
      method: 'post',
      data
  })
}