/*
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-12-07 15:38:01
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-08 15:01:55
 * @FilePath: \front-web\src\views\SELTargetPrice\approval\data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tableTitle = [
    { props: 'fsNum', name: '零件采购项目号', key: "FSGSSPNO", tooltip: true, width: 145, sortable: true },
    { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true, width: 120, sortable: true },
    { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, width: 135, sortable: true },
    { props: 'cartypeProjectZh', name: '车型项目', key: "CHEXINGXIANGMU", tooltip: true, width: 120, sortable: true },
    { props: 'rfqId', name: 'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 110, sortable: true },
    { props: 'materialGroup', name: '材料组', key: "CAILIAOZU", tooltip: true, width: 110, sortable: true },
    { props: 'applyType', name: '申请类型', key: "申请类型", tooltip: true, width: 110, sortable: true },
    { props: 'buyerName', name: '询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 120, sortable: true },
    { props: 'linieName', name: 'LINIE', key: "LINIE", tooltip: true, width: 90, sortable: true },
    { props: 'cfName', name: 'CF', key: "CF", tooltip: true, width: 100, sortable: true },
    { props: 'shenpi', name: '审批记录', key: "SHENPIJILU", tooltip: true, width: 120, sortable: true },
    { props: 'targetPrice', name: '目标价-分摊', key: "目标价-分摊", tooltip: true, width: 150, sortable: true },
    { props: 'targetPrice', name: '目标价-一次性', key: "目标价-一次性", tooltip: true, width: 160, sortable: true },
    { props: 'xj', name: '询价产量', key: "询价产量", tooltip: true, width: 110, sortable: true },
    { props: 'PlanAPrice', name: '预计A价分摊', key: "预计A价分摊", tooltip: true, width: 150, sortable: true },
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
]

export const detailList = [
  { value: 'partNum', label: '零件号', type: 'input', i18n_label: 'LINGJIANHAO', },
  { value: 'partNameZh', label: '零件名称', type: 'input', i18n_label: 'LINGJIANMINGCHENG', },
  { value: 'lcBPrice', label: 'Old CF LC_B Target', type: 'input', i18n_label: 'OLDCFLCBTARGET', parent: 'oldCfInfVO' },
  { value: 'lcBPrice', label: 'New CF LC_B Target(人民币)', type: 'input', i18n_label: 'NEWCFLCBTARGET_RMB', parent: 'newCfInfVO' },
  { value: 'lcAPrice', label: 'Old CF LC_A Target', type: 'input', i18n_label: 'OLDCFLCATARGET', parent: 'oldCfInfVO' },
  { value: 'lcAPrice', label: 'New CF LC_A Target(人民币)', type: 'input', i18n_label: 'NEWCFLCATARGET_RMB', parent: 'newCfInfVO' },
  { value: 'skdBPrice', label: 'Old CF SKD_B Target', type: 'input', i18n_label: 'OLDCFSKDBTARGET', parent: 'oldCfInfVO' },
  { value: 'skdBPrice', label: 'New CF SKD_B Target(人民币)', type: 'input', i18n_label: 'NEWCFSKDBTARGET_RMB', parent: 'newCfInfVO' },
  { value: 'skdAPrice', label: 'Old CF SKD_A Target', type: 'input', i18n_label: 'OLDCFSKDATARGET', parent: 'oldCfInfVO' },
  { value: 'skdAPrice', label: 'New CF SKD_A Target(人民币)', type: 'input', i18n_label: 'NEWCFSKDATARGET_RMB', parent: 'newCfInfVO' },
  { value: 'ckdLanded', label: 'Old CF CKD Landed', type: 'input', i18n_label: 'OLDCFCKDLANDED', parent: 'oldCfInfVO' },
  { value: 'ckdLanded', label: 'New CF CKD Landed(人民币)', type: 'input', i18n_label: 'NEWCFCKDLANDED_RMB', parent: 'newCfInfVO' },
  { value: 'ckdDuty', label: 'Old CF CKD Duty(%)', type: 'input', i18n_label: 'OLDCFCKDDUTY', parent: 'oldCfInfVO' },
  { value: 'ckdDuty', label: 'New CF CKD Duty(%)', type: 'input', i18n_label: 'NEWCFCKDDUTY', parent: 'newCfInfVO' },
  { value: 'ckdExwork', label: 'Old CF CKD Ex-work', type: 'input', i18n_label: 'OLDCFCKDEXWORK', parent: 'oldCfInfVO' },
  { value: 'ckdExwork', label: 'New CF CKD Ex-work(人民币)', type: 'input', i18n_label: 'NEWCFCKDEXWORK', parent: 'newCfInfVO' },
  { value: 'modifyReason', label: '修改原因', type: 'input', i18n_label: 'XIUGAIYUANYIN', parent: 'oldCfInfVO' },
]