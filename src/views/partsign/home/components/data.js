/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2021-03-16 15:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\data.js
 */
export const tableTitle = [
  {props:'a',name:'信息单流水号'},
  {props:'b',name:'零件号'},
  {props:'c',name:'零件名（中）'},
  {props:'d',name:'零件名（德）'},
  {props:'e',name:'车型项目'},
  {props:'f',name:'设计科室'},
  {props:'g',name:'工程师'},
  {props:'h',name:'信息单类型'},
  {props:'i',name:'信息单状态'},
  {props:'j',name:'询价资料状态'},
  {props:'k',name:'每车用量状态'}
]
//信息单状态
export const typeOfxxd = [
  {value:'1',label:'未签收'},
  {value:'2',label:'签收'},
  {value:'3',label:'退回'},
  {value:'4',label:'中止'},
]
//询价资料状态
export const typeOfxjzl = [
  {value:'0',label:'未完整'},
  {value:'1',label:'完整'}
]
//每车用量状态
export const typeOfmcylzt = [
  {value:'0',label:'未完整'},
  {value:'1',label:'完整'}
]