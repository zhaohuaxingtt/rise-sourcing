/*
 * @Author: Luoshuang
 * @Date: 2021-09-24 13:54:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-08 14:56:32
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\monitorDetail\components\delayReson\data.js
 */

export const tableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true}, 
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true}, 
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true}, 
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true}, 
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true}, 
  {props:'partPeriod',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true}, 
  {props:'planDate',name:'原计划时间', key: "YUANJIHUASHIJIAN", tooltip: true}, 
  {props:'delayWeek',name:'已延误周数', key: "YIYANWUZHOUSHU", tooltip: true}, 
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select'}, 
  {props:'confirmDateDeadline',name:'回复截止日期', key: "HUIFUJIEZHIRIQI", tooltip: true, editable: true, type: 'date', width: 130}, 
]
