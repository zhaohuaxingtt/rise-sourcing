/* eslint-disable no-undef */
import language from "@/utils/language";

export const baseRules = {
  beginMonth: [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
  ],
};

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
export const unitTableTitle = [
  {
    props: "fsnrGsnr",
    name: language('BIDDING_FSNR/GSNR',"FSNR/GSNR"),
  },
  {
    props: "productName",
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
  },
  {
    props: "productCode",
    name: language('BIDDING_LINGJIANHAO',"零件号"),
  },
  {
    props: "purchaseQty",
    name: language('BIDDING_CAIGOUSHULIANG',"采购数量"),
  },
  {
    props: "quantityUnit",
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
  },
  {
    props: "upsetPrice",
    rule: [
      {
        require: true,
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_QIPAIJIAGE',"起拍价格"),
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "productParm",
    name: language('BIDDING_CHANPINCANSHU',"产品参数"),
  },

];

export const multiPleTableTitle = [
  {
    props: "fsnrGsnr",
    width: 100,
    name: language('BIDDING_FSNR/GSNR',"FSNR/GSNR"),
  },
  {
    props: "productName",
    width: 230,
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
  },
  {
    props: "productCode",
    width: 120,
    name: language('BIDDING_LINGJIANHAO',"零件号"),
  },
  {
    props: "factoryPrice",
    rule: [
      // { message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_CHUCHANJIA',"出厂价"),
  },
  {
    props: "packingFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "包装费",
  },
  
  {
    props: "transportFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_YUNSHUFEI',"运输费"),
  },
  {
    props: "operationFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_CAOZUOFEI',"操作费"),
  },
  {
    props: "bprice",
    name: language('BIDDING_BJIA',"B价"),
  },
  {
    props: "moldFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_MOJUFEI',"模具费"),
  },
  {
    props: "developFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_KAIFAFEI',"开发费"),
  },
  {
    props: "targetPrice",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "quantityUnit",
    rule: [
      { message: language('BIDDING_BITIAN','必填'), trigger: "change" },
    ],
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
  },
  {
    props: "lifecycle",
    name: language('BIDDING_SHENGMINGZHOUQIZHOU',"生命周期(周)"),
  },
  {
    props: "aveAnnualOutput",
    name: language('BIDDING_PINGJUNNIANCHANLIANG',"平均年产量"),
  },
  {
    props: "maxAnnualOutput",
    name: language('BIDDING_ZUIDANIANCHANLIANG',"最大年产量"),
  },
  {
    props: "caozuo",
    fixed: 'right',
    name: language('BIDDING_CAOZUO',"操作"),
  },

];

export const yearsPlanTableColumn = [
  {
    props: "title",
    name: "",
  },
  {
    props: "stage1",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI一DUAN',"第一段"),
  },
  {
    props: "stage2",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI二DUAN',"第二段"),
  },
  {
    props: "stage3",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI三DUAN',"第三段"),
  },
  {
    props: "stage4",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI四DUAN',"第四段"),
  },
  {
    props: "stage5",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI五DUAN',"第五段"),
  },
  {
    props: "stage6",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI六DUAN',"第六段"),
  },
  {
    props: "stage7",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI七DUAN',"第七段"),
  },
  {
    props: "stage8",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI八DUAN',"第八段"),
  },
  {
    props: "stage9",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI九DUAN',"第九段"),
  },
  {
    props: "stage10",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十DUAN',"第十段"),
  },
  {
    props: "stage11",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十一DUAN',"第十一段"),
  },
  {
    props: "stage12",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十二DUAN',"第十二段"),
  },
  {
    props: "stage13",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十三DUAN',"第十三段"),
  },
  {
    props: "stage14",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十四DUAN',"第十四段"),
  },
  {
    props: "stage15",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十五DUAN',"第十五段"),
  },

];

export const planBaseData = {
  title: '',
  stage1: '',
  stage2: '',
  stage3: '',
  stage4: '',
  stage5: '',
  stage6: '',
  stage7: '',
  stage8: '',
  stage9: '',
  stage10: '',
  stage11: '',
  stage12: '',
  stage13: '',
  stage14: '',
  stage15: '',
};
export const planBaseYear = {
  title: '',
  stage1: '',
  stage2: '',
  stage3: '',
  stage4: '',
  stage5: '',
  stage6: '',
  stage7: '',
  stage8: '',
  stage9: '',
};
export const stageColumn = [
  {
    props: "title",
    name: "",
  },
  {
    props: "stage1",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[1-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error("必须大于0，并且小于等于100,保留四位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第一段",
  },
  {
    props: "stage2",
    required: false,
    rule: [
    ],
    name: "第二段",
  },
  {
    props: "stage3",
    required: false,
    rule: [
    ],
    name: "第三段",
  },
  {
    props: "stage4",
    required: false,
    rule: [
    ],
    name: "第四段",
  },
  {
    props: "stage5",
    required: false,
    rule: [
    ],
    name: "第五段",
  },
  {
    props: "stage6",
    required: false,
    rule: [
    ],
    name: "第六段",
  },
  {
    props: "stage7",
    required: false,
    rule: [
    ],
    name: "第七段",
  },
  {
    props: "stage8",
    required: false,
    rule: [
    ],
    name: "第八段",
  },
  {
    props: "stage9",
    required: false,
    rule: [
    ],
    name: "第九段",
  },
]

export const outPutColumn = [
  {
    props: "title",
    name: "",
  },
  {
    props: "stage1",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第一年",
  },
  {
    props: "stage2",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第二年",
  },
  {
    props: "stage3",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第三年",
  },
  {
    props: "stage4",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第四年",
  },
  {
    props: "stage5",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第五年",
  },
  {
    props: "stage6",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第六年",
  },
  {
    props: "stage7",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第七年",
  },
  {
    props: "stage8",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第八年",
  },
  {
    props: "stage9",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第九年",
  },
  {
    props: "stage10",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第十年",
  },
  {
    props: "stage11",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第十一年",
  },
  {
    props: "stage12",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第十二年",
  },
  {
    props: "stage13",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第十三年",
  },
  {
    props: "stage14",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第十四年",
  },
  {
    props: "stage15",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error("保留两位小数"))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: "第十五年",
  },
]