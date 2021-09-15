/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:54:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-14 12:43:44
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\data.js
 */

export const basicInfo = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', key: 'RFQBIANHAO', editable: false},
  {value: 'rfqName', label: 'RFQ名称', type: 'input', key: 'RFQMINGCHENG', editable: true},
  {value: 'rfqStatus', label: 'RFQ状态', type: 'input', key: 'RFQZHUANGTAI', editable: false},
  {value: 'rfqDesc', label: 'RFQ描述', type: 'input', key: 'RFQMIAOSHU', editable: true},
  {value: 'linieDept', label: 'LINIE科室', type: 'select', key: 'LINIEKESHI', editable: true, require:true, selectOption: 'LINIE_DEPT'},
  {value: 'linie', label: 'LINIE', type: 'select', key: 'LINIE', editable: true, selectOption: 'LINIE'},
  {value: 'g', label: 'RFQ创建日期', type: 'input', key: 'RFQCHUANGJIANRIQI', editable: false},
  {value: 'h', label: '询价采购员负责人', type: 'input', key: 'XUNJIACAIGOUYUANFUZEREN', editable: false}
]

export const tableTitle = [
  {props:'modelNameZh',name:'车型', key: "CHEXING", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名(中)', key: "LINGJIANMING_ZH", tooltip: true},
  {props:'procureFactory',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true},
  {props:'annualQuantity',name:'年需求量', key: "NIANXUQIULIANG", tooltip: true}
]

export const fileTableTitle = [
  {props:'modelNameZh',name:'车型', key: "CHEXING", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名(中)', key: "LINGJIANMING_ZH", tooltip: true},
  {props:'procureFactory',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true},
  {props:'channeng',name:'产能计划', key: "CHANNENGJIHUA", tooltip: true}
]

export const planTableTitle = [
  {props:'a',name:'年/月', key: "NIAN_YUE"},
  // {props:'a1',name:'2023-01', key: "", editable: true, type: 'input'},
  // {props:'a2',name:'2024-01', key: "", editable: true, type: 'input'},
  // {props:'bs',name:'2025-01', key: "", editable: true, type: 'input'},
  // {props:'cds',name:'2026-01', key: "", editable: true, type: 'input'},
  // {props:'dds',name:'2027-01', key: "", editable: true, type: 'input'}
]