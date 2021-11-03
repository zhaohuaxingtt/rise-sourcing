/*
 * @Author: Luoshuang
 * @Date: 2021-07-28 16:01:20
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 17:26:47
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\part\components\fsconfirm\data.js
 */

export const tableTitleNomi = [ 
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 120}, 
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 120}, 
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120}, 
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true, minWidth: 130}, 
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true, minWidth: 100}, 
  {props:'scheNomiTimeKw',name:'定点soll1', key: "DINGDIANSOLL1", tooltip: true, minWidth: 120}, 
  {props:'scheKickoffTimeKw',name:'Kickoff soll2', key: "KICKOFFSOLL2", tooltip: true, minWidth: 150}, 
  {props:'scheFirstTryoutTimeKw',name:'1st tryout prognose', key: "1STTRYOUTPROGNOSE", tooltip: true, minWidth: 180}, 
  {props:'scheOtsTimeKw',name:'OTS prognose', key: "OTSPROGNOSE", tooltip: true, minWidth: 130}, 
  {props:'scheEmTimeKw',name:'EM prognose', key: "EMPROGNOSE", tooltip: true, minWidth: 130}, 
  {props:'delayWeek',name:'预计影响周数', key: "YUJIYINGXIANGZHOUSHU", tooltip: true, minWidth: 150}, 
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select', minWidth: 120}, 
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, editable: true, type: 'date', minWidth: 180}, 
]

export const tableTitleKickoff = [ 
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 120}, 
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 120}, 
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120}, 
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true, minWidth: 130}, 
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true, minWidth: 100}, 
  {props:'scheKickoffTimeKw',name:'Kickoff soll1', key: "KICKOFFSOLL1", tooltip: true, minWidth: 150}, 
  {props:'scheFirstTryoutTimeKw',name:'1st tryout prognose', key: "1STTRYOUTPROGNOSE", tooltip: true, minWidth: 180}, 
  {props:'scheOtsTimeKw',name:'OTS prognose', key: "OTSPROGNOSE", tooltip: true, minWidth: 130}, 
  {props:'scheEmTimeKw',name:'EM prognose', key: "EMPROGNOSE", tooltip: true, minWidth: 130}, 
  {props:'delayWeek',name:'预计影响周数', key: "YUJIYINGXIANGZHOUSHU", tooltip: true, minWidth: 150}, 
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select', minWidth: 120}, 
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, editable: true, type: 'date', minWidth: 180}, 
] 
