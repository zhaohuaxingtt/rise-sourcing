import language from "@/utils/language";

const isEmpty = (val) => !val && 0 !== val;
export const baseRules = ({ ruleForm: form, realTotalPrices }) => ({
  "biddingQuoteRule.limitValue": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
    {
      validator(rule, value, callback) {
        if (form.biddingQuoteRule.priceDiffLimit === "02") {
          let reg = /^100$|^([1-9]|[1-9]\d)$/;
          value && !reg.test(value)
            ? callback(new Error(language('BIDDING_BXDY0，BXXYDY100',"必须大于0，并且小于等于100")))
            : callback();
        } else {
          value === "0" || value >= realTotalPrices
            ? callback(new Error(language('BIDDING_JCCJBXDY0，BQXYQPJ',"基础差价必须大于0，并且小于起拍价")))
            : callback();
        }
        form.biddingQuoteRule.limitValue = value;
      },
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.quotationScope": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "biddingQuoteRule.quotedValue": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    {
      validator(rule, value, callback) {
        if (value > 0 && /^\d+$|^\d*\.\d{0,2}$/.test(value)) callback();
        else callback(new Error(rule.message));
      },
      message: language('BIDDING_BXDY0，QLWXS',"必须为大于0，且两位小数"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.alertPercentage": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    {
      validator(rule, value, callback) {
        if (value > 0 && value <= 2000 && /^\d+$|^\d*\.\d{0,2}$/.test(value))
          callback();
        else callback(new Error(rule.message));
      },
      message: language('BIDDING_BXDY0，XYDY2000，QLWXS',"必须为大于0，小于等于2000，且两位小数"),
      trigger: "blur",
    },
  ],
  /* "biddingQuoteRule.actualValue": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ], */
  "biddingQuoteRule.firstOfferLimit": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.conRankLimit": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.rankRule": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "biddingQuoteRule.greenLightFrom": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
    {
      validator(rule, value, callback) {
        const {
          greenLightFrom,
          greenLightTo,
          yellowLightFrom,
          yellowLightTo,
          redLightFrom,
          redLightTo,
        } = form.biddingQuoteRule;
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
          (existArea[1] &&
            Number(existArea[1][0]) !== Number(existArea[0][1]) + 1) ||
          (existArea[2] &&
            Number(existArea[2][0]) !== Number(existArea[1][1]) + 1)
        ) {
          return callback(new Error(rule.message)); // 下一区间开始值必须为上一区间截止值+1
        }
        callback();
      },
      message: language('BIDDING_PMQJPZCW',"排名区间配置错误"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.greenLightTo": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.yellowLightFrom": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.yellowLightTo": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.redLightFrom": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.redLightTo": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.greenDeviationValue": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
    { pattern: /^(\d|[1-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: "blur" },
    {
      validator(rule, value, callback) {
        const {
          greenDeviationValue,
          yellowDeviationValue,
          targetPrice
        } = form.biddingQuoteRule;
        if (targetPrice === null || targetPrice === undefined || targetPrice === '') {
          callback(new Error(rule.message))
        } else {
          greenDeviationValue ||
            0 === greenDeviationValue ||
            yellowDeviationValue ||
            0 === yellowDeviationValue
            ? callback()
            : callback(new Error(rule.message));
        }
      },
      message: language('BIDDING_QTXPLMBJ',"请填写偏离目标价"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.targetPrice":[{ required: true, message: language('BIDDING_QINGSHURU',"请输入"), trigger: "blur" }],
  "biddingQuoteRule.yellowDeviationValue": [
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
    { pattern: /^(\d|[1-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: "blur" },
    {
      validator(rule, value, callback) {
        const {
          greenDeviationValue,
          yellowDeviationValue,
        } = form.biddingQuoteRule;
        (greenDeviationValue ||
          0 === greenDeviationValue ||
          yellowDeviationValue ||
          0 === yellowDeviationValue) &&
          Number(value) <= Number(greenDeviationValue)
          ? callback(new Error(rule.message))
          : callback();
      },
      message: language('BIDDING_BNXYDYLD',"不能小于等于绿灯"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.rankDisplayLimit": [
    { required: true, message: language('BIDDING_BIXUAN','必选'), trigger: "blur" },
  ],
  "biddingQuoteRule.priceLimit": [
    // { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
  "biddingQuoteRule.rankLimit": [
    // { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
});

export const baseHeRules = (form) => ({
  "biddingQuoteRule.highestOffer": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    {
      validator(rule, value, callback) {
        const { amplitudeValue = '' } = form.biddingQuoteRule
        // if (value > 0 && /^\d+$|^\d*\.\d{0,2}$/.test(value)) callback();
        Number(value) > Number(amplitudeValue)
          ? callback()
          : callback(new Error(rule.message));
      },
      message: language('BIDDING_BXDYFDZ',"必须大于幅度值"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.amplitudeValue": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    { pattern: /^\+?[0-9]\d*$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
    {
      validator(rule, value, callback) {
        const { highestOffer = '' } = form.biddingQuoteRule;
        (Number(value) > Number(highestOffer))
          ? callback(new Error(rule.message))
          : callback();

      },
      message: language('BIDDING_BXXYZGBJ',"必须小于最高报价"),
      trigger: "blur",
    },
    {
      validator(rule, value, callback) {
        (Number(value) === 0)
          ? callback(new Error(rule.message))
          : callback();
      },
      message: language('BIDDING_BXWDY0',"必须为大于0"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.biddingInterval": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    { pattern: /^\+?[0-9]\d*$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
    {
      // pattern: /^([1-9]|[0-9][0-9]|600)$/,
      pattern: /^[5-9]{1}$|^[1-9]{1}[0-9]{1}$|^[1-5]{1}[0-9]{1}[0-9]{1}$|^600$/,
      message: language('BIDDING_ZNSR5-600M',"只能输入5-600秒"),
      trigger: "blur",
    },
  ],
  "biddingQuoteRule.autoPriceLimit": [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
  ],
});

//差价限制
export const priceDiffLimitSelectList = [
  { id: "01", name: language('BIDDING_JSCJ',"基数差价") },
  { id: "02", name: language('BIDDING_BFBCJ',"百分比差价") },
];

// 排名显示规则
export const rankDisplayRuleSelectList = [
  { id: "01", name: language('BIDDING_XSBFPM',"显示本方排名") },
  { id: "02", name: language('BIDDING_XSHLD(AMC QJDY)',"显示红绿灯(按名次 区间定义)") },
  { id: "03", name: language('BIDDING_XSHLD(AMBJ PL BL DY)',"显示红绿灯(按目标价 偏离 比例 定义)") },
];

//报价对象
export const priceDiffObjectSelectList = [
  { id: "01", name: language('BIDDING_ZIJI',"自己") },
];

// 单位
export const currencyMultipleLib = {
  "01": {
    beishu: 1,
    unit: language('BIDDING_YUAN',"元"),
  },
  "02": {
    beishu: 1000,
    unit: language('BIDDING_YUAN',"千"),
  },
  "03": {
    beishu: 10000,
    unit: language('BIDDING_YUAN',"万"),
  },
  "04": {
    beishu: 1000000,
    unit: language('BIDDING_YUAN',"百万"),
  }
}
