/*
 * @Author: your name
 * @Date: 2021-06-22 11:13:08
 * @LastEditTime: 2021-07-13 14:15:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\data.js
 */
export const infos = [
  { row: 4, name: "RFQ编号", props: "rfqId", key: "RFQBIANHAO" },
  { row: 4, name: "RFQ名称", props: "rfqName", key: "RFQMINGCHENG" },
  { row: 4, name: "RFQ状态", props: "rfqStatus", key: "RFQZHUANGTAI" },
  { row: 4, name: "创建日期", props: "createDate", key: "CHUANGJIANRIQI" },
  { row: 4, name: "询价采购员", props: "buyerName", key: "XUNJIACAIGOUYUAN" },
  { row: 4, name: "LINIE", props: "linie", key: "LINIE" },
  { row: 4, name: "评分人", props: "rater", key: "PINGFENREN" },
  { row: 4, name: "协调人", props: "coordinator", key: "XIETIAOREN" }
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