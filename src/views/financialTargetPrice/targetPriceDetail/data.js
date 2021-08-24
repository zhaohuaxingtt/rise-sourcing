/*
 * @Author: Luoshuang
 * @Date: 2021-06-23 13:46:59
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-24 15:34:31
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\data.js
 */

export const historyTableTitle = [
  {props:'lcBPrice',name:'CF LC_B Target', key: "CFLCBTARGET", tooltip: true, width: 120},
  {props:'lcAPrice',name:'CF LC_A Target', key: "CFLCATARGET", tooltip: true, width: 120},
  {props:'lcTcCurrencyId',name:'LC货币类型', key: "LCHUOBILEIXING", tooltip: true, width: 120},
  {props:'skdTcCurrencyId',name:'SKD货币类型', key: "SKDHUOBILEIXING", tooltip: true, width: 100},
  {props:'memo',name:'备注', key: "BEIZHU", tooltip: true, width: 120},
  {props:'approveStatusDesc',name:'审批状态', key: "SHENPIZHUANGTAI", tooltip: true, width: 120},
  {props:'modifer',name:'修改人', key: "XIUGAIREN", tooltip: true, width: 120},
  {props:'modifyDate',name:'修改日期', key: "XIUGAIRIQI", tooltip: true},
  {props:'lcExchangeRate',name:'LC汇率', key: "LCHUILV", tooltip: true},
  {props:'skdBPrice',name:'SKD_B Target', key: "SKDBTARGET", tooltip: true},
  {props:'skdAPrice',name:'SKD_A Target', key: "SKDATARGET", tooltip: true, width: 100},
  {props:'skdExchangeRate',name:'SKD汇率', key: "SKDHUILV", tooltip: true, width: 120},
  {props:'ckdLanded',name:'CKD Landed', key: "CKDLANDED", tooltip: true, width: 120},
  {props:'ckdTcCurrencyId',name:'CKD货币类型', key: "CKDHUOBILEIXING", tooltip: true, width: 120},
  {props:'ckdExchangeRate',name:'CKD汇率', key: "CKDHUILV", tooltip: true},
  {props:'ckdDuty',name:'CKD Duty(%)', key: "CKDDUTY", tooltip: true, width: 120},
  {props:'ckdExwork',name:'CKD Ex-work', key: "CKDEXWORK", tooltip: true, width: 120},
  {props:'applyDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true, width: 120},
  {props:'validDesc',name:'有效状态', key: "YOUXIAOZHUANGTAI", tooltip: true, width: 120},
]

export const detailList = [
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',},
  {value: 'partNameZh', label: '零件名(中)', type: 'input', i18n_label: 'LINGJIANMING_ZH',},
  {value: 'procureFactory', label: '采购工厂', type: 'input', i18n_label: 'CAIGOUGONGCHANG',},
  {value: 'applyType', label: '目标价类型', type: 'input', i18n_label: 'MUBIAOJIALEIXING',},
  {value: 'fsnrGsnrNum', label: 'FsNr/GsNr', type: 'input', i18n_label: 'FSNRGSNR',},
  // {value: 'priceUnit', label: '价格单位', type: 'input', i18n_label: '',},
  {value: 'unit', label: '单位', type: 'input', i18n_label: 'DANWEI',},
  {value: 'expTargetpri', label: '期望目标价', type: 'input', i18n_label: 'QIWANGMUBIAOJIA',},
  {value: 'lcAPrice', label: 'CF LC_A Target', type: 'input', number: true, i18n_label: 'CFLCATARGET', editable: true},
  {value: 'skdBPrice', label: 'CF SKD_B Target', type: 'input', number: true, i18n_label: 'CFSKDBTARGET', editable: true},
  {value: 'ckdLanded', label: 'CF CKD Landed', type: 'input', number: true, i18n_label: 'CFCKDLANDED', editable: true},
  {value: 'ckdDuty', label: 'CF CKD Duty(%)', type: 'input', number: true, i18n_label: 'CFCKDDUTY', editable: true},
  {value: 'lcBPrice', label: 'CF LC_B Target', type: 'input', number: true, i18n_label: 'CFLCBTARGET', editable: true},
  {value: 'skdAPrice', label: 'CF SKD_A Target', type: 'input', number: true, i18n_label: 'CFSKDATARGET', editable: true},
  {value: 'ckdExwork', label: 'CF CKD Ex-work', type: 'input', number: true, i18n_label: 'CFCKDEXWORK', editable: true},
  {value: 'ckdExchangeRate', label: '汇率', type: 'input', i18n_label: 'HUILV',},
  {value: 'lcTcCurrencyId', label: 'LC货币', type: 'select', i18n_label: 'LK_LCHUOBI',selectOption: '', editable: true},
  {value: 'skdTcCurrencyId', label: 'SKD货币', type: 'select', i18n_label: 'LK_SKDHUOBI',selectOption: '', editable: true},
  {value: 'ckdTcCurrencyId', label: 'CKD货币', type: 'select', i18n_label: 'LK_CKDHUOBI',selectOption: '', editable: true},
  {value: 'rwPrice', label: 'RW价', type: 'input', i18n_label: 'RWJIA',},
  {value: 'modifyReason', label: '备注', type: 'input', i18n_label: 'BEIZHU',row: 2, editable: true}
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