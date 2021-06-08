/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 14:41:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 02:14:28
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\data.js
 */
export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "", tooltip: true, width: 120},
  {props:'spnrNum',name:'SP号', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'配件零件号', key: "", tooltip: true, width: 100},
  {props:'partNameCh',name:'配件零件中文名', key: "", tooltip: true, width: 120},
  {props:'carType',name:'配件车型', key: "", tooltip: true},
  {props:'deliveryWarehouse',name:'送货仓库', key: "", tooltip: true},
  {props:'supplierSapCode',name:'供应商SAP号', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'供应商中文名', key: "", tooltip: true, width: 120},
  {props:'sendDate',name:'需求发送日期', key: "", tooltip: true, width: 120},
  {props:'state',name:'配件状态', key: "", tooltip: true, width: 120},
  {props:'annualQuantity',name:'年需求量', key: "", tooltip: true},
  {props:'csfuserDeptName',name:'询价科室', key: "", tooltip: true},
  {props:'csfuserIdName',name:'询价采购员', key: "", tooltip: true, width: 100},
  {props:'respDeptName',name:'LINIE科室', key: "", tooltip: true, width: 100},
  {props:'respLinieName',name:'LINIE', key: "", tooltip: true, width: 100},
  {props:'partNameDe',name:'配件零件德文名', key: "", tooltip: true, width: 120},
  {props:'supplierSvwTempCode',name:'供应商临时号', key: "", tooltip: true, width: 120},
  {props:'carProject',name:'配件车型项目', key: "", tooltip: true, width: 120},
  {props:'technicianStaffName',name:'售后技术人员名称', key: "", tooltip: true, width: 120},
  {props:'brand',name:'品牌', key: "", tooltip: true},
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
  {value: 'carType', label: '配件车型', type: 'select', i18n_label: '',},
  {value: 'carProject', label: '配件车型项目', type: 'select', i18n_label: '',selectOption: 'carTypeOptions'},
  {value: 'state', label: '配件状态', type: 'select', i18n_label: '', selectOption: 'accessoryTypeOption'},
  {value: 'csfUserDept', label: '是否有询价科室', type: 'select', i18n_label: '', selectOption: 'yesOrNoOption'},
  {value: 'csfUserId', label: '是否有询价采购员', type: 'select', i18n_label: '', selectOption: 'yesOrNoOption'},
  {value: 'sendDate', label: '需求发送起止日期', type: 'date', i18n_label: '',}
]