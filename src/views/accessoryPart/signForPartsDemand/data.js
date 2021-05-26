/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 14:41:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-25 15:54:41
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\components\signForPartsDemand\data.js
 */
export const tableTitle = [
  {props:'a',name:'编号', key: "", tooltip: true, width: 120},
  {props:'a1',name:'SP号', key: "", tooltip: true, width: 120},
  {props:'b',name:'批量供货总成号', key: "", tooltip: true, width: 120},
  {props:'c',name:'配件零件号', key: "", tooltip: true, width: 100},
  {props:'d',name:'配件零件中文名', key: "", tooltip: true, width: 120},
  {props:'e',name:'配件车型', key: "", tooltip: true},
  {props:'f',name:'送货仓库', key: "", tooltip: true},
  {props:'g',name:'供应商SAP号', key: "", tooltip: true, width: 120},
  {props:'h',name:'供应商中文名', key: "", tooltip: true, width: 120},
  {props:'i',name:'需求发送日期', key: "", tooltip: true, width: 120},
  {props:'j',name:'配件状态', key: "", tooltip: true, width: 120},
  {props:'k',name:'年需求量', key: "", tooltip: true},
  {props:'l',name:'询价科室', key: "", tooltip: true},
  {props:'m',name:'询价采购员', key: "", tooltip: true, width: 100},
  {props:'n',name:'LINIE科室', key: "", tooltip: true, width: 100},
  {props:'o',name:'LINIE', key: "", tooltip: true, width: 100},
  {props:'p1',name:'配件零件德文名', key: "", tooltip: true, width: 120},
  {props:'q',name:'供应商临时号', key: "", tooltip: true, width: 120},
  {props:'r',name:'配件车型项目', key: "", tooltip: true, width: 120},
  {props:'s',name:'售后技术人员名称', key: "", tooltip: true, width: 120},
  {props:'t',name:'品牌', key: "", tooltip: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'a', label: '配件零件号', type: 'input', i18n_label: '',},
  {value: 'b', label: '配件零件中文名', type: 'input', i18n_label: '',},
  {value: 'c', label: '供应商SAP号', type: 'input', i18n_label: '',},
  {value: 'd', label: '供应商中文名', type: 'input', i18n_label: '',},
  {value: 'e', label: '批量供货总成号', type: 'input', i18n_label: '',},
  {value: 'f', label: 'SP号', type: 'input', i18n_label: '',},
  {value: 'g', label: '编号', type: 'input', i18n_label: '',},
  {value: 'h', label: '配件车型', type: 'select', i18n_label: '',},
  {value: 'i', label: '配件车型项目', type: 'select', i18n_label: '',},
  {value: 'j', label: '配件状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'k', label: '是否有询价科室', type: 'select', i18n_label: '', selectOption: []},
  {value: 'l', label: '是否有询价采购员', type: 'select', i18n_label: '', selectOption: []},
  {value: 'm', label: '需求发送起止日期', type: 'date', i18n_label: '',}
]