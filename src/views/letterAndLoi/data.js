/*
 * @Author: wentliao
 * @Date: 2021-06-18 13:46:11
 * @Description: 定点信/LOI 相关DATA
 */

// 定点信搜索条件
export const letterListSearch =[
    {props:'letterNum',label:'定点信编号',type:'input',labelKey:'LK_DINGDIANXINBIANHAO',permissionKey: 'LK_LETTER_LIST_LETTERNUM'},
    {props:'partNum',label:'零件号',type:'multiLineInput',labelKey:'partsprocure.PARTSPROCUREPARTNUMBER',permissionKey: 'LK_LETTER_LIST_PARTNUM'},
    {props:'partName',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey: 'LK_LETTER_LIST_PARTNAME'},
    {props:'fsnrGsnrNum',label:'FsNr/GsNr',type:'input',labelKey:'partsprocure.FsnrGsnr',permissionKey: 'LK_LETTER_LIST_FSNRGSNR'},
    {props:'csfCssName',label:'询价采购员',type:'input',labelKey:'partsprocure.PARTSPROCUREINQUIRYBUYER',permissionKey: 'LK_LETTER_LIST_CSFNAME'},
    {props:'linieName',label:'LINIE',type:'input',labelKey:'partsprocure.PARTSPROCURELINIE',permissionKey: 'LK_LETTER_LIST_LINIE'},
    {props:'status',label:'定点信状态',type:'select',labelKey:'LK_DINGDIANXINZHUANGTAI',selectOption:'status',permissionKey: 'LK_LETTER_LIST_STATUS'},
    {props:'rfqId',label:'RFQ编号',type:'input',labelKey:'costanalysismanage.RfqBianHao',inputType:'int',permissionKey: 'LK_LETTER_LIST_RFQID'},
    {props:'nominateAppId',label:'定点申请单号',type:'input',labelKey:'LK_DINGDIANXINDANHAO',inputType:'int',permissionKey: 'LK_LETTER_LIST_NOMINATEAPPID'},
    {props:'supplierName',label:'供应商名称',type:'input',labelKey:'LK_GONGYINGSHANGMINGCHENG',permissionKey: 'LK_LETTER_LIST_SUPPLIERNAME'},
    {props:'supplierSapNum',label:'供应商SAP号',type:'input',labelKey:'LK_GONGYINGSHANGSAPHAO',permissionKey: 'LK_LETTER_LIST_SUPPLIERSAPNAME'},
    {props:'nominateDate',label:'定点时间起⽌',type:'datePicker',labelKey:'LK_DINGDIANSHIJIANQIZHI_1',permissionKey: 'LK_LETTER_LIST_NOMINATEDATE'},
    {props:'showSelf',label:'显示自己',type:'select',labelKey:'LK_SHIFOUXIANSHIZIJI_1',selectOption:'showSelf',permissionKey: 'LK_LETTER_LIST_SHOWSELF'},
]

// loi搜索条件
export const loiListSearch = [
  {props:'loiNum',label:'LOI编号',type:'input',labelKey:'LK_LOIBIANHAO',permissionKey: 'LK_LOI_LIST_LOINUM'},
  {props:'partNum',label:'零件号',type:'multiLineInput',labelKey:'partsprocure.PARTSPROCUREPARTNUMBER',permissionKey: 'LK_LOI_LIST_PARTNUM'},
  {props:'partName',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey: 'LK_LOI_LIST_PARTNAME'},
  {props:'fsnrGsnrNum',label:'FsNr/GsNr',type:'input',labelKey:'partsprocure.FsnrGsnr',permissionKey: 'LK_LOI_LIST_FSGSNR'},
  {props:'csfName',label:'询价采购员',type:'input',labelKey:'partsprocure.PARTSPROCUREINQUIRYBUYER',permissionKey: 'LK_LOI_LIST_CSFNAME'},
  {props:'lineName',label:'LINIE',type:'input',labelKey:'partsprocure.PARTSPROCURELINIE',permissionKey: 'LK_LOI_LIST_LINIE'},
  {props:'loiStatus',label:'LOI状态',type:'select',labelKey:'LK_LOIZHUANGTAI',selectOption:'status',permissionKey: 'LK_LOI_LIST_LOISTATUS'},
  {props:'rfqId',label:'RFQ编号',type:'input',labelKey:'costanalysismanage.RfqBianHao',inputType:'int',permissionKey: 'LK_LOI_LIST_RFQID'},
  {props:'nominateAppId',label:'定点申请单号',type:'input',labelKey:'LK_DINGDIANXINDANHAO',inputType:'int',permissionKey: 'LK_LOI_LIST_NOMINATEAPPID'},
  {props:'supplierName',label:'供应商名称',type:'input',labelKey:'LK_GONGYINGSHANGMINGCHENG',permissionKey: 'LK_LOI_LIST_SUPPLIERNAME'},
  {props:'sapNum',label:'供应商SAP号',type:'input',labelKey:'LK_GONGYINGSHANGSAPHAO',permissionKey: 'LK_LOI_LIST_SAPNUM'},
  {props:'nominateDate',label:'LOI⽣成时间',type:'datePicker',labelKey:'LK_LOISHENGCHENGSHIJIAN',permissionKey: 'LK_LOI_LIST_NOMINATEDATE'},
  {props:'showSelf',label:'显示自己',type:'select',labelKey:'LK_SHIFOUXIANSHIZIJI_1',selectOption:'isShowMe',permissionKey: 'LK_LOI_LIST_SHOWSELF'},
]

