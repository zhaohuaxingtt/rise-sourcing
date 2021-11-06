
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



export const unitTableTitle = [
  {
    props: "fsnrGsnr",
    name: "FSNR/GSNR",
    width: 180
  },
  {
    props: "productName",
    name: "产品名称",
    width: 300,
  },
  {
    props: "partNumber",
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
    width: 180
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
    prop: "node",
    label: "供应商中文名",
    i18n: 'TERMS_GONGYINGSHANGZHONGWENMING',
  },
  {
    prop: "name",
    label: "供应商英文名",
  },
  {
    prop: "code",
    label: "临时号",
  },

  {
    prop: "node",
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

export const biddingStatue = [
  {
    name: '草稿',
    value: '01'
  }, {
    name: '待竞价',
    value: '02'
  }, {
    name: '未开标',
    value: '03'
  }, {
    name: '竞价中',
    value: '04'
  }, {
    name: '已开标',
    value: '05'
  }, {
    name: '已结束',
    value: '06'
  }, {
    name: '已流标',
    value: '07'
  }, {
    name: '已作废',
    value: '08'
  }, {
    name: '已取消',
    value: '09'
  }
]

export const bidTableTitle = [
  {
    props: "currentSort",
    width: 70,
    name: "序号",
  },
  {
    props: "currencyUnit",
    name: "货币单位",
  },
  {
    props: "isTax",
    name: "不含可抵扣税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
  {
    props: "operation",
    name: "操作",
  },
];

export const bidTableTitles = [
  {
    props: "currentSort",
    width: 70,
    name: "序号",
  },
  {
    props: "currencyUnit",
    name: "货币单位",
  },
  {
    props: "isTax",
    name: "含税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
  {
    props: "operation",
    name: "操作",
  },
];
export const heBidTableTitle = [
  {
    props: "currentSort",
    width: 70,
    name: "序号",
  },
  {
    props: "currencyUnit",
    name: "货币单位",
  },
  {
    props: "isTax",
    name: "不含可抵扣税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
];

export const heBidTableTitles = [
  {
    props: "currentSort",
    width: 70,
    name: "序号",
  },
  {
    props: "currencyUnit",
    name: "货币单位",
  },
  {
    props: "isTax",
    name: "含税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
];

export const supplierTableTitle = [
  {
    props: "index",
    name: "序号",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "contactName",
    name: "供应商联系人",
  },
  {
    props: "telephone",
    name: "供应商联系电话",
  },
  {
    props: "email",
    name: "供应商邮箱",
  },
  {
    props: "isAttend",
    name: "是否已进入",
  },
];
export const supplierTableTitles = [
  {
    props: "sort",
    name: "排名",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  }
];



export const supplierRankTableTitle = [
  {
    props: "currentSort",
    name: "排名",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  }
];

export const itemNumber = [
  {
    props: "sort",
    name: "排名",
  },
  {
    props: "supplierName",
    name: "产品供应商",
  },
  {
    props: "upsetPrice",
    name: "不含可抵扣税单价",
  }
];

export const itemNumbers = [
  {
    props: "sort",
    name: "排名",
  },
  {
    props: "supplierName",
    name: "产品供应商",
  },
  {
    props: "upsetPrice",
    name: "含税",
  }
];

// 竞价明细-不含可抵扣税
export const bidDetail = [
  {
    props: "currentSort",
    name: "序号",
  },
  {
    props: "isTax",
    name: "不含可抵扣税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
  {
    props: "caozuo",
    name: "操作",
  }
];

// 竞价明细-荷氏-不含可抵扣税
export const bidDetailHe = [
  {
    props: "currentSort",
    name: "序号",
  },
  {
    props: "isTax",
    name: "不含可抵扣税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
];

// 竞价明细-含税
export const bidDetails = [
  {
    props: "currentSort",
    name: "序号",
  },
  {
    props: "isTax",
    name: "含税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
  {
    props: "caozuo",
    name: "操作",
  }
];

// 竞价明细-荷氏-含税
export const bidDetailsHe = [
  {
    props: "currentSort",
    name: "序号",
  },
  {
    props: "isTax",
    name: "含税",
  },
  {
    props: "supplierName",
    name: "供应商名称",
  },
  {
    props: "serverTime",
    name: "报价时间",
  },
];

export const projectNotes = [
  {
    type: "index",
    width: 100,
    label: "序号",
  },
  {
    prop: "supplierName",
    label: "供应商名称",
  },
  {
    prop: "updateDate",
    label: "踢出时间",
    customRender: (h, scope) => {
      return <span >{scope.row.updateDate?.replace('T', ' ')}</span>;
    },
  },
  {
    prop: "kickoutReasonValue",
    label: "踢出理由",
    customRender: (h, scope) => {
      return <span>{scope.row.kickoutReason === '01' ? '未满足第一次报价限制' : '未满足连续排名限制'}</span>;
    },
  }
];

export const attachTableTitle = [
  {
    props: "index",
    name: "序号",
    width: 80,
  },
  {
    props: "attachmentName",
    name: "文件名",
  },
  {
    props: "attachmentSize",
    name: "文件大小",
  },
  {
    props: "uploadName",
    name: "上传人",
  },
  {
    props: "updateDate",
    name: "上传日期",
  },
];
