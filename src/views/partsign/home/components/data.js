/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2022-03-25 11:35:55
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsign\home\components\data.js
 */
import store from '@/store'
import {permissionTitle} from '@/utils'
// 暂时注释掉表头权限
// export const tableTitle = permissionTitle("PERMISSION_TESTTABLE",[
  export const tableTitle = [
  // {props:'tpPartID',name:'信息单流水号',key: 'LK_XINXIDANLIUSHUIHAO',tooltip:true ,width:100},
  {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO',tooltip:false,width:150, sortable: true},
  {props:'partNameCn',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG',tooltip:true,minWidth:100, sortable: true},
  {props:'partNameDe',name:'零件名（德）',key: 'LK_LINGJIANMINGDE',tooltip:true,minWidth:100, sortable: true},
  {props:'projectCarType',name:'车型项目',key: 'LK_CHEXINGXIANGMU',tooltip:true,minWidth:120, sortable: true},
  {props:'stuffName',name:'询价采购员',key: 'LK_CAIGOUYUANNEW',tooltip:true,minWidth:90, sortable: true},
  {props:'tpDeptNum',name:'设计科室',key: 'LK_SHEJIKESHI',tooltip:true,minWidth:100, sortable: true},
  {props:'tpPrincepalName',name:'工程师',key: 'LK_GONGCHENGSHI',tooltip:true,minWidth:90, sortable: true},
  {props:'tpInfoType',name:'信息单类型',key: 'LK_XINXIDANLEIXING',tooltip:true,minWidth:120, sortable: true},
  {props:'status',name:'信息单状态',key: 'LK_XINXIDANZHUANGTAI',tooltip:true,minWidth:125, sortable: true},
  {props:'attachmentStatus',name:'询价资料状态',key: 'LK_XUNJIAZILIAOZHUANGTAI',tooltip:true,minWidth:100, sortable: true},
  {props:'partDosageStatus',name:'每车用量状态',key: 'LK_MEICHEYONGLIANGZHUANGTAI',tooltip:true,minWidth:100, sortable: true}
]
export const needTranslate = [
  // {name:'tpInfoType',key:'tp_info_type',option: 'TP_INFO_TYPE'}
]
//form
export const form = {
  tpPrincepalName:'',
  attachmentStatus:'',//询价资料状态.默认查询 解决bug
  dept:'',//设计科室
  tpId:'',//信息单流水号
  partDosageStatus:'', //每次用量状态，默认查询 解决bug
  partNameZh:"",//零件中文名称
  partNum:'',//零件号
  projectCarType:'',//车型项目
  status: ['NOTACCEPTED', 'NOT_COMPLETE'], //信息单状态，默认查询 解决bug 未签收、未完整
  tpInfoType:'',//信息单分类
  userId:store.state.permission.userInfo?.id,
  showSelf: true
}
export const fromGroup = JSON.parse(JSON.stringify(form))
export const clickMessage = function(data) {
  if (data.url.indexOf("partsign") > -1) {
    return this.$router.push({
      path: "/sourceinquirypoint/sourcing/partsign",
      query: {
        status: "1"
      }
    })
  }

  if (data.url.indexOf("partsprocure") > -1) {
    return this.$router.push({
      path: "/sourcing/partsprocure",
      query: {
        partStatus: "10"
      }
    })
  }
}

export const TP_INFO_STATUS = {
  "ACCEPTED": "ACCEPTED", // 已签收
  "REFUSED": "REFUSED", // 已退回
}