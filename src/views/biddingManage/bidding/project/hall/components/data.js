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

export const isAttendList = [
  {
    name: "是",
    isAttend: true,
  },
  {
    name: "否",
    isAttend: false,
  },
];

export const infoRules = {
  biddingType: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  projectName: [
    { required: true, message: language('BIDDING_BITIAN', '必填'), trigger: "blur" },
  ],
  projectType: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  currencyUnit: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  currencyMultiple: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  isTax: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  resultOpenForm: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: 'change' },
  ],
  moldFee: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  openTenderNature: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  isResultOpen: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ],
  biddingMode: [
    { required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" },
  ]
};

// 竞拍类型
export const biddingType = [
  {
    value: '01',
    label: language('BIDDING_PM（JDZD）', '拍买（价低者得）')
  },
  {
    value: '02',
    label: language('BIDDING_PM（JGZD）', '拍卖（价高者得）')
  },
]

// 模具费
export const moldFee = [
  {
    value: '01',
    label: language('BIDDING_SUODING', '锁定')
  },
  {
    value: '02',
    label: language('BIDDING_FEISUODING', '非锁定')
  }
]

// 报价方式
export const biddingMode = [
  {
    value: '01',
    label: language('BIDDING_DANJIA', '单价')
  },
  {
    value: '02',
    label: language('BIDDING_ZONGJIA', '总价')
  },
  {
    value: '03',
    label: language('BIDDING_DUOJIAGE', '多价格')
  },
]

// 报价是否含税
export const isTax = [
  {
    value: '01',
    label: language('BIDDING_BHKDKS', '不含可抵扣税')
  },
  {
    value: '02',
    label: language('BIDDING_HANSHUI', '含税')
  }
]

// 项目类型
export const projectType = [
  {
    value: '01',
    label: language('BIDDING_ZHENGSHIXIANGMU', '正式项目')
  },
  {
    value: '02',
    label: language('BIDDING_CESHIXIANGMU', '测试项目')
  }
]

// 竞标结果汇总形式
export const biddingResultForm = [
  {
    value: '01',
    label: language('BIDDING_ZONGJIA', '总价')
  },
  {
    value: '02',
    label: language('BIDDING_DANJIA&ZONGJIA', '单价&总价')
  },
]

// 结果公开形式
export const resultOpenForm = [
  {
    value: '01',
    label: language('BIDDING_PAIMING', '排名')
  },
  {
    value: '02',
    label: language('BIDDING_HONGLVDENG', '红绿灯')
  },
  {
    value: '03',
    label: language('BIDDING_SUOYOUPAIMING', '所有排名')
  },
]

// 竞价结果是否公开（供应商）
export const isResultOpen = [
  {
    value: '01',
    label: language('BIDDING_GONGKAI', '公开')
  },
  {
    value: '02',
    label: language('BIDDING_BUGONGKAI', '不公开')
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
    label: language('BIDDING_YUAN', '元')
  },
  {
    value: '02',
    label: language('BIDDING_QIAN', '千')
  },
  {
    value: '03',
    label: language('BIDDING_WAN', '万')
  },
  {
    value: '04',
    label: language('BIDDING_BAIWAN', '百万')
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
    label: language('BIDDING_XUHAO', "序号"),
  },
  {
    prop: "attachmentName",
    label: language('BIDDING_WENJIANMING', "文件名"),
  },
  {
    prop: "attachmentSize",
    label: language('BIDDING_WENJIANDAXIAO', "文件大小"),
  },
  {
    prop: "uploadName",
    label: language('BIDDING_SHANGCHUANREN', "上传人"),
  },
  {
    prop: "uploadDate",
    label: language('BIDDING_SHANGCHUANRIQI', "上传日期"),
  },
]



export const unitTableTitle = [
  {
    props: "fsnrGsnr",
    name: language('BIDDING_FSGSSPNO',"FS/GS/SP No."),
    width: 180
  },
  {
    props: "productName",
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
    width: 300,
  },
  {
    props: "partNumber",
    name: language('BIDDING_LINGJIANHAO',"零件号"),
  },
  {
    props: "factoryPrice",
    name: language('BIDDING_CHUCHANJIA',"出厂价"),
  },
  {
    props: "packingFee",
    name: language('BIDDING_BAOZHUANGFEI',"包装费"),
  },
  {
    props: "transportFee",
    name: language('BIDDING_YUNSHUFEI',"运输费"),
  },
  {
    props: "operationFee",
    name: language('BIDDING_CAOZUOFEI',"操作费"),
  },
  {
    props: "bprice",
    name: language('BIDDING_BJIA',"B价"),
  },
  {
    props: "moldFee",
    name: language('BIDDING_MOJUFEI',"模具费"),
  },
  {
    props: "developFee",
    name: language('BIDDING_KAIFAFEI',"开发费"),
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "quantityUnit",
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
  },
  {
    props: "lifecycle",
    name: language('BIDDING_SHENGMINGZHOUQIZHOU',"生命周期(周)"),
    width: 180
  },
  {
    props: "aveAnnualOutput",
    name: language('BIDDING_PINGJUNNIANCHANLIANG',"平均年产量"),
  },
  {
    props: "maxAnnualOutput",
    name: language('BIDDING_ZUIDANIANCHANLIANG',"最大年产量"),
  },
];

