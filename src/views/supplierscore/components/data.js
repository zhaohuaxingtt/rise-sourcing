/*
 * @Author: your name
 * @Date: 2021-06-22 14:36:13
 * @LastEditTime: 2021-11-11 17:26:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\data.js
 */
export const navList = [
  {
    value: 1,
    name: "RFQ管理",
    message: 0,
    url: "/supplierScore/home",
    activePath: "home",
    key: "LK_RFQGUANLI"
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
  showSelf:'YES', // 是否显示自己
}

export const tableTitle = [
  { props: "rfqId", name: "RFQ编号", key: "RFQBIANHAO", tooltip: true },
  { props: "rfqName", name: "RFQ名称", key: "RFQMINGCHENG", tooltip: true },
  { props: "rfqType", name: "RFQ类型", key: "RFQLEIXING", tooltip: true },
  { props: "rfqStatus", name: "RFQ状态", key: "RFQZHUANGTAI", tooltip: true },
  { props: "buyerName", name: "询价采购员", key: "XUNJIACAIGOUYUAN", tooltip: true },
  { props: "linie", name: "LINIE", key: "LINIE", tooltip: true },
  { props: "rateStatus", name: "评分状态", key: "PINGFENZHUANGTAI", tooltip: true },
  { props: "currentRoundsEndTime", name: "报价截止日期", key: "BAOJIAJIEZHIRIQI", tooltip: true }
]

export const afterSaleLeaderIds = [ 1016, 1018, 1023, 1024, 1025, 1026 ]