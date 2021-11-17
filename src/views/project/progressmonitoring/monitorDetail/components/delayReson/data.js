/*
 * @Author: Luoshuang
 * @Date: 2021-09-24 13:54:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-17 14:43:57
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\monitorDetail\components\delayReson\data.js
 */

export const tableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true}, 
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true}, 
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true}, 
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true}, 
  {props:'partNameDe',name:'零件德文名称', key: "LINGJIANDEWENMINGCHENG", tooltip: true},
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true}, 
  {props:'partPeriodDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true}, 
  {props:'planDate',name:'原计划时间', key: "YUANJIHUASHIJIAN", tooltip: true}, 
  {props:'delayWeek',name:'已延误周数', key: "YIYANWUZHOUSHU", tooltip: true}, 
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select'}, 
  {props:'confirmDateDeadline',name:'回复截止日期', key: "HUIFUJIEZHIRIQI", tooltip: true, editable: true, type: 'date', minWidth: 150}, 
]
