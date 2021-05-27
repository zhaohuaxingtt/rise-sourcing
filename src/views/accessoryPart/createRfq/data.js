/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:54:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 14:47:47
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\data.js
 */

export const basicInfo = [
  {value: 'a', label: 'RFQ编号', type: 'input', i18n_label: '', editable: false},
  {value: 'b', label: 'RFQ名称', type: 'input', i18n_label: '', editable: false},
  {value: 'c', label: 'RFQ状态', type: 'input', i18n_label: '', editable: false},
  {value: 'd', label: 'RFQ描述', type: 'input', i18n_label: '', editable: true},
  {value: 'e', label: 'LINIE科室', type: 'select', i18n_label: '', editable: true, require},
  {value: 'f', label: 'LINIE', type: 'select', i18n_label: '', editable: true,},
  {value: 'g', label: 'RFQ创建日期', type: 'input', i18n_label: '', editable: false},
  {value: 'h', label: '询价采购员负责人', type: 'input', i18n_label: '', editable: false},
]

export const tableTitle = [
  {props:'a',name:'车型', key: "", tooltip: true},
  {props:'a1',name:'零件号', key: "", tooltip: true},
  {props:'a2',name:'零件名(中)', key: "", tooltip: true},
  {props:'b',name:'采购工厂', key: "", tooltip: true},
  {props:'c',name:'送货仓库', key: "", tooltip: true},
  {props:'d',name:'年需求量', key: "", tooltip: true}
]