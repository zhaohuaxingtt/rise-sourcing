/*
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-12-07 15:38:01
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-15 10:27:54
 * @FilePath: \front-web\src\views\SELTargetPrice\query\data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tableTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "FSGSSPNO", tooltip: true, width: 145, sortable: true },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true, width: 120, sortable: true },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, width: 135, sortable: true },
  { props: 'carTypeProjectName', name: '车型项目', key: "CHEXINGXIANGMU", tooltip: true, width: 120, sortable: true },
  { props: 'rfqId', name: 'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 110, sortable: true },
  { props: 'materialGroup', name: '材料组', key: "CAILIAOZU", tooltip: true, width: 110, sortable: true },
  { props: 'businessType', name: '申请类型', key: "申请类型", tooltip: true, width: 110, sortable: true },
  { props: 'buyerName', name: '询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 120, sortable: true },
  { props: 'lineName', name: 'LINIE', key: "LINIE", tooltip: true, width: 90, sortable: true },
  { props: 'cfUserName', name: 'CF', key: "CF", tooltip: true, width: 100, sortable: true },
  { props: 'shenpi', name: '审批记录', key: "SHENPIJILU", tooltip: true, width: 120, sortable: true },
  { props: 'targetPrice', name: '目标价', key: "MUBIAOJIA", tooltip: true, width: 150, sortable: true },
  { props: 'releaseOutput', name: '询价产量', key: "询价产量", tooltip: true, width: 110, sortable: true },
  { props: 'estimateShareAPrice', name: '预计A价分摊', key: "预计A价分摊", tooltip: true, width: 150, sortable: true },
  { props: 'applicationDate', name: '申请日期', key: "SHENQINGRIQI", tooltip: true, minWidth: 110, sortable: true },
]

export const searchFormData = [
  { prop: 'rfqCode', label: 'RFQ编号', labelKey: 'RFQBIANHAO' },
  { prop: 'fsnrGsnrNum', label: 'FS/GS/SP No.', labelKey: 'FSGSSP' },
  { prop: 'partNum', label: '零件号', type: 'multiLineInput', labelKey: 'LINGJIANHAO' },
  { prop: 'partNameZh', label: '零件名称', labelKey: 'LINGJIANMINGCHENG' },
  { prop: 'cartypeProjectId', label: '车型项目', type: 'select', labelKey: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO', multiple:true },
  { prop: 'procureFactoryId', label: '采购工厂', type: 'select', labelKey: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY', multiple:true },
  { prop: 'partProjectType', label: '零件项目类型', type: 'select', labelKey: 'LINGJIANXIANGMULEIXING', selectOption: 'PPT', multiple:true },
  { prop: 'buyerName', label: '询价采购员', labelKey: 'XUNJIACAIGOUYUAN' },
  { prop: 'lineName', label: 'LINIE', labelKey: 'LINIE' },
  { prop: 'statusList', label: '状态', type: 'select', labelKey: 'ZHUANGTAI', selectOption: 'sel_target_price_status', multiple:true },
  { prop: 'businessType', label: '申请类型', type: 'select', labelKey: 'SHENQINGLEIXING', selectOption: 'sel_target_business_type' },
  { prop: 'applyDate', label: '申请日期起止', type: 'dateRange', labelKey: 'SHENQINGRIQIQIZHI' },
  { prop: 'cfUserId', label: 'CF控制员', type: 'select', labelKey: 'CF控制员', selectOption: 'CF_CONTROL', multiple:true },
]
