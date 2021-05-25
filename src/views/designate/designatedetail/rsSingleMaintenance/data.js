/*
 * @Author: Luoshuang
 * @Date: 2021-05-24 15:31:35
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-24 17:41:24
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\rsSingleMaintenance\data.js
 */

export const rsTableTitle = [
  {props:'a',name:'零件采购项目编号', key: "", tooltip: true, width: 150},
  {props:'a1',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'b',name:'零件名称', key: "", tooltip: true},
  {props:'c',name:'厂商名', key: "", tooltip: true},
  {props:'d',name:'供应商', key: "", tooltip: true},
  {props:'e',name:'来源', key: "", tooltip: true},
  {props:'f',name:'A价', key: "", tooltip: false, editable: true, required: true, type: 'input'},
  {props:'g',name:'B价', key: "", tooltip: false, editable: true, required: true, type: 'input'},
  {props:'h',name:'投资费(不含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120},
  {props:'i',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: 'Y', label: '是'},{value: 'N', label: '否'}]},
  {props:'j',name:'开发费(含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120},
  {props:'k',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: 'Y', label: '是'},{value: 'N', label: '否'}]},
  {props:'l',name:'年降开始', key: "", tooltip: true},
  {props:'m',name:'LTC Date1', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'n',name:'LTC Rate1', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
]

export const rsMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]