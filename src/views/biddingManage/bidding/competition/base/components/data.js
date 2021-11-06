
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
  biddingNature: '', //竞标性质
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


