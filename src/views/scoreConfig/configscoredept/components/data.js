/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:28
 * @LastEditTime: 2022-01-12 16:24:39
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
  { props: "rateTag", name: "评分类型", key: "CONFIGSCOREDEPT_PINGFENLEIXING", tooltip: true },
  { props: "rateDepartNum", name: "评分股", key: "CONFIGSCOREDEPT_PINGFENGU", tooltip: true },
  { props: "rateDepart", name: "所属部门/科室", key: "CONFIGSCOREDEPT_SUOSHUBUMENHUOZHEKESHI", tooltip: true },
  { props: "raterList", name: "评分人", key: "CONFIGSCOREDEPT_PINGFENREN", tooltip: true },
  { props: "isCheck", name: "是否需要审批", key: "CONFIGSCOREDEPT_SHIFOUXUYAOSHENPI", tooltip: true },
  { props: "coordinatorList", name: "协调人", key: "CONFIGSCOREDEPT_XIETIAOREN", tooltip: true },
  { props: "nomiApprover", name: "定点审批人", key: "CONFIGSCOREDEPT_DINGDIANSHENPIREN", tooltip: true },
  { props: "updateTime", name: "修改时间", key: "CONFIGSCOREDEPT_XIUGAISHIJIAN", tooltip: true },
]

export const addDialogFrom=[
  {props:'rateTag',label:'评分类型',labelKey:'CONFIGSCOREDEPT_PINGFENLEIXING',type:'dicoption',optionKey:'score_dept',required:true},
  {props:'rateDepartNum',label:'评分股',labelKey:'CONFIGSCOREDEPT_PINGFENGU',type:'select',selectOption:'rateDepartNumList',required:true,isShow:true},
  {props:'rateDepart',label:'所属部门/科室',labelKey:'CONFIGSCOREDEPT_SUOSHUBUMENHUOZHEKESHI',isBoolean:true,isShow:true},
  {props:'raterList',label:'评分人',labelKey:'CONFIGSCOREDEPT_PINGFENREN',type:'select',selectOption:'raterList',required:true,clearable:true,multiple:true},
  {props:'isCheck',label:'是否需要审批',labelKey:'CONFIGSCOREDEPT_SHIFOUXUYAOSHENPI',required:true,type:'switch',isShow:true},
  {props:'coordinatorList',label:'协调人',labelKey:'CONFIGSCOREDEPT_XIETIAOREN',required:false,type:'select',selectOption:'coordinatorList',clearable:true,multiple:true},
  {props:'nomiApprover',label:'定点审批人',labelKey:'CONFIGSCOREDEPT_DINGDIANSHENPIREN',required:true,type:'select',selectOption:'nomiApprover',clearable:true,multiple:true},
]