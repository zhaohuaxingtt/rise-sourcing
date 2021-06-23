/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 13:47:12
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\query\data.js
 */


export const tableTitle = [
  {props:'sparePartCode',name:'FsNr/GsNr', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'零件名称', key: "", tooltip: true, width: 120},
  {props:'rfqNum',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'supplierSapCode',name:'CSF/CSS', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'LINIE', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'CF', key: "", tooltip: true, width: 120},
  {props:'csfuserDeptName',name:'LC_B', key: "", tooltip: true},
  {props:'annualQuantity',name:'LC_A', key: "", tooltip: true},
  {props:'brand',name:'RW价', key: "", tooltip: true},
  {props:'respDeptName',name:'采购工厂', key: "", tooltip: true, width: 100},
  {props:'supplierNameZh',name:'申请日期', key: "", tooltip: true, width: 120},
  {props:'partNameDe',name:'截止日期', key: "", tooltip: true, width: 120},
  {props:'fds',name:'返回日期', key: "", tooltip: true, width: 120},
  {props:'ds',name:'期望目标价', key: "", tooltip: true},
  {props:'sendDate',name:'审批状态', key: "", tooltip: true, width: 120},
  {props:'xiugai',name:'修改记录', key: "", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "", tooltip: true, width: 120},
  {props:'set',name:'SET属性', key: "", tooltip: true, width: 120},
  {props:'fdss',name:'指派状态', key: "", tooltip: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'FsNr/GsNr', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'supplierSapCode', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: '询价采购员', type: 'select', i18n_label: '',selectOption:''},
  {value: 'assemblyPartNum', label: 'CF', type: 'select', i18n_label: '',selectOption:''},
  {value: 'spnrNum', label: '申请状态', type: 'select', i18n_label: '',},
  {value: 'sparePartCode', label: 'RFQ编号', type: 'input', i18n_label: '',selectOption:''},
  {value: 'carType', label: '车型', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'carProject', label: '申请日期起止', type: 'date', i18n_label: '',selectOption: ''},
  {value: 'state', label: '返回日期起止', type: 'date', i18n_label: '', selectOption: ''},
  {value: 'csfUserDept', label: '零件状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'csfUserId', label: '采购工厂', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'sendDate', label: 'LINIE', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'sendDate', label: '目标价分类', type: 'select', i18n_label: '',},
  {value: 'sendDate', label: '零件项目类型', type: 'select', i18n_label: '',},
  {value: 'csfUserId', label: 'SET属性', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'sendDate', label: '审批状态', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'sendDate', label: '车型项目', type: 'select', i18n_label: '',},
  {value: 'sendDate', label: '指派状态', type: 'select', i18n_label: '',}
]
