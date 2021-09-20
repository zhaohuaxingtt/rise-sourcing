/*
 * @Author: your name
 * @Date: 2021-05-24 13:53:50
 * @LastEditTime: 2021-09-15 19:14:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\suggestion\components\data.js
 */

// 供应商表头
export const supplierTitle = [
  {
    props: 'partNum',
    name: '零件号',
    key: 'nominationLanguage.LingJianHao',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNum',
    name: 'FSNR/GSNR',
    key: 'FSNR/GSNR',
    tooltip: false
  },
  {
    props: 'rfqId',
    name: 'RFQ编号',
    key: 'nominationLanguage.RFQBianHao',
    tooltip: false
  },
  {
    props: 'purchasingFactory',
    name: '采购工厂',
    key: 'nominationSupplier.CaiGouGongChang',
    tooltip: false
  },
  {
    props: 'partNameZh',
    name: '零件名(中)',
    key: 'nominationLanguage.LingJianMingCN',
    tooltip: false
  },
  {
    props: 'partNameDe',
    name: '零件名(德)',
    key: 'nominationLanguage.LingJianMingDE',
    tooltip: false
  },
  {
    props: 'supplierName',
    name: '供应商名',
    key: 'nominationSupplier.GongYingShangMing',
    tooltip: false
  },
  {
    props: 'sapCode',
    name: '供应商号',
    key: 'nominationSupplier.GongYingShangHao',
    tooltip: false
  },
  {
    props: 'ratio',
    name: '',
    key: 'nominationSuggestion.BiLi',
    tooltip: false
  }
]

// 供应商列表moke数据
export const mokeSupplierData = [
  {
    "id": "122",
    "partNum": "OZ87772ME",
    "rfqNum": "2342433",
    "descr":  "510923空调压缩机液压阀",
    "factory": "成都二厂",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "fsnrGsnrNameEn": "Haier",
    "supplierName": "Haier",
    "supplierNum": "2298",
    "percent": "80%"
  },
  {
    "id": "121",
    "partNum": "QZ87772ME",
    "rfqNum": "8775343",
    "descr":  "510923温度控制器液压阀",
    "factory": "成都二厂",
    "fsnrGsnrName": "海尔",
    "sapNum": "88718273662",
    "supplierName": "Haier",
    "fsnrGsnrNameEn": "Haier",
    "supplierNum": "1176",
    "percent": "70%"
  }
]


// 模具表头
export const mouldTitle = [
  {
    props: 'partNum',
    name: '零件号',
    key: 'nominationLanguage.LingJianHao',
    tooltip: false
  },
  {
    props: 'sapNum',
    name: 'FSNR/GSNR',
    key: '',
    tooltip: false
  },
  {
    props: 'rfqNum',
    name: 'RFQ编号',
    key: 'nominationLanguage.RFQBianHao',
    tooltip: false
  },
  {
    props: 'date',
    name: '申请日期',
    key: 'nominationSuggestion.ShenQingRiQi',
    tooltip: false
  },
  {
    props: 'moudle',
    name: '车型项目',
    key: 'nominationSuggestion.CheXingXiangMu',
    tooltip: false
  },
  {
    props: 'budget',
    name: '投资预算(RMB)',
    key: 'nominationSuggestion.TouZiYuSuan',
    tooltip: false
  },
  {
    props: 'manager',
    name: 'CSF(P)负责人',
    key: 'nominationSuggestion.CSFuZeRen',
    tooltip: false
  },
  {
    props: 'state',
    name: '审批状态',
    key: 'nominationSuggestion.ShenPiZhuangTai',
    tooltip: false
  },
  {
    props: 'remark',
    name: '审批意见',
    key: 'nominationSuggestion.ShenPiYiJian',
    tooltip: false
  }
]

// 模具模拟数据
export const mokeMouldData = [
  {
    partNum: "OUE81277H",
    sapNum: "FS19-929391",
    rfqNum: "2131233",
    date: '2021-01-02',
    moudle: 'B',
    budget: "128821847",
    manager: "piter",
    state: 'A',
    remark: ""
  }
]

// 模拟表格
export const mokeMouldMonitorData = [
  {
    id: '12987122',
    num: '3CG128988283C NOR',
    fsnr: 'FS12987-0035',
    factory: '上海工厂',
    gid: 'aaa',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['11111', '10000', '42212'],
    supplierChosen: ['NBHX Trim', 'SH Huashi'],
    percent: [20, 80]
  },
  {
    id: '12987123',
    num: '3CG128988283B NOR',
    fsnr: 'FS12987-0035',
    factory: '上海工厂',
    gid: 'aaa',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['22222', '22223', '12212'],
    supplierChosen: ['NBHX Trim'],
    percent: [100]
  },
  {
    id: '12987124',
    num: '3CG128988283F NOR',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    gid: 'aaa',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['33333', '33334', '32212'],
    supplierChosen: ['NBHX Trim'],
    percent: [100]
  },
  {
    id: '12987126',
    num: '3CG128988283F HAP',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    gid: 'bb',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['44444', '44445', '42211'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
  {
    id: '12987127',
    num: '3CG12898828AF HAP',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    gid: 'bb',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['55555', '55556', '12212'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
  {
    id: '12987128',
    num: '3CG12898828AB HAP',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['66666', '66667', '42212'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
  {
    id: '12987120',
    num: '3CG12898828QB HAP',
    fsnr: 'FS12987-0031',
    factory: '上海工厂',
    supplier: ['SH Huashi', 'NBHX Trim', 'Bj Vehic'],
    TTo: ['12117', '77778', '32212'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
]

export const mouldBudgetManagementDialogTableTitle = [
  { props: "partNum", name: "零件号", tooltip: true, key: "LINGJIANHAO" },
  { props: "fsnrGsnrNum", name: "FSNR/GSNR", tooltip: true, key: "FSNRGSNR" },
  { props: "rfqId", name: "RFQ编号", tooltip: true, key: "RFQBIANHAO" },
  { props: "applyTime", name: "申请日期", tooltip: true, key: "SHENQINGRIQI" },
  { props: "cartypeProjectZh", name: "车型项目", tooltip: true, key: "CHEXINGXIANGMU" },
  { props: "budget", name: "投资预算(RMB)", tooltip: true, key: "TOUZIYUSUANRMB" },
  { props: "csfPDiretor", name: "CSF(P)负责人", tooltip: true, key: "CSFPFUZEREN" },
  { props: "approvalStatus", name: "审批状态", tooltip: true, key: "SHENPIZHUANGTAI" },
  { props: "approvalComments", name: "审批意见", tooltip: true, key: "SHENPIYIJIAN" },
]

export const colorPanel = [
  '#005cfa',
  '#4C97FB',
  '#1F64BF',
  '#5F77E8',
  '#253EB5',
  '#4CC1FB',
  '#1E7FAF',
  '#7E68EB',
  '#4229BE',
  '#9B68EB',
  '#5E22BE',
  '#60BFD0',
  '#3A8593',
  '#3BCDB5',
  '#269582',
  '#66CD78',
  '#429050',
  '#9ACD66',
  '#649137',
  '#C6D13B',
  '#8B9323',
  '#F3D01E',
  '#B29503',
  '#F5BC3B',
  '#BA860E',
  '#EE9C60',
  '#A54A07',
  '#E2846E',
  '#983720',
  '#8289A8',
  '#353C5D',
]

