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

// 没有用到
export const isAttendList = [
  {
    name: language('BIDDING_SHI','是'),
    isAttend: true,
  },
  {
    name: language('BIDDING_FOU','否'),
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

// 附件列表,没有用到
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


// 没有用到
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
// 没有用到
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

export const biddingStatue = [
  {
    value: '01',
    name: '草稿',
    key:'BIDDING_CAOGAO'
  },
  {
    value: '02',
    name: '待竞价',
    key:'BIDDING_DAIJINGJIA'
  },
  {
    value: '03',
    name: '未开标',
    key:'BIDDING_WEIKAIBIAO'
  },
  {
    value: '04',
    name: '竞价中',
    key:'BIDDING_JINGJIAZHONG'
  },
  {
    value: '05',
    name: '已开标',
    key:'BIDDING_YIKAIBIAO'
  },
  {
    value: '06',
    name: '已结束',
    key:'BIDDING_YIJIESHU'
  },
  {
    value: '07',
    name: '已流标',
    key:'BIDDING_YILIUBIAO'
  },
  {
    value: '08',
    name: '已作废',
    key:'BIDDING_YIZUOFEI'
  },
  {
    value: '09',
    name: '已取消',
    key:'BIDDING_YIQUXIAO'
  },
  {
    value: '10',
    name: '已发出',
    key:'BIDDING_YIFACHU'
  },
]

export const bidTableTitle = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
    key:'BIDDING_HUOBIDANWEI'
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
    key:'BIDDING_BHKDKS'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO', "操作"),
    key:'BIDDING_CAOZUO'
  },
];

export const bidTableTitles = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
    key:'BIDDING_HUOBIDANWEI'
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI', "含税"),
    key:'BIDDING_HANSHUI'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO', "操作"),
    key:'BIDDING_CAOZUO'
  },
];
export const heBidTableTitle = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
    key:'BIDDING_HUOBIDANWEI'
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
    key:'BIDDING_BHKDKS'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
];

export const heBidTableTitles = [
  {
    props: "currentSort",
    width: 70,
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "currencyUnit",
    name: language('BIDDING_HUOBIDANWEI', "货币单位"),
    key:'BIDDING_HUOBIDANWEI'
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI', "含税"),
    key:'BIDDING_HANSHUI'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
];

export const supplierTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "contactName",
    name: language('BIDDING_GYSLXR', "供应商联系人"),
    key:'BIDDING_GYSLXR'
  },
  {
    props: "telephone",
    name: language('BIDDING_GYSLXDH', "供应商联系电话"),
    key:'BIDDING_GYSLXDH'
  },
  {
    props: "email",
    name: language('BIDDING_GYSYX', "供应商邮箱"),
    key:'BIDDING_GYSYX'
  },
  {
    props: "isAttend",
    name: language('BIDDING_FSYJR', "是否已进入"),
    key:'BIDDING_FSYJR'
  },
];
export const supplierTableTitles = [
  {
    props: "sort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  }
];



export const supplierRankTableTitle = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  }
];

export const itemNumber = [
  {
    props: "sort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "supplierName",
    name: language('BIDDING_CPGYS', "产品供应商"),
    key:'BIDDING_CPGYS'
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_BHKDKSDJ', "不含可抵扣税单价"),
    key:'BIDDING_BHKDKSDJ'
  }
];

export const itemNumbers = [
  {
    props: "sort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "supplierName",
    name: language('BIDDING_CPGYS', "产品供应商"),
    key:'BIDDING_CPGYS'
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_HANSHUI','含税'),
    key:'BIDDING_HANSHUI'
  }
];

// 竞价明细-不含可抵扣税
export const bidDetail = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
    key:'BIDDING_BHKDKS'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
  {
    props: "caozuo",
    name: language('BIDDING_CAOZUO', "操作"),
    key:'BIDDING_CAOZUO'
  }
];

// 竞价明细-荷氏-不含可抵扣税
export const bidDetailHe = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
    key:'BIDDING_BHKDKS'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
];

// 竞价明细-含税
export const bidDetails = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI', '含税'),
    key:'BIDDING_HANSHUI'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:"BIDDING_GYSMC"
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
  {
    props: "caozuo",
    name: language('BIDDING_CAOZUO', "操作"),
    key:'BIDDING_CAOZUO'
  }
];

// 竞价明细-荷氏-含税
export const bidDetailsHe = [
  {
    props: "currentSort",
    name: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO'
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI','含税'),
    key:'BIDDING_HANSHUI'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
];

export const projectNotes = [
  {
    type: "index",
    width: 150,
    label: language('BIDDING_XUHAO', "序号"),
    key:'BIDDING_XUHAO',
    i18n:'BIDDING_XUHAO'
  },
  {
    prop: "supplierName",
    label: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC',
    i18n:'BIDDING_GYSMC'
  },
  {
    prop: "updateDate",
    label: language('BIDDING_TICHUSHIJIAN', "踢出时间"),
    customRender: (h, scope) => {
      return <span >{scope.row.updateDate?.replace('T', ' ')}</span>;
    },
    key:'BIDDING_TICHUSHIJIAN',
    i18n:'BIDDING_TICHUSHIJIAN',
  },
  {
    prop: "kickoutReasonValue",
    label: language('BIDDING_TICHULIYOU', "踢出理由"),
    customRender: (h, scope) => {
      return <span>{scope.row.kickoutReason === '01' ? language('BIDDING_WMZDYCBJXZ', '未满足第一次报价限制') : language('BIDDING_WMZLXPMXZ', '未满足连续排名限制')}</span>;
    },
    key:'BIDDING_TICHULIYOU',
    i18n:'BIDDING_TICHULIYOU',
  }
];

export const attachTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO', "序号"),
    width: 80,
    key:'BIDDING_XUHAO'
  },
  {
    props: "attachmentName",
    name: language('BIDDING_WENJIANMING',"文件名"),
    key:'BIDDING_WENJIANMING'
  },
  {
    props: "attachmentSize",
    name: language('BIDDING_WENJIANDAXIAO',"文件大小"),
    key:'BIDDING_WENJIANDAXIAO'
  },
  {
    props: "uploadName",
    name: language('BIDDING_SHANGCHUANREN',"上传人"),
    key:'BIDDING_SHANGCHUANREN'
  },
  {
    props: "updateDate",
    name: language('BIDDING_SHANGCHUANRIQI',"上传日期"),
    key:'BIDDING_SHANGCHUANRIQI'
  },
];
