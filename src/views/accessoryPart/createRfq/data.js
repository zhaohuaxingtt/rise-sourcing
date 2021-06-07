/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:54:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 13:45:29
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\data.js
 */

export const basicInfo = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: '', editable: false},
  {value: 'rfqName', label: 'RFQ名称', type: 'input', i18n_label: '', editable: false},
  {value: 'rfqStatus', label: 'RFQ状态', type: 'input', i18n_label: '', editable: false},
  {value: 'd', label: 'RFQ描述', type: 'input', i18n_label: '', editable: true},
  {value: 'e', label: 'LINIE科室', type: 'select', i18n_label: '', editable: true, require:true},
  {value: 'f', label: 'LINIE', type: 'select', i18n_label: '', editable: true,},
  {value: 'g', label: 'RFQ创建日期', type: 'input', i18n_label: '', editable: false},
  {value: 'h', label: '询价采购员负责人', type: 'input', i18n_label: '', editable: false}
]

export const tableTitle = [
  {props:'carType',name:'车型', key: "", tooltip: true},
  {props:'partNum',name:'零件号', key: "", tooltip: true},
  {props:'a2',name:'零件名(中)', key: "", tooltip: true},
  {props:'b',name:'采购工厂', key: "", tooltip: true},
  {props:'c',name:'送货仓库', key: "", tooltip: true},
  {props:'d',name:'年需求量', key: "", tooltip: true}
]

export const fileTableTitle = [
  {props:'carType',name:'车型', key: "", tooltip: true},
  {props:'partNum',name:'零件号', key: "", tooltip: true},
  {props:'partNameCh',name:'零件名(中)', key: "", tooltip: true},
  {props:'b',name:'采购工厂', key: "", tooltip: true},
  {props:'c',name:'送货仓库', key: "", tooltip: true},
  {props:'channeng',name:'产能计划', key: "", tooltip: true}
]

export const planTableTitle = [
  {props:'a',name:'年/月', key: ""},
  // {props:'a1',name:'2023-01', key: "", editable: true, type: 'input'},
  // {props:'a2',name:'2024-01', key: "", editable: true, type: 'input'},
  // {props:'bs',name:'2025-01', key: "", editable: true, type: 'input'},
  // {props:'cds',name:'2026-01', key: "", editable: true, type: 'input'},
  // {props:'dds',name:'2027-01', key: "", editable: true, type: 'input'}
]