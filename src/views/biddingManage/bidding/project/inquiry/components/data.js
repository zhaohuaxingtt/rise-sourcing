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
  },
  {
    props: "isAttend",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    ],
    name: language('BIDDING_SFCYBLRFQ','是否参与本轮RFQ'),
  },
  {
    props: "supplierCode",
    name: language('BIDDING_GYSBH','供应商编号'),
  },
  {
    props: "supplierName",
    // required: true,
    // rule: [
    //   { type: "number", required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    // ],
    name: language('BIDDING_GYSMC','供应商名称'),
    width: '360',
  },
  {
    props: "contactName",
    required: true,
    rule: [
      { required: true, message: "必选", trigger: "blur" },
    ],
    name: language('BIDDING_LIANXIREN','联系人'),
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
  },
  {
    props: "email",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      { type: 'email', message: language('BIDDING_QSRZQDYXDZ','请输入正确的邮箱地址'), trigger: ['blur', 'change'] }
    ],
    name: language('BIDDING_youxiang','邮箱'),
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
  },
  {
    props: "cbdLevel",
    name: language('BIDDING_CBDXZ','CBD选择'),
  },
];

export const manualTableTitle = [
  {
    props: "sort",
    name: language('BIDDING_XUHAO','序号'),
    width: '80',
  },
  {
    props: "isAttend",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    ],
    name: language('BIDDING_SFCYBLRFQ','是否参与本轮RFQ'),
  },
  {
    props: "supplierCode",
    name: language('BIDDING_GYSBH','供应商编号'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC','供应商名称'),
    width: '360',
  },
  {
    props: "contactName",
    required: true,
    rule: [
      { required: true, message: "必选", trigger: "blur" },
    ],
    name: language('BIDDING_LIANXIREN','联系人'),
  },
  {
    props: "telephone",
    name: language('BIDDING_DIANHUA','电话'),
  },
  {
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      { type: 'email', message: language('BIDDING_QSRZQDYXDZ','请输入正确的邮箱地址'), trigger: ['blur', 'change'] }
    ],
    props: "email",
    name: language('BIDDING_youxiang','邮箱'),
  },
  {
    props: "mbdl",
    name: language('BIDDING_MBDL','MBDL'),
  },
];

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
  },
  {
    prop: "nameZh",
    label: language('BIDDING_GYSZWM',"供应商中文名"),
  },
  {
    prop: "nameEn",
    label: language('BIDDING_GYSYWM',"供应商英文名"),
  },
  {
    prop: "code",
    label: language('BIDDING_LINSHIHAO',"临时号"),
  },

  {
    prop: "sapCode",
    label: language('BIDDING_SAPHAO',"SAP号"),
  },

  {
    prop: "svwCode",
    label: language('BIDDING_SVWZSH',"SVW正式号"),
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
  },
  "02": {
    beishu: 1000,
    unit: "千",
  },
  "03": {
    beishu: 10000,
    unit: "万",
  },
  "04": {
    beishu: 1000000,
    unit: "百万",
  },
};

export const RFQTurnList = [
  // { value: "01", label: "普通询价" },
  { value: "02", label: language('BIDDING_ZAIXIANKAIBIAO','在线开标') },
  { value: "03", label: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式') },
];

export const procureTypeList = [
  { value: "01", label: language('BIDDING_SHENGCHANCAIGOU','生产采购') },
  { value: "02", label: language('BIDDING_YIBANCAIGOU','一般采购') },
];

export const manualBiddingTypeList = [
  {
    name: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式'),
    manualBiddingType: "01",
  },
  {
    name: language('BIDDING_ZAIXIANJINGJIA_HESHI','在线竞价-荷式'),
    manualBiddingType: "02",
  },
];

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
    name: language('BIDDING_WEIKAIBIAO','未开标'),
    openTenderStatus: "01",
  },
  {
    name: language('BIDDING_YIKAIBIAO','已开标'),
    openTenderStatus: "02",
  },
];

export const roundTypeList = [
  {
    roundType: "01",
    name: language('BIDDING_PUTONGXUNJIA','普通询价'),
  },
  {
    roundType: "02",
    name: language('BIDDING_ZAIXIANKAIBIAO','在线开标'),
  },
  {
    roundType: "03",
    name: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式'),
  },
  {
    roundType: "04",
    name: language('BIDDING_ZAIXIANJINGJIA_HESHI','在线竞价-荷式'),
  },
  {
    roundType: "05",
    name: language('BIDDING_SHOUGONGJINGJIA','手工竞价'),
  },
];

// 
export const roundTypeLists = [
  {
    roundType: "01",
    name: language('BIDDING_PUTONGXUNJIA','普通询价'),
  },
  {
    roundType: "02",
    name: language('BIDDING_ZAIXIANKAIBIAO','在线开标'),
  },
  {
    roundType: "03",
    name: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式'),
  },
  {
    roundType: "06",
    name: language('BIDDING_SGJJ_BJDHT','手工竞价-报价单回填'),
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
    label: language('BIDDING_CAOGAO','草稿')
  },
  {
    value: '02',
    label: language('BIDDING_DAIJINGJIA','待竞价')
  },
  {
    value: '03',
    label: language('BIDDING_WEIKAIBIAO','未开标')
  },
  {
    value: '04',
    label: language('BIDDING_JINGJIAZHONG','竞价中')
  },
  {
    value: '05',
    label: language('BIDDING_YIKAIBIAO','已开标')
  },
  {
    value: '06',
    label: language('BIDDING_YIJIESHU','已结束')
  },
  {
    value: '07',
    label: language('BIDDING_YILIUBIAO','已流标')
  },
  {
    value: '08',
    label: language('BIDDING_YIZUOFEI','已作废')
  },
  {
    value: '09',
    label: language('BIDDING_YIQUXIAO','已取消')
  },
]

export const attachTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO','序号'),
    width: 80,
  },
  {
    props: "attachmentName",
    name: language('BIDDING_WENJIANMING','文件名'),
  },
  {
    props: "attachmentSize",
    name: language('BIDDING_WENJIANDAXIAO','文件大小'),
  },
  {
    props: "uploadName",
    name: language('BIDDING_SHANGCHUANREN','上传人'),
  },
  {
    props: "updateDate",
    name: language('BIDDING_SHANGCHUANRIQI','上传日期'),
  },
];
