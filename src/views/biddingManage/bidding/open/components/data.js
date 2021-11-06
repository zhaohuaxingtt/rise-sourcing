// 开标信息
export const infoForm = {
  projectType: "01", //项目类型
  rfqName: "", //RFQ名称
  resultOpenForm: "", //开标结果公开形式
  currencyUnit: "", //货币单位
  pricingDeadline: "", //报价截止时间
  openTenderTime: "", //开标时间
  linieName: "", //采购人
  liniePhone: "", //采购人电话
  isTax: "", //报价是否含税
  targetPrice: "", //目标价
  openTenderNature: "", //开标性质
  otherProjectNotice: "", //其他项目公告信息
  quoteRule: {
    //报价规则
    greenLightFrom: "",
    greenLightTo: "",
    greenDeviationValue: "", //绿灯偏离值
    yellowLightFrom: "",
    yellowLightTo: "",
    yellowDeviationValue: "", //黄灯偏离值
    redLightFrom: "",
    redLightTo: "",
    redDeviationValue: "", //红灯偏离值
    biddingId: "",
    targetPrice: ''  //目标价
  },
};

const isEmpty = (val) => !val && 0 !== val;
// form规则
export const infoRules = (form) => ({
  currencyUnit: [{ required: true, message: "请选择", trigger: "change" }],
  isTax: [{ required: true, message: "请选择", trigger: "change" }],
  resultOpenForm: [{ required: true, message: "请选择", trigger: "change" }],
  "quoteRule.greenLightFrom": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
    {
      validator(rule, value, callback) {
        const {
          greenLightFrom,
          greenLightTo,
          yellowLightFrom,
          yellowLightTo,
          redLightFrom,
          redLightTo,
        } = form.quoteRule;
        if (
          isEmpty(greenLightFrom) &&
          isEmpty(greenLightTo) &&
          isEmpty(yellowLightFrom) &&
          isEmpty(yellowLightTo) &&
          isEmpty(redLightFrom) &&
          isEmpty(redLightTo)
        ) {
          return callback(new Error(rule.message)); // 相同区间必须同时填写
        }
        if (
          (isEmpty(greenLightFrom) && !isEmpty(greenLightTo)) ||
          (!isEmpty(greenLightFrom) && isEmpty(greenLightTo)) ||
          (isEmpty(yellowLightFrom) && !isEmpty(yellowLightTo)) ||
          (!isEmpty(yellowLightFrom) && isEmpty(yellowLightTo)) ||
          (isEmpty(redLightFrom) && !isEmpty(redLightTo)) ||
          (!isEmpty(redLightFrom) && isEmpty(redLightTo))
        ) {
          return callback(new Error(rule.message)); // 相同区间必须同时填写
        }
        if (
          (!isEmpty(greenLightFrom) && isNaN(greenLightFrom)) ||
          (!isEmpty(greenLightTo) && isNaN(greenLightTo)) ||
          (!isEmpty(yellowLightFrom) && isNaN(yellowLightFrom)) ||
          (!isEmpty(yellowLightTo) && isNaN(yellowLightTo)) ||
          (!isEmpty(redLightFrom) && isNaN(redLightFrom)) ||
          (!isEmpty(redLightTo) && isNaN(redLightTo))
        ) {
          return callback(new Error(rule.message)); // 不能存在非数字
        }
        if (
          Number(greenLightFrom) > Number(greenLightTo) ||
          Number(yellowLightFrom) > Number(yellowLightTo) ||
          Number(redLightFrom) > Number(redLightTo)
        ) {
          return callback(new Error(rule.message)); // 相同区间必须开始小于截止
        }
        const existArea = [
          [greenLightFrom, greenLightTo],
          [yellowLightFrom, yellowLightTo],
          [redLightFrom, redLightTo],
        ].filter(([form, to]) => !isEmpty(form) && !isEmpty(to));
        if (Number(existArea[0][0]) !== 1) {
          return callback(new Error(rule.message)); // 开始第一个值必须等于1
        }
        if (
          (existArea[1] && Number(existArea[1][0]) !== Number(existArea[0][1]) + 1) ||
          (existArea[2] && Number(existArea[2][0]) !== Number(existArea[1][1]) + 1)
        ) {
          return callback(new Error(rule.message)); // 下一区间开始值必须为上一区间截止值+1
        }
        callback();
      },
      message: "排名区间配置错误",
      trigger: "blur",
    },
  ],
  "quoteRule.greenLightTo": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
  ],
  "quoteRule.yellowLightFrom": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
  ],
  "quoteRule.yellowLightTo": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
  ],
  "quoteRule.redLightFrom": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
  ],
  "quoteRule.redLightTo": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
  ],
  "quoteRule.greenDeviationValue": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
    { pattern: /^(\d|[1-9]\d|100)$/, message: "不能大于100", trigger: "blur" },
    {
      validator(rule, value, callback) {
        const { greenDeviationValue, yellowDeviationValue, targetPrice } = form.quoteRule;
        if (targetPrice === null || targetPrice === undefined || targetPrice === '') {
          callback()
        } else {
          greenDeviationValue ||
            0 === greenDeviationValue ||
            yellowDeviationValue ||
            0 === yellowDeviationValue
            ? callback()
            : callback(new Error(rule.message));
        }
      },
      message: "请填写偏离目标价",
      trigger: "blur",
    },
  ],
  "quoteRule.yellowDeviationValue": [
    { pattern: /^\d+$/, message: "必须为正整数", trigger: "blur" },
    { pattern: /^(\d|[1-9]\d|100)$/, message: "不能大于100", trigger: "blur" },
    {
      validator(rule, value, callback) {
        const { greenDeviationValue, yellowDeviationValue } = form.quoteRule;
        (greenDeviationValue ||
          0 === greenDeviationValue ||
          yellowDeviationValue ||
          0 === yellowDeviationValue) &&
          Number(value) <= Number(greenDeviationValue)
          ? callback(new Error(rule.message))
          : callback();
      },
      message: "不能小于等于绿灯",
      trigger: "blur",
    },
  ],
});

// 报价是否含税
export const isTax = [
  {
    value: "01",
    label: "不含可抵扣税",
  },
  {
    value: "02",
    label: "含税",
  },
];

// 项目类型
export const projectType = [
  {
    value: "01",
    label: "正式项目",
  },
  {
    value: "02",
    label: "测试项目",
  },
];

// 结果公开形式
export const resultOpenForm = [
  {
    value: "01",
    label: "排名",
  },
  {
    value: "02",
    label: "红绿灯",
  },
  {
    value: "03",
    label: "所有排名",
  },
];

// 货币单位倍数
export const currencyUnit = [
  {
    value: "RMB",
    label: "RMB",
  },
  {
    value: "USD",
    label: "USD",
  },
];

// 货币单位倍数
export const currencyUnitMultiples = [
  {
    value: "01",
    label: "元",
  },
  {
    value: "02",
    label: "千",
  },
  {
    value: "03",
    label: "万",
  },
  {
    value: "04",
    label: "百万",
  },
];

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
];

// 排名显示规则
export const rulesForm = {
  rankShowRule: "", //排名显示规则
};

// 排名显示规则
export const rankShowRule = [
  {
    value: "01",
    label: "显示本方排名",
  },
  {
    value: "02",
    label: "显示红绿灯（按名次区间定义）",
  },
  {
    value: "03",
    label: "显示红绿灯（按目标价偏离比例定义）",
  },
];
