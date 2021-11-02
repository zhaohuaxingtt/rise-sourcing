/*
 * @Author: your name
 * @Date: 2021-06-23 14:39:45
 * @LastEditTime: 2021-11-02 17:10:39
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\currentSupplier\data.js
 */
export const tableTileList = [
  {props:'supplierName',name:'现供供应商名称', key: "XGONGGYS", tooltip: true, width: ''},
  {props:'supplierSapCode',name:'供应商SAP号', key: "GONGYINGSNO", tooltip: true, width: ''},
  {props:'partNum',name:'零件号', key: "PARTNUMBER", tooltip: true, width: ''},
  {props:'partType',name:'零件类型', key: "LINGJIANLEIX", tooltip: true, width: ''},
  {props:'aprice',name:'A价', key: "APRICE", tooltip: true, width: ''},
  {props:'bprice',name:'B价', key: "BPRICE", tooltip: true, width: ''},
]

export const tabelTitleListLast = [
  {props:'qualtity',name:'现供份额(%)', key: "XIANGONGFENE", tooltip: true, width: ''},

]
export const priceTitle = [
  {props:'startDate', name:'开始时间', key:'NOMI_KAISHISHIJIAN', tooltip: true},
  {props:'price', name:'A价', key:'APRICE', tooltip: true},
  {props:'bprice', name:'B价', key:'BPRICE', tooltip: true,}
]