// 定点信列表表头
export const letterListTitle=[
  { props: "nominateAppId", name: "定点申请单号", key: "LK_DINGDIANXINDANHAO", tooltip: true, sortable: true},
  { props: "letterNum", name: "定点信编号", key: "LK_DINGDIANXINBIANHAO", tooltip: true,width:120, sortable: true},
  { props: "parts", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true,width:105, sortable: true },
  // { props: "supplierNum", name: "供应商号", key: "nominationSupplier.GongYingShangHao", tooltip: true },
  { props: "sapCode", name: "供应商号", key: "GONGYINGSHANGHAO", tooltip: true, sortable: true },
  { props: "svwCode", name: "SVW号", key: "LK_SVWHAO", tooltip: true,width:95, sortable: true},
  { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG", tooltip: true, width:180, sortable: true},
  { props: "statusDesc", name: "定点信状态", key: "LK_DINGDIANXINZHUANGTAI", tooltip: true, sortable: true },
  { props: "csfCssName", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true, width:120, sortable: true},
  { props: "linieName", name: "LINIE", key: "LK_LINIE", tooltip: true, width:90, sortable: true},
  { props: "isSignAgreement", name: "是否签署协议", key: "LK_SHIFOUQIANSHUXIEYI", tooltip: true, sortable: true },
  { props: "nominateDate", name: "定点⽇期", key: "LK_DINGDIANRIQI", tooltip: true, sortable: true },
  { props: "supplierResult", name: "供应商反馈", key: "LK_GONGYINGSHANGFANKUI", tooltip: true, sortable: true },
]

export const loiListTitle = [
  { props: "nominateAppId", name: "定点申请单号", key: "LK_DINGDIANXINDANHAO", tooltip: false, sortable: true },
  { props: "loiNum", name: "LOI编号", key: "LK_LOIBIANHAO", tooltip: false,width:140, sortable: true },
  { props: "rfqId", name: "RFQ编号", key: "costanalysismanage.RfqBianHao", tooltip: true,width:105, sortable: true },
  { props: "sapNum", name: "供应商号", key: "GONGYINGSHANGHAO", tooltip: true, sortable: true },
  { props: "svmNum", name: "SVW号", key: "LK_SVWHAO", tooltip: true,width: 95, sortable: true },
  { props: "supplierName", name: "供应商名称", key: "LK_GONGYINGSHANGMINGCHENG", tooltip: true, sortable: true },
  { props: "loiStatusDesc", name: "LOI状态", key: "LK_LOIZHUANGTAI", tooltip: true, sortable: true },
  { props: "supplierResult", name: "供应商反馈", key: "LK_GONGYINGSHANGFANKUI", tooltip: true, sortable: true },
  { props: "csfName", name: "询价采购员", key: "costanalysismanage.XunJiaCaiGouYuan", tooltip: true,width:120, sortable: true },
  { props: "lineName", name: "LINIE", key: "LK_LINIE", tooltip: true ,width:90, sortable: true},
  { props: "remark", name: "备注", key: "LK_BEIZHU", tooltip: true ,width:180, sortable: true},
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