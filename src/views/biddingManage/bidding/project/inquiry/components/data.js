/* eslint-disable no-undef */
/*
 * @Author: moxuan
 * @Date: 2021-05-21 20:08:08
 * @Description: 初步评级
 */
import language from "@/utils/language";

export const baseRules = {
  beginMonth: [{ required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" }],
  modelProjects: [
    {
      type: "array",
      required: true,
      message: language('BIDDING_BIXUAN','必选'),
      trigger: "change",
    },
  ],
  models: [
    {
      type: "array",
      required: true,
      message: language('BIDDING_BIXUAN','必选'),
      trigger: "change",
    },
  ],
  totalPrices: [{ required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" }],

  "manualBiddingType": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "biddingBeginTime": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "biddingEndTime": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "pricingDeadline": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "roundType": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "openTenderTime": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "isAttend": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "cbdLevel": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ]
};

export const suppliersRules = {
  "contactName": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "telephone": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "email": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
  ],
}
export const tableTitle = [
  {
    props: "sort",
    name: language('BIDDING_XUHAO','序号'),
    width: '80',
    key:'BIDDING_XUHAO'
  },
  {
    props: "isAttend",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    ],
    name: language('BIDDING_SFCYBLRFQ','是否参与本轮RFQ'),
    key:'BIDDING_SFCYBLRFQ'
  },
  {
    props: "supplierCode",
    name: language('BIDDING_GYSBH','供应商编号'),
    key:'BIDDING_GYSBH'
  },
  {
    props: "supplierName",
    // required: true,
    // rule: [
    //   { type: "number", required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    // ],
    name: language('BIDDING_GYSMC','供应商名称'),
    width: '360',
    key:'BIDDING_GYSMC'
  },
  {
    props: "contactName",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    ],
    name: language('BIDDING_LIANXIREN','联系人'),
    key:'BIDDING_LIANXIREN'
  },
  {
    props: "telephone",
    // required: true,
    // rule: [
    //   { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    //   {
    //     pattern: /^\d+$|^\d*\.\d*$/g,
    //     required: true,
    //     trigger: 'blur'
    //   }
    // ],
    name: language('BIDDING_DIANHUA','电话'),
    key:'BIDDING_DIANHUA'
  },
  {
    props: "email",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      { type: 'email', message: language('BIDDING_QSRZQDYXDZ','请输入正确的邮箱地址'), trigger: ['blur', 'change'] }
    ],
    name: language('BIDDING_youxiang','邮箱'),
    key:'BIDDING_youxiang'
  },
  {
    props: "mbdl",
    // rule: [
    //   {
    //     pattern: /^\d+$|^\d*\.\d*$/g,
    //     trigger: 'blur'
    //   }
    // ],
    name: language('BIDDING_MBDL','MBDL'),
    key:'BIDDING_MBDL'
  },
  {
    props: "cbdLevel",
    name: language('BIDDING_CBDXZ','CBD选择'),
    key:'BIDDING_CBDXZ'
  },
];

export const manualTableTitle = [
  {
    props: "sort",
    name: language('BIDDING_XUHAO','序号'),
    width: '80',
    key:'BIDDING_XUHAO'
  },
  {
    props: "isAttend",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    ],
    name: language('BIDDING_SFCYBLRFQ','是否参与本轮RFQ'),
    key:'BIDDING_SFCYBLRFQ'
  },
  {
    props: "supplierCode",
    name: language('BIDDING_GYSBH','供应商编号'),
    key:'BIDDING_GYSBH'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC','供应商名称'),
    width: '360',
    key:'BIDDING_GYSMC'
  },
  {
    props: "contactName",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    ],
    name: language('BIDDING_LIANXIREN','联系人'),
    key:'BIDDING_LIANXIREN'
  },
  {
    props: "telephone",
    name: language('BIDDING_DIANHUA','电话'),
    key:'BIDDING_DIANHUA'
  },
  {
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      { type: 'email', message: language('BIDDING_QSRZQDYXDZ','请输入正确的邮箱地址'), trigger: ['blur', 'change'] }
    ],
    props: "email",
    name: language('BIDDING_youxiang','邮箱'),
    key:'BIDDING_youxiang'
  },
  {
    props: "mbdl",
    name: language('BIDDING_MBDL','MBDL'),
    key:'BIDDING_MBDL'
  },
];

// 没有用到
export const statusList = [
  {
    name: "已发布",
    value: "已发布",
  },
  {
    name: "已过期",
    value: "已过期",
  },
  {
    name: "未发布",
    value: "未发布",
  },
];

