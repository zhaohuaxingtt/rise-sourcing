/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:35:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-16 14:01:51
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\maintenance\data.js
 */


export const tableTitle = [
  {props:'fsnrGsnrNum',name:'FS/GS/SP No.', key: "FSGSSPNO", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名称', key: "LINGJIANMINGCHENG", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 100},
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, width: 120},
  {props:'tuzhi',name:'图纸', key: "TUZHI", tooltip: true},
  {props:'caozuo',name:'操作', key: "LK_CAOZUO", tooltip: true},
  {props:'modiferName',name:'修改人', key: "XIUGAIREN", tooltip: true, width: 100},
  {props:'cfControllerZh',name:'CF', key: "CF", tooltip: true, width: 100},
  {props:'lcAPrice',name:'LC_A', key: "LC_A", tooltip: true, editable: true, type: 'input', isNumber: true},
  {props:'lcBPrice',name:'LC_B', key: "LC_B", tooltip: true, editable: true, type: 'input', isNumber: true},
  {props:'approveStatusDesc',name:'审批状态', key: "SHENPIZHUANGTAI", tooltip: true},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'procureFactoryName',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true, width: 100},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true, width: 120},
  {props:'applyDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true, width: 100},
  {props:'applyDateEnd',name:'截止日期', key: "JIEZHIRIQI", tooltip: true, width: 120},
  {props:'xiugai',name:'修改记录', key: "XIUGAIJILU", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "SHENPIJILU", tooltip: true},
  {props:'memo',name:'备注', key: "BEIZHU", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_RFQNUM|财务目标价管理-目标价维护-RFQ编号'},
  {value: 'fsNum', label: 'FSNR/GSNR/SPNR', type: 'input', i18n_label: 'FSGSSP', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_FSNUM|财务目标价管理-目标价维护-FSGSSPNO'},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_PARTNUM|财务目标价管理-目标价维护-零件号'},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: 'CF',selectOption:'CF_USER', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_CF|财务目标价管理-目标价维护-CF'},
  {value: 'applyStats', label: '申请状态', type: 'select', i18n_label: 'SHENQINGZHUANGTAI',selectOption:'CF_APPLY_STATUS', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_APPLYSTATUS|财务目标价管理-目标价维护-申请状态'},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_PARTNAME|财务目标价管理-目标价维护-零件名称'},
  {value: 'partProjectType', label: '零件项目类型', type: 'select', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PART_PROJECT_TYPE', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_PARTPROJECTTYPE|财务目标价管理-目标价维护-零件项目类型'},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption: '', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_BUYER|财务目标价管理-目标价维护-询价采购员'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_LINIE|财务目标价管理-目标价维护-LINIE'},
  {value: 'partStatus', label: '零件状态', type: 'select', i18n_label: 'LINGJIANZHUANGTAI', selectOption: 'PART_STATUS', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_PARTSTATUS|财务目标价管理-目标价维护-零件状态'},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_CARPROJECT|财务目标价管理-目标价维护-车型项目'},
  {value: 'procureFactoryId', label: '采购工厂', type: 'select', i18n_label: 'CAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_PROFACTORY|财务目标价管理-目标价维护-采购工厂'},
  {value: 'cfPriceType', label: '目标价分类', type: 'select', i18n_label: 'MUBIAOJIAFENLEI',selectOption: 'CF_PRICE_TYPE', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_PRICETYPE|财务目标价管理-目标价维护-目标价分类'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_APPLYDATE|财务目标价管理-目标价维护-申请日期起止'},
  {value: 'responseDate', label: '返回日期起止', type: 'dateRange', i18n_label: 'FANHUIRIQIQIZHI', permission: 'FINANCIALTARGETPRICE_MAINTENANCE_RESPONSEDATE|财务目标价管理-目标价维护-返回日期起止'}
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
  {props:'lcBPrice',name:'CF LC_B Target', key: "CFLCBTARGET", tooltip: true, width: 120},
  {props:'lcAPrice',name:'CF LC_A Target', key: "CFLCATARGET", tooltip: true, width: 120},
  {props:'skdBPrice',name:'SKD_B Target', key: "SKDBTARGET", tooltip: true, width: 120},
  {props:'skdAPrice',name:'SKD_A Target', key: "SKDATARGET", tooltip: true},
  {props:'ckdLanded',name:'CKD Landed', key: "CKDLANDED", tooltip: true},
  {props:'ckdDuty',name:'CKD Duty(%)', key: "CKDDUTY", tooltip: true, width: 120},
  {props:'ckdExwork',name:'CKD Ex-work', key: "CKDEXWORK", tooltip: true, width: 100},
  {props:'memo',name:'备注', key: "BEIZHU", tooltip: true, width: 120},
  {props:'validDesc',name:'有效状态', key: "YOUXIAOZHUANGTAI", tooltip: true, width: 120},
  {props:'approveName',name:'审批人', key: "SHENPIREN", tooltip: true, width: 120},
  {props:'approveTypeDesc',name:'审批类型', key: "SHENPILEIXING", tooltip: true},
  {props:'approveDate',name:'审批日期', key: "SHENPIRIQI", tooltip: true, width: 120},
]