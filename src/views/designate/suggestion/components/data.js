
// 供应商表头
export const supplierTitle = [
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
    props: 'factory',
    name: '采购工厂',
    key: 'nominationSupplier.CaiGouGongChang',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
    name: '零件名(中)',
    key: 'nominationLanguage.LingJianMingCN',
    tooltip: false
  },
  {
    props: 'fsnrGsnrNameEn',
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
    props: 'supplierNum',
    name: '供应商号',
    key: 'nominationSupplier.GongYingShangHao',
    tooltip: false
  },
  {
    props: 'percent',
    name: 'SAP号',
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
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['11111', '10000'],
    supplierChosen: ['NBHX Trim', 'SH Huashi'],
    percent: [20, 80]
  },
  {
    id: '12987123',
    num: '3CG128988283B NOR',
    fsnr: 'FS12987-0035',
    factory: '上海工厂',
    gid: 'aaa',
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['22222', '22223'],
    supplierChosen: ['NBHX Trim'],
    percent: [100]
  },
  {
    id: '12987124',
    num: '3CG128988283F NOR',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    gid: 'aaa',
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['33333', '33334'],
    supplierChosen: ['NBHX Trim'],
    percent: [100]
  },
  {
    id: '12987126',
    num: '3CG128988283F HAP',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    gid: 'bb',
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['44444', '44445'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
  {
    id: '12987127',
    num: '3CG12898828AF HAP',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    gid: 'bb',
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['55555', '55556'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
  {
    id: '12987128',
    num: '3CG12898828AB HAP',
    fsnr: 'FS12987-0032',
    factory: '上海工厂',
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['66666', '66667'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
  {
    id: '12987120',
    num: '3CG12898828QB HAP',
    fsnr: 'FS12987-0031',
    factory: '上海工厂',
    supplier: ['SH Huashi', 'NBHX Trim'],
    TTo: ['12117', '77778'],
    supplierChosen: ['SH Huashi'],
    percent: [100]
  },
]