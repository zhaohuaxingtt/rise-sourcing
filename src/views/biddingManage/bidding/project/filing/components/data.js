import language from "@/utils/language";

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
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  projectName: [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
  ],
  projectType: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  currencyUnit: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  currencyMultiple: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  isTax: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  resultOpenForm: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: 'change' },
  ],
  moldFee: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  openTenderNature: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  isResultOpen: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ],
  biddingMode: [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" },
  ]
};

// 竞拍类型
export const biddingType = [
  {
    value: '01',
    label: '拍买（价低者得）',
    key:'BIDDING_PM（JDZD）'
  },
  {
    value: '02',
    label: '拍卖（价高者得）',
    key:'BIDDING_PM（JGZD）'
  },
]

// 模具费
export const moldFee = [
  {
    value: '01',
    label: '锁定',
    key:'BIDDING_SUODING'
  },
  {
    value: '02',
    label: '非锁定',
    key:'BIDDING_FEISUODING'
  }
]

// 报价方式
export const biddingMode = [
  {
    value: '01',
    label: '单价',
    key:'BIDDING_DANJIA'
  },
  {
    value: '02',
    label: '总价',
    key:'BIDDING_ZONGJIA'
  },
  {
    value: '03',
    label: '多价格',
    key:'BIDDING_DUOJIAGE'
  },
]

// 报价是否含税
export const isTax = [
  {
    value: '01',
    label: '不含可抵扣税',
    key:'BIDDING_BHKDKS'
  },
  {
    value: '02',
    label: '含税',
    key:'BIDDING_HANSHUI'
  }
]

// 项目类型
export const projectType = [
  {
    value: '01',
    label: '正式项目',
    key:'BIDDING_ZHENGSHIXIANGMU',
  },
  {
    value: '02',
    label: '测试项目',
    key:'BIDDING_CESHIXIANGMU',
  }
]

// 竞标结果汇总形式
export const biddingResultForm = [
  {
    value: '01',
    label: '总价',
    key:'BIDDING_ZONGJIA'
  },
  {
    value: '02',
    label: '单价&总价',
    key:'BIDDING_DANJIA'
  },
]

// 结果公开形式
export const resultOpenForm = [
  {
    value: '01',
    label: '排名',
    key:'BIDDING_PAIMING'
  },
  {
    value: '02',
    label: '红绿灯',
    key:'BIDDING_HONGLVDENG'
  },
  {
    value: '03',
    label: '所有排名',
    key:'BIDDING_SUOYOUPAIMING'
  },
]

// 竞价结果是否公开（供应商）
export const isResultOpen = [
  {
    value: '01',
    label: '公开',
    key:'BIDDING_GONGKAI'
  },
  {
    value: '02',
    label: '不公开',
    key:'BIDDING_BUGONGKAI'
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
    label: '元',
    key:'BIDDING_YUAN'
  },
  {
    value: '02',
    label: '千',
    key:'BIDDING_QIAN'
  },
  {
    value: '03',
    label: '万',
    key:'BIDDING_WAN'
  },
  {
    value: '04',
    label: '百万',
    key:'BIDDING_BAIWAN'
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
    label: language('BIDDING_XUHAO',"序号"),
  },
  {
    prop: "attachmentName",
    label: language('BIDDING_WENJIANMING',"文件名"),
  },
  {
    prop: "attachmentSize",
    label: language('BIDDING_WENJIANDAXIAO',"文件大小"),
  },
  {
    prop: "uploadName",
    label: language('BIDDING_SHANGCHUANREN',"上传人"),
  },
  {
    prop: "uploadDate",
    label: language('BIDDING_SHANGCHUANRIQI',"上传日期"),
  },
]



