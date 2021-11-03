/*
 * @Author: Luoshuang
 * @Date: 2021-06-23 13:46:59
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-02 19:43:13
 * @Description: 
 * @FilePath: \front-web\src\views\modelTargetPrice\targetPriceDetail\data.js
 */

export const historyTableTitle = [
  {props:'fsNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
  {props:'lcBPrice',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'lcAPrice',name:'投资目标价', key: "TOUZIMUBIAOJIA", tooltip: true},
  {props:'lcTcCurrencyId',name:'状态', key: "ZHUANGTAI", tooltip: true},
  {props:'memo',name:'修改人', key: "XIUGAIREN", tooltip: true},
  {props:'approveStatusDesc',name:'修改日期', key: "XIUGAIRIQI", tooltip: true},
]

export const applyTableTitle = [
  {props:'fsNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
  {props:'lcBPrice',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'lcBPrice',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true},
  {props:'lcBPrice',name:'零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true},
  {props:'lcBPrice',name:'零件名(德)', key: "LINGJIANMINGDE", tooltip: true},
  {props:'lcAPrice',name:'原目标价', key: "YUANMUBIAOJIA", tooltip: true},
  {props:'lcTcCurrencyId',name:'类型', key: "LEIXING", tooltip: true},
  {props:'aaa',name:'期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true},
  {props:'bbb',name:'目标价', key: "MUBIAOJIA", tooltip: true},
  {props:'operation',name:'', key: "", tooltip: true}
]

export const designateSearchList = [
  {value: 'fsNum', label: 'FsNr/GsNr', type: 'input', i18n_label: 'FSNRGSNR',},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINCHENG',},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption: ''},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE'},
  {value: 'carTypeName', label: '车型项目', type: 'select', i18n_label: 'CHEXINGXIANGMU',selectOption: 'CAR_TYPE_PRO'},
  {value: 'svwNum', label: 'SVW号', type: 'input', i18n_label: 'SVWHAO',},
  {value: 'tempNum', label: '临时号', type: 'input', i18n_label: 'LINSHIHAO',},
  {value: 'factoryNameCh', label: '厂商名', type: 'input', i18n_label: 'CHANGSHANGMING'},
  {value: 'isManCreate', label: '手动创建', type: 'select', i18n_label: 'SHOUDONGCHUANGJIAN',selectOption:'yesOrNoOption'},
  {value: 'nominateTime', label: '定点日期起止', type: 'dateRange', i18n_label: 'DINGDIANRIQIQIZHI'},
  {value: 'priceStatus', label: '价格状态', type: 'select', i18n_label: 'JIAGEZHUANGTAI',selectOption:'PRICE_STATE'},
  {value: 'partProjectType', label: '零件采购项目类型', type: 'select', i18n_label: 'LINGJIANCAIGOUXIANGMULEIXING',selectOption:'PART_PROJECT_TYPE'},
  {value: 'carTypeCode', label: '车型', type: 'select', i18n_label: 'CHEXING',selectOption:'cartTypeOptions'}
]

export const designateTableList = [
  {props:'fsnrGsnrNum',name:'FsNr/GsNr', key: "FSNRGSNR", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameCn',name:'零件名称', key: "LINGJIANMINCHENG", tooltip: true},
  {props:'cartypeProj',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'apriceModel',name:'A价', key: "AJIA", tooltip: true},
  {props:'bpriceModel',name:'B价', key: "BJIA", tooltip: true},
  {props:'nominateTime',name:'定点日期', key: "DINGDIANRIQI", tooltip: true}
]