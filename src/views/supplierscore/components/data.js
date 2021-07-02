/*
 * @Author: your name
 * @Date: 2021-06-22 14:36:13
 * @LastEditTime: 2021-06-28 18:45:08
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
}

// export const tableTitle = [
//   { props: "rfqId", name: "RFQ编号", key: "RFQBIANHAO", tooltip: true },
//   { props: "rfqName", name: "RFQ名称", key: "RFQMINGCHENG", tooltip: true },
//   { props: "rfqType", name: "RFQ类型", key: "RFQLEIXING", tooltip: true },
//   { props: "rfqStatus", name: "RFQ状态", key: "RFQZHUANGTAI", tooltip: true },
//   { props: "buyerName", name: "询价采购员", key: "XUNJIACAIGOUYUAN", tooltip: true },
//   { props: "linie", name: "LINIE", key: "LINIE", tooltip: true },
//   { props: "rateStatus", name: "评分状态", key: "PINGFENZHUANGTAI", tooltip: true },
//   { props: "currentRoundsEndTime", name: "报价截止日期", key: "BAOJIAJIEZHIRIQI", tooltip: true }
// ]
export const tableTitle = [
  { props: "rfqId", name: "RFQ编号", key: "RFQ编号", tooltip: true },
  { props: "rfqName", name: "RFQ名称", key: "RFQ名称", tooltip: true },
  { props: "rfqType", name: "RFQ类型", key: "RFQ类型", tooltip: true },
  { props: "rfqStatus", name: "RFQ状态", key: "RFQ状态", tooltip: true },
  { props: "buyerName", name: "询价采购员", key: "询价采购员", tooltip: true },
  { props: "linie", name: "LINIE", key: "LINIE", tooltip: true },
  { props: "rateStatus", name: "评分状态", key: "评分状态", tooltip: true },
  { props: "currentRoundsEndTime", name: "报价截止日期", key: "报价截止日期", tooltip: true }
]