/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 11:44:24
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\data.js
 */

export const tableTitle = [
  {props:'a',name:'编号', key: "", tooltip: true, width: 120},
  {props:'a1',name:'SP号', key: "", tooltip: true, width: 120},
  {props:'a2',name:'RFQ编号', key: "", tooltip: true, width: 120},
  {props:'b',name:'批量供货总成号', key: "", tooltip: true, width: 120},
  {props:'c',name:'配件零件号', key: "", tooltip: true, width: 100},
  {props:'d',name:'配件零件名称', key: "", tooltip: true, width: 120},
  {props:'g',name:'供应商SAP号', key: "", tooltip: true, width: 120},
  {props:'h',name:'供应商中文名', key: "", tooltip: true, width: 120},
  {props:'n',name:'LINIE科室', key: "", tooltip: true, width: 100},
  {props:'o',name:'LINIE', key: "", tooltip: true, width: 100},
  {props:'l',name:'询价科室', key: "", tooltip: true},
  {props:'m',name:'询价采购员', key: "", tooltip: true, width: 100},
  {props:'f',name:'送货仓库', key: "", tooltip: true},
  {props:'t',name:'品牌', key: "", tooltip: true},
  {props:'j',name:'配件状态', key: "", tooltip: true, width: 120},
  {props:'j',name:'零件状态', key: "", tooltip: true, width: 120},
  {props:'i',name:'需求签收日期', key: "", tooltip: true, width: 120},
  {props:'e',name:'配件车型', key: "", tooltip: true},
  {props:'e',name:'配件车型项目', key: "", tooltip: true},
  {props:'e',name:'ID状态', key: "", tooltip: true},
  {props:'e',name:'价格类型', key: "", tooltip: true},
  {props:'e',name:'单位', key: "", tooltip: true},
  {props:'i',name:'需求发送日期', key: "", tooltip: true, width: 120},
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
  {value: 'h', label: '配件车型', type: 'input', i18n_label: '',},
  {value: 'i', label: '配件车型项目', type: 'input', i18n_label: '',},
  {value: 'j', label: '配件状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'h', label: 'LINIE科室', type: 'input', i18n_label: '',},
  {value: 'i', label: 'LINIE', type: 'input', i18n_label: '',},
  {value: 'j', label: '询价科室', type: 'input'},
  {value: 'h', label: '询价采购员', type: 'input', i18n_label: '',},
  {value: 'i', label: '零件状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'j', label: '合同状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'k', label: '是否有财务目标价', type: 'select', i18n_label: '', selectOption: []},
  {value: 'l', label: '定点状态', type: 'select', i18n_label: '', selectOption: []},
  {value: 'm', label: 'ID状态', type: 'select', i18n_label: '', selectOption: []}
]