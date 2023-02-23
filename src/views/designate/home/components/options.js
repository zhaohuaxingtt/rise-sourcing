/*
 * @Author: your name
 * @Date: 2021-07-05 16:17:39
 * @LastEditTime: 2023-02-21 13:55:37
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 通用下拉值
 * @FilePath: /front-web/src/views/designate/home/components/options.js
 */

// 定点管理申请状态
export const nomiApplicationStatus = [
  {id:'NEW',name:'草稿',key:'LK_CAOGAO'},
  {id:'NOTPASS',name:'未通过',key:'LK_WEITONGGUO'},
  {id:'SUBMIT',name:'已提交',key:'LK_TIJIAO'},
  // {id:'NOTPASS',name:'未通过',key:'LK_WEITONGGUO'},
  {id:'PASS',name:'会议通过',key:'LK_HUIYITONGGUO'},
  {id:'CHECK_INPROCESS',name:'复核中',key:'LK_FUHEZHONG'},
  {id:'CHECK_PASS',name:'复核通过',key:'LK_FUHETONGGUO'},
  {id:'CHECK_FAIL',name:'复核未通过',key:'LK_FUHEWEITONGGUO'},
  {id:'FREEZE',name:'冻结',key:'LK_DONGJIE'},
  {id:'M_CHECK_INPROCESS',name:'M审批中',key:'LK_MSHENPIZHONG'},
  {id:'M_CHECK_PASS',name:'M审批通过',key:'LK_MSHENPITONGGUO'},
  {id:'M_CHECK_FAIL',name:'M退回',key:'LK_NOMIMTUIHUI'},
  {id:'ONFLOW',name:'流转中',key:'LK_SHENPILIUZHUAN'},
  // {id:'FINISHFLOW',name:'流转完成',key:'LK_LIUZHUANWANCHENG'},
  {id:'FLOWED',name:'流转完成',key:'LK_LIUZHUANWANCHENG'},
  {id:'NOMINATE',name:'定点',key:'LK_NOMIDINGDIANTITLE'},
]
// 申请状态与定点类型之间的联动
export const nomiApplicationObject = {
  MEETING: ['NEW', 'SUBMIT', 'NOTPASS', 'PASS', 'CHECK_INPROCESS', 'CHECK_PASS', 'CHECK_FAIL', 'FREEZE', 'M_CHECK_INPROCESS', 'M_CHECK_PASS', 'M_CHECK_FAIL', 'NOMINATE'],
  // TRANFORM: ['NEW', 'NOTPASS', 'SUBMIT', 'FREEZE', 'ONFLOW', 'FINISHFLOW', 'NOMINATE'],
  TRANFORM: ['NEW', 'NOTPASS', 'SUBMIT', 'FREEZE', 'ONFLOW', 'FLOWED', 'NOMINATE'],
  RECORD: ['NEW', 'SUBMIT', 'FREEZE', 'NOMINATE']
}

// 签字单详情，定点申请单 申请状态
export const applicationStatus = [
  {id:'NEW',name:'草稿',key:'LK_CAOGAO'},
  {id:'SUBMIT',name:'已提交',key:'LK_YITIJIAO'},
  {id:'FREEZE',name:'已冻结',key:'LK_YIDONGJIE'},
  {id:'ONFLOW',name:'流转中',key:'LK_LIUZHUANZHONG'},
  {id:'FINISHFLOW',name:'审批完成/流转完成',key:'LK_SHENPILIUZHUANWANCHENG'},
  {id:'NOMINATE',name:'已定点',key:'LK_YIDINGDIAN'},
  // {id:'NOTPASS',name:'未通过',key:'LK_WEITONGGUO'},
  {id:'PASS',name:'会议通过',key:'LK_HUIYITONGGUO'},
  {id:'CHECK_FAIL',name:'复核失败',key:'LK_FUHESHIBAI'},
  {id:'CHECK_INPROCESS',name:'复核中',key:'LK_FUHEZHONG'},
  {id:'CHECK_PASS',name:'复核通过',key:'LK_FUHETONGGUO'},
  {id:'CSC_PASS',name:'CSC会议通过',key:'LK_CSCHUIYITONGGUO'},
  {id:'M_CHECK_FAIL',name:'M审批退回',key:'LK_MSHENPITUIHUI'},
  {id:'M_CHECK_PASS',name:'M审批通过',key:'LK_MSHENPITONGGUO'},
  {id:'M_CHECK_INPROCESS',name:'M审批中',key:'LK_MSHENPIZHONG'},
  {id:'FLOWED',name:'流转完成',key:'LK_LIUZHUANWANCHENG'},
]

// 上会复核 申请状态
export const RSReviewApplicationStatus = [
  {id:'NEW',name:'草稿',key:'LK_CAOGAO'},
  {id:'SUBMIT',name:'已提交',key:'LK_YITIJIAO'},
  {id:'FREEZE',name:'冻结',key:'DONGJIE'},
  // {id:'NOTPASS',name:'未通过',key:'LK_WEITONGGUO'},
  {id:'PASS',name:'会议通过',key:'LK_HUIYITONGGUO'},
  {id:'CHECK_INPROCESS',name:'复核中',key:'LK_FUHEZHONG'},
  {id:'CHECK_PASS',name:'复核通过',key:'LK_FUHETONGGUO'},
  {id:'CHECK_FAIL',name:'复核未通过',key:'FUHEWEITONGGUO'},
  {id:'M_CHECK_INPROCESS',name:'M审核中',key:'MSHENHEZHONG'},
  {id:'M_CHECK_PASS',name:'M审批通过',key:'LK_MSHENPITONGGUO'},
  {id:'M_CHECK_FAIL',name:'M退回',key:'MTUIHUI'},
  {id:'NOMINATE',name:'定点',key:'DINGDIAN'},
]
// SEL单据确认状态
export const selStatus = [
  {id:'UNCONFIRMED',name:'未确认',key:'LK_SELWEIQUEREN'},
  {id:'CONFIRMED',name:'已确认',key:'LK_SELYIQUEREN'},
  {id:'UNAMORTIZED',name:'未分摊',key:'LK_SELWEIFENTAN'},
]
// SEL单据确认状态，签字单专用
export const signSheetselStatus = [
  {id:'CONFIRMED',name:'已确认',key:'LK_SELYIQUEREN'},
  {id:'UNAMORTIZED',name:'未分摊',key:'LK_SELWEIFENTAN'},
  {id:'NOTCONFIRMED',name:'无需确认',key:'无需确认'},
]
// 报价一致性校验
export const priceConsistentStatus = [
  {id:0,name:'未通过',key:'LK_WEITONGGUO'},
  {id:1,name:'通过',key:'TONGGUO'},
]
// 签字单状态
export const signSheetStatus =[
  {id:2,name:'草稿',key:'LK_CAOGAO'},
  {id:3,name:'审批中',key:'LK_SHENPIZHONG'},
  {id:4,name:'已通过',key:'YITONGGUO'},
  {id:1,name:'已拒绝',key:'LK_YIJUJUE'}
]