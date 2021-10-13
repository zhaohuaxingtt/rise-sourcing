/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-16 13:58:42
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\query\data.js
 */


export const tableTitle = [
  {props:'fsnrGsnrNum',name:'FS/GS/SP No.', key: "FSGSSPNO", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名称', key: "LINGJIANMINGCHENG", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 100},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true, width: 120},
  {props:'modiferName',name:'修改人', key: "XIUGAIREN", tooltip: true, width: 100},
  {props:'priceAnaName',name:'CF', key: "CF", tooltip: true, width: 120},
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
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: 'FSGSSP',permission: 'FINANCIALTARGETPRICE_QUERY_FSNUM|财务目标价管理-目标价查询-FSGSNO'},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',permission: 'FINANCIALTARGETPRICE_QUERY_PARTNUM|财务目标价管理-目标价查询-零件号'},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG',permission: 'FINANCIALTARGETPRICE_QUERY_PARTNAME|财务目标价管理-目标价查询-零件名称'},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption:'',permission: 'FINANCIALTARGETPRICE_QUERY_BUYER|财务目标价管理-目标价查询-询价采购员'},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: 'CF',selectOption:'CF_USER',permission: 'FINANCIALTARGETPRICE_QUERY_CF|财务目标价管理-目标价查询-CF'},
  {value: 'applyStats', label: '申请状态', type: 'selectDict', i18n_label: 'SHENQINGZHUANGTAI',selectOption:'CF_APPLY_STATUS',permission: 'FINANCIALTARGETPRICE_QUERY_APPLYSTATS|财务目标价管理-目标价查询-申请状态'},
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO',permission: 'FINANCIALTARGETPRICE_QUERY_RFQNUM|财务目标价管理-目标价查询-RFQ编号'},
  {value: 'carTypeCode', label: '车型', type: 'select', i18n_label: 'CHEXING',selectOption: 'cartTypeOptions',permission: 'FINANCIALTARGETPRICE_QUERY_CARTYPE|财务目标价管理-目标价查询-车型'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI',permission: 'FINANCIALTARGETPRICE_QUERY_APPLYDATE|财务目标价管理-目标价查询-申请日期起止'},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: 'FANHUIRIQIQIZHI',permission: 'FINANCIALTARGETPRICE_QUERY_RESPONSEDATE|财务目标价管理-目标价查询-返回日期起止'},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: 'LINGJIANZHUANGTAI', selectOption: 'PART_STATUS',permission: 'FINANCIALTARGETPRICE_QUERY_PARTSTATS|财务目标价管理-目标价查询-零件状态'},
  {value: 'procureFactoryId', label: '采购工厂', type: 'select', i18n_label: 'CAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY',permission: 'FINANCIALTARGETPRICE_QUERY_PROFACTORY|财务目标价管理-目标价查询-采购工厂'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE',permission: 'FINANCIALTARGETPRICE_QUERY_LINIE|财务目标价管理-目标价查询-LINIE'},
  {value: 'cfPriceType', label: '目标价分类', type: 'selectDict', i18n_label: 'MUBIAOJIAFENLEI',selectOption: 'CF_PRICE_TYPE',permission: 'FINANCIALTARGETPRICE_QUERY_PRICETYPE|财务目标价管理-目标价查询-目标价分类'},
  {value: 'partProjectType', label: '零件项目类型', type: 'select', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PART_PROJECT_TYPE',permission: 'FINANCIALTARGETPRICE_QUERY_PARTPROJECTTYPE|财务目标价管理-目标价查询-零件项目类型'},
  {value: 'setKz', label: 'SET属性', type: 'select', i18n_label: 'SETSHUXING', selectOption: 'setOptions',permission: 'FINANCIALTARGETPRICE_QUERY_SETKZ|财务目标价管理-目标价查询-SET属性'},
  {value: 'approveStats', label: '审批状态', type: 'selectDict', i18n_label: 'SHENPIZHUANGTAI',selectOption: 'CF_APPROVE_STATUS',permission: 'FINANCIALTARGETPRICE_QUERY_APPROVESTATS|财务目标价管理-目标价查询-审批状态'},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO',permission: 'FINANCIALTARGETPRICE_QUERY_CARPROJECT|财务目标价管理-目标价查询-车型项目'},
  {value: 'assignStats', label: '指派状态', type: 'selectDict', i18n_label: 'ZHIPAIZHUANGTAI',selectOption: 'CF_ASSIGN_START',permission: 'FINANCIALTARGETPRICE_QUERY_ASSIGNSTATS|财务目标价管理-目标价查询-指派状态'}
]