export const baseRules = {
  beginMonth: [
    { required: true, message: language('BIDDING_BITIAN', '必填'), trigger: "blur" },
  ],
  modelProjects: [{ type: 'array', required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" }],
  models: [{ type: 'array', required: true, message: language('BIDDING_BIXUAN', '必选'), trigger: "change" }],
  totalPrices: [
    { required: true, message: language('BIDDING_BITIAN', '必填'), trigger: "blur" },
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
    label: language('BIDDING_XUHAO', "序号"),
  },
  {
    prop: "node",
    label: language('BIDDING_GYSZWM', "供应商中文名"),
  },
  {
    prop: "name",
    label: language('BIDDING_GYSYWM', "供应商英文名"),
  },
  {
    prop: "code",
    label: language('BIDDING_LINSHIHAO', "临时号"),
  },

  {
    prop: "node",
    label: language('BIDDING_SAPHAO', "SAP号"),
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

export const biddingStatue = [
  {
    name: language('BIDDING_CAOGAO', '草稿'),
    value: '01'
  }, {
    name: language('BIDDING_DAIJINGJIA', '待竞价'),
    value: '02'
  }, {
    name: language('BIDDING_WEIKAIBIAO', '未开标'),
    value: '03'
  }, {
    name: language('BIDDING_JINGJIAZHONG', '竞价中'),
    value: '04'
  }, {
    name: language('BIDDING_YIKAIBIAO', '已开标'),
    value: '05'
  }, {
    name: language('BIDDING_YIJIESHU', '已结束'),
    value: '06'
  }, {
    name: language('BIDDING_YILIUBIAO', '已流标'),
    value: '07'
  }, {
    name: language('BIDDING_YIZUOFEI', '已作废'),
    value: '08'
  }, {
    name: language('BIDDING_YIQUXIAO', '已取消'),
    value: '09'
  }
]

export const bidTableTitle = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO', "操作"),
  },
];

export const bidTableTitles = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI', "含税"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO', "操作"),
  },
];
export const heBidTableTitle = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税')
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
];

export const heBidTableTitles = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI', "含税"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
];

export const supplierTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "contactName",
    name: language('BIDDING_GYSLXR', "供应商联系人"),
  },
  {
    props: "telephone",
    name: language('BIDDING_GYSLXDH', "供应商联系电话"),
  },
  {
    props: "email",
    name: language('BIDDING_GYSYX', "供应商邮箱"),
  },
  {
    props: "isAttend",
    name: language('BIDDING_FSYJR', "是否已进入"),
  },
];
export const supplierTableTitles = [
  {
    props: "sort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  }
];



export const supplierRankTableTitle = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  }
];

export const itemNumber = [
  {
    props: "sort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_CPGYS', "产品供应商"),
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_BHKDKSDJ', "不含可抵扣税单价"),
  }
];

export const itemNumbers = [
  {
    props: "sort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "supplierName",
    name: language('BIDDING_CPGYS', "产品供应商"),
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_HANSHUI','含税'),
  }
];

// 竞价明细-不含可抵扣税
export const bidDetail = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
  {
    props: "caozuo",
    name: language('BIDDING_CAOZUO', "操作"),
  }
];

// 竞价明细-荷氏-不含可抵扣税
export const bidDetailHe = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
];

// 竞价明细-含税
export const bidDetails = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI', '含税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
  {
    props: "caozuo",
    name: language('BIDDING_CAOZUO', "操作"),
  }
];

// 竞价明细-荷氏-含税
export const bidDetailsHe = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI','含税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
];

export const projectNotes = [
  {
    type: "index",
    width: 100,
    label: language('BIDDING_XUHAO', "序号"),
  },
  {
    prop: "supplierName",
    label: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    prop: "updateDate",
    label: language('BIDDING_TICHUSHIJIAN', "踢出时间"),
    customRender: (h, scope) => {
      return <span >{scope.row.updateDate?.replace('T', ' ')}</span>;
    },
  },
  {
    prop: "kickoutReasonValue",
    label: language('BIDDING_TICHULIYOU', "踢出理由"),
    customRender: (h, scope) => {
      return <span>{scope.row.kickoutReason === '01' ? language('BIDDING_WMZDYCBJXZ', '未满足第一次报价限制') : language('BIDDING_WMZLXPMXZ', '未满足连续排名限制')}</span>;
    },
  }
];

export const attachTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO', "序号"),
    width: 80,
  },
  {
    props: "attachmentName",
    name: language('BIDDING_WENJIANMING',"文件名"),
  },
  {
    props: "attachmentSize",
    name: language('BIDDING_WENJIANDAXIAO',"文件大小"),
  },
  {
    props: "uploadName",
    name: language('BIDDING_SHANGCHUANREN',"上传人"),
  },
  {
    props: "updateDate",
    name: language('BIDDING_SHANGCHUANRIQI',"上传日期"),
  },
];
