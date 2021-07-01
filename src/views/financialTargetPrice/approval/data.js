/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-01 14:00:28
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\approval\data.js
 */


export const tableTitle = [
  {props:'fsnrGsnrNum',name:'FsNr/GsNr', key: "FSNRGSNR", tooltip: true, width: 120},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, width: 120},
  {props:'partNameZh',name:'零件名称', key: "LINGJIANMINGCHENG", tooltip: true, width: 120},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 100},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'modiferName',name:'修改人', key: "XIUGAIREN", tooltip: true, width: 120},
  {props:'cfControllerZh',name:'CF', key: "CF", tooltip: true, width: 120},
  {props:'rwPrice',name:'RW价', key: "RWJIA", tooltip: true},
  {props:'lcVary',name:'LC变化', key: "LCBIANHUA", tooltip: true},
  {props:'lcAVary',name:'LC_A变化', key: "LCABIANHUA", tooltip: true},
  {props:'skdVary',name:'SKD变化', key: "SKDBIANHUA", tooltip: true, width: 100},
  {props:'skdAVary',name:'SKD_A变化', key: "SKDABIANHUA", tooltip: true, width: 120},
  {props:'ckdLanded',name:'CKD Landed', key: "CKDLANDED", tooltip: true, width: 120},
  {props:'shenpipi',name:'', key: "", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO',},
  {value: 'fsNum', label: 'FsNr/GsNr', type: 'input', i18n_label: 'FSNRGSNR',},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',},
  {value: 'partName', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG'},
  {value: 'cfId', label: 'CF', type: 'select', i18n_label: 'CF',selectOption:'CF_USER'},
  {value: 'linieName', label: 'LINIE', type: 'select', i18n_label: 'LINIE',selectOption: 'LINIE'},
  {value: 'buyerId', label: '询价采购员', type: 'select', i18n_label: 'XUNJIACAIGOUYUAN',},
  {value: 'applyType', label: '目标价分类', type: 'select', i18n_label: 'MUBIAOJIAFENLEI',selectOption:'CF_APPLY_TYPE'}
]

export const detailList = [
  {value: 'fsnrGsnrNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO',},
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