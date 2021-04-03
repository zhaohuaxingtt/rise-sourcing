/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2021-04-03 10:27:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\data.js
 */
import store from '@/store'
import {permissionTitle} from '@/utils'
export const tableTitle = permissionTitle("PERMISSION_TESTTABLE",[
  {props:'tpPartID',name:'信息单流水号',key: 'LK_XINXIDANLIUSHUIHAO',tooltip:false },
  {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO',tooltip:false},
  {props:'partNameCn',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG',tooltip:false},
  {props:'partNameDe',name:'零件名（德）',key: 'LK_LINGJIANMINGDE',tooltip:false},
  {props:'projectCarType',name:'车型项目',key: 'LK_CHEXINGXIANGMU',tooltip:false},
  {props:'buyerName',name:'前期采购员',key: 'LK_CAIGOUYUAN',tooltip:false},
  {props:'tpDeptNum',name:'设计科室',key: 'LK_SHEJIKESHI',tooltip:false},
  {props:'tpPrincepalName',name:'工程师',key: 'LK_GONGCHENGSHI',tooltip:false},
  {props:'tpInfoType',name:'信息单类型',key: 'LK_XINXIDANLEIXING',tooltip:false},
  {props:'status',name:'信息单状态',key: 'LK_XINXIDANZHUANGTAI',tooltip:false},
  {props:'attachmentStatus',name:'询价资料状态',key: 'LK_XUNJIAZILIAOZHUANGTAI',tooltip:false},
  {props:'partDosageStatus',name:'每车用量状态',key: 'LK_MEICHEYONGLIANGZHUANGTAI',tooltip:false}
])
export const needTranslate = [
  {name:'tpInfoType',key:'tp_info_type'}
]
//form
export const form = {
  attachmentStatus:'',//询价资料状态
  dept:'',//设计科室
  tpId:'',//信息单流水号
  partDosageStatus:'', //每次用量状态
  partNameZh:"",//零件中文名称
  partNum:'',//零件号
  projectCarType:'',//车型项目
  status:'',//信息单状态
  tpInfoType:'',//信息单分类
  userId:store.state.permission.userInfo.id
}
export const fromGroup = JSON.parse(JSON.stringify(form))
