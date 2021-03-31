/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2021-03-31 16:22:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\data.js
 */
import store from '@/store'
import {permissionTitle} from '@/utils'
export const tableTitle = permissionTitle("PERMISSION_TESTTABLE",[
  {props:'tpPartID',name:'信息单流水号',key: 'LK_XINXIDANLIUSHUIHAO' },
  {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO'},
  {props:'partNameCn',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG'},
  {props:'partNameDe',name:'零件名（德）',key: 'LK_LINGJIANMINGDE'},
  {props:'projectCarType',name:'车型项目',key: 'LK_CHEXINGXIANGMU'},
  {props:'buyerName',name:'采购员',key: 'LK_CAIGOUYUAN'},
  {props:'tpDeptNum',name:'设计科室',key: 'LK_SHEJIKESHI'},
  {props:'tpPrincepalName',name:'工程师',key: 'LK_GONGCHENGSHI'},
  {props:'tpInfoType',name:'信息单类型',key: 'LK_XINXIDANLEIXING'},
  {props:'status',name:'信息单状态',key: 'LK_XINXIDANZHUANGTAI'},
  {props:'attachmentStatus',name:'询价资料状态',key: 'LK_XUNJIAZILIAOZHUANGTAI'},
  {props:'partDosageStatus',name:'每车用量状态',key: 'LK_MEICHEYONGLIANGZHUANGTAI'}
])
export const needTranslate = [
  {name:'projectCarType',key:'project_car_type'},
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
