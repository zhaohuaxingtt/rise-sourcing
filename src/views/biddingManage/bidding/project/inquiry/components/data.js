/* eslint-disable no-undef */
/*
 * @Author: moxuan
 * @Date: 2021-05-21 20:08:08
 * @Description: 初步评级
 */
export const baseRules = {
  beginMonth: [{ required: true, message: "必填", trigger: "blur" }],
  modelProjects: [
    {
      type: "array",
      required: true,
      message: i18n.t("必选"),
      trigger: "change",
    },
  ],
  models: [
    {
      type: "array",
      required: true,
      message: i18n.t("必选"),
      trigger: "change",
    },
  ],
  totalPrices: [{ required: true, message: "必填", trigger: "blur" }],

  "manualBiddingType": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "biddingBeginTime": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "biddingEndTime": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "pricingDeadline": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "roundType": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "openTenderTime": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "isAttend": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "cbdLevel": [
    { required: true, message: "必选", trigger: "blur" },
  ]
};

export const suppliersRules = {
  "contactName": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "telephone": [
    { required: true, message: "必选", trigger: "blur" },
  ],
  "email": [
    { required: true, message: "必填", trigger: "blur" },
  ],
}
export const tableTitle = [
  {
    props: "sort",
    name: "序号",
    width: '80',
  },
  {
    props: "isAttend",
    required: true,
    rule: [
      { required: true, message: "必选", trigger: "blur" },
    ],
    name: "是否参与本轮RFQ",
  },
  {
    props: "supplierCode",
    name: "供应商编号",
  },
  {
    props: "supplierName",
    // required: true,
    // rule: [
    //   { type: "number", required: true, message: "必填", trigger: "blur" },
    // ],
    name: "供应商名称",
    width: '360',
  },
  {
    props: "contactName",
    required: true,
    rule: [
      { required: true, message: "必选", trigger: "blur" },
    ],
    name: "联系人",
  },
  {
    props: "telephone",
    // required: true,
    // rule: [
    //   { required: true, message: "必填", trigger: "blur" },
    //   {
    //     pattern: /^\d+$|^\d*\.\d*$/g,
    //     required: true,
    //     trigger: 'blur'
    //   }
    // ],
    name: "电话",
  },
  {
    props: "email",
    required: true,
    rule: [
      { required: true, message: "必填", trigger: "blur" },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    name: "邮箱",
  },
  {
    props: "mbdl",
    // rule: [
    //   {
    //     pattern: /^\d+$|^\d*\.\d*$/g,
    //     trigger: 'blur'
    //   }
    // ],
    name: "MBDL",
  },
  {
    props: "cbdLevel",
    name: "CBD选择",
  },
];

export const manualTableTitle = [
  {
    props: "sort",
    name: "序号",
    width: '80',
  },
  {
    props: "isAttend",
    required: true,
    rule: [
      { required: true, message: "必选", trigger: "blur" },
    ],
    name: "是否参与本轮RFQ",
  },
  {
    props: "supplierCode",
    name: "供应商编号",
  },
  {
    props: "supplierName",
    name: "供应商名称",
    width: '360',
  },
  {
    props: "contactName",
    required: true,
    rule: [
      { required: true, message: "必选", trigger: "blur" },
    ],
    name: "联系人",
  },
  {
    props: "telephone",
    name: "电话",
  },
  {
    required: true,
    rule: [
      { required: true, message: "必填", trigger: "blur" },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    props: "email",
    name: "邮箱",
  },
  {
    props: "mbdl",
    name: "MBDL",
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
    width: 80,
    label: "序号",
  },
  {
    prop: "nameZh",
    label: "供应商中文名",
  },
  {
    prop: "nameEn",
    label: "供应商英文名",
  },
  {
    prop: "code",
    label: "临时号",
  },
  {
    prop: "sapCode",
    label: "SAP号",
  },

  {
    prop: "svwCode",
    label: "SVW正式号",
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
  { value: "02", label: "在线开标" },
  { value: "03", label: "在线竞价-英式" },
];

export const procureTypeList = [
  { value: "01", label: "生产采购" },
  { value: "02", label: "一般采购" },
];

export const manualBiddingTypeList = [
  {
    name: "在线竞价-英式",
    manualBiddingType: "01",
  },
  {
    name: "在线竞价-荷式",
    manualBiddingType: "02",
  },
];

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

export const openTenderStatusList = [
  {
    name: "未开标",
    openTenderStatus: "01",
  },
  {
    name: "已开标",
    openTenderStatus: "02",
  },
];

export const roundTypeList = [
  {
    roundType: "01",
    name: "普通询价",
  },
  {
    roundType: "02",
    name: "在线开标",
  },
  {
    roundType: "03",
    name: "在线竞价-英式",
  },
  {
    roundType: "04",
    name: "在线竞价-荷式",
  },
  {
    roundType: "05",
    name: "手工竞价",
  },
];

// 
export const roundTypeLists = [
  {
    roundType: "01",
    name: "普通询价",
  },
  {
    roundType: "02",
    name: "在线开标",
  },
  {
    roundType: "03",
    name: "在线竞价-英式",
  },
  {
    roundType: "06",
    name: "手工竞价-报价单回填",
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
    label: '草稿'
  },
  {
    value: '02',
    label: '待竞价'
  },
  {
    value: '03',
    label: '未开标'
  },
  {
    value: '04',
    label: '竞价中'
  },
  {
    value: '05',
    label: '已开标'
  },
  {
    value: '06',
    label: '已结束'
  },
  {
    value: '07',
    label: '已流标'
  },
  {
    value: '08',
    label: '已作废'
  },
  {
    value: '09',
    label: '已取消'
  }

]

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
