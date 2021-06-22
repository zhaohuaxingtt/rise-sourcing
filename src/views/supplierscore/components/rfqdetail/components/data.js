/*
 * @Author: your name
 * @Date: 2021-06-22 11:13:08
 * @LastEditTime: 2021-06-22 15:40:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\data.js
 */
export const infos = [
  { row: 4, name: "RFQ编号", props: "id", key: "RFQ编号" },
  { row: 4, name: "RFQ名称", props: "rfqName", key: "RFQ名称" },
  { row: 4, name: "RFQ状态", props: "currentStatus", key: "RFQ状态" },
  { row: 4, name: "创建日期", props: "createDate", key: "创建日期" },
  { row: 4, name: "询价采购员", props: "buyerName", key: "询价采购员" },
  { row: 4, name: "LINIE", props: "linieNameZh", key: "LINIE" },
  { row: 4, name: "评分人", props: "currentRounds", key: "评分人" },
  { row: 4, name: "协调人", props: "currentRoundsStatus", key: "协调人" }
]

export const partListTableTitle = [
  { props: "partNum", name: "零件号", key: "零件号", tooltip: true },
  { props: "fsnrGsnrNum", name: "FS No.", key: "FS No.", tooltip: true },
  { props: "purchasingFactory", name: "采购工厂", key: "采购工厂", tooltip: true },
  { props: "partNameZh", name: "零件名(中)", key: "零件名(中)", tooltip: true },
  { props: "partNameDe", name: "零件名(德)", key: "零件名(德)", tooltip: true },
  { props: "cartypeProjectZh", name: "车型项目", key: "车型项目", tooltip: true },
  { props: "relatedModels", name: "相关车型", key: "相关车型", tooltip: true }
]