export const supplierTableListColumns = [
  {
    type: "selection",
    width: 70,
  },
  {
    type: "index",
    width: 50,
    label: language('BIDDING_XUHAO',"序号"),
    key:'BIDDING_XUHAO'
  },
  {
    prop: "nameZh",
    label: language('BIDDING_GYSZWM',"供应商中文名"),
    key:'BIDDING_GYSZWM'
  },
  {
    prop: "nameEn",
    label: language('BIDDING_GYSYWM',"供应商英文名"),
    key:'BIDDING_GYSYWM'
  },
  {
    prop: "code",
    label: language('BIDDING_LINSHIHAO',"临时号"),
    key:'BIDDING_LINSHIHAO'
  },

  {
    prop: "sapCode",
    label: language('BIDDING_SAPHAO',"SAP号"),
    key:'BIDDING_SAPHAO'
  },

  {
    prop: "svwCode",
    label: language('BIDDING_SVWZSH',"SVW正式号"),
    key:'BIDDING_SVWZSH'
  },
];

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
    key:'BIDDING_YUAN'
  },
  "03": {
    beishu: 10000,
    unit: "万",
    key:'BIDDING_YUAN'
  },
  "04": {
    beishu: 1000000,
    unit: "百万",
    key:'BIDDING_YUAN'
  }
}

export const RFQTurnList = [
  // { value: "01", label: "普通询价" },
  { value: "02", label: '在线开标', key:'BIDDING_ZAIXIANKAIBIAO' },
  { value: "03", label: '在线竞价-英式', key:'BIDDING_ZAIXIANJINGJIA_YINGSHI' },
];

export const procureTypeList = [
  { value: "01", label: '生产采购', key:'BIDDING_SHENGCHANCAIGOU' },
  { value: "02", label: '一般采购', key:'BIDDING_YIBANCAIGOU' },
];

export const manualBiddingTypeList = [
  {
    name: '在线竞价-英式',
    manualBiddingType: "01",
    key:'BIDDING_ZAIXIANJINGJIA_YINGSHI'
  },
  {
    name: '在线竞价-荷式',
    manualBiddingType: "02",
    key:'BIDDING_ZAIXIANJINGJIA_HESHI'
  },
];

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

export const openTenderStatusList = [
  {
    name: '未开标',
    openTenderStatus: "01",
    key:'BIDDING_WEIKAIBIAO'
  },
  {
    name: '已开标',
    openTenderStatus: "02",
    key:'BIDDING_YIKAIBIAO'
  },
];

export const roundTypeList = [
  {
    roundType: "01",
    name: '普通询价',
    key:'BIDDING_PUTONGXUNJIA'
  },
  {
    roundType: "02",
    name: '在线开标',
    key:'BIDDING_ZAIXIANKAIBIAO'
  },
  {
    roundType: "03",
    name: '在线竞价-英式',
    key:'BIDDING_ZAIXIANJINGJIA_YINGSHI'
  },
  {
    roundType: "04",
    name: '在线竞价-荷式',
    key:'BIDDING_ZAIXIANJINGJIA_HESHI'
  },
  {
    roundType: "05",
    name: '手工竞价',
    key:'BIDDING_SHOUGONGJINGJIA'
  },
];

// 
export const roundTypeLists = [
  {
    roundType: "01",
    name: '普通询价',
    key:'BIDDING_PUTONGXUNJIA'
  },
  {
    roundType: "02",
    name: '在线开标',
    key:'BIDDING_ZAIXIANKAIBIAO'
  },
  {
    roundType: "03",
    name: '在线竞价-英式',
    key:'BIDDING_ZAIXIANJINGJIA_YINGSHI'
  },
  {
    roundType: "06",
    name: '手工竞价-报价单回填',
    key:'BIDDING_SGJJ_BJDHT'
  },
];


export const cbdLevelLib = {
  '01': 'L1',
  '02': 'L2',
  '03': 'L3',
}

export const biddingStatus = [
  {
    value: '01',
    label: '草稿',
    key:'BIDDING_CAOGAO'
  },
  {
    value: '02',
    label: '待竞价',
    key:'BIDDING_DAIJINGJIA'
  },
  {
    value: '03',
    label: '未开标',
    key:'BIDDING_WEIKAIBIAO'
  },
  {
    value: '04',
    label: '竞价中',
    key:'BIDDING_JINGJIAZHONG'
  },
  {
    value: '05',
    label: '已开标',
    key:'BIDDING_YIKAIBIAO'
  },
  {
    value: '06',
    label: '已结束',
    key:'BIDDING_YIJIESHU'
  },
  {
    value: '07',
    label: '已流标',
    key:'BIDDING_YILIUBIAO'
  },
  {
    value: '08',
    label: '已作废',
    key:'BIDDING_YIZUOFEI'
  },
  {
    value: '09',
    label: '已取消',
    key:'BIDDING_YIQUXIAO'
  },
  {
    value: '10',
    label: '已发出',
    key:'BIDDING_YIFACHU'
  },
]

export const attachTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO','序号'),
    key:'BIDDING_XUHAO',
    width: 80,
  },
  {
    props: "attachmentName",
    name: language('BIDDING_WENJIANMING','文件名'),
    key:'BIDDING_WENJIANMING'
  },
  {
    props: "attachmentSize",
    name: language('BIDDING_WENJIANDAXIAO','文件大小'),
    key:'BIDDING_WENJIANDAXIAO'
  },
  {
    props: "uploadName",
    name: language('BIDDING_SHANGCHUANREN','上传人'),
    key:'BIDDING_SHANGCHUANREN'
  },
  {
    props: "updateDate",
    name: language('BIDDING_SHANGCHUANRIQI','上传日期'),
    key:'BIDDING_SHANGCHUANRIQI'
  },
];
