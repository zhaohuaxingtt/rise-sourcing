/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 19:53:25
 * @Description: 
 * @FilePath: \front-web\src\views\designateFiles\fileManage\data.js
 */

export const tableTitle = [
  {props:'a',name:'附件零件号', key: "", tooltip: true, width: 100},
  {props:'a1',name:'SP号', key: "", tooltip: true, width: 100},
  {props:'a2',name:'编号', key: "", tooltip: true, width: 100},
  {props:'b',name:'导入项次', key: "", tooltip: true, width: 100},
  {props:'c',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'d',name:'CSF科室', key: "", tooltip: true, width: 100},
  {props:'g',name:'CSF', key: "", tooltip: true, width: 100},
  {props:'h',name:'LINIE科室', key: "", tooltip: true, width: 100},
  {props:'n',name:'LINIE', key: "", tooltip: true, width: 100},
  {props:'o',name:'状态', key: "", tooltip: true, width: 100},
  {props:'l',name:'附件零件名称', key: "", tooltip: true, width: 100},
  {props:'m',name:'使用车型', key: "", tooltip: true, width: 100},
  {props:'f',name:'每车用量', key: "", tooltip: true},
  {props:'fujian',name:'附件', key: "", tooltip: true},
  {props:'j',name:'附件上市时间', key: "", tooltip: true, width: 120},
  {props:'j',name:'第1年需求量', key: "", tooltip: true, width: 120},
  {props:'i',name:'第2年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'第3年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'第4年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'第5年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'第6年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'第7年需求量', key: "", tooltip: true, width: 120},
  {props:'i',name:'第8年需求量', key: "", tooltip: true, width: 120},
  {props:'i',name:'第9年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'第10年需求量', key: "", tooltip: true, width: 120},
  {props:'e',name:'建议采购价(不含税)', key: "", tooltip: true, width: 120},
  {props:'e',name:'建议销售价(不含税)', key: "", tooltip: true, width: 120},
  {props:'e',name:'市场零售价(不含税)', key: "", tooltip: true, width: 120},
  {props:'e',name:'附件科主管人', key: "", tooltip: true, width: 120},
  {props:'i',name:'备注', key: "", tooltip: true, width: 120},
  {props:'i',name:'退回原因（仅股长可见）', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: '4324m234k32', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'a', label: '附件零件编号', type: 'input', i18n_label: '',},
  {value: 'b', label: '附件零件名称', type: 'input', i18n_label: '',},
  {value: 'c', label: '使用车型', type: 'input', i18n_label: '',},
  {value: 'd', label: '附件上市时间', type: 'date', i18n_label: '',},
  {value: 'e', label: '科室', type: 'select', i18n_label: '', selectOption: []},
  {value: 'f', label: 'LINIE', type: 'select', i18n_label: '', selectOption: []},
  {value: 'g', label: '编号', type: 'input', i18n_label: '',},
  {value: 'h', label: '零件状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'i', label: '配件序号', type: 'input', i18n_label: '',},
  {value: 'j', label: '是否EOP', type: 'select', i18n_label: '', selectOption: []},
  {value: 'h', label: '批量供货总成号', type: 'input', i18n_label: '',},
  {value: 'i', label: '状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'j', label: '参考采购组', type: 'input'},
  {value: 'h', label: '供应商SAP号', type: 'input', i18n_label: '',},
  {value: 'i', label: 'SP号', type: 'input', i18n_label: ''},
  {value: 'j', label: '是否自己', type: 'select', i18n_label: '', selectOption: []},
]

export const fileSearchList = [
  {value: 'a', label: '附件零件编号', type: 'input', i18n_label: '',},
  {value: 'b', label: '附件零件名称', type: 'input', i18n_label: '',},
  {value: 'c', label: '使用车型', type: 'input', i18n_label: '',},
  {value: 'd', label: '附件上市时间', type: 'date', i18n_label: '',},
]