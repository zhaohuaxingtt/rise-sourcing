/*
 * @Author: Luoshuang
 * @Date: 2021-07-28 16:01:20
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-27 15:11:21
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\part\components\fsconfirm\data.js
 */

export const tableTitleNomi = [
  {props:'carTypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true},
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true},
  {props:'scheNomiTimeKw',name:'定点soll1', key: "DINGDIANSOLL1", tooltip: true},
  {props:'scheKickoffTimeKw',name:'Kickoff soll2', key: "KICKOFFSOLL2", tooltip: true},
  {props:'scheFirstTryoutTimeKw',name:'1st tryout prognose', key: "1STTRYOUTPROGNOSE", tooltip: true},
  {props:'scheOtsTimeKw',name:'OTS prognose', key: "OTSPROGNOSE", tooltip: true},
  {props:'scheEmTimeKw',name:'EM prognose', key: "EMPROGNOSE", tooltip: true},
  {props:'delayWeek',name:'预计影响周数', key: "YUJIYINGXIANGZHOUSHU", tooltip: true},
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select'},
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, editable: true, type: 'date', width: 130},
]

export const tableTitleKickoff = [
  {props:'carTypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true},
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true},
  {props:'scheKickoffTimeKw',name:'Kickoff soll1', key: "KICKOFFSOLL1", tooltip: true},
  {props:'scheFirstTryoutTimeKw',name:'1st tryout prognose', key: "1STTRYOUTPROGNOSE", tooltip: true},
  {props:'scheOtsTimeKw',name:'OTS prognose', key: "OTSPROGNOSE", tooltip: true},
  {props:'scheEmTimeKw',name:'EM prognose', key: "EMPROGNOSE", tooltip: true},
  {props:'delayWeek',name:'预计影响周数', key: "YUJIYINGXIANGZHOUSHU", tooltip: true},
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select'},
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, editable: true, type: 'date', width: 130},
]