/*
 * @Author: yuszhou
 * @Date: 2021-02-24 09:47:32
 * @LastEditTime: 2021-10-13 13:46:48
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsign\home\components\data.js
 */
import store from '@/store'
import {permissionTitle} from '@/utils'
// 暂时注释掉表头权限
// export const tableTitle = permissionTitle("PERMISSION_TESTTABLE",[
  export const tableTitle = [
  // {props:'tpPartID',name:'信息单流水号',key: 'LK_XINXIDANLIUSHUIHAO',tooltip:true ,width:100},
  {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO',tooltip:false,width:130},
  {props:'partNameCn',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG',tooltip:true,width:100},
  {props:'partNameDe',name:'零件名（德）',key: 'LK_LINGJIANMINGDE',tooltip:true,width:100},
  {props:'projectCarType',name:'车型项目',key: 'LK_CHEXINGXIANGMU',tooltip:true,width:120},
  {props:'stuffName',name:'询价采购员',key: 'LK_CAIGOUYUANNEW',tooltip:true,width:90},
  {props:'tpDeptNum',name:'设计科室',key: 'LK_SHEJIKESHI',tooltip:true,width:100},
  {props:'tpPrincepalName',name:'工程师',key: 'LK_GONGCHENGSHI',tooltip:true,width:90},
  {props:'tpInfoType',name:'信息单类型',key: 'LK_XINXIDANLEIXING',tooltip:true,width:120},
  {props:'status',name:'信息单状态',key: 'LK_XINXIDANZHUANGTAI',tooltip:true,width:80},
  {props:'attachmentStatus',name:'询价资料状态',key: 'LK_XUNJIAZILIAOZHUANGTAI',tooltip:true,minWidth:100},
  {props:'partDosageStatus',name:'每车用量状态',key: 'LK_MEICHEYONGLIANGZHUANGTAI',tooltip:true,minWidth:100}
]
export const needTranslate = [
  {name:'tpInfoType',key:'tp_info_type',option: 'TP_INFO_TYPE'}
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
  status:'NOTACCEPTED',//信息单状态，默认查询 解决bug
  tpInfoType:'',//信息单分类
  userId:store.state.permission.userInfo?.id
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
  "ACCEPTED": "2", // 已签收
  "REFUSED": "3", // 已退回
}