/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:28
 * @LastEditTime: 2022-01-19 21:14:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\components\data.js
 */
export const queryForm = {
  deptNum: "",
  rateTag: "",
  userName:"",
}

export const tableTitle = [
  { props: "rateTag", name: "评分类型", tooltip: true },
  { props: "rateDepartNum", name: "评分股", tooltip: true },
  { props: "parentRateDepartNum", name: "所属部门/科室", tooltip: true },
  { props: "raterList", name: "评分人", tooltip: true },
  { props: "isCheck", name: "是否需要审批", tooltip: true },
  { props: "coordinatorList", name: "协调人", tooltip: true },
  { props: "willReviewApproverList", name: "上会复核审批人", tooltip: true },
  { props: "flowApproverList", name: "会外流转定点审批人", tooltip: true },
  { props: "updateTime", name: "修改时间", tooltip: true },
]

export const addDialogFrom=[
  {props:'rateTag',label:'评分类型',labelKey:'CONFIGSCOREDEPT_DIALOG_PINGFENLEIXING',type:'dicoption',optionKey:'score_dept',required:true},
  {props:'rateDepartNum',label:'评分股',labelKey:'CONFIGSCOREDEPT_DIALOG_PINGFENGU',type:'select',selectOption:'rateDepartNumList',required:true,isShow:true},
  {props:'parentRateDepartNum',label:'所属部门/科室',labelKey:'CONFIGSCOREDEPT_DIALOG_SUOSHUBUMENHUOZHEKESHI',isBoolean:true,isShow:true},
  {props:'raterList',label:'评分人',labelKey:'CONFIGSCOREDEPT_DIALOG_PINGFENREN',type:'select',selectOption:'raterList',required:true,clearable:true,multiple:true},
  {props:'isCheck',label:'是否需要审批',labelKey:'CONFIGSCOREDEPT_DIALOG_SHIFOUXUYAOSHENPI',required:true,type:'switch',isShow:true},
  {props:'coordinatorList',label:'协调人',labelKey:'CONFIGSCOREDEPT_DIALOG_XIETIAOREN',required:false,type:'select',selectOption:'coordinatorList',clearable:true,multiple:true},
  {props:'willReviewApproverList',label:'上会复核审批人',labelKey:'CONFIGSCOREDEPT_DIALOG_SHANGHUIFUHESHENPIREN',required:true,type:'select',selectOption:'willReviewApproverList',clearable:true,multiple:true},
  {props:'flowApproverList',label:'会外流转定点审批人',labelKey:'CONFIGSCOREDEPT_DIALOG_HUIWAILIUZHUANDINGDIANSHENPIREN',required:true,type:'select',selectOption:'flowApproverList',clearable:true,multiple:true},
]