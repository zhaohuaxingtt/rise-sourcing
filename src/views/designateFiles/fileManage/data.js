/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 11:11:58
 * @Description: 
 * @FilePath: \front-web\src\views\designateFiles\fileManage\data.js
 */

export const tableTitle = [
  {props:'partNum',name:'附件零件号', key: "", tooltip: true, width: 100},
  {props:'spnrNum',name:'SP号', key: "", tooltip: true, width: 100},
  {props:'code',name:'编号', key: "", tooltip: true, width: 100},
  {props:'item',name:'导入项次', key: "", tooltip: true, width: 100},
  {props:'rfqId',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'csfuserDept',name:'CSF科室', key: "", tooltip: true, width: 100},
  {props:'csfuserId',name:'CSF', key: "", tooltip: true, width: 100},
  {props:'respDept',name:'LINIE科室', key: "", tooltip: true, width: 100},
  {props:'respLinie',name:'LINIE', key: "", tooltip: true, width: 100},
  {props:'status',name:'状态', key: "", tooltip: true, width: 100},
  {props:'partNameCh',name:'附件零件名称', key: "", tooltip: true, width: 100},
  {props:'carProject',name:'使用车型', key: "", tooltip: true, width: 100},
  {props:'carQty',name:'每车用量', key: "", tooltip: true},
  {props:'fujian',name:'附件', key: "", tooltip: true},
  {props:'timeToMarket',name:'附件上市时间', key: "", tooltip: true, width: 120},
  {props:'firstYearQty',name:'第1年需求量', key: "", tooltip: true, width: 120},
  {props:'secondYearQty',name:'第2年需求量', key: "", tooltip: true, width: 120},
  {props:'thirdYearQty',name:'第3年需求量', key: "", tooltip: true, width: 120},
  {props:'forthYearQty',name:'第4年需求量', key: "", tooltip: true, width: 120},
  {props:'fifthYearQty',name:'第5年需求量', key: "", tooltip: true, width: 120},
  {props:'sixthYearQty',name:'第6年需求量', key: "", tooltip: true, width: 120},
  {props:'seventhYearQty',name:'第7年需求量', key: "", tooltip: true, width: 120},
  {props:'eighthYearQty',name:'第8年需求量', key: "", tooltip: true, width: 120},
  {props:'ninthYearQty',name:'第9年需求量', key: "", tooltip: true, width: 120},
  {props:'tenthYearQty',name:'第10年需求量', key: "", tooltip: true, width: 120},
  {props:'purchasePrice',name:'建议采购价(不含税)', key: "", tooltip: true, width: 120},
  {props:'salesPrice',name:'建议销售价(不含税)', key: "", tooltip: true, width: 120},
  {props:'marketRetailPrice',name:'市场零售价(不含税)', key: "", tooltip: true, width: 120},
  {props:'accessoryDeptManager',name:'附件科主管人', key: "", tooltip: true, width: 120},
  {props:'remark',name:'备注', key: "", tooltip: true, width: 120},
  {props:'reason',name:'退回原因（仅股长可见）', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: '4324m234k32', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNum', label: '附件零件编号', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: '附件零件名称', type: 'input', i18n_label: '',},
  {value: 'carType', label: '使用车型', type: 'input', i18n_label: '',},
  {value: 'timeToMarket', label: '附件上市时间', type: 'date', i18n_label: '',},
  {value: 'deptId', label: '科室', type: 'select', i18n_label: '', selectOption: []},
  {value: 'linie', label: 'LINIE', type: 'select', i18n_label: '', selectOption: []},
  {value: 'code', label: '编号', type: 'input', i18n_label: '',},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'accessoryNum', label: '配件序号', type: 'input', i18n_label: '',},
  {value: 'isEop', label: '是否EOP', type: 'select', i18n_label: '', selectOption: []},
  {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', i18n_label: '',},
  {value: 'status', label: '状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'procureGroup', label: '参考采购组', type: 'input'},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', i18n_label: '',},
  {value: 'spNrNum', label: 'SP号', type: 'input', i18n_label: ''},
  {value: 'isShow', label: '是否自己', type: 'select', i18n_label: '', selectOption: []},
]

export const fileSearchList = [
  {value: 'a', label: '附件零件编号', type: 'input', i18n_label: '',},
  {value: 'b', label: '附件零件名称', type: 'input', i18n_label: '',},
  {value: 'c', label: '使用车型', type: 'input', i18n_label: '',},
  {value: 'd', label: '附件上市时间', type: 'date', i18n_label: '',},
]