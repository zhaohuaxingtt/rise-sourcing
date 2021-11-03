/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:35:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 14:51:00
 * @Description: 
 * @FilePath: \front-web\src\views\modelTargetPrice\maintenance\data.js
 */


export const tableTitle = [
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true},
  {props:'rfqName',name:'RFQ名称', key: "RFQMINGCHENG", tooltip: true},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true, width: 120},
  {props:'cfControllerZh',name:'CF', key: "CF", tooltip: true, width: 100},
  {props:'tuzhi',name:'图纸', key: "TUZHI", tooltip: true},
  {props:'approveStatusDesc',name:'任务状态', key: "RENWUZHUANGTAI", tooltip: true},
  {props:'approveStatusDesc',name:'审批状态', key: "SHENPIZHUANGTAI", tooltip: true},
  {props:'applyDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true, width: 100},
  {props:'applyDateEnd',name:'截止日期', key: "JIEZHIRIQI", tooltip: true, width: 120},
  {props:'applyDateEnd',name:'返回日期', key: "FANHUIRIQI", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "SHENPIJILU", tooltip: true},
  {props:'memo',name:'备注', key: "BEIZHU", tooltip: true, width: 120}
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO', permission: 'MODELTARGETPRICE_MAINTENANCE_RFQNUM|模具目标价管理-目标价维护-RFQ编号'},
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: 'FSGSSP', permission: 'MODELTARGETPRICE_MAINTENANCE_FSNUM|模具目标价管理-目标价维护-FSGSSPNO'},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO', permission: 'MODELTARGETPRICE_MAINTENANCE_PARTNUM|模具目标价管理-目标价维护-零件号'},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG', permission: 'MODELTARGETPRICE_MAINTENANCE_PARTNAME|模具目标价管理-目标价维护-零件名称'},
  {value: 'partProjectType', label: '零件项目类型', type: 'selectDict', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PPT', permission: 'MODELTARGETPRICE_MAINTENANCE_PARTPROJECTTYPE|模具目标价管理-目标价维护-零件项目类型'},
  {value: 'carTypeName', label: '车型项目', type: 'carProjectSelect', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO', permission: 'MODELTARGETPRICE_MAINTENANCE_CARPROJECT|模具目标价管理-目标价维护-车型项目'},
  {value: 'procureFactoryId', label: '采购工厂', type: 'procureFactorySelect', i18n_label: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY', permission: 'MODELTARGETPRICE_MAINTENANCE_PROFACTORY|模具目标价管理-目标价维护-采购工厂'},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption: '', permission: 'MODELTARGETPRICE_MAINTENANCE_BUYER|模具目标价管理-目标价维护-询价采购员'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE', permission: 'MODELTARGETPRICE_MAINTENANCE_LINIE|模具目标价管理-目标价维护-LINIE'},
  {value: 'cfId', label: '模具控制员', type: 'input', i18n_label: 'MOJUKONGZHIYUAN',selectOption:'CF_USER', permission: 'MODELTARGETPRICE_MAINTENANCE_CF|模具目标价管理-目标价维护-CF'},
  {value: 'cfPriceType', label: '申请类型', type: 'selectDict', i18n_label: 'SHENQINGLEIXING',selectOption: '',permission: 'MODELTARGETPRICE_QUERY_APPLYTYPE|模具目标价管理-目标价查询-申请类型'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI', permission: 'MODELTARGETPRICE_MAINTENANCE_APPLYDATE|模具目标价管理-目标价维护-申请日期起止'},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: 'FANHUIRIQIQIZHI', permission: 'MODELTARGETPRICE_MAINTENANCE_RESPONSEDATE|模具目标价管理-目标价维护-返回日期起止'},
  {value: 'applyStats', label: '任务状态', type: 'selectDict', i18n_label: 'RENWUZHUANGTAI',selectOption:'', permission: 'MODELTARGETPRICE_MAINTENANCE_STATUS|模具目标价管理-目标价维护-任务状态'}
]

export const modifyTableTitle = [
  {props:'lcBPrice',name:'CF LC_B Target', key: "CFLCBTARGET", tooltip: true, width: 120},
  {props:'lcAPrice',name:'CF LC_A Target', key: "CFLCATARGET", tooltip: true, width: 120},
  {props:'lcTcCurrencyId',name:'LC货币类型', key: "LCHUOBILEIXING", tooltip: true, width: 120},
  {props:'lcExchangeRate',name:'LC汇率', key: "LCHUILV", tooltip: true, width: 100},
  {props:'skdBPrice',name:'SKD_B Target', key: "SKDBTARGET", tooltip: true, width: 120},
  {props:'skdAPrice',name:'SKD_A Target', key: "SKDATARGET", tooltip: true},
  {props:'skdTcCurrencyId',name:'SKD货币类型', key: "SKDHUOBILEIXING", tooltip: true},
  {props:'skdExchangeRate',name:'SKD汇率', key: "SKDHUILV", tooltip: true, width: 120},
  {props:'ckdLanded',name:'CKD Landed', key: "CKDLANDED", tooltip: true},
  {props:'ckdTcCurrencyId',name:'CKD货币类型', key: "CKDHUOBILEIXING", tooltip: true},
  {props:'ckdExchangeRate',name:'CKD汇率', key: "CKDHUILV", tooltip: true},
  {props:'ckdDuty',name:'CKD Duty(%)', key: "CKDDUTY", tooltip: true, width: 120},
  {props:'ckdExwork',name:'CKD Ex-work', key: "CKDEXWORK", tooltip: true, width: 100},
  {props:'memo',name:'备注', key: "BEIZHU", tooltip: true, width: 120},
  {props:'applyDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true, width: 100},
  {props:'validDesc',name:'有效状态', key: "YOUXIAOZHUANGTAI", tooltip: true, width: 120},
  {props:'approveStatusDesc',name:'审批状态', key: "SHENPIZHUANGTAI", tooltip: true, width: 120},
  {props:'modifer',name:'修改人', key: "XIUGAIREN", tooltip: true},
  {props:'modifyDate',name:'修改日期', key: "XIUGAIRIQI", tooltip: true, width: 120},
]

export const approvalTableTitle = [
  {props:'approveDate',name:'审批开始日期', key: "SHENPIKAISHIRIQI", tooltip: true},
  {props:'approveDate',name:'审批日期', key: "SHENPIRIQI", tooltip: true},
  {props:'approveTypeDesc',name:'审批类型', key: "SHENPILEIXING", tooltip: true},
  {props:'approveName',name:'审批人', key: "SHENPIREN", tooltip: true},
  {props:'approveName',name:'审批结果', key: "SHENPIJIEGUO", tooltip: true},
  {props:'memo',name:'备注', key: "BEIZHU", tooltip: true},
]