/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 18:19:51
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\approval\data.js
 */


export const tableTitle = [
  {props:'sparePartCode',name:'FsNr/GsNr', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'零件名称', key: "", tooltip: true, width: 120},
  {props:'rfqNum',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'supplierSapCode',name:'CSF/CSS', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'修改人', key: "", tooltip: true, width: 120},
  {props:'supplierNameZh',name:'CF', key: "", tooltip: true, width: 120},
  {props:'csfuserDeptName',name:'RW价', key: "", tooltip: true},
  {props:'annualQuantity',name:'LC变化', key: "", tooltip: true},
  {props:'brand',name:'LC_A变化', key: "", tooltip: true},
  {props:'respDeptName',name:'SKD变化', key: "", tooltip: true, width: 100},
  {props:'supplierNameZh',name:'SKD_A变化', key: "", tooltip: true, width: 120},
  {props:'partNameDe',name:'SKD Landed', key: "", tooltip: true, width: 120},
  {props:'shenpipi',name:'', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'FsNr/GsNr', label: 'RFQ编号', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: 'FsNr/GsNr', type: 'input', i18n_label: '',},
  {value: 'supplierSapCode', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: '零件名称', type: 'input', i18n_label: '',selectOption:''},
  {value: 'assemblyPartNum', label: 'CF', type: 'select', i18n_label: '',selectOption:''},
  {value: 'sendDate', label: 'LINIE', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'sendDate', label: '询价采购员', type: 'select', i18n_label: '',},
  {value: 'sendDate', label: '目标价分类', type: 'select', i18n_label: '',}
]

export const detailList = [
  {value: 'FsNr/GsNr', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'supplierSapCode', label: 'Old CF LC_B Target', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'New CF LC_B Target(人民币)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: 'Old CF LC_A Target', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'Old CF LC_A Target(人民币)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: 'New CF SKD_B Target', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'Old CF SKD_B Target(人民币)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: 'Old CF SKD_A Target', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'New CF SKD_A Target(人民币)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: 'Old CF CKD Landed', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'New CF CKD Landed(人民币)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: 'Old CF CKD Duty(%)', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'New CF CKD Duty(%)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: 'Old CF CKD Ex-work', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'New CF CKD Ex-work(人民币)', type: 'input', i18n_label: ''},
  {value: 'supplierSapCode', label: '修改原因', type: 'input', i18n_label: '',},
]