/*
 * @Author: Luoshuang
 * @Date: 2021-08-30 10:57:18
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 16:57:05
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\part\data.js
 */

export const tableTitleNomi = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 150},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 150},
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true, minWidth: 150},
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true, minWidth: 90},
  {props:'scheNomiTimeKw',name:'定点soll1', key: "DINGDIANSOLL1", tooltip: true, minWidth: 120},
  {props:'scheKickoffTimeKw',name:'Kickoff soll2', key: "KICKOFFSOLL2", tooltip: true, minWidth: 120},
  {props:'scheFirstTryoutTimeKw',name:'1st tryout prognose', key: "1STTRYOUTPROGNOSE", tooltip: true, minWidth: 180},
  {props:'scheOtsTimeKw',name:'OTS prognose', key: "OTSPROGNOSE", tooltip: true, minWidth: 150},
  {props:'scheEmTimeKw',name:'EM prognose', key: "EMPROGNOSE", tooltip: true, minWidth: 150},
  {props:'delayWeek',name:'预计影响周数', key: "YUJIYINGXIANGZHOUSHU", tooltip: true, minWidth: 120},
  {props:'fs',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'sendDate',name:'发送时间', key: "FASONGSHIJIAN", tooltip: true, minWidth: 150},
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, minWidth: 120},
]

export const tableTitleKickoff = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 150},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 150},
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true, minWidth: 150},
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true, minWidth: 90},
  // {props:'productGroupDe',name:'定点soll1', key: "DINGDIANSOLL1", tooltip: true},
  {props:'scheKickoffTimeKw',name:'Kickoff soll1', key: "KICKOFFSOLL1", tooltip: true, minWidth: 120},
  {props:'scheFirstTryoutTimeKw',name:'1st tryout prognose', key: "1STTRYOUTPROGNOSE", tooltip: true, minWidth: 180},
  {props:'scheOtsTimeKw',name:'OTS prognose', key: "OTSPROGNOSE", tooltip: true, minWidth: 150},
  {props:'scheEmTimeKw',name:'EM prognose', key: "EMPROGNOSE", tooltip: true, minWidth: 150},
  {props:'delayWeek',name:'预计影响周数', key: "YUJIYINGXIANGZHOUSHU", tooltip: true, minWidth: 120},
  {props:'fs',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'sendDate',name:'发送时间', key: "FASONGSHIJIAN", tooltip: true, minWidth: 150},
  {props:'confirmDateDeadline',name:'确认截止日期', key: "QUERENJIEZHIRIQI", tooltip: true, minWidth: 120},
]

export const searchList = [
  {value: 'cartypeProId', name: '车型项目', key: 'CHEXINGXINAGMU', type: 'carProjectSelect', filterable: true, selectOption: 'carProjectOptions'},
  {value: 'partNum', name: '零件号', key: 'LINGJIANHAO', type: 'input'},
  {value: 'confirmStatus', name: '确认状态', key: 'QUERENZHUANGTAI', type: 'selectDict', selectOption: 'PART_SCHEDULE_CONFIRM_STATUS'},
  {value: 'fsId', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', type: 'fsSelect', filterable: true, selectOption: 'fsOptions'},
  {value: 'projectPurchaserId', name: '项目采购员', key: 'XIANGMUCAIGOUYUAN', type: 'productPurchaserSelect', filterable: true, selectOption: 'purchaseOptions'}
]