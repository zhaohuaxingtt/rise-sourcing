/*
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-12-08 15:38:28
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-27 20:44:47
 * @FilePath: \front-web\src\views\SELTargetPrice\signin\data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tableTitle = [
  { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "FSGSSPNO", tooltip: true, width: 145, sortable: true },
  { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true, width: 120, sortable: true },
  { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGCHENGZHONG", tooltip: true, minWidth: 135, sortable: true },
  { props: 'carTypeProjectName', name: '车型项目', key: "CHEXINGXIANGMU", tooltip: true, width: 120, sortable: true },
  { props: 'releaseOutput', name: '询价产量', key: "询价产量", tooltip: true, width: 110, sortable: true },
  { props: 'rfqCode', name: 'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 110, sortable: true },
  { props: 'categoryName', name: '材料组', key: "CAILIAOZU", tooltip: true, width: 110, sortable: true },
  { props: 'businessType', name: '申请类型', key: "申请类型", tooltip: true, width: 110, sortable: true },
  { props: 'buyerName', name: '询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 120, sortable: true },
  { props: 'linieName', name: 'LINIE', key: "LINIE", tooltip: true, width: 90, sortable: true },
  { props: 'expectedShareTargetPrice', name: '期望目标价-分摊', key: "期望目标价-分摊", tooltip: true, width: 170, sortable: true },
  { props: 'expectedDisposableTargetPrice', name: '期望目标价-一次性', key: "期望目标价-一次性", tooltip: true, width: 180, sortable: true },
  { props: 'applicationDate', name: '申请日期', key: "SHENQINGRIQI", tooltip: true, width: 180, sortable: true },
]

export const searchFormData = [
  { prop: 'rfqCode', label: 'RFQ编号', labelKey: 'RFQBIANHAO' },
  { prop: 'fsnrGsnrNum', label: 'FS/GS/SP No.', labelKey: 'FSGSSP' },
  { prop: 'partNum', label: '零件号', type: 'multiLineInput', labelKey: 'LINGJIANHAO' },
  { prop: 'partNameZh', label: '零件名称', labelKey: 'LINGJIANMINGCHENG' },
  { prop: 'cartypeProjectId', label: '车型项目', type: 'select', labelKey: 'CHEXINGXIANGMU', selectOption: 'CAR_TYPE_PRO', multiple:true },
  { prop: 'procureFactory', label: '采购工厂', type: 'select', labelKey: 'LKCAIGOUGONGCHANG', selectOption: 'PURCHASE_FACTORY', multiple:true },
  { prop: 'partProjectType', label: '零件项目类型', type: 'select', labelKey: 'LINGJIANXIANGMULEIXING', selectOption: 'PPT', multiple:true },
  { prop: 'buyerName', label: '询价采购员', labelKey: 'XUNJIACAIGOUYUAN' },
  { prop: 'linieName', label: 'LINIE', labelKey: 'LINIE' },
  { prop: 'businessType', label: '申请类型', type: 'select', labelKey: 'SHENQINGLEIXING', selectOption: 'sel_target_business_type' },
  { prop: 'applyDate', label: '申请日期起止', type: 'dateRange', labelKey: 'SHENQINGRIQIQIZHI' },
]
