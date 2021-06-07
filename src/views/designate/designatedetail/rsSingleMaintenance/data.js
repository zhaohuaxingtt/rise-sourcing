/*
 * @Author: Luoshuang
 * @Date: 2021-05-24 15:31:35
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 21:04:40
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\rsSingleMaintenance\data.js
 */

export const rsTableTitle = [
  {props:'fsnrGsnrNum',name:'零件采购项目编号', key: "", tooltip: true, width: 150},
  {props:'partNo',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'partName',name:'零件名称', key: "", tooltip: true},
  {props:'supplierName',name:'厂商名', key: "", tooltip: true},
  {props:'supplierId',name:'供应商', key: "", tooltip: true},
  {props:'prodLocation',name:'来源', key: "", tooltip: true},
  {props:'aprice',name:'A价', key: "", tooltip: false, editable: true, required: true, type: 'input', isChange: 'apriceIsChange'},
  {props:'bprice',name:'B价', key: "", tooltip: false, editable: true, required: true, type: 'input', isChange: 'bpriceIsChange'},
  {props:'investFee',name:'投资费(不含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120, isChange: 'investFeeIsChange'},
  {props:'investFeeIsShared',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: true, label: '是'},{value: false, label: '否'}], isChange: 'investFeeIsShared'},
  {props:'devFee',name:'开发费(含税)', key: "", tooltip: false, editable: true, required: true, type: 'input', width: 120, isChange: 'devFeeIsChange'},
  {props:'devFeeIsShared',name:'是否分摊', key: "", tooltip: false, editable: true, required: true, type: 'select', selectOption:[{value: true, label: '是'},{value: false, label: '否'}], isChange: 'devFeeIsSharedIsChange'},
  {props:'beginYearReduce',name:'年降开始', key: "", tooltip: true},
  {props:'ltcDate1', propsIndex: 1,name:'LTC Date1', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange1'},
  {props:'ltcRate1', propsIndex: 1,name:'LTC Rate1', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange1'},
  {props:'ltcDate2', propsIndex: 2,name:'LTC Date2', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange2'},
  {props:'ltcRate2', propsIndex: 2,name:'LTC Rate2', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange2'},
  {props:'ltcDate3', propsIndex: 3,name:'LTC Date3', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange3'},
  {props:'ltcRate3', propsIndex: 3,name:'LTC Rate3', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange3'},
  {props:'ltcDate4', propsIndex: 4,name:'LTC Date4', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange4'},
  {props:'ltcRate4', propsIndex: 4,name:'LTC Rate4', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange4'},
  {props:'ltcDate5', propsIndex: 5,name:'LTC Date5', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange5'},
  {props:'ltcRate5', propsIndex: 5,name:'LTC Rate5', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange5'},
  {props:'ltcDate6', propsIndex: 6,name:'LTC Date6', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange6'},
  {props:'ltcRate6', propsIndex: 6,name:'LTC Rate6', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange6'},
  {props:'ltcDate7', propsIndex: 7,name:'LTC Date7', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange7'},
  {props:'ltcRate7', propsIndex: 7,name:'LTC Rate7', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange7'},
  {props:'ltcDate8', propsIndex: 8,name:'LTC Date8', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange8'},
  {props:'ltcRate8', propsIndex: 8,name:'LTC Rate8', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange8'},
  {props:'ltcDate9', propsIndex: 9,name:'LTC Date9', key: "", tooltip: false, editable: true, required: true, type: 'date', width: 130, isChange: 'ltcDateIsChange9'},
  {props:'ltcRate9', propsIndex: 9,name:'LTC Rate9', key: "", tooltip: false, editable: true, required: true, type: 'rate', width: 100, isChange: 'ltcRateIsChange9'},
]

export const rsMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]