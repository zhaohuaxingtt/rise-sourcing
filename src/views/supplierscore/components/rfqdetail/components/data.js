/*
 * @Author: your name
 * @Date: 2021-06-22 11:13:08
 * @LastEditTime: 2021-07-13 14:15:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\data.js
 */
export const infos = [
  { row: 4, name: "RFQ编号", props: "rfqId", key: "RFQBIANHAO", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_RFQID|RFQ编号" },
  { row: 4, name: "RFQ名称", props: "rfqName", key: "RFQMINGCHENG", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_RFQNAME|RFQ名称" },
  { row: 4, name: "RFQ状态", props: "rfqStatus", key: "RFQZHUANGTAI", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_RFQSTATUS|RFQ状态" },
  { row: 4, name: "创建日期", props: "createDate", key: "CHUANGJIANRIQI", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_CREATEDATE|创建日期" },
  { row: 4, name: "询价采购员", props: "buyerName", key: "XUNJIACAIGOUYUAN", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_BUYERNAME|询价采购员" },
  { row: 4, name: "LINIE", props: "linie", key: "LINIE", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_LINIE|LINIE" },
  { row: 4, name: "评分人", props: "rater", key: "PINGFENREN", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_RATER|评分人" },
  { row: 4, name: "协调人", props: "coordinator", key: "XIETIAOREN", permissionKey: "SUPPLIERSCORE_RFQDETAIL_INFOS_TEXT_COORDINATOR|协调人" }
]

export const infosSQE = [
  { row: 4, name: "SQE评分股", props: "sqeRateDepartNum", key: "SQE评分股" },
  { row: 4, name: "SQE", props: "sqeRater", key: "SQE" },
  { row: 4, name: "SQE协调人", props: "sqeCoordinator", key: "SQE协调人" },
  { row: 4, name: "SQE状态", props: "sqeStatus", key: "SQE状态" }
]

export const partListTableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true },
  { props: "fsnrGsnrNum", name: "FS No.", key: "FSNO", tooltip: true },
  { props: "procureFactoryName", name: "采购工厂", key: "CAIGOUGONGCHANG", tooltip: true },
  { props: "partNameZh", name: "零件名(中)", key: "LINGJIANMINGZHONG", tooltip: true },
  { props: "partNameDe", name: "零件名(德)", key: "LINGJIANMINGDE", tooltip: true },
  { props: "carTypeProjectZh", name: "车型项目", key: "CHEXINGXIANGMU", tooltip: true },
  { props: "modelNameZh", name: "相关车型", key: "XIANGGUANCHEXING", tooltip: true }
]