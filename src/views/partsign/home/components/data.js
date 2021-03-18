/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2021-03-18 19:39:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\data.js
 */

export const tableTitle = [
  {props:'tpPartID',name:'信息单流水号'},
  {props:'partNum',name:'零件号'},
  {props:'cpartNameCn',name:'零件名（中）'},
  {props:'partNameDe',name:'零件名（德）'},
  {props:'projectCarType',name:'车型项目'},
  {props:'tpDeptNum',name:'设计科室'},
  {props:'tpPrincepalName',name:'工程师'},
  {props:'tpInfoType',name:'信息单类型'},
  {props:'status',name:'信息单状态'},
  {props:'attachmentStatus',name:'询价资料状态'},
  {props:'partDosageStatus',name:'每车用量状态'}
]
//form
export const form = {
  attachmentStatus:'',//询价资料状态
  dept:'',//设计科室
  id:'',//信息单流水号
  partDosageStatus:'', //每次用量状态
  partNameZh:"",//零件中文名称
  partNum:'',//零件号
  projectCarType:'',//车型项目
  status:'',//信息单状态
  tpInfoType:'',//信息单分类
  userId:'1'
}
export const fromGroup = JSON.parse(JSON.stringify(form))