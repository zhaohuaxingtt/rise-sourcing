
// 荷氏竞标
export const infoForm = {
  projectType: '',  //项目类型
  rfqName: '',  //RFQ名称
  biddingType: '',  //竞拍类型
  biddingBeginTime: '', //开始时间
  biddingEndTime: '',  //结束时间
  moldFee: '',  //模具费
  currencyUnit: '', //货币单位
  currencyMultiple: '', //货币单位倍数
  targetPrice: '',  //目标价
  linieName: '',  //采购人
  liniePhone: '',  //采购人电话
  resultOpenForm: '', //结果公开形式
  biddingMode: '', //竞标报价方式
  biddingResultForm: '',  //竞标结果汇总形式
  isTax: '',  //报价是否含税
  openTenderNature: '', //竞标性质
  otherProjectNotice: '',  //其他项目公告信息
  pricingDeadline: '',  //报价截止时间
  isResultOpen: '', //竞价结果是否公开（供应商）
  projectName: ''
}

export const infoRules = {
  biddingType: [
    { required: true, message: "必选", trigger: "change" },
  ],
  projectName: [
    { required: true, message: "必填", trigger: "blur" },
  ],
  projectType: [
    { required: true, message: "必选", trigger: "change" },
  ],
  currencyUnit: [
    { required: true, message: "必选", trigger: "change" },
  ],
  currencyMultiple: [
    { required: true, message: "必选", trigger: "change" },
  ],
  isTax: [
    { required: true, message: "必选", trigger: "change" },
  ],
  resultOpenForm: [
    { required: true, message: "必选", trigger: 'change' },
  ],
  moldFee: [
    { required: true, message: "必选", trigger: "change" },
  ],
  openTenderNature: [
    { required: true, message: "必选", trigger: "change" },
  ],
  isResultOpen: [
    { required: true, message: "必选", trigger: "change" },
  ],
  biddingMode: [
    { required: true, message: "必选", trigger: "change" },
  ]
};

// 竞拍类型
export const biddingType = [
  {
    value: '01',
    label: '拍买（价低者得）'
  },
  {
    value: '02',
    label: '拍卖（价高者得）'
  },
]

// 模具费
export const moldFee = [
  {
    value: '01',
    label: '锁定'
  },
  {
    value: '02',
    label: '非锁定'
  }
]

// 报价方式
export const biddingMode = [
  {
    value: '01',
    label: '单价'
  },
  {
    value: '02',
    label: '总价'
  },
  {
    value: '03',
    label: '多价格'
  },
]

// 报价是否含税
export const isTax = [
  {
    value: '01',
    label: '不含可抵扣税'
  },
  {
    value: '02',
    label: '含税'
  }
]

// 项目类型
export const projectType = [
  {
    value: '01',
    label: '正式项目'
  },
  {
    value: '02',
    label: '测试项目'
  }
]

// 竞标结果汇总形式
export const biddingResultForm = [
  {
    value: '01',
    label: '总价'
  },
  {
    value: '02',
    label: '单价&总价'
  },
]

// 结果公开形式
export const resultOpenForm = [
  {
    value: '01',
    label: '排名'
  },
  {
    value: '02',
    label: '红绿灯'
  },
  {
    value: '03',
    label: '所有排名'
  },
]

// 竞价结果是否公开（供应商）
export const isResultOpen = [
  {
    value: '01',
    label: '公开'
  },
  {
    value: '02',
    label: '不公开'
  },
]

// 货币单位倍数
export const currencyUnit = [
  {
    value: '人民币',
    label: 'RMB'
  },
]

// 货币单位倍数
export const currencyMultiple = [
  {
    value: '01',
    label: '元'
  },
  {
    value: '02',
    label: '千'
  },
  {
    value: '03',
    label: '万'
  },
  {
    value: '04',
    label: '百万'
  },
]

// 附件列表
export const attachments = [
  {
    type: "selection",
    width: 60,
  },
  {
    type: "index",
    width: 80,
    label: "序号",
  },
  {
    prop: "attachmentName",
    label: "文件名",
  },
  {
    prop: "attachmentSize",
    label: "文件大小",
  },
  {
    prop: "uploadName",
    label: "上传人",
  },
  {
    prop: "uploadDate",
    label: "上传日期",
  },
]



// export const unitTableTitle = [
//   {
//     props: "fsnrGsnr",
//     name: "FSNR/GSNR",
//     width: 180
//   },
//   {
//     props: "productName",
//     name: "产品名称",
//     width: 300,
//   },
//   {
//     props: "partNumber",
//     name: "零件号",
//   },
//   {
//     props: "factoryPrice",
//     name: "出厂价",
//   },
//   {
//     props: "packingFee",
//     name: "前段包装费",
//   },
//   {
//     props: "packingFee2",
//     name: "后段包装费",
//   },
//   {
//     props: "transportFee",
//     name: "运输费",
//   },
//   {
//     props: "operationFee",
//     name: "操作费",
//   },
//   {
//     props: "bprice",
//     name: "B价",
//   },
//   {
//     props: "moldFee",
//     name: "模具费",
//   },
//   {
//     props: "developFee",
//     name: "开发费",
//   },
//   {
//     props: "targetPrice",
//     name: "目标价",
//   },
//   {
//     props: "quantityUnit",
//     name: "数量单位",
//   },
//   {
//     props: "lifecycle",
//     name: "生命周期(周)",
//     width: 180
//   },
//   {
//     props: "aveAnnualOutput",
//     name: "平均年产量",
//   },
//   {
//     props: "maxAnnualOutput",
//     name: "最大年产量",
//   },
// ];


