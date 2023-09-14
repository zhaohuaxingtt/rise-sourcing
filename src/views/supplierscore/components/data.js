/*
 * @Author: your name
 * @Date: 2021-06-22 14:36:13
 * @LastEditTime: 2022-03-25 15:40:46
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\supplierscore\components\data.js
 */
export const navList = [
  {
    value: 1,
    name: "RFQ管理",
    message: 0,
    url: "/targetpriceandscore/supplierScore/home",
    activePath: "home",
    key: "LK_RFQGUANLI",
    permissionKey: 'SUPPLIERSCORE_TAB',
    permissionName: '评分任务'
  },
]

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
  { props: "rfqId", name: "RFQ编号", key: "RFQBIANHAO", tooltip: true, sortable: true, fixed: true, minWidth: '120' },
  { props: "rfqName", name: "RFQ名称", key: "RFQMINGCHENG", tooltip: true, sortable: true, minWidth: '120' },
  { props: "rfqType", name: "RFQ类型", key: "RFQLEIXING", tooltip: true, sortable: true, minWidth: '100' },
  { props: "rfqStatus", name: "RFQ状态", key: "RFQZHUANGTAI", tooltip: true, sortable: true, minWidth: '100' },
  { props: "buyerName", name: "询价采购员", key: "XUNJIACAIGOUYUAN", tooltip: true, sortable: true, width: '120' },
  { props: "linie", name: "LINIE", key: "LINIE", tooltip: true, sortable: true, width: '100' },
  { props: "mqRater", name: "质量评分人", key: "LK_MQ", tooltip: true, sortable: true, width: '120' },
  { props: "mqCoordinator", name: "质量协调人", key: "质量协调人", tooltip: true, sortable: true, width: '120' },
  { props: "epRater", name: "技术评分人", key: "LK_EP", tooltip: true, sortable: true, width: '120' },
  { props: "epCoordinator", name: "技术协调人", key: "技术协调人", tooltip: true, sortable: true, width: '120' },
  { props: "rateStatus", name: "评分状态", key: "PINGFENZHUANGTAI", tooltip: true, sortable: true, width: '120', showTips: true, tips: () => `<span>${localStorage.getItem('lang') === 'zh' ? '最新一条评分任务状态' : 'The latest rating task status'}</span>` },
  { props: "sqeRater", name: "SQE", key: "SQE", tooltip: true, sortable: true, width: '100' },
  { props: "sqeRateStatus", name: "SQE状态", key: "SQE状态", tooltip: true, sortable: true, width: '140', showTips: true, tips: () => `<span>${localStorage.getItem('lang') === 'zh' ? '最新一条评分任务状态' : 'The latest rating task status'}</span>` },
  { props: "currentRoundsEndTime", name: "报价截止日期", key: "BAOJIAJIEZHIRIQI", tooltip: true, sortable: true, width: '140' }
]

export const afterSaleLeaderIds = [1016, 1018, 1023, 1024, 1025, 1026]