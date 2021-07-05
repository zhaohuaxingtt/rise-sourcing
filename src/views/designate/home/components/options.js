/*
 * @Author: your name
 * @Date: 2021-07-05 16:17:39
 * @LastEditTime: 2021-07-05 16:53:35
 * @LastEditors: Please set LastEditors
 * @Description: 通用下拉值
 * @FilePath: /front-web/src/views/designate/home/components/options.js
 */

// 定点管理申请状态
export const nomiApplicationStatus = [
  {id:'DRAFT',name:'草稿',key:'LK_CAOGAO'},
  {id:'SUBMIT',name:'提交中',key:'LK_TIJIAOZHONG'},
  {id:'FREERE',name:'已冻结',key:'LK_YIDONGJIE'},
  {id:'ONFLOW',name:'审批中/流转中',key:'LK_SHENPILIUZHUAN'},
  {id:'FINISHFLOW',name:'审批完成/流转完成',key:'LK_SHENPILIUZHUANWANCHENG'},
  {id:'NOMINATE',name:'已定点',key:'LK_YIDINGDIAN'},
]
// 签字单详情，定点申请单 申请状态
export const applicationStatus = [
  {id:'NEW',name:'草稿',key:'LK_CAOGAO'},
  {id:'SUBMIT',name:'已提交',key:'LK_YITIJIAO'},
  {id:'FREERE',name:'已冻结',key:'LK_YIDONGJIE'},
  {id:'ONFLOW',name:'流转中',key:'LK_LIUZHUANZHONG'},
  {id:'FINISHFLOW',name:'审批完成/流转完成',key:'LK_SHENPILIUZHUANWANCHENG'},
  {id:'NOMINATE',name:'已定点',key:'LK_YIDINGDIAN'},
  {id:'NOTPASS',name:'未通过',key:'LK_WEITONGGUO'},
  {id:'PASS',name:'通过',key:'LK_TONGGUO'},
  {id:'CHECK_FAIL',name:'复核失败',key:'LK_FUHESHIBAI'},
  {id:'CHECK_INPROCESS',name:'复核中',key:'LK_FUHEZHONG'},
  {id:'CHECK_PASS',name:'复核通过',key:'LK_FUHETONGGUO'},
  {id:'CSC_PASS',name:'CSC会议通过',key:'LK_CSCHUIYITONGGUO'},
  {id:'M_CHECK_FAIL',name:'M审批退回',key:'LK_MSHENPITUIHUI'},
  {id:'M_CHECK_INPROCESS',name:'M审批中',key:'LK_MSHENPIZHONG'},
  {id:'FLOWED',name:'流转完成',key:'LK_LIUZHUANWANCHENG'},
]
// SEL单据确认状态
export const selStatus = [
  {id:'Unconfirmed',name:'未确认',key:'LK_SELWEIQUEREN'},
  {id:'Confirmed',name:'已确认',key:'LK_SELYIQUEREN'},
  {id:'No_SEL',name:'未分摊',key:'LK_SELWEIFENTAN'},
]
// 报价一致性校验
export const priceConsistentStatus = [
  {id:0,name:'未通过',key:'LK_WEITONGGUO'},
  {id:1,name:'已通过',key:'LK_TONGGUO'},
]
// 签字单状态
export const signSheetStatus =[
  {id:'REJECT',name:'已拒绝',key:'LK_YIJUJUE'},
  {id:'DRAFT',name:'草稿',key:'LK_CAOGAO'},
  {id:'SUBMIT',name:'待审批',key:'LK_DAISHENPI'},
  {id:'PASS',name:'通过',key:'LK_TONGGUO'},
]