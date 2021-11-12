/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-08 16:46:10
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\signin\data.js
 */


export const tableTitle = [
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true},
  {props:'rfqName',name:'RFQ名称', key: "RFQMINGCHENG", tooltip: true},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true},
  {props:'cfName',name:'CF', key: "CF", tooltip: true},
  {props:'applicationDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true},
  {props:'endDate',name:'截止日期', key: "JIEZHIRIQI", tooltip: true},
  // {props:'approvalStatusDesc',name:'签收状态', key: "QIANSHOUZHUANGTAI", tooltip: true},
  {props:'tuzhi',name:'图纸', key: "TUZHI", tooltip: true}
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO',permission: 'MODELTARGETPRICE_SIGNIN_RFQID|模具目标价管理-目标价签收-RFQ编号'},
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: 'FSGSSP',permission: 'MODELTARGETPRICE_SIGNIN_FSGSNO|模具目标价管理-目标价签收-FSGSNO'},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',permission: 'MODELTARGETPRICE_SIGNIN_PARTNUM|模具目标价管理-目标价签收-零件号'},
  {value: 'partNameZh', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG',permission: 'MODELTARGETPRICE_SIGNIN_PARTNAME|模具目标价管理-目标价签收-零件名称'},
  {value: 'partProjectType', label: '零件项目类型', type: 'selectDict', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PPT',permission: 'MODELTARGETPRICE_SIGNIN_PARTPROJECTTYPE|模具目标价管理-目标价签收-零件项目类型'},
  {value: 'cartypeProjectNum', label: '车型项目', type: 'carProjectSelect', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO',permission: 'MODELTARGETPRICE_SIGNIN_CARTYPE|模具目标价管理-目标价签收-车型项目'},
  {value: 'procureFactory', label: '采购工厂', type: 'procureFactorySelect', i18n_label: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY',permission: 'MODELTARGETPRICE_SIGNIN_PROCUREFACTORY|模具目标价管理-目标价签收-采购工厂'},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption:'',permission: 'MODELTARGETPRICE_SIGNIN_BUYER|模具目标价管理-目标价签收-询价采购员'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE',permission: 'MODELTARGETPRICE_SIGNIN_LINIE|模具目标价管理-目标价签收-LINIE'},
  {value: 'cfName', label: '模具控制员', type: 'input', i18n_label: 'MOJUKONGZHIYUAN',selectOption:'CF_USER',permission: 'MODELTARGETPRICE_SIGNIN_CF|模具目标价管理-目标价签收-CF'},
  {value: 'applyType', label: '申请类型', type: 'selectDict', i18n_label: 'SHENQINGLEIXING',selectOption: 'sign_page_apply_type',permission: 'MODELTARGETPRICE_SIGNIN_APPLYTYPE|模具目标价管理-目标价签收-申请类型'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI',permission: 'MODELTARGETPRICE_SIGNIN_APPLYDATE|模具目标价管理-目标价签收-申请日期起止'},
  {value: 'showSelf', label: '显示自己', type: 'select', hideAll: true, selectOption: "showSelfOptions", i18n_label: 'XIANSHIZIJI',permission: 'MODELTARGETPRICE_SIGNIN_SHOWSELF|模具目标价管理-目标价签收-显示自己'},
]
