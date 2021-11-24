/*
 * @Author: your name
 * @Date: 2021-05-27 17:29:03
 * @LastEditTime: 2021-10-28 09:51:20
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\data.js
 */
export const infos = [
  { row: 4, name: "RFQ编号", props: "id", key: "RFQBIANHAO", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_ID|RFQ编号" },
  { row: 4, name: "RFQ状态", props: "statusName", key: "RFQZHUANGTAI", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_STATUSNAME|RFQ状态" },
  { row: 4, name: "创建日期", props: "createDate", key: "CHUANGJIANRIQI", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_CREATEDATE|创建日期" },
  { row: 4, name: "RFQ名称", props: "rfqName", key: "RFQMINGCHENG", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_RFQNAME|RFQ名称" },
  { row: 4, name: "询价采购员", props: "buyerName", key: "XUNJIACAIGOUYUAN", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_BUYERNAME|询价采购员" },
  { row: 4, name: "LINIE", props: "linieNameZh", key: "LINIE", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_LINIE|LINIE" },
  { row: 4, name: "当前轮次", props: "currentRounds", key: "DANGQIANLUNCI", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_CURRENTROUNDS|当前轮次" },
  { row: 4, name: "本轮状态", props: "currentRoundsStatus", key: "BENLUNZHUANGTAI", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_CURRENTROUNDSSTATUS|本轮状态" },
  { row: 4, name: "本轮报价截止日", props: "currentRoundsEndTime", key: "BENLUNBAOJIAJIEZHIRI", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_CURRENTROUNDSENDTIME|本轮报价截止日" },
  { row: 4, name: "轮次类型", props: "roundsTypeName", key: "LUNCILEIXING", permissionKey: "COSTANALYSISMANAGE_RFQDETAIL_INFOS_ROUNDSTYPENAME|轮次类型" }
]

export const partListTableTitle = [
  { props: "fsnrGsnrNum", name: "FSNF/GSNF/SPNR", key: "FSNFGSNFSPNR", tooltip: true, width: 130 },
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true, width: 130 },
  { props: "partNameZh", name: "零件名(中)", key: "LINGJIANMINGZHONG", tooltip: true },
  { props: "partNameDe", name: "零件名(德)", key: "LINGJIANMINGDE", tooltip: true },
  { props: "procureFactoryName", name: "采购工厂", key: "CAIGOUGONGCHANG", tooltip: true },
  { props: "partProjectTypeDesc", name: "零件项目类型", key: "LINGJIANXIANGMULEIXING", tooltip: true, width: 110 },
  { props: "cartypeCategory", name: "车型大类", key: "CHEXINGDALEI", tooltip: true },
  { props: "cartypeProjectZh", name: "车型项目", key: "CHEXINGXIANGMU", tooltip: true },
  { props: "heavyItem", name: "Heavy Item", key: "HEAVYITEM", tooltip: true, width: 100 },
  { props: "round", name: "RFQ轮次", key: "RFQLUNCI", tooltip: true },
  { props: "cbdStatus", name: "CBD", key: "CBD", tooltip: true },
  { props: "supplierName", name: "供应商", key: "GONGYINGSHANG", tooltip: true },
  { props: "pcaResult", name: "PCA分析结果", key: "PCAFENXIJIEGUO", tooltip: true, width: 110 },
  { props: "tiaResult", name: "TIA分析结果", key: "TIAFENXIJIEGUO", tooltip: true, width: 110 }
]

// 报告清单表头
export const reportListTableTitle = [
  { props: "fileName", name: "文件名称", key: "WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "SHANGCHUANRIQI", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "SHANGCHUANREN", tooltip: true },
]