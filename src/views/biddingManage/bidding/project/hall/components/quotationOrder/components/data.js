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

export const unitTableTitle = [
  {
    props: "fsnrGsnr",
    name: language('BIDDING_FSGSSPNO',"FS/GS/SP No."),
    key:'BIDDING_FSGSSPNO'
  },
  {
    props: "productName",
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
    key:'BIDDING_CHANPINMINGCHENG'
  },
  {
    props: "productCode",
    name: language('BIDDING_LINGJIANHAO',"零件号"),
    key:'BIDDING_LINGJIANHAO'
  },
  {
    props: "purchaseQty",
    name: language('BIDDING_CAIGOUSHULIANG',"采购数量"),
    key:'BIDDING_CAIGOUSHULIANG'
  },
  {
    props: "quantityUnit",
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
    key:'BIDDING_SHULIANGDANWEI'
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
    key:'BIDDING_QIPAIJIAGE'
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
    key:'BIDDING_MUBIAOJIA'
  },
  {
    props: "productParm",
    name: language('BIDDING_CHANPINCANSHU',"产品参数"),
    key:'BIDDING_CHANPINCANSHU'
  },

];

export const multiPleTableTitle = [
  {
    props: "fsnrGsnr",
    width: 100,
    name: language('BIDDING_FSGSSPNO',"FS/GS/SP No."),
    key:'BIDDING_FSGSSPNO'
  },
  {
    props: "productName",
    width: 230,
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
    key:'BIDDING_CHANPINMINGCHENG'
  },
  {
    props: "productCode",
    width: 120,
    name: language('BIDDING_LINGJIANHAO',"零件号"),
    key:'BIDDING_LINGJIANHAO'
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
    key:'BIDDING_CHUCHANJIA'
  },
  {
    props: "packingFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_BAOZHUANGFEI',"包装费"),
    key:'BIDDING_BAOZHUANGFEI'
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
    key:'BIDDING_YUNSHUFEI'
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
    key:'BIDDING_CAOZUOFEI'
  },
  {
    props: "bprice",
    name: language('BIDDING_BJIA',"B价"),
    key:'BIDDING_BJIA'
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
    key:'BIDDING_MOJUFEI'
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
    key:'BIDDING_KAIFAFEI'
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
    key:'BIDDING_MUBIAOJIA'
  },
  {
    props: "quantityUnit",
    rule: [
      { message: language('BIDDING_BITIAN','必填'), trigger: "change" },
    ],
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
    key:'BIDDING_SHULIANGDANWEI'
  },
  {
    props: "lifecycle",
    name: language('BIDDING_SHENGMINGZHOUQIZHOU',"生命周期(周)"),
    key:'BIDDING_SHENGMINGZHOUQIZHOU'
  },
  {
    props: "aveAnnualOutput",
    name: language('BIDDING_PINGJUNNIANCHANLIANG',"平均年产量"),
    key:'BIDDING_PINGJUNNIANCHANLIANG'
  },
  {
    props: "maxAnnualOutput",
    name: language('BIDDING_ZUIDANIANCHANLIANG',"最大年产量"),
    key:'BIDDING_ZUIDANIANCHANLIANG'
  },
  {
    props: "caozuo",
    fixed: 'right',
    name: language('BIDDING_CAOZUO',"操作"),
    key:'BIDDING_CAOZUO'
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
    key:'BIDDING_DI一DUAN'
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
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI一DUAN',"第一段"),
    key:'BIDDING_DI一DUAN'
  },
  {
    props: "stage2",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI二DUAN',"第二段"),
    key:'BIDDING_DI二DUAN'
  },
  {
    props: "stage3",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI三DUAN',"第三段"),
    key:'BIDDING_DI三DUAN'
  },
  {
    props: "stage4",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI四DUAN',"第四段"),
    key:'BIDDING_DI四DUAN'
  },
  {
    props: "stage5",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI五DUAN',"第五段"),
    key:'BIDDING_DI五DUAN'
  },
  {
    props: "stage6",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI六DUAN',"第六段"),
    key:'BIDDING_DI六DUAN'
  },
  {
    props: "stage7",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI七DUAN',"第七段"),
    key:'BIDDING_DI七DUAN'
  },
  {
    props: "stage8",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI八DUAN',"第八段"),
    key:'BIDDING_DI八DUAN'
  },
  {
    props: "stage9",
    required: false,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        validator(rule, value, callback) {
          let reg = /^100$|^[0-9]\d{0,1}$|^[1-9]\d{0,1}\.{1}\d{1,4}$|^0\.{1}\d{1,4}$/g;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BXDY0BQXYDY100BLSWXS',"必须大于0，并且小于等于100,保留四位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI九DUAN',"第九段"),
    key:'BIDDING_DI九DUAN'
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
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI一NIAN',"第一年"),
    key:'BIDDING_DI一NIAN'
  },
  {
    props: "stage2",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI二NIAN',"第二年"),
    key:'BIDDING_DI二NIAN'
  },
  {
    props: "stage3",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI三NIAN',"第三年"),
    key:'BIDDING_DI三NIAN'
  },
  {
    props: "stage4",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI四NIAN',"第四年"),
    key:'BIDDING_DI四NIAN'
  },
  {
    props: "stage5",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI五NIAN',"第五年"),
    key:'BIDDING_DI五NIAN'
  },
  {
    props: "stage6",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI六NIAN',"第六年"),
    key:'BIDDING_DI六NIAN'
  },
  {
    props: "stage7",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI七NIAN',"第七年"),
    key:'BIDDING_DI七NIAN'
  },
  {
    props: "stage8",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI八NIAN',"第八年"),
    key:'BIDDING_DI八NIAN'
  },
  {
    props: "stage9",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI九NIAN',"第九年"),
    key:'BIDDING_DI九NIAN'
  },
  {
    props: "stage10",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI九NIAN',"第十年"),
    key:'BIDDING_DI九NIAN'
  },
  {
    props: "stage11",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI十一NIAN',"第十一年"),
    key:'BIDDING_DI十一NIAN'
  },
  {
    props: "stage12",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI十二NIAN',"第十二年"),
    key:'BIDDING_DI十二NIAN'
  },
  {
    props: "stage13",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI十三NIAN',"第十三年"),
    key:'BIDDING_DI十三NIAN'
  },
  {
    props: "stage14",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI十四NIAN',"第十四年"),
    key:'BIDDING_DI十四NIAN'
  },
  {
    props: "stage15",
    required: false,
    rule: [
      {
        validator(rule, value, callback) {
          let reg = /^([0-9]+[\d]*(.[0-9]{1,2})?)$/;
            value && !reg.test(value)
              ? callback(new Error(language('BIDDING_BLLWXS',"保留两位小数")))
              : callback();
        },
        trigger: ['blur', 'change'],
      },
    ],
    name: language('BIDDING_DI十五NIAN',"第十五年"),
    key:'BIDDING_DI十五NIAN'
  },
]