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
  { props: 'targetPrice', name: '期望目标价-分摊', key: "期望目标价-分摊", tooltip: true, width: 170, sortable: true },
  { props: 'targetPrice', name: '期望目标价-一次性', key: "期望目标价-一次性", tooltip: true, width: 180, sortable: true },
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
  { prop: 'applyType', label: '申请类型', type: 'select', labelKey: 'SHENQINGLEIXING', selectOption: 'sign_page_apply_type' },
  { prop: 'applyDate', label: '申请日期起止', type: 'dateRange', labelKey: 'SHENQINGRIQIQIZHI' },
]
