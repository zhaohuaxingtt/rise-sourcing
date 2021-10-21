/*
 * @Author: Luoshuang
 * @Date: 2021-09-26 10:18:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-21 16:57:18
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\delaySummary\data.js
 */

export const tableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 150},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 100},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 100},
  {props:'partName',name:'零件中文名称', key: "LINGJIANZHONGWENMINGCHENG", tooltip: true, minWidth: 100},
  {props:'isBmg',name:'是否BMG', key: "SHIFOUBMG", tooltip: true, minWidth: 90},
  {props:'partPeriodDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true, minWidth: 120},
  {props:'planDate',name:'原计划时间', key: "YUANJIHUASHIJIAN", tooltip: true, minWidth: 120},
  {props:'delayWeek',name:'已延误周数', key: "YIYANWUZHOUSHU", tooltip: true, minWidth: 140},
  {props:'delayReason',name:'延误原因', key: "YANWUYUANYIN", tooltip: true, minWidth: 120},
  {props:'newPlanDate',name:'新计划时间', key: "XINJIAHUASHIJIAN", minWidth: 120},
  {props:'fs',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 120},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true, minWidth: 120 },
  {props:'sendDate',name:'发送时间', key: "FASONGSHIJIAN", tooltip: true, minWidth: 150},
  {props:'confirmDateDeadline',name:'回复截止日期', key: "HUIFUJIEZHIRIQI", tooltip: true, minWidth: 120},
  {props:'confirmDate',name:'实际回复日期', key: "SHIJIHUIFURIQI", tooltip: true, minWidth: 120},
]

export const searchList = [
  {value: 'projectId', name: '车型项目', key: 'CHEXINGXINAGMU', type: 'carProjectSelect', filterable: true, selectOption: 'carProjectOptions'},
  {value: 'partNum', name: '零件号', key: 'LINGJIANHAO', type: 'input'},
  {value: 'confirmStatus', name: '回复状态', key: 'HUIFUZHUANGTAI', type: 'selectDict', selectOption: 'CONFIRM_STATUS'},
  {value: 'fsId', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', type: 'fsSelect', filterable: true, selectOption: 'fsOptions'},
  {value: 'projectPurchaserId', name: '项目采购员', key: 'XIANGMUCAIGOUYUAN', type: 'productPurchaserSelect', filterable: true, selectOption: 'purchaseOptions'}
]