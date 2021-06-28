/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-24 15:53:38
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\query\data.js
 */


export const tableTitle = [
  {props:'fsNum',name:'FsNr/GsNr', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名称', key: "", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'',name:'CSF/CSS', key: "", tooltip: true, width: 120},
  {props:'linieName',name:'LINIE', key: "", tooltip: true, width: 120},
  {props:'cfControllerZh',name:'CF', key: "", tooltip: true, width: 120},
  {props:'lcB',name:'LC_B', key: "", tooltip: true},
  {props:'lcA',name:'LC_A', key: "", tooltip: true},
  {props:'rwPrice',name:'RW价', key: "", tooltip: true},
  {props:'procureFactory',name:'采购工厂', key: "", tooltip: true, width: 100},
  {props:'applyDate',name:'申请日期', key: "", tooltip: true, width: 120},
  {props:'applyDateEnd',name:'截止日期', key: "", tooltip: true, width: 120},
  {props:'responseDate',name:'返回日期', key: "", tooltip: true, width: 120},
  {props:'expTargetpri',name:'期望目标价', key: "", tooltip: true},
  {props:'approveStatsName',name:'审批状态', key: "", tooltip: true, width: 120},
  {props:'xiugai',name:'修改记录', key: "", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "", tooltip: true, width: 120},
  {props:'setKz',name:'SET属性', key: "", tooltip: true, width: 120},
  {props:'isAssign',name:'指派状态', key: "", tooltip: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'fsNum', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'buyerId', label: '询价采购员', type: 'select', i18n_label: '',selectOption:''},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: '',selectOption:'CF_CONTROL'},
  {value: 'applyStats', label: '申请状态', type: 'select', i18n_label: '',selectOption:''},
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: ''},
  {value: 'carTypeCode', label: '车型', type: 'select', i18n_label: '',selectOption: 'cartTypeOptions'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: ''},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: ''},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'procureFactoryId', label: '采购工厂', type: 'select', i18n_label: '', selectOption: 'PURCHASE_FACTORY'},
  {value: 'linieId', label: 'LINIE', type: 'select', i18n_label: '',selectOption: 'LINIE'},
  {value: 'lcPriceType', label: '目标价分类', type: 'select', i18n_label: '',},
  {value: 'partProjectType', label: '零件项目类型', type: 'select', i18n_label: '',selectOption:'PART_PROJECT_TYPE'},
  {value: 'setKz', label: 'SET属性', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'approveStats', label: '审批状态', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: '', selectOption: 'CAR_TYPE_PRO'},
  {value: 'assignStats', label: '指派状态', type: 'select', i18n_label: '',}
]
