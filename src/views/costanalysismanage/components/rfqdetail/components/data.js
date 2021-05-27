/*
 * @Author: your name
 * @Date: 2021-05-27 17:29:03
 * @LastEditTime: 2021-05-27 19:52:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\data.js
 */
export const infos = [
  { row: 4, name: "RFQ编号", props: "rfqNum", key: "costanalysismanage.Rfqbianhao" },
  { row: 4, name: "RFQ状态", props: "statusName", key: "costanalysismanage.Rfqzhuangtai" },
  { row: 4, name: "创建日期", props: "createDate", key: "costanalysismanage.Chuangjianriqi" },
  { row: 4, name: "RFQ名称", props: "rfqName", key: "costanalysismanage.Rfqmingcheng" },
  { row: 4, name: "询价采购员", props: "a", key: "costanalysismanage.Xunjiacaigouyuan" },
  { row: 4, name: "LINIE", props: "b", key: "costanalysismanage.Linie" },
  { row: 4, name: "当前轮次", props: "currentRounds", key: "costanalysismanage.Dangqianlunci" },
  { row: 4, name: "本轮状态", props: "currentRoundsStatus", key: "costanalysismanage.Benlunzhuangtai" },
  { row: 4, name: "本轮报价截止日", props: "currentRoundsEndTime", key: "costanalysismanage.Benlunbaojiajiezhiri" },
  { row: 4, name: "轮次类型", props: "currentRoundsType", key: "costanalysismanage.Luncileixing" }
]

export const partListTableTitle = [
  { props: "a", name: "FSNF/GSNF/SPNR", key: "costanalysismanage.Fsnfgsnfspnr", tooltip: true, width: 130 },
  { props: "b", name: "零件号", key: "costanalysismanage.Lingjianhao", tooltip: true },
  { props: "c", name: "零件名(中)", key: "costanalysismanage.Lingjianmingzhong", tooltip: true },
  { props: "d", name: "零件名(德)", key: "costanalysismanage.Lingjianmingde", tooltip: true },
  { props: "e", name: "采购工厂", key: "costanalysismanage.Caigougongchang", tooltip: true },
  { props: "f", name: "零件项目类型", key: "costanalysismanage.Lingjianxiangmuleixing", tooltip: true, width: 110 },
  { props: "g", name: "车型大类", key: "costanalysismanage.Chexingdalei", tooltip: true },
  { props: "h", name: "车型项目", key: "costanalysismanage.Chexingxiangmu", tooltip: true },
  { props: "i", name: "Heavy Item", key: "costanalysismanage.Heavyitem", tooltip: true, width: 100 },
  { props: "j", name: "RFQ轮次", key: "costanalysismanage.Rfqlunci", tooltip: true },
  { props: "k", name: "CBD", key: "costanalysismanage.Cbd", tooltip: true },
  { props: "l", name: "供应商", key: "costanalysismanage.Gongyingshang", tooltip: true },
  { props: "m", name: "PCA分析结果", key: "costanalysismanage.Pcafenxijieguo", tooltip: true, width: 110 },
  { props: "n", name: "TIA分析结果", key: "costanalysismanage.Tiafenxijieguo", tooltip: true, width: 110 }
]