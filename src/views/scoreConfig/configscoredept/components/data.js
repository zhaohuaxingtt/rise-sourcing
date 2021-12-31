/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:28
 * @LastEditTime: 2021-12-31 12:01:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\components\data.js
 */
export const queryForm = {
  rateDepartNum: "",
  rateTag: ""
}

export const tableTitle = [
  { props: "rateTag", name: "评分类型", key: "CONFIGSCOREDEPT_PINGFENLEIXING", tooltip: true },
  { props: "a", name: "评分股", key: "CONFIGSCOREDEPT_PINGFENGU", tooltip: true },
  { props: "b", name: "所属部门/科室", key: "CONFIGSCOREDEPT_SUOSHUBUMENHUOZHEKESHI", tooltip: true },
  { props: "c", name: "评分人", key: "CONFIGSCOREDEPT_PINGFENREN", tooltip: true },
  { props: "d", name: "是否需要审批", key: "CONFIGSCOREDEPT_SHIFOUXUYAOSHENPI", tooltip: true },
  { props: "e", name: "协调人", key: "CONFIGSCOREDEPT_XIETIAOREN", tooltip: true },
  { props: "f", name: "定点审批人", key: "CONFIGSCOREDEPT_DINGDIANSHENPIREN", tooltip: true },
  { props: "g", name: "修改时间", key: "CONFIGSCOREDEPT_XIUGAISHIJIAN", tooltip: true },
]

export const addDialogFrom=[
  {props:'a',label:'评分类型',labelKey:'CONFIGSCOREDEPT_PINGFENLEIXING',type:'select',selectOption:'a',required:true,},
  {props:'b',label:'评分股',labelKey:'CONFIGSCOREDEPT_PINGFENGU',type:'select',selectOption:'b',required:true,},
  {props:'c',label:'所属部门/科室',labelKey:'CONFIGSCOREDEPT_SUOSHUBUMENHUOZHEKESHI',isBoolean:true,required:true,},
  {props:'d',label:'评分人',labelKey:'CONFIGSCOREDEPT_PINGFENREN',type:'select',selectOption:'d',required:true,},
  {props:'e',label:'是否需要审批',labelKey:'CONFIGSCOREDEPT_SHIFOUXUYAOSHENPI',required:true,type:'switch'},
  {props:'f',label:'协调人',labelKey:'CONFIGSCOREDEPT_XIETIAOREN',required:true,type:'select',selectOption:'f'},
  {props:'g',label:'定点审批人',labelKey:'CONFIGSCOREDEPT_DINGDIANSHENPIREN',required:true,type:'select',selectOption:'g'},
]