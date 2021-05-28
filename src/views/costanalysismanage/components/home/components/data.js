/*
 * @Author: your name
 * @Date: 2021-05-27 13:45:35
 * @LastEditTime: 2021-05-28 15:51:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\home\components\data.js
 */
// 技术资料下载弹窗---询价附件表单头
export const FilesTitle = [
    {props:'a',name:'文件名称', key: "", tooltip: true},
    {props:'b',name:'大小(MB)', key: "", tooltip: true},
    {props:'c',name:'上传日期', key: "", tooltip: true},
    {props:'d',name:'上传人', key: "", tooltip: true},
  ]


// 技术资料下载弹窗---询价图纸表单头
  export const DrawingTitle = [
    {props:'e',name:'零件号', key: "", tooltip: true},
    {props:'a',name:'文件名称', key: "", tooltip: true},
    {props:'b',name:'大小(MB)', key: "", tooltip: true},
    {props:'c',name:'上传日期', key: "", tooltip: true},
    {props:'d',name:'上传人', key: "", tooltip: true},
  ]

  // CBD状态弹窗表头
  export const CbdTitle = [
    {props:'a',name:'FS号', key: "", tooltip: true},
    {props:'b',name:'零件号', key: "", tooltip: true},
    {props:'c',name:'零件名（中）', key: "", tooltip: true},
    {props:'d',name:'零件名（德）', key: "", tooltip: true},
    {props:'e',name:'车型项目', key: "", tooltip: true},
    {props:'f',name:'供应商', key: "", tooltip: true},
    {props:'g',name:'发送时间', key: "", tooltip: true},
    {props:'h',name:'RFQ轮次', key: "", tooltip: true},
    {props:'i',name:'RFQ状态', key: "", tooltip: true},
    {props:'j',name:'heavy item', key: "", tooltip: true},
  ]

export const tableTitle = [
  { props: "rfqNum", name: "RFQ编号", key: "costanalysismanage.Rfqbianhao", tooltip: true },
  { props: "rfqName", name: "RFQ名称", key: "costanalysismanage.Rfqmingcheng", tooltip: true },
  { props: "rfqType", name: "RFQ类型", key: "costanalysismanage.Rfqleixing", tooltip: true },
  { props: "createDate", name: "创建日期", key: "costanalysismanage.Chuangjianriqi", tooltip: true, width: 100 },
  { props: "currentRounds", name: "当前轮次", key: "costanalysismanage.Dangqianlunci", tooltip: true },
  { props: "rfqStatus", name: "RFQ状态", key: "costanalysismanage.Rfqzhuangtai", tooltip: true },
  { props: "deadDate", name: "报价截止日期", key: "costanalysismanage.Baojiajiezhiriqi", tooltip: true, width: 110 },
  { props: "buyerName", name: "询价采购员", key: "costanalysismanage.Xunjiacaigouyuan", tooltip: true, width: 100 },
  { props: "linie", name: "LINIE", key: "costanalysismanage.Linie", tooltip: true },
  { props: "pca", name: "PCA", key: "costanalysismanage.Pca", tooltip: true },
  { props: "tia", name: "TIA", key: "costanalysismanage.Tia", tooltip: true },
  { props: "heavyItem", name: "Heavy Item", key: "costanalysismanage.Heavyitem", tooltip: true, width: 100 },
  { props: "techFile", name: "技术资料", key: "costanalysismanage.Jieshuziliao", tooltip: true },
  { props: "cbd", name: "CBD", key: "costanalysismanage.Cbd", tooltip: true, width: 120 },
  { props: "analysisReport", name: "分析报告", key: "costanalysismanage.Fenxibaogao", tooltip: true },
  { props: "order", width: 40 }
]