/*
 * @Author: Luoshuang
 * @Date: 2021-05-24 15:31:35
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 17:57:09
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\rsSingleMaintenance\data.js
 */

export const rsTableTitle = [
  {props:'a',name:'零件采购项目编号', key: "", tooltip: true, width: 150},
  {props:'partNo',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'partName',name:'零件名称', key: "", tooltip: true},
  {props:'supplierName',name:'厂商名', key: "", tooltip: true},
  {props:'supplierNo',name:'供应商', key: "", tooltip: true},
  {props:'e',name:'来源', key: "", tooltip: true},
  {props:'aprice',name:'A价', key: "", tooltip: false, editable: true, required: true, type: 'input'},
  {props:'bprice',name:'B价', key: "", tooltip: false, editable: true, required: true, type: 'input'},
  {props:'investFee',name:'投资费(不含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120},
  {props:'investFeeIsShared',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: 'Y', label: '是'},{value: 'N', label: '否'}]},
  {props:'devFee',name:'开发费(含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120},
  {props:'devFeeIsShared',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: 'Y', label: '是'},{value: 'N', label: '否'}]},
  {props:'beginYearReduce',name:'年降开始', key: "", tooltip: true},
  {props:'ltcDate',name:'LTC Date1', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate1', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date2', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate2', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date3', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate3', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date4', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate4', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date5', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate5', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date6', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate6', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date7', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate7', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date8', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate8', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate',name:'LTC Date9', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate',name:'LTC Rate9', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
]

export const rsMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]