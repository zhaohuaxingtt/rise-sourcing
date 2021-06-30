/*
 * @Author: Luoshuang
 * @Date: 2021-06-23 13:46:59
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-30 14:53:00
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\data.js
 */

export const historyTableTitle = [
  {props:'lcBPrice',name:'CF LC_B Target', key: "", tooltip: true, width: 120},
  {props:'lcAPrice',name:'CF LC_A Target', key: "", tooltip: true, width: 120},
  {props:'lcTcCurrencyId',name:'LC货币类型', key: "", tooltip: true, width: 120},
  {props:'skdTcCurrencyId',name:'SKD货币类型', key: "", tooltip: true, width: 100},
  {props:'memo',name:'备注', key: "", tooltip: true, width: 120},
  {props:'approveType',name:'审批状态', key: "", tooltip: true, width: 120},
  {props:'modifer',name:'修改人', key: "", tooltip: true, width: 120},
  {props:'modifyDate',name:'修改日期', key: "", tooltip: true},
  {props:'lcExchangeRate',name:'LC汇率', key: "", tooltip: true},
  {props:'skdBPrice',name:'SKD_B Target', key: "", tooltip: true},
  {props:'skdAPrice',name:'SKD_A Target', key: "", tooltip: true, width: 100},
  {props:'skdExchangeRate',name:'SKD汇率', key: "", tooltip: true, width: 120},
  {props:'ckdLanded',name:'CKD Landed', key: "", tooltip: true, width: 120},
  {props:'ckdTcCurrencyId',name:'CKD货币类型', key: "", tooltip: true, width: 120},
  {props:'ckdExchangeRate',name:'CKD汇率', key: "", tooltip: true},
  {props:'ckdDuty',name:'CKD Duty(%)', key: "", tooltip: true, width: 120},
  {props:'ckdExwork',name:'CKD Ex-work', key: "", tooltip: true, width: 120},
  {props:'applyDate',name:'申请日期', key: "", tooltip: true, width: 120},
  {props:'applyStatus',name:'有效状态', key: "", tooltip: true, width: 120},
]

export const detailList = [
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'partNameZh', label: '零件名(中)', type: 'input', i18n_label: '',},
  {value: 'procureFactory', label: '采购工厂', type: 'input', i18n_label: '',},
  {value: 'applyType', label: '目标价类型', type: 'input', i18n_label: '',},
  {value: 'fsnrGsnrNum', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  // {value: 'priceUnit', label: '价格单位', type: 'input', i18n_label: '',},
  {value: 'unit', label: '单位', type: 'input', i18n_label: '',},
  {value: 'expTargetpri', label: '期望目标价', type: 'input', i18n_label: '',},
  {value: 'lcAPrice', label: 'CF LC_A Target', type: 'input', i18n_label: '', editable: true},
  {value: 'skdBPrice', label: 'CF SKD_B Target', type: 'input', i18n_label: '', editable: true},
  {value: 'ckdLanded', label: 'CF CKD Landed', type: 'input', i18n_label: '', editable: true},
  {value: 'ckdDuty', label: 'CF CKD Duty(%)', type: 'input', i18n_label: '', editable: true},
  {value: 'lcBPrice', label: 'CF LC_B Target', type: 'input', i18n_label: '', editable: true},
  {value: 'skdAPrice', label: 'CF SKD_A Target', type: 'input', i18n_label: '', editable: true},
  {value: 'ckdExwork', label: 'CF CKD Ex-work', type: 'input', i18n_label: '', editable: true},
  {value: 'ckdExchangeRate', label: '汇率', type: 'input', i18n_label: '',},
  {value: 'lcTcCurrencyId', label: 'LC货币', type: 'select', i18n_label: '',selectOption: '', editable: true},
  {value: 'skdTcCurrencyId', label: 'SKD货币', type: 'select', i18n_label: '',selectOption: '', editable: true},
  {value: 'ckdTcCurrencyId', label: 'CKD货币', type: 'select', i18n_label: '',selectOption: '', editable: true},
  {value: 'rwPrice', label: 'RW价', type: 'input', i18n_label: '',},
  {value: 'modifyReason', label: '备注', type: 'input', i18n_label: '',row: 2, editable: true}
]

export const designateSearchList = [
  {value: 'fsNum', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'buyerId', label: '询价采购员', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'linieId', label: 'LINIE', type: 'select', i18n_label: '',selectOption: 'LINIE'},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: '',selectOption: 'CAR_TYPE_PRO'},
  {value: 'svwNum', label: 'SVW号', type: 'input', i18n_label: '',},
  {value: 'tempNum', label: '临时号', type: 'input', i18n_label: '',},
  {value: 'factoryNameCh', label: '厂商名', type: 'input', i18n_label: ''},
  {value: 'isManCreate', label: '手动创建', type: 'select', i18n_label: '',selectOption:''},
  {value: 'nominateTime', label: '定点日期起止', type: 'dateRange', i18n_label: ''},
  {value: 'priceStatus', label: '价格状态', type: 'select', i18n_label: '',selectOption:'PRICE_STATE'},
  {value: 'partProjectType', label: '零件采购项目类型', type: 'select', i18n_label: '',selectOption:'PART_PROJECT_TYPE'},
  {value: 'carTypeCode	', label: '车型', type: 'select', i18n_label: '',selectOption:''}
]

export const designateTableList = [
  {props:'fsNum',name:'FsNr/GsNr', key: "", tooltip: true},
  {props:'partNum',name:'零件号', key: "", tooltip: true},
  {props:'partNameZh',name:'零件名称', key: "", tooltip: true},
  {props:'cartypeProjectZh',name:'车型项目', key: "", tooltip: true},
  {props:'lcA',name:'A价', key: "", tooltip: true},
  {props:'lcB',name:'B价', key: "", tooltip: true},
  {props:'nominateTime',name:'定点日期', key: "", tooltip: true}
]