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
  biddingNature: '', //竞标性质
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
    label: language('BIDDING_PM（JDZD）','拍买（价低者得）')
  },
  {
    value: '02',
    label: language('BIDDING_PM（JGZD）','拍卖（价高者得）')
  },
]

// 模具费
export const moldFee = [
  {
    value: '01',
    label: language('BIDDING_SUODING','锁定')
  },
  {
    value: '02',
    label: language('BIDDING_FEISUODING','非锁定')
  }
]

// 报价方式
export const biddingMode = [
  {
    value: '01',
    label: language('BIDDING_DANJIA','单价')
  },
  {
    value: '02',
    label: language('BIDDING_ZONGJIA','总价')
  },
  {
    value: '03',
    label: language('BIDDING_DUOJIAGE','多价格')
  },
]

// 报价是否含税
export const isTax = [
  {
    value: '01',
    label: language('BIDDING_BHKDKS','不含可抵扣税')
  },
  {
    value: '02',
    label: language('BIDDING_HANSHUI','含税')
  }
]

// 项目类型
export const projectType = [
  {
    value: '01',
    label: language('BIDDING_ZHENGSHIXIANGMU','正式项目')
  },
  {
    value: '02',
    label: language('BIDDING_CESHIXIANGMU','测试项目')
  }
]

// 竞标结果汇总形式
export const biddingResultForm = [
  {
    value: '01',
    label: language('BIDDING_ZONGJIA','总价')
  },
  {
    value: '02',
    label: language('BIDDING_DANJIA&ZONGJIA','单价&总价')
  },
]

// 结果公开形式
export const resultOpenForm = [
  {
    value: '01',
    label: language('BIDDING_PAIMING','排名')
  },
  {
    value: '02',
    label: language('BIDDING_HONGLVDENG','红绿灯')
  },
  {
    value: '03',
    label: language('BIDDING_SUOYOUPAIMING','所有排名')
  },
]

// 竞价结果是否公开（供应商）
export const isResultOpen = [
  {
    value: '01',
    label: language('BIDDING_GONGKAI','公开')
  },
  {
    value: '02',
    label: language('BIDDING_BUGONGKAI','不公开')
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
    label: language('BIDDING_YUAN','元')
  },
  {
    value: '02',
    label: language('BIDDING_QIAN','千')
  },
  {
    value: '03',
    label: language('BIDDING_WAN','万')
  },
  {
    value: '04',
    label: language('BIDDING_BAIWAN','百万')
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


