/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-25 15:28:04
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\approval\data.js
 */


export const tableTitle = [
  {props:'fsnrGsnrNum',name:'FS/GS/SP No.', key: "FSGSSPNO", tooltip: true, width: 145, sortable: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, width: 120, sortable: true},
  {props:'partNameZh',name:'零件名称', key: "LINGJIANMINGCHENG", tooltip: true, width: 110, sortable: true},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 110, sortable: true},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120, sortable: true},
  {props:'modiferName',name:'修改人', key: "XIUGAIREN", tooltip: true, width: 100, sortable: true},
  {props:'cfControllerZh',name:'CF', key: "CF", tooltip: true, width: 100, sortable: true},
  {props:'lcAVary',name:'LC_A变化', key: "LCABIANHUA", tooltip: true, width: 120, sortable: true},
  {props:'lcBVary',name:'LC_B变化', key: "LCBBIANHUA", tooltip: true, width: 120, sortable: true},
  {props:'rwPrice',name:'RW价', key: "RWJIA", tooltip: true, width: 90, sortable: true},
  {props:'skdAVary',name:'SKD_A变化', key: "SKDABIANHUA", tooltip: true, width: 120, sortable: true},
  {props:'skdBVary',name:'SKD_B变化', key: "SKDBBIANHUA", tooltip: true, width: 120, sortable: true},
  {props:'ckdLandedVary',name:'CKD Landed变化', key: "CKDLANDEDBIANHUA", tooltip: true, width: 160, sortable: true},
  {props:'ckdDutyVary',name:'CKD duty变化', key: "CKDDUTYBIANHUA", tooltip: true, width: 140, sortable: true},
  {props:'ckdExworkVary',name:'CKD Ex-work变化', key: "CKDEXWORKBIANHUA", tooltip: true, width: 165, sortable: true},
  {props:'applyDateEnd',name:'截止日期', key: "JIEZHIRIQI", tooltip: true, width: 120, sortable: true},
  {props:'updateDate',name:'修改日期', key: "XIUGAIRIQI", tooltip: true, width: 120, sortable: true},
  {props:'xiugai',name:'修改记录', key: "XIUGAIJILU", tooltip: true, width: 120, sortable: true},
  {props:'shenpi',name:'审批记录', key: "SHENPIJILU", tooltip: true, width: 110, sortable: true},
  {props:'shenpipi',name:'', key: "", tooltip: true, width: 120, sortable: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO',permission: 'FINANCIALTARGETPRICE_APPROVAL_RFQNUM|财务目标价管理-目标价审批-RFQ编号'},
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: 'FSGSSP',permission: 'FINANCIALTARGETPRICE_APPROVAL_FSNUM|财务目标价管理-目标价审批-FSGSNO'},
  {value: 'partNum', label: '零件号', type: 'multiLineInput', i18n_label: 'LINGJIANHAO',permission: 'FINANCIALTARGETPRICE_APPROVAL_PARTNUM|财务目标价管理-目标价审批-零件号'},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG',permission: 'FINANCIALTARGETPRICE_APPROVAL_PARTNAME|财务目标价管理-目标价审批-零件名称'},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: 'CF',selectOption:'CF_USER',permission: 'FINANCIALTARGETPRICE_APPROVAL_CF|财务目标价管理-目标价审批-CF'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE',permission: 'FINANCIALTARGETPRICE_APPROVAL_LINIE|财务目标价管理-目标价审批-LINIE'},
  // {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',},
  {value: 'cfPriceType', label: '目标价分类', type: 'select', i18n_label: 'MUBIAOJIAFENLEI',selectOption:'CF_PRICE_TYPE',permission: 'FINANCIALTARGETPRICE_APPROVAL_PRICETYPE|财务目标价管理-目标价审批-目标价分类'},
  // {value: 'showSelf', label: '显示自己', type: 'select', i18n_label: 'XIANSHIZHIJI', selectOption: 'IS_SHOW_SELF',permission: 'FINANCIALTARGETPRICE_APPROVAL_SHOWSELF|显示自己'}

]

export const detailList = [
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',},
  {value: 'partNameZh', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG',},
  {value: 'lcBPrice', label: 'Old CF LC_B Target', type: 'input', i18n_label: 'OLDCFLCBTARGET',parent: 'oldCfInfVO'},
  {value: 'lcBPrice', label: 'New CF LC_B Target(人民币)', type: 'input', i18n_label: 'NEWCFLCBTARGET_RMB',parent: 'newCfInfVO'},
  {value: 'lcAPrice', label: 'Old CF LC_A Target', type: 'input', i18n_label: 'OLDCFLCATARGET',parent: 'oldCfInfVO'},
  {value: 'lcAPrice', label: 'New CF LC_A Target(人民币)', type: 'input', i18n_label: 'NEWCFLCATARGET_RMB',parent: 'newCfInfVO'},
  {value: 'skdBPrice', label: 'Old CF SKD_B Target', type: 'input', i18n_label: 'OLDCFSKDBTARGET',parent: 'oldCfInfVO'},
  {value: 'skdBPrice', label: 'New CF SKD_B Target(人民币)', type: 'input', i18n_label: 'NEWCFSKDBTARGET_RMB',parent: 'newCfInfVO'},
  {value: 'skdAPrice', label: 'Old CF SKD_A Target', type: 'input', i18n_label: 'OLDCFSKDATARGET',parent: 'oldCfInfVO'},
  {value: 'skdAPrice', label: 'New CF SKD_A Target(人民币)', type: 'input', i18n_label: 'NEWCFSKDATARGET_RMB',parent: 'newCfInfVO'},
  {value: 'ckdLanded', label: 'Old CF CKD Landed', type: 'input', i18n_label: 'OLDCFCKDLANDED',parent: 'oldCfInfVO'},
  {value: 'ckdLanded', label: 'New CF CKD Landed(人民币)', type: 'input', i18n_label: 'NEWCFCKDLANDED_RMB',parent: 'newCfInfVO'},
  {value: 'ckdDuty', label: 'Old CF CKD Duty(%)', type: 'input', i18n_label: 'OLDCFCKDDUTY',parent: 'oldCfInfVO'},
  {value: 'ckdDuty', label: 'New CF CKD Duty(%)', type: 'input', i18n_label: 'NEWCFCKDDUTY',parent: 'newCfInfVO'},
  {value: 'ckdExwork', label: 'Old CF CKD Ex-work', type: 'input', i18n_label: 'OLDCFCKDEXWORK',parent: 'oldCfInfVO'},
  {value: 'ckdExwork', label: 'New CF CKD Ex-work(人民币)', type: 'input', i18n_label: 'NEWCFCKDEXWORK',parent: 'newCfInfVO'},
  {value: 'modifyReason', label: '修改原因', type: 'input', i18n_label: 'XIUGAIYUANYIN',parent: 'oldCfInfVO'},
]