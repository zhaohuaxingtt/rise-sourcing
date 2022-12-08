/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:35:28
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-08 14:37:04
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\maintenance\data.js
 */


export const tableTitle = [
  { props: 'fsNum', name: '零件采购项目号', key: "FSGSSPNO", tooltip: true, width: 145, sortable: true },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true, width: 120, sortable: true },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, width: 135, sortable: true },
  { props: 'cartypeProjectZh', name: '车型项目', key: "CHEXINGXIANGMU", tooltip: true, width: 120, sortable: true },
  { props: 'xj', name: '询价产量', key: "询价产量", tooltip: true, width: 110, sortable: true },
  { props: 'rfqId', name: 'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 110, sortable: true },
  { props: 'materialGroup', name: '材料组', key: "CAILIAOZU", tooltip: true, width: 110, sortable: true },
  { props: 'applyType', name: '申请类型', key: "申请类型", tooltip: true, width: 110, sortable: true },
  { props: 'buyerName', name: '询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 120, sortable: true },
  { props: 'linieName', name: 'LINIE', key: "LINIE", tooltip: true, width: 90, sortable: true },
  { props: 'cfName', name: 'CF', key: "CF", tooltip: true, width: 100, sortable: true },
  { props: 'status', name: '状态', key: "ZHUANGTAI", tooltip: true, sortable: true },
  { props: 'shenpi', name: '审批记录', key: "SHENPIJILU", tooltip: true, width: 120, sortable: true },
  { props: 'targetPrice', name: '期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true, width: 150, sortable: true },
  { props: 'applyDate', name: '申请日期', key: "SHENQINGRIQI", tooltip: true, minWidth: 110, sortable: true },
]

export const searchFormData = [
  { prop: 'rfqId', label: 'RFQ编号', labelKey: 'RFQBIANHAO' },
  { prop: 'fsNum', label: 'FS/GS/SP No.', labelKey: 'FSGSSP' },
  { prop: 'partNum', label: '零件号', type: 'multiLineInput', labelKey: 'LINGJIANHAO' },
  { prop: 'partNameZh', label: '零件名称', labelKey: 'LINGJIANMINGCHENG' },
  { prop: 'cartypeProjectId', label: '车型项目', type: 'select', labelKey: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO', multiple:true },
  { prop: 'procureFactory', label: '采购工厂', type: 'select', labelKey: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY', multiple:true },
  { prop: 'partProjectType', label: '零件项目类型', type: 'select', labelKey: 'LINGJIANXIANGMULEIXING', selectOption: 'PPT', multiple:true },
  { prop: 'buyerName', label: '询价采购员', labelKey: 'XUNJIACAIGOUYUAN' },
  { prop: 'linieName', label: 'LINIE', labelKey: 'LINIE' },
  { prop: 'state', label: '状态', type: 'select', labelKey: 'ZHUANGTAI', selectOption: 'tooling_target_price_page_task_state', multiple:true },
  { prop: 'applyType', label: '申请类型', type: 'select', labelKey: 'SHENQINGLEIXING', selectOption: 'sign_page_apply_type' },
  { prop: 'applyDate', label: '申请日期起止', type: 'dateRange', labelKey: 'SHENQINGRIQIQIZHI' },
  { prop: 'responseDate', label: 'CF控制员', type: 'select', labelKey: 'CF控制员', selectOption: 'CF_CONTROL', multiple:true },
]

export const modifyTableTitle = [
  { props: 'lcBPrice', name: 'CF LC_B Target', key: "CFLCBTARGET", tooltip: true, width: 120 },
  { props: 'lcAPrice', name: 'CF LC_A Target', key: "CFLCATARGET", tooltip: true, width: 120 },
  { props: 'lcTcCurrencyId', name: 'LC货币类型', key: "LCHUOBILEIXING", tooltip: true, width: 120 },
  { props: 'lcExchangeRate', name: 'LC汇率', key: "LCHUILV", tooltip: true, width: 100 },
  { props: 'skdBPrice', name: 'SKD_B Target', key: "SKDBTARGET", tooltip: true, width: 120 },
  { props: 'skdAPrice', name: 'SKD_A Target', key: "SKDATARGET", tooltip: true },
  { props: 'skdTcCurrencyId', name: 'SKD货币类型', key: "SKDHUOBILEIXING", tooltip: true },
  { props: 'skdExchangeRate', name: 'SKD汇率', key: "SKDHUILV", tooltip: true, width: 120 },
  { props: 'ckdLanded', name: 'CKD Landed', key: "CKDLANDED", tooltip: true },
  { props: 'ckdTcCurrencyId', name: 'CKD货币类型', key: "CKDHUOBILEIXING", tooltip: true },
  { props: 'ckdExchangeRate', name: 'CKD汇率', key: "CKDHUILV", tooltip: true },
  { props: 'ckdDuty', name: 'CKD Duty(%)', key: "CKDDUTY", tooltip: true, width: 120 },
  { props: 'ckdExwork', name: 'CKD Ex-work', key: "CKDEXWORK", tooltip: true, width: 100 },
  { props: 'memo', name: '备注', key: "BEIZHU", tooltip: true, width: 120 },
  { props: 'applyDate', name: '申请日期', key: "SHENQINGRIQI", tooltip: true, width: 100 },
  { props: 'validDesc', name: '有效状态', key: "YOUXIAOZHUANGTAI", tooltip: true, width: 120 },
  { props: 'approveStatusDesc', name: '审批状态', key: "SHENPIZHUANGTAI", tooltip: true, width: 120 },
  { props: 'modifer', name: '修改人', key: "XIUGAIREN", tooltip: true },
  { props: 'modifyDate', name: '修改日期', key: "XIUGAIRIQI", tooltip: true, width: 120 },
]

export const approvalTableTitle = [
  { props: 'approvalStartDate', name: '审批开始日期', key: "SHENPIKAISHIRIQI", tooltip: true },
  { props: 'approvalDate', name: '审批日期', key: "SHENPIRIQI", tooltip: true },
  { props: 'approvalTypeDesc', name: '审批类型', key: "SHENPILEIXING", tooltip: true },
  { props: 'approvalUserName', name: '审批人', key: "SHENPIREN", tooltip: true },
  { props: 'approvalResultDesc', name: '审批结果', key: "SHENPIJIEGUO", tooltip: true },
  { props: 'remarks', name: '备注', key: "BEIZHU", tooltip: true },
]