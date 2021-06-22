/*
 * @Author: your name
 * @Date: 2021-06-22 14:36:13
 * @LastEditTime: 2021-06-22 15:25:11
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

export const tableTitle = [
  { props: "rfqNum", name: "RFQ编号", key: "RFQ编号", tooltip: true },
  { props: "rfqName", name: "RFQ名称", key: "RFQ名称", tooltip: true },
  { props: "rfqType", name: "RFQ类型", key: "RFQ类型", tooltip: true },
  { props: "rfqState", name: "RFQ状态", key: "RFQ状态", tooltip: true },
  { props: "buyerName", name: "询价采购员", key: "询价采购员", tooltip: true },
  { props: "linie", name: "LINIE", key: "LINIE", tooltip: true },
  { props: "scoreState", name: "评分状态", key: "评分状态", tooltip: true },
  { props: "currentRoundsEndTime", name: "报价截止日期", key: "报价截止日期", tooltip: true }
]