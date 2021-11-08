/*
 * @Author: your name
 * @Date: 2021-11-02 19:43:59
 * @LastEditTime: 2021-11-06 11:26:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\costanalysis\data.js
 */
export const arrayOfselect = [
  {label:'PCA',value:'PCA'},
  {label:'MEK',value:'MEK'},
  {label:'Price Index',value:'PI'},
  {label:'BoB',value:'BOB'},
  {label:'Volume Pricing',value:'VP'},
  {label:'TIA',value:'TIA'},
  {label:'报价趋势',value:'QT'},
]

export const tableTitle = [
  {props:'analysisName',name:'分析名称',key: 'LK_FENXIMINGC',tooltip:true},
  {props:'stuffName',name:'材料组',key: 'LK_CAILIAOZUBIANHAO',tooltip:true},
  {props:'rfqId',name:'RFQ号',key: 'LK_RFQHAO',tooltip:true},
  {props:'operate',name:'操作',key: 'LK_CAOZUO',tooltip:true},
  {props:'flag',name:'是否展示',key: 'LK_SHIFOUZHANSHI',tooltip:true},
  {props:'sortOrder',name:'排序',key: 'LK_PAIXU',tooltip:true},
]