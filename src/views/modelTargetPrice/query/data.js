/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-08 17:50:04
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\query\data.js
 */


export const tableTitle = [
  {props:'fsNum',name:'零件采购项目号', key: "FSGSSPNO", tooltip: true, width: 130},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, width: 120},
  {props:'procureFactoryName',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, width: 120},
  {props:'partNameDe',name:'零件名(德)', key: "LINGJIANMINGCHENGDE", tooltip: true, width: 120},
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 100},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true, width: 120},
  {props:'cfName',name:'CF', key: "CF", tooltip: true, width: 120},
  {props:'tuzhi',name:'图纸', key: "TUZHI", tooltip: true},
  {props:'targetPrice',name:'目标价', key: "MUBIAOJIA", tooltip: true},
  {props:'returnDate',name:'返回日期', key: "LK_FANHUIRIQI", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "SHENPIJILU", tooltip: true, width: 120},
  {props:'stateDesc',name:'状态', key: "ZHUANGTAI", tooltip: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO',permission: 'MODELTARGETPRICE_QUERY_RFQNUM|模具目标价管理-目标价查询-RFQ编号'},
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: 'FSGSSP',permission: 'MODELTARGETPRICE_QUERY_FSNUM|模具目标价管理-目标价查询-FSGSNO'},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',permission: 'MODELTARGETPRICE_QUERY_PARTNUM|模具目标价管理-目标价查询-零件号'},
  {value: 'partNameZh', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG',permission: 'MODELTARGETPRICE_QUERY_PARTNAME|模具目标价管理-目标价查询-零件名称'},
  {value: 'partProjectType', label: '零件项目类型', type: 'selectDict', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PPT',permission: 'MODELTARGETPRICE_QUERY_PARTPROJECTTYPE|模具目标价管理-目标价查询-零件项目类型'},
  {value: 'cartypeProjectNum', label: '车型项目', type: 'carProjectSelect', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO',permission: 'MODELTARGETPRICE_QUERY_CARPROJECT|模具目标价管理-目标价查询-车型项目'},
  {value: 'procureFactory', label: '采购工厂', type: 'procureFactorySelect', i18n_label: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY',permission: 'MODELTARGETPRICE_QUERY_PROFACTORY|模具目标价管理-目标价查询-采购工厂'},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption:'',permission: 'MODELTARGETPRICE_QUERY_BUYER|模具目标价管理-目标价查询-询价采购员'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE',permission: 'MODELTARGETPRICE_QUERY_LINIE|模具目标价管理-目标价查询-LINIE'},
  {value: 'cfName', label: '模具控制员', type: 'input', i18n_label: 'MOJUKONGZHIYUAN',selectOption:'CF_USER',permission: 'MODELTARGETPRICE_QUERY_CF|模具目标价管理-目标价查询-CF'},
  {value: 'applyType', label: '申请类型', type: 'selectDict', i18n_label: 'SHENQINGZHUANGTAI',selectOption:'sign_page_apply_type',permission: 'MODELTARGETPRICE_QUERY_APPLYTYPE|模具目标价管理-目标价查询-申请类型'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI',permission: 'MODELTARGETPRICE_QUERY_APPLYDATE|模具目标价管理-目标价查询-申请日期起止'},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: 'FANHUIRIQIQIZHI',permission: 'MODELTARGETPRICE_QUERY_RESPONSEDATE|模具目标价管理-目标价查询-返回日期起止'},
  {value: 'state', label: '状态', type: 'selectDict', i18n_label: 'ZHUANGTAI',selectOption: 'tooling_target_price_page_task_state',permission: 'MODELTARGETPRICE_QUERY_STATS|模具目标价管理-目标价查询-状态'}
]