export const unitTableTitle = [
  {
    props: "fsnrGsnr",
    name: "FSNR/GSNR",
  },
  {
    props: "productName",
    name: "产品名称",
  },
  {
    props: "productCode",
    name: "产品编号",
  },
  {
    props: "purchaseQty",
    name: "采购数量",
  },
  {
    props: "quantityUnit",
    name: "数量单位",
  },
  {
    props: "upsetPrice",
    name: "起拍价格",
  },
  {
    props: "targetPrice",
    name: "目标价",
  },
  {
    props: "productParm",
    name: "产品参数",
  },

];
export const totalTableTitle = [
  {
    props: "fsnrGsnr",
    name: "FSNR/GSNR",
  },
  {
    props: "productName",
    name: "产品名称",
  },
  {
    props: "productCode",
    name: "产品编号",
  },
  {
    props: "purchaseQty",
    name: "采购数量",
  },
  {
    props: "quantityUnit",
    name: "数量单位",
  },
  {
    props: "upsetPrice",
    name: "起拍价格",
  },
  {
    props: "targetPrice",
    name: "目标价",
  },
  {
    props: "productParm",
    name: "产品参数",
  }
];


export const multiPleTableTitle = [
  {
    props: "fsnrGsnr",
    name: "FSNR/GSNR",
    width: 150,
  },
  {
    props: "productName",
    width: 220,
    name: "产品名称",
  },
  {
    props: "productCode",
    width: 120,
    name: "零件号",
  },
  {
    props: "factoryPrice",
    name: "出厂价",
  },
  {
    props: "packingFee",
    name: "前段包装费",
  },
  {
    props: "packingFee2",
    name: "后段包装费",
  },
  {
    props: "transportFee",
    name: "运输费",
  },
  {
    props: "operationFee",
    name: "操作费",
  },
  {
    props: "bprice",
    name: "B价",
  },
  {
    props: "moldFee",
    name: "模具费",
  },
  {
    props: "developFee",
    name: "开发费",
  },
  {
    props: "targetPrice",
    name: "目标价",
  },
  {
    props: "quantityUnit",
    name: "数量单位",
  },
  {
    props: "lifecycle",
    name: "生命周期(周)",
  },
  {
    props: "aveAnnualOutput",
    name: "平均年产量",
  },
  {
    props: "maxAnnualOutput",
    name: "最大年产量",
  },
];

export const yearsTableTitle = [
  {
    props: "title",
    name: " ",
  },
  {
    props: "stage1",
    name: "第一段",
  },
  {
    props: "stage2",
    name: "第二段",
  },
  {
    props: "stage3",
    name: "第三段",
  },
  {
    props: "stage4",
    name: "第四段",
  },
  {
    props: "stage5",
    name: "第五段",
  },
  {
    props: "stage6",
    name: "第六段",
  },
  {
    props: "stage7",
    name: "第七段",
  },
  {
    props: "stage8",
    name: "第八段",
  },
  {
    props: "stage9",
    name: "第九段",
  },
  {
    props: "stage10",
    name: "第十段",
  },
  {
    props: "stage11",
    name: "第十一段",
  },
  {
    props: "stage12",
    name: "第十二段",
  },
  {
    props: "stage13",
    name: "第十三段",
  },
  {
    props: "stage14",
    name: "第十四段",
  },
  {
    props: "stage15",
    name: "第十五段",
  }
];


export const baseRules = {
  beginMonth: [
    { required: true, message: "必填", trigger: "blur" },
  ],
  modelProjects: [{ type: 'array', required: true, message: '必选', trigger: "change" }],
  models: [{ type: 'array', required: true, message: '必选', trigger: "change" }],
  totalPrices: [
    { required: true, message: "必填", trigger: "blur" },
    {
      validator(rule, value, callback) {
        if (value > 0 && /^[\d]{0,10}(\.[\d]{0,6})?$/.test(value)) callback();
        else callback(new Error(rule.message))
      },
      message: '起始总价范围是0~9999999999.999999',
      trigger: 'blur',
    }
  ],
};

export const statusList = [
  {
    name: '已发布',
    value: '已发布',
  },
  {
    name: '已过期',
    value: '已过期',
  },
  {
    name: '未发布',
    value: '未发布',
  },
];
export const supplierTableListColumns = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "index",
    width: 50,
    label: "序号",
    i18n: 'TERMS_XUHAO',
  },
  {
    prop: "nameZh",
    label: "供应商中文名",
    i18n: 'TERMS_GONGYINGSHANGZHONGWENMING',
  },
  {
    prop: "nameEn",
    label: "供应商英文名",
  },
  {
    prop: "svwTempCode",
    label: "临时号",
  },

  {
    prop: "sapCode",
    label: "SAP号",
  },
]

export const tableListData = [
  {
    fileName: "车灯采购经理1",
    fileUrl: "人员1",
  },
];

export const currencyMultipleLib = {
  "01": {
    beishu: 1,
    unit: '元',
  },
  "02": {
    beishu: 1000,
    unit: '千',
  },
  "03": {
    beishu: 10000,
    unit: '万',
  },
  "04": {
    beishu: 1000000,
    unit: '百万',
  }

}


export const planBaseData = {
  title: '',
  stage1: "",
  stage2: "",
  stage3: "",
  stage4: "",
  stage5: "",
  stage6: "",
  stage7: "",
  stage8: "",
  stage9: "",
  stage10: "",
  stage11: "",
  stage12: "",
  stage13: "",
  stage14: "",
  stage15: "",
};
