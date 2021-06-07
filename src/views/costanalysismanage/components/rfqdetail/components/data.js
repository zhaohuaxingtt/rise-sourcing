/*
 * @Author: your name
 * @Date: 2021-05-27 17:29:03
 * @LastEditTime: 2021-06-07 10:48:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\data.js
 */
export const infos = [
  { row: 4, name: "RFQ编号", props: "id", key: "costanalysismanage.RfqBianHao" },
  { row: 4, name: "RFQ状态", props: "currentStatus", key: "costanalysismanage.RfqZhuangTai" },
  { row: 4, name: "创建日期", props: "createDate", key: "costanalysismanage.ChuangJianRiQi" },
  { row: 4, name: "RFQ名称", props: "rfqName", key: "costanalysismanage.RfqMingCheng" },
  { row: 4, name: "询价采购员", props: "buyerName", key: "costanalysismanage.XunJiaCaiGouYuan" },
  { row: 4, name: "LINIE", props: "linieNameZh", key: "costanalysismanage.Linie" },
  { row: 4, name: "当前轮次", props: "currentRounds", key: "costanalysismanage.DangQianLunCi" },
  { row: 4, name: "本轮状态", props: "currentRoundsStatus", key: "costanalysismanage.BenLunZhuangTai" },
  { row: 4, name: "本轮报价截止日", props: "currentRoundsEndTime", key: "costanalysismanage.BenLunBaoJiaJieZhiRi" },
  { row: 4, name: "轮次类型", props: "roundsType", key: "costanalysismanage.LunCiLeiXing" }
]

export const partListTableTitle = [
  { props: "fsnrGsnrNum", name: "FSNF/GSNF/SPNR", key: "costanalysismanage.FsnfGsnfSpnr", tooltip: true, width: 130 },
  { props: "partNum", name: "零件号", key: "costanalysismanage.LingJianHao", tooltip: true },
  { props: "partNameZh", name: "零件名(中)", key: "costanalysismanage.LingJianMingZhong", tooltip: true },
  { props: "partNameDe", name: "零件名(德)", key: "costanalysismanage.LingJianMingDe", tooltip: true },
  { props: "procureFactory", name: "采购工厂", key: "costanalysismanage.CaiGouGongChang", tooltip: true },
  { props: "partProjectType", name: "零件项目类型", key: "costanalysismanage.LingJianXiangMuLeiXing", tooltip: true, width: 110 },
  { props: "cartypeCategory", name: "车型大类", key: "costanalysismanage.CheXingDaLei", tooltip: true },
  { props: "cartypeProjectZh", name: "车型项目", key: "costanalysismanage.CheXingXiangMu", tooltip: true },
  { props: "heavyItem", name: "Heavy Item", key: "costanalysismanage.HeavyItem", tooltip: true, width: 100 },
  { props: "round", name: "RFQ轮次", key: "costanalysismanage.RfqLunCi", tooltip: true },
  { props: "cbdStatus", name: "CBD", key: "costanalysismanage.Cbd", tooltip: true },
  { props: "supplierName", name: "供应商", key: "costanalysismanage.GongYingShang", tooltip: true },
  { props: "pcaResult", name: "PCA分析结果", key: "costanalysismanage.PcaFenXiJieGuo", tooltip: true, width: 110 },
  { props: "tiaResult", name: "TIA分析结果", key: "costanalysismanage.TiaFenXiJieGuo", tooltip: true, width: 110 }
]

// 报告清单表头
export const reportListTableTitle = [
  { props: "fileName", name: "文件名称", key: "LK_WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小(MB)", key: "LK_DAXIAOMB", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "LK_SHANGCHUANRIQI", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "LK_SHANGCHUANREN", tooltip: true },
]