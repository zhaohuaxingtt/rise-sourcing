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
    {props:'nominateDate',label:'定点时间起⽌',type:'datePicker',labelKey:'LK_DINGDIANSHIJIANQIZHI_1'},
    {props:'showSelf',label:'是否显⽰⾃⼰',type:'select',labelKey:'LK_SHIFOUXIANSHIZIJI_1',selectOption:'showSelf'},
]

// loi搜索条件
export const loiListSearch = [
  {props:'loiNum',label:'LOI编号',type:'input',labelKey:'LK_LOIBIANHAO'},
  {props:'partNum',label:'零件号',type:'input',labelKey:'partsprocure.PARTSPROCUREPARTNUMBER'},
  {props:'partName',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG'},
  {props:'fsnrGsnrNum',label:'FsNr/GsNr',type:'input',labelKey:'partsprocure.FsnrGsnr'},
  {props:'csfName',label:'询价采购员',type:'input',labelKey:'partsprocure.PARTSPROCUREINQUIRYBUYER'},
  {props:'lineName',label:'LINIE',type:'input',labelKey:'partsprocure.PARTSPROCURELINIE'},
  {props:'loiStatus',label:'LOI状态',type:'select',labelKey:'LK_LOIZHUANGTAI',selectOption:'status'},
  {props:'rfqId',label:'RFQ编号',type:'input',labelKey:'costanalysismanage.RfqBianHao'},
  {props:'nominateAppId',label:'定点申请单号',type:'input',labelKey:'LK_DINGDIANXINDANHAO'},
  {props:'supplierName',label:'供应商名称',type:'input',labelKey:'LK_GONGYINGSHANGMINGCHENG'},
  {props:'sapNum',label:'供应商SAP号',type:'input',labelKey:'LK_GONGYINGSHANGSAPHAO'},
  {props:'nominateDate',label:'LOI⽣成时间',type:'datePicker',labelKey:'LK_LOISHENGCHENGSHIJIAN'},
  {props:'show',label:'是否显⽰⾃⼰',type:'select',labelKey:'LK_SHIFOUXIANSHIZIJI_1',selectOption:'isShowMe'},
]

// 定点信列表表头
export const letterListTitle=[
  { props: "nominateAppId", name: "定点申请单号", key: "LK_DINGDIANXINDANHAO", tooltip: true},
  { props: "letterNum", name: "定点信编号", key: "LK_DINGDIANXINBIANHAO", tooltip: true,width:120},
  { props: "parts", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true,width:90 },
  { props: "supplierNum", name: "供应商号", key: "nominationSupplier.GongYingShangHao", tooltip: true },
  { props: "sapCode", name: "SAP号", key: "LK_SAPHAO", tooltip: true },
  { props: "svwCode", name: "SVW号", key: "LK_SVWHAO", tooltip: true },
  { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG", tooltip: true, width:140},
  { props: "statusDesc", name: "定点信状态", key: "LK_DINGDIANXINZHUANGTAI", tooltip: true },
  { props: "csfCssName", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true, width:80},
  { props: "linieName", name: "LINIE", key: "LK_LINIE", tooltip: true, width:70},
  { props: "isSignAgreement", name: "是否签署协议", key: "LK_SHIFOUQIANSHUXIEYI", tooltip: true },
  { props: "nominateDate", name: "定点⽇期", key: "LK_DINGDIANRIQI", tooltip: true },
  { props: "supplierResult", name: "供应商反馈", key: "LK_GONGYINGSHANGFANKUI", tooltip: true },
]

export const loiListTitle = [
  { props: "nominateAppId", name: "定点申请单号", key: "LK_DINGDIANXINDANHAO", tooltip: false,width:100 },
  { props: "loiNum", name: "LOI编号", key: "LK_LOIBIANHAO", tooltip: false,width:140 },
  { props: "rfqId", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true,width:90 },
  { props: "svmNum", name: "供应商号", key: "nominationSupplier.GongYingShangHao", tooltip: true },
  { props: "sapNum", name: "SAP号", key: "LK_SAPHAO", tooltip: true },
  { props: "svmNum", name: "SVW号", key: "LK_SVWHAO", tooltip: true },
  { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG", tooltip: true },
  { props: "loiStatusDesc", name: "LOI状态", key: "LK_LOIZHUANGTAI", tooltip: true },
  { props: "supplierResult", name: "供应商反馈", key: "LK_GONGYINGSHANGFANKUI", tooltip: true },
  { props: "csfName", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true },
  { props: "lineName", name: "LINIE", key: "LK_LINIE", tooltip: true },
  { props: "remark", name: "备注", key: "LK_BEIZHU", tooltip: true ,width:180},
]


export const historyListTitle=[
  { props: "fileName", name: "文件名称", key: "LK_WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "LK_SHANGCHUANRIQI", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "LK_SHANGCHUANREN", tooltip: true },
]


// 历史定点信表头
export const letterHistoryTitle=[
  { props: "letterNum", name: "定点信编号", key: "LK_DINGDIANXINBIANHAO", tooltip: true},
  { props: "fileName", name: "文件名称", key: "LK_WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "LK_SHANGCHUANRIQI", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "LK_SHANGCHUANREN", tooltip: true },
]

//历史LOI表头
export const historyLoiListTitle=[
  { props: "loiNum", name: "LOI编号", key: "LK_LOIBIANHAO", tooltip: true},
  { props: "fileName", name: "文件名称", key: "LK_WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "uploadDate", name: "上传日期", key: "LK_SHANGCHUANRIQI", tooltip: true },
  { props: "uploadUserName", name: "上传人", key: "LK_SHANGCHUANREN", tooltip: true },
]