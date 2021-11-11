/*
 * @Author: your name
 * @Date: 2021-05-27 13:45:35
 * @LastEditTime: 2021-07-13 14:30:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\home\components\data.js
 */
import { permissionTitle } from "@/utils"

// 技术资料下载弹窗---询价附件表单头
export const FilesTitle = [
    {props:'fileName',name:'文件名称', key: "LK_WENJIANMINGCHENG", tooltip: true},
    {props:'fileSize',name:'大小', key: "DAXIAO", tooltip: true},
    {props:'createDate',name:'上传日期', key: "LK_SHANGCHUANRIQI", tooltip: true},
    {props:'uploader',name:'上传人', key: "LK_SHANGCHUANREN", tooltip: true},
  ]


// 技术资料下载弹窗---询价图纸表单头
  export const DrawingTitle = [
    {props:'partNum',name:'零件号', key: "LK_LINGJIANHAO", tooltip: true},
    {props:'tpPartAttachmentName',name:'文件名称', key: "LK_WENJIANMINGCHENG", tooltip: true},
    {props:'size',name:'大小', key: "DAXIAO", tooltip: true},
    {props:'createDate',name:'上传日期', key: "LK_SHANGCHUANRIQI", tooltip: true},
    {props:'userName',name:'上传人', key: "LK_SHANGCHUANREN", tooltip: true},
  ]

  // CBD状态弹窗表头
  export const CbdTitle = [
    {props:'fsnrGsnrNum',name:'FS号', key: "LK_FSHAO", tooltip: true},
    {props:'partNum',name:'零件号', key: "LK_LINGJIANHAO", tooltip: true},
    {props:'partNameZh',name:'零件名（中）', key: "LK_LINGJIANMINGZHONG", tooltip: true},
    {props:'partNameDe',name:'零件名（德）', key: "LK_LINGJIANMINGDE", tooltip: true},
    {props:'cartypeProjectZh',name:'车型项目', key: "partsignLanguage.CheXingXiangMu", tooltip: true},
    {props:'supplierName',name:'供应商', key: "LK_GONGYINGSHANGMING", tooltip: true},
    {props:'sendDate',name:'发送时间', key: "costanalysismanage.FaSongShiJian", tooltip: true},
    {props:'round',name:'RFQ轮次', key: "costanalysismanage.RfqLunCi", tooltip: true},
    {props:'rfqStatus',name:'RFQ状态', key: "LK_RFQZHUANGTAI", tooltip: true},
    {props:'heavyItem',name:'heavy item', key: "LK_HEAVYITEM", tooltip: true},
  ]

export const queryForm = {
  rfqId: "",
  rfqStatus: "",
  partNum: "",
  partName: "",
  carType: "",
  pca: "",
  tia: "",
  heavyItem: "",
  commodity: "",
  linieId: "",
  showSelf: true
}

export const tableTitle = permissionTitle("COSTANALYSISMANAGE_HOME_TABLE", [
  { props: "id", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true },
  { props: "rfqName", name: "RFQ名称", key: "costanalysismanage.RfqMingCheng", tooltip: true },
  { props: "rfqType", name: "RFQ类型", key: "costanalysismanage.RfqLeiXing", tooltip: true },
  { props: "createDate", name: "创建日期", key: "costanalysismanage.ChuangJianRiQi", tooltip: true, width: 100 },
  { props: "currentRounds", name: "当前轮次", key: "costanalysismanage.DangQianLunCi", tooltip: true },
  { props: "statusName", name: "RFQ状态", key: "costanalysismanage.RfqZhuangTai", tooltip: true },
  { props: "currentRoundsEndTime", name: "报价截止日期", key: "costanalysismanage.BaoJiaJieZhiRiQi", tooltip: true, width: 110 },
  { props: "buyerName", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true, width: 100 },
  { props: "linieNameZh", name: "LINIE", key: "costanalysismanage.Linie", tooltip: true },
  { props: "pcaName", name: "PCA", key: "costanalysismanage.Pca", tooltip: true },
  { props: "tiaName", name: "TIA", key: "costanalysismanage.Tia", tooltip: true },
  { props: "heavyItem", name: "Heavy Item", key: "costanalysismanage.HeavyItem", tooltip: true, width: 100 },
  { props: "technoMaterial", name: "技术资料", key: "costanalysismanage.JiShuZiLiao", tooltip: true },
  { props: "sendDate", name: "CBD", key: "costanalysismanage.Cbd", tooltip: true, width: 150 },
  { props: "analysisReport", name: "分析报告", key: "costanalysismanage.FenXiBaoGao", tooltip: true },
  { props: "recordId", width: 40 }
])