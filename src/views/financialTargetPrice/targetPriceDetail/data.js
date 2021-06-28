/*
 * @Author: Luoshuang
 * @Date: 2021-06-23 13:46:59
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-24 18:33:14
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\data.js
 */

export const historyTableTitle = [
  {props:'sparePartCode',name:'CF LC_B Target', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'CF LC_A Target', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'LC货币类型', key: "", tooltip: true, width: 120},
  {props:'rfqNum',name:'SKD货币类型', key: "", tooltip: true, width: 100},
  {props:'supplierSapCode',name:'备注', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'审批状态', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'修改人', key: "", tooltip: true, width: 120},
  {props:'csfuserDeptName',name:'修改日期', key: "", tooltip: true},
  {props:'annualQuantity',name:'LC汇率', key: "", tooltip: true},
  {props:'brand',name:'SKD_B Target', key: "", tooltip: true},
  {props:'respDeptName',name:'SKD_A Target', key: "", tooltip: true, width: 100},
  {props:'supplierNameZh',name:'SKD汇率', key: "", tooltip: true, width: 120},
  {props:'partNameDe',name:'CKD Landed', key: "", tooltip: true, width: 120},
  {props:'fds',name:'CKD货币类型', key: "", tooltip: true, width: 120},
  {props:'ds',name:'CKD汇率', key: "", tooltip: true},
  {props:'d',name:'CKD Duty(%)', key: "", tooltip: true, width: 120},
  {props:'d',name:'CKD Ex-work', key: "", tooltip: true, width: 120},
  {props:'ds',name:'申请日期', key: "", tooltip: true, width: 120},
  {props:'d',name:'有效状态', key: "", tooltip: true, width: 120},
]

export const detailList = [
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'partNameZh', label: '零件名(中)', type: 'input', i18n_label: '',},
  {value: 'procureFactory', label: '采购工厂', type: 'input', i18n_label: '',},
  {value: 'applytarType', label: '目标价类型', type: 'input', i18n_label: '',},
  {value: 'fsNum', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  {value: 'priceUnit', label: '价格单位', type: 'input', i18n_label: '',},
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
  {value: 'partNum', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'partNameDe', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'sparePartCode', label: '询价采购员', type: 'select', i18n_label: '',},
  {value: 'spnrNum', label: 'LINIE', type: 'select', i18n_label: '',},
  {value: 'annualQuantity', label: '车型项目', type: 'select', i18n_label: '',},
  {value: 'carType', label: 'SVW号', type: 'input', i18n_label: '',},
  {value: 'carProject', label: '临时号', type: 'input', i18n_label: '',},
  {value: 'assemblyPartNum', label: '厂商名', type: 'input', i18n_label: '', editable: true},
  {value: 'state', label: '手动创建', type: 'select', i18n_label: '', editable: true},
  {value: 'isEop', label: '定点日期起止', type: 'dateRange', i18n_label: '', editable: true},
  {value: 'idState', label: '价格状态', type: 'select', i18n_label: '', editable: true},
  {value: 'csfuserId', label: '零件采购项目类型', type: 'select', i18n_label: '', editable: true},
  {value: 'csfuserDept', label: '车型', type: 'select', i18n_label: '', editable: true}
]

export const designateTableList = [
  {props:'sparePartCode',name:'FsNr/GsNr', key: "", tooltip: true},
  {props:'partNum',name:'零件号', key: "", tooltip: true},
  {props:'assemblyPartNum',name:'零件名称', key: "", tooltip: true},
  {props:'rfqNum',name:'车型项目', key: "", tooltip: true},
  {props:'supplierSapCode',name:'A价', key: "", tooltip: true},
  {props:'supplierNameZh',name:'B价', key: "", tooltip: true},
  {props:'supplierNameZh',name:'定点日期', key: "", tooltip: true}
]