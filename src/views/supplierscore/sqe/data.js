export const queryForm = {
  rfqId: "", // RFQ编号
  rfqName: "", // RFQ名称
  linieUserId: "", // LINIE
  buyerId: "", // 询价采购员
  rateStatus: "", // 评分状态
  partNum: "", // 零件号
  partName: "", // 零件名称
  supplierSvwCode: "", // 供应商SVW号
  supplierSapCode: "", // 供应商SAP号
  supplierName: "", // 供应商名称
  modelNameZh: "", // 车型
  carTypeProject: "", // 车型项目
  showSelf: true, // 是否显示自己
}

export const tableTitle = [
  { props: "rfqId", name: "RFQ编号", key: "RFQBIANHAO", tooltip: true, sortable: true },
  { props: "rfqName", name: "RFQ名称", key: "RFQMINGCHENG", tooltip: true, sortable: true },
  { props: "rfqType", name: "RFQ类型", key: "RFQLEIXING", tooltip: true, sortable: true },
  { props: "rfqStatus", name: "RFQ状态", key: "RFQZHUANGTAI", tooltip: true, sortable: true },
  { props: "buyerName", name: "询价采购员", key: "XUNJIACAIGOUYUAN", tooltip: true, sortable: true },
  { props: "linie", name: "LINIE", key: "LINIE", tooltip: true, sortable: true },
  { props: "mqRater", name: "质量评分人", key: "LK_MQ", tooltip: true, sortable: true },
  { props: "pushDate", name: "推送时间", key: "LK_TUISONGSHIJIAN", tooltip: true, sortable: true },
  { props: "sqeRater", name: "SQE", key: "SQE", tooltip: true, sortable: true },
  { props: "sqeCoordinator", name: "SQE股长", key: "SQE股长", tooltip: true, sortable: true },
  { props: "rateStatus", name: "SQE状态", key: "SQE状态", tooltip: true, sortable: true, showTips: true, tips: () => `<span>${localStorage.getItem('lang') === 'zh' ? '最新一条评分任务状态' : 'The latest rating task status'}</span>` },
]