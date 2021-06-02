/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 17:00:45
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\data.js
 */

export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "", tooltip: true, width: 120},
  {props:'spnrNum',name:'SP号', key: "", tooltip: true, width: 120},
  {props:'rfqNum',name:'RFQ编号', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'配件零件号', key: "", tooltip: true, width: 100},
  {props:'partNameCh',name:'配件零件名称', key: "", tooltip: true, width: 120},
  {props:'supplierSapCode',name:'供应商SAP号', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'供应商中文名', key: "", tooltip: true, width: 120},
  {props:'respDeptName',name:'LINIE科室', key: "", tooltip: true, width: 100},
  {props:'respLinieName',name:'LINIE', key: "", tooltip: true, width: 100},
  {props:'csfUserDeptName',name:'询价科室', key: "", tooltip: true},
  {props:'csfUserIdName',name:'询价采购员', key: "", tooltip: true, width: 100},
  {props:'deliveryWarehouse',name:'送货仓库', key: "", tooltip: true},
  {props:'brand',name:'品牌', key: "", tooltip: true},
  {props:'state',name:'配件状态', key: "", tooltip: true, width: 120},
  {props:'isEop',name:'零件状态', key: "", tooltip: true, width: 120},
  {props:'signDate',name:'需求签收日期', key: "", tooltip: true, width: 120},
  {props:'carType',name:'配件车型', key: "", tooltip: true},
  {props:'carProject',name:'配件车型项目', key: "", tooltip: true},
  {props:'idState',name:'ID状态', key: "", tooltip: true},
  {props:'e',name:'价格类型', key: "", tooltip: true},
  {props:'tcUnitId',name:'单位', key: "", tooltip: true},
  {props:'sendDate',name:'需求发送日期', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNum', label: '配件零件号', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: '配件零件中文名', type: 'input', i18n_label: '',},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: '供应商中文名', type: 'input', i18n_label: '',},
  {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', i18n_label: '',},
  {value: 'spnrNum', label: 'SP号', type: 'input', i18n_label: '',},
  {value: 'sparePartCode', label: '编号', type: 'input', i18n_label: '',},
  {value: 'carType', label: '配件车型', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'carProject', label: '配件车型项目', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'state', label: '配件状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'respDept', label: 'LINIE科室', type: 'input', i18n_label: '',},
  {value: 'respLINIE', label: 'LINIE', type: 'input', i18n_label: '',},
  {value: 'csfUserDept', label: '询价科室', type: 'input'},
  {value: 'csfUserId', label: '询价采购员', type: 'input', i18n_label: '',},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'partState', label: '合同状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'cfTargetPrice', label: '是否有财务目标价', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'nomiType', label: '定点状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'idState', label: 'ID状态', type: 'select', i18n_label: '', selectOption: ''}
]