// export const unitTableTitle = [
//   {
//     props: "fsnrGsnr",
//     name: language('BIDDING_FSNR/GSNR',"FSNR/GSNR"),
//     width: 180
//   },
//   {
//     props: "productName",
//     name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
//     width: 300,
//   },
//   {
//     props: "partNumber",
//     name: language('BIDDING_LINGJIANHAO',"零件号"),
//   },
//   {
//     props: "factoryPrice",
//     name: language('BIDDING_CHUCHANJIA',"出厂价"),
//   },
//   {
//     props: "packingFee",
//     name: language('BIDDING_QIANDUANBAOZHUANGFEI',"前段包装费"),
//   },
//   {
//     props: "packingFee2",
//     name: language('BIDDING_HOUDUANBAOZHUANGFEI',"后段包装费"),
//   },
//   {
//     props: "transportFee",
//     name: language('BIDDING_YUNSHUFEI',"运输费"),
//   },
//   {
//     props: "operationFee",
//     name: language('BIDDING_CAOZUOFEI',"操作费"),
//   },
//   {
//     props: "bprice",
//     name: language('BIDDING_BJIA',"B价"),
//   },
//   {
//     props: "moldFee",
//     name: language('BIDDING_MOJUFEI',"模具费"),
//   },
//   {
//     props: "developFee",
//     name: language('BIDDING_KAIFAFEI',"开发费"),
//   },
//   {
//     props: "targetPrice",
//     name: language('BIDDING_MUBIAOJIA',"目标价"),
//   },
//   {
//     props: "quantityUnit",
//     name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
//   },
//   {
//     props: "lifecycle",
//     name: language('BIDDING_SHENGMINGZHOUQIZHOU',"生命周期(周)"),
//     width: 180
//   },
//   {
//     props: "aveAnnualOutput",
//     name: language('BIDDING_PINGJUNNIANCHANLIANG',"平均年产量"),
//   },
//   {
//     props: "maxAnnualOutput",
//     name: language('BIDDING_ZUIDANIANCHANLIANG',"最大年产量"),
//   },
// ];


export const unitTableTitle = [
  {
    props: "fsnrGsnr",
    name: language('BIDDING_FSGSSPNO',"FS/GS/SP No."),
    key:'BIDDING_FSGSSPNO'
  },
  {
    props: "productName",
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
    key:'BIDDING_CHANPINMINGCHENG'
  },
  {
    props: "productCode",
    name: language('BIDDING_LINGJIANHAO',"零件号"),
    key:'BIDDING_LINGJIANHAO'
  },
  {
    props: "purchaseQty",
    name: language('BIDDING_CAIGOUSHULIANG',"采购数量"),
    key:'BIDDING_CAIGOUSHULIANG'
  },
  {
    props: "quantityUnit",
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
    key:'BIDDING_SHULIANGDANWEI'
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_QIPAIJIAGE',"起拍价格"),
    key:'BIDDING_QIPAIJIAGE'
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
    key:'BIDDING_MUBIAOJIA'
  },
  {
    props: "productParm",
    name: language('BIDDING_CHANPINCANSHU',"产品参数"),
    key:'BIDDING_CHANPINCANSHU'
  },

];
export const totalTableTitle = [
  {
    props: "fsnrGsnr",
    name: language('BIDDING_FSGSSPNO',"FS/GS/SP No."),
    key:'BIDDING_FSGSSPNO'
  },
  {
    props: "productName",
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
    key:'BIDDING_CHANPINMINGCHENG'
  },
  {
    props: "productCode",
    name: language('BIDDING_CHANPINBIANHAO',"产品编号"),
    key:'BIDDING_CHANPINBIANHAO'
  },
  {
    props: "purchaseQty",
    name: language('BIDDING_CAIGOUSHULIANG',"采购数量"),
    key:'BIDDING_CAIGOUSHULIANG'
  },
  {
    props: "quantityUnit",
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
    key:'BIDDING_SHULIANGDANWEI'
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_QIPAIJIAGE',"起拍价格"),
    key:'BIDDING_QIPAIJIAGE'
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
    key:'BIDDING_MUBIAOJIA'
  },
  {
    props: "productParm",
    name: language('BIDDING_CHANPINCANSHU',"产品参数"),
    key:'BIDDING_CHANPINCANSHU'
  }
];


