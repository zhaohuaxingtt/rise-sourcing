/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:35:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-30 10:43:07
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\maintenance\data.js
 */


export const tableTitle = [
  {props:'fsnrGsnrNum',name:'FS/GS/SP No.', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名称', key: "", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'cartypeProjectZh',name:'车型项目', key: "", tooltip: true, width: 120},
  {props:'tuzhi',name:'图纸', key: "", tooltip: true},
  {props:'caozuo',name:'操作', key: "", tooltip: true},
  {props:'cfControllerZh',name:'CF', key: "", tooltip: true, width: 120},
  {props:'lcAPrice',name:'LC_A', key: "", tooltip: true, editable: true, type: 'input'},
  {props:'lcBPrice',name:'LC_B', key: "", tooltip: true, editable: true, type: 'input'},
  {props:'approveStatus',name:'审批状态', key: "", tooltip: true},
  {props:'buyerName',name:'CSF/CSS', key: "", tooltip: true, width: 120},
  {props:'procureFactoryName',name:'采购工厂', key: "", tooltip: true, width: 100},
  {props:'linieName',name:'LINIE', key: "", tooltip: true, width: 120},
  {props:'applyDate',name:'申请日期', key: "", tooltip: true, width: 100},
  {props:'applyDateEnd',name:'截止日期', key: "", tooltip: true, width: 120},
  {props:'xiugai',name:'修改记录', key: "", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "", tooltip: true},
  {props:'memo',name:'备注', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: '',},
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: '',},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: '',selectOption:'CF_CONTROL'},
  {value: 'applyStats', label: '申请状态', type: 'select', i18n_label: '',selectOption:''},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'partProjectType', label: '零件项目类型', type: 'select', i18n_label: '',selectOption:'PART_PROJECT_TYPE'},
  {value: 'buyerId', label: '询价采购员', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'linieName', label: 'LINIE', type: 'select', i18n_label: '',selectOption: 'LINIE'},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: '', selectOption: 'CAR_TYPE_PRO'},
  {value: 'procureFactoryId', label: '采购工厂', type: 'select', i18n_label: '', selectOption: 'PURCHASE_FACTORY'},
  {value: 'applyType', label: '目标价分类', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: '',},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: '',}
]

export const modifyTableTitle = [
  {props:'lcBPrice',name:'CF LC_B Target', key: "", tooltip: true, width: 120},
  {props:'lcAPrice',name:'CF LC_A Target', key: "", tooltip: true, width: 120},
  {props:'lcTcCurrencyId',name:'LC货币类型', key: "", tooltip: true, width: 120},
  {props:'lcExchangeRate',name:'LC汇率', key: "", tooltip: true, width: 100},
  {props:'skdBPrice',name:'SKD_B Target', key: "", tooltip: true, width: 120},
  {props:'skdBPrice',name:'SKD_A Target', key: "", tooltip: true},
  {props:'skdTcCurrencyId',name:'SKD货币类型', key: "", tooltip: true},
  {props:'skdExchangeRate',name:'SKD汇率', key: "", tooltip: true, width: 120},
  {props:'ckdLanded',name:'CKD Landed', key: "", tooltip: true},
  {props:'ckdTcCurrencyId',name:'CKD货币类型', key: "", tooltip: true},
  {props:'ckdExchangeRate',name:'CKD汇率', key: "", tooltip: true},
  {props:'ckdDuty',name:'CKD Duty(%)', key: "", tooltip: true, width: 120},
  {props:'ckdExwork',name:'CKD Ex-work', key: "", tooltip: true, width: 100},
  {props:'memo',name:'备注', key: "", tooltip: true, width: 120},
  {props:'applyDate',name:'申请日期', key: "", tooltip: true, width: 100},
  {props:'applyStatus',name:'有效状态', key: "", tooltip: true, width: 120},
  {props:'approveStatus',name:'审批状态', key: "", tooltip: true, width: 120},
  {props:'modifer',name:'修改人', key: "", tooltip: true},
  {props:'modifyDate',name:'修改日期', key: "", tooltip: true, width: 120},
]

export const approvalTableTitle = [
  {props:'lcBPrice',name:'CF LC_B Target', key: "", tooltip: true, width: 120},
  {props:'lcAPrice',name:'CF LC_A Target', key: "", tooltip: true, width: 120},
  {props:'skdBPrice',name:'SKD_B Target', key: "", tooltip: true, width: 120},
  {props:'skdAPrice',name:'SKD_A Target', key: "", tooltip: true},
  {props:'ckdLanded',name:'CKD Landed', key: "", tooltip: true},
  {props:'ckdDuty',name:'CKD Duty(%)', key: "", tooltip: true, width: 120},
  {props:'ckdExwork',name:'CKD Ex-work', key: "", tooltip: true, width: 100},
  {props:'memo',name:'备注', key: "", tooltip: true, width: 120},
  {props:'validFlag',name:'有效状态', key: "", tooltip: true, width: 120},
  {props:'approveName',name:'审批人', key: "", tooltip: true, width: 120},
  {props:'approveType',name:'审批类型', key: "", tooltip: true},
  {props:'approveDate',name:'审批日期', key: "", tooltip: true, width: 120},
]