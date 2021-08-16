/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-16 14:56:14
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\query\data.js
 */


export const tableTitle = [
  {props:'fsnrGsnrNum',name:'FsNr/GsNr', key: "FSNRGSNR", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名称', key: "LINGJIANMINGCHENG", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 100},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true, width: 120},
  {props:'cfControllerZh',name:'CF', key: "CF", tooltip: true, width: 120},
  {props:'lcBPrice',name:'LC_B', key: "LC_B", tooltip: true},
  {props:'lcAPrice',name:'LC_A', key: "LC_A", tooltip: true},
  {props:'rwPrice',name:'RW价', key: "RWJIA", tooltip: true},
  {props:'procureFactoryName',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true, width: 100},
  {props:'applyDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true, width: 120},
  {props:'applyDateEnd',name:'截止日期', key: "JIEZHIRIQI", tooltip: true, width: 120},
  {props:'responseDate',name:'返回日期', key: "LK_FANHUIRIQI", tooltip: true, width: 120},
  {props:'expTargetpri',name:'期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true},
  {props:'approveStatusDesc',name:'审批状态', key: "SHENPIZHUANGTAI", tooltip: true, width: 120},
  {props:'xiugai',name:'修改记录', key: "XIUGAIJILU", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "SHENPIJILU", tooltip: true, width: 120},
  {props:'setKz',name:'SET属性', key: "SETSHUXING", tooltip: true, width: 120},
  {props:'isAssignDesc',name:'指派状态', key: "ZHIPAIZHUANGTAI", tooltip: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'fsNum', label: 'FsNr/GsNr', type: 'input', i18n_label: 'FSNRGSNR',},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG',},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption:''},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: 'CF',selectOption:'CF_USER'},
  {value: 'applyStats', label: '申请状态', type: 'select', i18n_label: 'SHENQINGZHUANGTAI',selectOption:'CF_APPLY_STATUS'},
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO'},
  {value: 'carTypeCode', label: '车型', type: 'select', i18n_label: 'CHEXING',selectOption: 'cartTypeOptions'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI'},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: 'FANHUIRIQIQIZHI'},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: 'LINGJIANZHUANGTAI', selectOption: 'PART_STATUS'},
  {value: 'procureFactoryId', label: '采购工厂', type: 'select', i18n_label: 'CAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE'},
  {value: 'lcPriceType', label: '目标价分类', type: 'select', i18n_label: 'MUBIAOJIAFENLEI',selectOption: 'CF_APPLY_TYPE'},
  {value: 'partProjectType', label: '零件项目类型', type: 'select', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PART_PROJECT_TYPE'},
  {value: 'setKz', label: 'SET属性', type: 'select', i18n_label: 'SETSHUXING', selectOption: 'setOptions'},
  {value: 'approveStats', label: '审批状态', type: 'select', i18n_label: 'SHENPIZHUANGTAI',selectOption: 'CF_APPROVE_STATUS'},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO'},
  {value: 'isAssignDesc', label: '指派状态', type: 'select', i18n_label: 'ZHIPAIZHUANGTAI',selectOption: 'CF_ASSIGN_START'}
]
