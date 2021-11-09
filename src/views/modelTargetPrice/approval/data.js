/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:03:48
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-09 17:41:04
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\approval\data.js
 */


export const tableTitle = [
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true},
  {props:'rfqName',name:'RFQ名称', key: "RFQMINGCHENG", tooltip: true},
  {props:'buyerName',name:'CSF/CSS', key: "CSFCSS", tooltip: true, width: 120},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true, width: 120},
  {props:'cfName',name:'CF', key: "CF", tooltip: true, width: 100},
  {props:'tuzhi',name:'图纸', key: "TUZHI", tooltip: true},
  {props:'taskStateDesc',name:'任务状态', key: "RENWUZHUANGTAI", tooltip: true},
  {props:'approvalStateDesc',name:'审批状态', key: "SHENPIZHUANGTAI", tooltip: true},
  {props:'applicationDate',name:'申请日期', key: "SHENQINGRIQI", tooltip: true, width: 100},
  {props:'endDate',name:'截止日期', key: "JIEZHIRIQI", tooltip: true, width: 120},
  {props:'returnDate',name:'返回日期', key: "FANHUIRIQI", tooltip: true, width: 120},
  {props:'shenpi',name:'审批记录', key: "SHENPIJILU", tooltip: true},
  {props:'remarks',name:'备注', key: "BEIZHU", tooltip: true, width: 120}
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'rfqId', label: 'RFQ编号', type: 'input', i18n_label: 'RFQBIANHAO', permission: 'MODELTARGETPRICE_APPROVAL_RFQNUM|模具目标价管理-目标价审批-RFQ编号'},
  {value: 'fsNum', label: 'FS/GS/SP No.', type: 'input', i18n_label: 'FSGSSP', permission: 'MODELTARGETPRICE_APPROVAL_FSNUM|模具目标价管理-目标价审批-FSGSSPNO'},
  {value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO', permission: 'MODELTARGETPRICE_APPROVAL_PARTNUM|模具目标价管理-目标价审批-零件号'},
  {value: 'partNameZh', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG', permission: 'MODELTARGETPRICE_APPROVAL_PARTNAME|模具目标价管理-目标价审批-零件名称'},
  {value: 'partProjectType', label: '零件项目类型', type: 'selectDict', i18n_label: 'LINGJIANXIANGMULEIXING',selectOption:'PPT', permission: 'MODELTARGETPRICE_APPROVAL_PARTPROJECTTYPE|模具目标价管理-目标价审批-零件项目类型'},
  {value: 'cartypeProjectNum', label: '车型项目', type: 'carProjectSelect', i18n_label: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO', permission: 'MODELTARGETPRICE_APPROVAL_CARPROJECT|模具目标价管理-目标价审批-车型项目'},
  {value: 'procureFactory', label: '采购工厂', type: 'procureFactorySelect', i18n_label: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY', permission: 'MODELTARGETPRICE_APPROVAL_PROFACTORY|模具目标价管理-目标价审批-采购工厂'},
  {value: 'buyerName', label: '询价采购员', type: 'input', i18n_label: 'XUNJIACAIGOUYUAN',selectOption: '', permission: 'MODELTARGETPRICE_APPROVAL_BUYER|模具目标价管理-目标价审批-询价采购员'},
  {value: 'linieName', label: 'LINIE', type: 'input', i18n_label: 'LINIE',selectOption: 'LINIE', permission: 'MODELTARGETPRICE_APPROVAL_LINIE|模具目标价管理-目标价审批-LINIE'},
  {value: 'cfName', label: '模具控制员', type: 'input', i18n_label: 'MOJUKONGZHIYUAN',selectOption:'CF_USER', permission: 'MODELTARGETPRICE_APPROVAL_CF|模具目标价管理-目标价审批-CF'},
  {value: 'applyType', label: '申请类型', type: 'selectDict', i18n_label: 'SHENQINGLEIXING',selectOption: 'sign_page_apply_type',permission: 'MODELTARGETPRICE_APPROVAL_APPLYTYPE|模具目标价管理-目标价审批-申请类型'},
  {value: 'applyDate', label: '申请日期起止', type: 'dateRange', i18n_label: 'SHENQINGRIQIQIZHI', permission: 'MODELTARGETPRICE_APPROVAL_APPLYDATE|模具目标价管理-目标价审批-申请日期起止'},
  {value: 'toolingPriceIsZeno', label: '模具费为0的RFQ', type: 'selectDict', i18n_label: 'MOJUFEIWEIODERFQ',selectOption:'target_price_page_tooling_charge_is_zero', permission: 'MODELTARGETPRICE_APPROVAL_MODELFEEZERO|模具目标价管理-目标价审批-模具费为0的RFQ'}
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