export const multiPleTableTitle = [
  {
    props: "fsnrGsnr",
    width: 150,
    name: language('BIDDING_FSGSSPNO',"FS/GS/SP No."),
    key:'BIDDING_FSGSSPNO'
  },
  {
    props: "productName",
    width: 220,
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
    key:'BIDDING_CHANPINMINGCHENG'
  },
  {
    props: "productCode",
    width: 120,
    name: language('BIDDING_LINGJIANHAO',"零件号"),
    key:'BIDDING_LINGJIANHAO'
  },
  {
    props: "factoryPrice",
    name: language('BIDDING_CHUCHANJIA',"出厂价"),
    key:'BIDDING_CHUCHANJIA'
  },
  {
    props: "packingFee",
    name: language('BIDDING_BAOZHUANGFEI',"包装费"),
    key:'BIDDING_BAOZHUANGFEI'
  },
  {
    props: "transportFee",
    name: language('BIDDING_YUNSHUFEI',"运输费"),
    key:'BIDDING_YUNSHUFEI'
  },
  {
    props: "operationFee",
    name: language('BIDDING_CAOZUOFEI',"操作费"),
    key:'BIDDING_CAOZUOFEI'
  },
  {
    props: "bprice",
    name: language('BIDDING_BJIA',"B价"),
    key:'BIDDING_BJIA'
  },
  {
    props: "moldFee",
    name: language('BIDDING_MOJUFEI',"模具费"),
    key:'BIDDING_MOJUFEI'
  },
  {
    props: "developFee",
    name: language('BIDDING_KAIFAFEI',"开发费"),
    key:'BIDDING_KAIFAFEI'
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
    key:'BIDDING_MUBIAOJIA'
  },
  {
    props: "quantityUnit",
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
    key:'BIDDING_SHULIANGDANWEI'
  },
  {
    props: "lifecycle",
    name: language('BIDDING_SHENGMINGZHOUQIZHOU',"生命周期(周)"),
    key:'BIDDING_SHENGMINGZHOUQIZHOU'
  },
  {
    props: "aveAnnualOutput",
    name: language('BIDDING_PINGJUNNIANCHANLIANG',"平均年产量"),
    key:'BIDDING_PINGJUNNIANCHANLIANG'
  },
  {
    props: "maxAnnualOutput",
    name: language('BIDDING_ZUIDANIANCHANLIANG',"最大年产量"),
    key:'BIDDING_ZUIDANIANCHANLIANG'
  },
  // {
  //   props: "caozuo",
  //   fixed: 'right',
  //   name: language('BIDDING_CAOZUO',"操作"),
  // },

];

export const yearsTableTitle = [
  {
    props: "title",
    name: " ",
  },
  {
    props: "stage1",
    name: language('BIDDING_DI一DUAN',"第一段"),
  },
  {
    props: "stage2",
    name: language('BIDDING_DI二DUAN',"第二段"),
  },
  {
    props: "stage3",
    name: language('BIDDING_DI三DUAN',"第三段"),
  },
  {
    props: "stage4",
    name: language('BIDDING_DI四DUAN',"第四段"),
  },
  {
    props: "stage5",
    name: language('BIDDING_DI五DUAN',"第五段"),
  },
  {
    props: "stage6",
    name: language('BIDDING_DI六DUAN',"第六段"),
  },
  {
    props: "stage7",
    name: language('BIDDING_DI七DUAN',"第七段"),
  },
  {
    props: "stage8",
    name: language('BIDDING_DI八DUAN',"第八段"),
  },
  {
    props: "stage9",
    name: language('BIDDING_DI九DUAN',"第九段"),
  },
  {
    props: "stage10",
    name: language('BIDDING_DI十DUAN',"第十段"),
  },
  {
    props: "stage11",
    name: language('BIDDING_DI十一DUAN',"第十一段"),
  },
  {
    props: "stage12",
    name: language('BIDDING_DI十二DUAN',"第十二段"),
  },
  {
    props: "stage13",
    name: language('BIDDING_DI十三DUAN',"第十三段"),
  },
  {
    props: "stage14",
    name: language('BIDDING_DI十四DUAN',"第十四段"),
  },
  {
    props: "stage15",
    name: language('BIDDING_DI十五DUAN',"第十五段"),
  }
];


