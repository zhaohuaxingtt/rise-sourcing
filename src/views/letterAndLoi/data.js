/*
 * @Author: wentliao
 * @Date: 2021-06-18 13:46:11
 * @Description: 定点信/LOI 相关DATA
 */

// homepage的类型tab
export const letterAndLoiType = [
    {label:'LK_DINGDIANXIN',key:'letter',name:'定点信'},
    {label:'LK_LOI',key:'LOI',name:'LOI'},
]

// 定点信搜索条件
export const letterListSearch =[
    {props:'letterNum',label:'定点信编号',type:'input',labelKey:'LK_DINGDIANXINBIANHAO'},
    {props:'partNum',label:'零件号',type:'input',labelKey:'partsprocure.PARTSPROCUREPARTNUMBER'},
    {props:'partName',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG'},
    {props:'fsnrGsnrNum',label:'FsNr/GsNr',type:'input',labelKey:'partsprocure.FsnrGsnr'},
    {props:'csfCssName',label:'询价采购员',type:'input',labelKey:'partsprocure.PARTSPROCUREINQUIRYBUYER'},
    {props:'linieName',label:'LINIE',type:'input',labelKey:'partsprocure.PARTSPROCURELINIE'},
    {props:'status',label:'定点信状态',type:'select',labelKey:'LK_DINGDIANXINZHUANGTAI',selectOption:'status'},
    {props:'rfqId',label:'RFQ编号',type:'input',labelKey:'costanalysismanage.RfqBianHao'},
    {props:'nominateAppId',label:'定点申请单号',type:'input',labelKey:'LK_DINGDIANXINDANHAO'},
    {props:'supplierName',label:'供应商名称',type:'input',labelKey:'LK_GONGYINGSHANGMINGCHENG'},
    {props:'supplierSapNum',label:'供应商SAP号',type:'input',labelKey:'LK_GONGYINGSHANGSAPHAO'},
    {props:'nominateDate',label:'定点时间起⽌',type:'datePicker',labelKey:'LK_DINGDIANSHIJIANQIZHI'},
    {props:'showSelf',label:'是否显⽰⾃⼰',type:'select',labelKey:'LK_SHIFOUXIANSHIZIJI',selectOption:'showSelf'},
]

// loi搜索条件
export const loiListSearch = [
  {props:'key1',label:'LOI编号',type:'input',labelKey:'LK_LOIBIANHAO'},
  {props:'key2',label:'零件号',type:'input',labelKey:'partsprocure.PARTSPROCUREPARTNUMBER'},
  {props:'key3',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG'},
  {props:'key4',label:'FsNr/GsNr',type:'input',labelKey:'partsprocure.FsnrGsnr'},
  {props:'key5',label:'询价采购员',type:'input',labelKey:'partsprocure.PARTSPROCUREINQUIRYBUYER'},
  {props:'key6',label:'LINIE',type:'input',labelKey:'partsprocure.PARTSPROCURELINIE'},
  {props:'key7',label:'LOI状态',type:'select',labelKey:'LK_LOIZHUANGTAI',selectOption:'status'},
  {props:'key8',label:'RFQ编号',type:'input',labelKey:'costanalysismanage.RfqBianHao'},
  {props:'key9',label:'定点申请单号',type:'input',labelKey:'LK_DINGDIANXINDANHAO'},
  {props:'key10',label:'供应商名称',type:'input',labelKey:'LK_GONGYINGSHANGMINGCHENG'},
  {props:'key11',label:'供应商SAP号',type:'input',labelKey:'LK_GONGYINGSHANGSAPHAO'},
  {props:'key12',label:'LOI⽣成时间',type:'datePicker',labelKey:'LK_DINGDIANSHIJIANQIZHI'},
  {props:'key13',label:'是否显⽰⾃⼰',type:'select',labelKey:'LK_SHIFOUXIANSHIZIJI',selectOption:'isShowMe'},
]

// 定点信列表表头
export const letterListTitle=[
  { props: "nominateAppId", name: "定点申请单号", key: "LK_DINGDIANXINDANHAO", tooltip: true },
  { props: "letterNum", name: "定点信编号", key: "LK_DINGDIANXINBIANHAO", tooltip: true },
  { props: "rfqId", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true },
  { props: "supplierNum", name: "供应商号", key: "nominationSupplier.GongYingShangHao", tooltip: true },
  { props: "supplierSapNum", name: "供应商SAP号", key: "LK_GONGYINGSHANGSAPHAO", tooltip: true },
  { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG", tooltip: true },
  { props: "statusDesc", name: "定点信状态", key: "LK_DINGDIANXINZHUANGTAI", tooltip: true },
  { props: "supplierResult", name: "供应商反馈", key: "LK_GONGYINGSHANGFANKUI", tooltip: true },
  { props: "fsName", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true },
  { props: "linieName", name: "LINIE", key: "LK_LINIE", tooltip: true },
  { props: "isSignAgreement", name: "是否签署协议", key: "LK_SHIFOUQIANSHUXIEYI", tooltip: true },
  { props: "nominateDate", name: "定点⽇期", key: "LK_DINGDIANRIQI", tooltip: true },
]

export const loiListTitle = [
  { props: "key1", name: "定点申请单号", key: "LK_DINGDIANXINDANHAO", tooltip: true },
  { props: "key2", name: "LOI编号", key: "LK_LOIBIANHAO", tooltip: true },
  { props: "key3", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true },
  { props: "key4", name: "供应商号", key: "nominationSupplier.GongYingShangHao", tooltip: true },
  { props: "key5", name: "供应商SAP号", key: "LK_GONGYINGSHANGSAPHAO", tooltip: true },
  { props: "key6", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG", tooltip: true },
  { props: "key7", name: "LOI状态", key: "LK_LOIZHUANGTAI", tooltip: true },
  { props: "key8", name: "供应商反馈", key: "LK_GONGYINGSHANGFANKUI", tooltip: true },
  { props: "key9", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true },
  { props: "key10", name: "LINIE", key: "LK_LINIE", tooltip: true },
  { props: "key11", name: "备注", key: "LK_BEIZHU", tooltip: true },
]

// 历史定点信表头
export const historyListTitle=[
  { props: "letterNum", name: "定点信编号", key: "LK_DINGDIANXINBIANHAO", tooltip: true },
  { props: "fileName", name: "文件名称", key: "LK_WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "LK_DAXIAOMB", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "LK_SHANGCHUANRIQI", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "LK_SHANGCHUANREN", tooltip: true },
]