/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:35:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-22 16:56:51
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\maintenance\data.js
 */


export const tableTitle = [
  {props:'sparePartCode',name:'FS/GS/SP No.', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'零件名称', key: "", tooltip: true, width: 120},
  {props:'rfqNum',name:'RFQ编号', key: "", tooltip: true, width: 100},
  {props:'partNameCh',name:'车型项目', key: "", tooltip: true, width: 120},
  {props:'tuzhi',name:'图纸', key: "", tooltip: true},
  {props:'caozuo',name:'操作', key: "", tooltip: true},
  {props:'state',name:'CF', key: "", tooltip: true, width: 120},
  {props:'annualQuantity',name:'LC_A', key: "", tooltip: true, editable: true, type: 'input'},
  {props:'csfuserDeptName',name:'LC_B', key: "", tooltip: true, editable: true, type: 'input'},
  {props:'brand',name:'审批状态', key: "", tooltip: true},
  {props:'supplierSapCode',name:'CSF/CSS', key: "", tooltip: true, width: 120},
  {props:'respDeptName',name:'采购工厂', key: "", tooltip: true, width: 100},
  {props:'supplierNameZh',name:'LINIE', key: "", tooltip: true, width: 120},
  {props:'respLinieName',name:'申请日期', key: "", tooltip: true, width: 100},
  {props:'partNameDe',name:'截止日期', key: "", tooltip: true, width: 120},
  {props:'xiugai',name:'修改记录', key: "", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "", tooltip: true},
  {props:'sendDate',name:'备注', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNum', label: 'RFQ编号', type: 'input', i18n_label: '',},
  {value: 'partNameCh', label: 'FS/GS/SP No.', type: 'input', i18n_label: '',},
  {value: 'supplierSapCode', label: '零件号', type: 'input', i18n_label: '',},
  {value: 'supplierNameZh', label: 'CF', type: 'select', i18n_label: '',selectOption:''},
  {value: 'assemblyPartNum', label: '申请状态', type: 'select', i18n_label: '',selectOption:''},
  {value: 'spnrNum', label: '零件名称', type: 'input', i18n_label: '',},
  {value: 'sparePartCode', label: '零件项目类型', type: 'select', i18n_label: '',selectOption:''},
  {value: 'carType', label: '询价采购员', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'carProject', label: 'LINIE', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'state', label: '零件状态', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'csfUserDept', label: '车型项目', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'csfUserId', label: '采购工厂', type: 'select', i18n_label: '', selectOption: ''},
  {value: 'sendDate', label: '目标价分类', type: 'select', i18n_label: '',selectOption: ''},
  {value: 'sendDate', label: '申请日期起止', type: 'date', i18n_label: '',},
  {value: 'sendDate', label: '返回日期起止', type: 'date', i18n_label: '',}
]

export const modifyTableTitle = [
  {props:'sparePartCode',name:'CF LC_B Target', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'CF LC_A Target', key: "", tooltip: true, width: 120},
  {props:'assemblyPartNum',name:'LC货币类型', key: "", tooltip: true, width: 120},
  {props:'rfqNum',name:'LC汇率', key: "", tooltip: true, width: 100},
  {props:'partNameCh',name:'SKD_B Target', key: "", tooltip: true, width: 120},
  {props:'tuzhi',name:'SKD_A Target', key: "", tooltip: true},
  {props:'caozuo',name:'SKD货币类型', key: "", tooltip: true},
  {props:'state',name:'SKD汇率', key: "", tooltip: true, width: 120},
  {props:'annualQuantity',name:'CKD Landed', key: "", tooltip: true},
  {props:'csfuserDeptName',name:'CKD货币类型', key: "", tooltip: true},
  {props:'brand',name:'CKD汇率', key: "", tooltip: true},
  {props:'supplierSapCode',name:'CKD Duty(%)', key: "", tooltip: true, width: 120},
  {props:'respDeptName',name:'CKD Ex-work', key: "", tooltip: true, width: 100},
  {props:'supplierNameZh',name:'备注', key: "", tooltip: true, width: 120},
  {props:'respLinieName',name:'申请日期', key: "", tooltip: true, width: 100},
  {props:'partNameDe',name:'有效状态', key: "", tooltip: true, width: 120},
  {props:'xiugai',name:'审批状态', key: "", tooltip: true, width: 120},
  {props:'shenpi',name:'修改人', key: "", tooltip: true},
  {props:'sendDate',name:'修改日期', key: "", tooltip: true, width: 120},
]

export const approvalTableTitle = [
  {props:'sparePartCode',name:'CF LC_B Target', key: "", tooltip: true, width: 120},
  {props:'partNum',name:'CF LC_A Target', key: "", tooltip: true, width: 120},
  {props:'partNameCh',name:'SKD_B Target', key: "", tooltip: true, width: 120},
  {props:'tuzhi',name:'SKD_A Target', key: "", tooltip: true},
  {props:'annualQuantity',name:'CKD Landed', key: "", tooltip: true},
  {props:'supplierSapCode',name:'CKD Duty(%)', key: "", tooltip: true, width: 120},
  {props:'respDeptName',name:'CKD Ex-work', key: "", tooltip: true, width: 100},
  {props:'supplierNameZh',name:'备注', key: "", tooltip: true, width: 120},
  {props:'partNameDe',name:'有效状态', key: "", tooltip: true, width: 120},
  {props:'xiugai',name:'审批人', key: "", tooltip: true, width: 120},
  {props:'shenpi',name:'审批类型', key: "", tooltip: true},
  {props:'sendDate',name:'审批日期', key: "", tooltip: true, width: 120},
]