export const baseRules = {
  beginMonth: [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
  ],
  modelProjects: [{ type: 'array', required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" }],
  models: [{ type: 'array', required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "change" }],
  totalPrices: [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    {
      validator(rule, value, callback) {
        if (value > 0 && /^[\d]{0,10}(\.[\d]{0,6})?$/.test(value)) callback();
        else callback(new Error(rule.message))
      },
      message: language('BIDDING_QSZJFWS0~9999999999.999999','起始总价范围是0~9999999999.999999'),
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
    label: language('BIDDING_XUHAO',"序号"),
    i18n:'BIDDING_XUHAO',
  },
  {
    prop: "nameZh",
    label: language('BIDDING_GYSZWM',"供应商中文名"),
    i18n: 'BIDDING_GYSZWM',
  },
  {
    prop: "nameEn",
    label: language('BIDDING_GYSYWM',"供应商英文名"),
    i18n:'BIDDING_GYSYWM'
  },
  {
    prop: "svwTempCode",
    label: language('BIDDING_LINSHIHAO',"临时号"),
    i18n:'BIDDING_LINSHIHAO'
  },

  {
    prop: "sapCode",
    label: language('BIDDING_SAPHAO',"SAP号"),
    i18n:'BIDDING_SAPHAO'
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
    unit: "元",
    key:'BIDDING_YUAN'
  },
  "02": {
    beishu: 1000,
    unit: "千",
    key:'BIDDING_QIAN'
  },
  "03": {
    beishu: 10000,
    unit: "万",
    key:'BIDDING_WAN'
  },
  "04": {
    beishu: 1000000,
    unit: "百万",
    key:'BIDDING_BAIWAN'
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
export const planBaseYear = {
  title: '',
  stage1: '',
  stage2: '',
  stage3: '',
  stage4: '',
  stage5: '',
  stage6: '',
  stage7: '',
  stage8: '',
  stage9: '',
};
export const stageColumn = [
  {
    props: "title",
    name: "",
  },
  {
    props: "stage1",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[1-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI一DUAN',"第一段"),
    key:'BIDDING_DI一DUAN'
  },
  {
    props: "stage2",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI二DUAN',"第二段"),
    key:'BIDDING_DI二DUAN'
  },
  {
    props: "stage3",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI三DUAN',"第三段"),
    key:'BIDDING_DI三DUAN'
  },
  {
    props: "stage4",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI四DUAN',"第四段"),
    key:'BIDDING_DI四DUAN'
  },
  {
    props: "stage5",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI五DUAN',"第五段"),
    key:'BIDDING_DI五DUAN'
  },
  {
    props: "stage6",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI六DUAN',"第六段"),
    key:'BIDDING_DI六DUAN'
  },
  {
    props: "stage7",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI七DUAN',"第七段"),
    key:'BIDDING_DI七DUAN'
  },
  {
    props: "stage8",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI八DUAN',"第八段"),
    key:'BIDDING_DI八DUAN'
  },
  {
    props: "stage9",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI九DUAN',"第九段"),
    key:'BIDDING_DI九DUAN'
  },
]

export const outPutColumn = [
  {
    props: "title",
    name: "",
  },
  {
    props: "stage1",
    required: false,
    name: language('BIDDING_DI一NIAN',"第一年"),
    key:'BIDDING_DI一NIAN'
  },
  {
    props: "stage2",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI二NIAN',"第二年"),
    key:'BIDDING_DI二NIAN'
  },
  {
    props: "stage3",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI三NIAN',"第三年"),
    key:'BIDDING_DI三NIAN'
  },
  {
    props: "stage4",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI四NIAN',"第四年"),
    key:'BIDDING_DI四NIAN'
  },
  {
    props: "stage5",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI五NIAN',"第五年"),
    key:'BIDDING_DI五NIAN'
  },
  {
    props: "stage6",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI六NIAN',"第六年"),
    key:'BIDDING_DI六NIAN'
  },
  {
    props: "stage7",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI七NIAN',"第七年"),
    key:'BIDDING_DI七NIAN'
  },
  {
    props: "stage8",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI八NIAN',"第八年"),
    key:'BIDDING_DI八NIAN'
  },
  {
    props: "stage9",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI九NIAN',"第九年"),
    key:'BIDDING_DI九NIAN'
  },
  {
    props: "stage10",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI九NIAN',"第十年"),
    key:'BIDDING_DI九NIAN'
  },
  {
    props: "stage11",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI十一NIAN',"第十一年"),
    key:'BIDDING_DI十一NIAN'
  },
  {
    props: "stage12",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI十二NIAN',"第十二年"),
    key:'BIDDING_DI十二NIAN'
  },
  {
    props: "stage13",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI十三NIAN',"第十三年"),
    key:'BIDDING_DI十三NIAN'
  },
  {
    props: "stage14",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI十四NIAN',"第十四年"),
    key:'BIDDING_DI十四NIAN'
  },
  {
    props: "stage15",
    required: false,
    rule: [
    ],
    name: language('BIDDING_DI十五NIAN',"第十五年"),
    key:'BIDDING_DI十五NIAN'
  },
]
