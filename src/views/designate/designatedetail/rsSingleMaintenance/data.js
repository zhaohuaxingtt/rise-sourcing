/*
 * @Author: Luoshuang
 * @Date: 2021-05-24 15:31:35
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-04 16:03:11
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\rsSingleMaintenance\data.js
 */

export const rsTableTitle = [
  {props:'fsnrGsnrNum',name:'零件采购项目编号', key: "", tooltip: true, width: 150},
  {props:'partNo',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'partName',name:'零件名称', key: "", tooltip: true},
  {props:'supplierName',name:'厂商名', key: "", tooltip: true},
  {props:'supplierNo',name:'供应商', key: "", tooltip: true},
  {props:'e',name:'来源', key: "", tooltip: true},
  {props:'aprice',name:'A价', key: "", tooltip: false, editable: true, required: true, type: 'input', isChange: 'apriceIsChange'},
  {props:'bprice',name:'B价', key: "", tooltip: false, editable: true, required: true, type: 'input', isChange: 'bpriceIsChange'},
  {props:'investFee',name:'投资费(不含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120, isChange: 'investFeeIsChange'},
  {props:'investFeeIsShared',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: 'Y', label: '是'},{value: 'N', label: '否'}], isChange: 'investFeeIsShared'},
  {props:'devFee',name:'开发费(含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120, isChange: 'devFeeIsChange'},
  {props:'devFeeIsShared',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: 'Y', label: '是'},{value: 'N', label: '否'}], isChange: 'devFeeIsSharedIsChange'},
  {props:'beginYearReduce',name:'年降开始', key: "", tooltip: true},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 1,name:'LTC Date1', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange'},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 1,name:'LTC Rate1', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange'},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 2,name:'LTC Date2', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 2,name:'LTC Rate2', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 3,name:'LTC Date3', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 3,name:'LTC Rate3', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 4,name:'LTC Date4', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 4,name:'LTC Rate4', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 5,name:'LTC Date5', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 5,name:'LTC Rate5', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 6,name:'LTC Date6', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 6,name:'LTC Rate6', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 7,name:'LTC Date7', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 7,name:'LTC Rate7', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 8,name:'LTC Date8', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 8,name:'LTC Rate8', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
  {props:'ltcDate', parentProps: 'ltcs', propsIndex: 9,name:'LTC Date9', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130},
  {props:'ltcRate', parentProps: 'ltcs', propsIndex: 9,name:'LTC Rate9', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100},
]

export const rsMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]