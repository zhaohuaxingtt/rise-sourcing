/*
 * @Author: your name
 * @Date: 2021-05-25 21:01:30
 * @LastEditTime: 2021-06-02 14:38:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\data.js
 */

export const timeList = [
  {
    week:1,
    name:'首次报价',
    active:true
  },
  {
    week:2,
    name:''
  },
  {
    week:3,
    name:''
  },
  {
    week:4,
    name:''
  },
  {
    week:5,
    name:'首次报价'
  },
  {
    week:6,
    name:''
  },
  {
    week:7,
    name:''
  },
  {
    week:8,
    name:'首次报价A'
  },
  {
    week:9,
    name:''
  },
  {
    week:10,
    name:''
  },
  {
    week:11,
    name:'首次报价A'
  },
  {
    week:12,
    name:''
  },
  {
    week:13,
    name:''
  },
  {
    week:14,
    name:'首次报价A'
  }
]


export const iconList_car = { //汽车图标
  'a2':{
    icon:'iconbaojiafenxi-zhengchejindu-cheng' //橙色
  },
  'a3':{
    icon:'iconbaojiafenxi-zhengchejindu-hong' //红色
  },
  'a1':{
    icon:'iconbaojiafenxi-zhengchejindu-huang1' //黄色浅黄
  },
  'default':{
    icon:'icondingdianguanlijiedian-yiwancheng' //default
  }
}
export const iconList_all_times = { //整体任务进度以及每格进度
  'a2':{
    icon:'iconbaojiapingfengenzong-jiedian-lv' //绿色
  },
  'a3':{
    icon:'iconbaojiapingfengenzong-jiedian-huang' //红色
  },
  'a1':{
    icon:'iconbaojiapingfengenzong-jiedian-hei' //黑色
  },
  'a4':{
    icon:'iconbaojiapingfengenzong-jiedian-cheng' //橙色
  }
}


export const tableTile = [
  {props:'a',name:'供应商',key: '',tooltip:false,width:''},
  {props:'b',name:'第1轮(询价轮)',key: '',tooltip:false,width:'',type:'input'},
  {props:'c',name:'第2轮(询价轮)',key: '',tooltip:false,width:''},
  {props:'d',name:'第3轮(谈判轮)',key: '',tooltip:false,width:''},
  {props:'e',name:'第4轮(谈判轮)',key: '',tooltip:false,width:''},
  {props:'f',name:'第5轮(谈判轮)',key: '',tooltip:false,width:''},
  {props:'ep',name:'EP',key: '',tooltip:false,width:''},
  {props:'g',name:'MQ',key: '',tooltip:false,width:''},
  {props:'h',name:'PL',key: '',tooltip:false,width:''},
]


export const tableDatas = [
  {a:'0',b:'供应商1',c:'供应商1',d:'供应商1',e:'供应商1',f:'供应商1',ep:'1',g:'供应商1',h:'供应商1'},
  {a:'供应商1',b:'供应商1',c:'0',d:'供应商1',e:'供应商1',f:'1',ep:'1',g:'供应商1',h:'供应商1'}
]
