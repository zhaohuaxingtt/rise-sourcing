/* eslint-disable no-undef */
/*
 * @Author: moxuan
 * @Date: 2021-05-21 20:08:08
 * @Description: 初步评级
 */
import language from "@/utils/language";

export const unitTableTitle = [
  {
    props: "FSNR",
    name: language('BIDDING_FSNR/GSNR',"FSNR/GSNR"),
  },
  {
    props: "productName",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    ],
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
  },
  {
    props: "productCode",
    name: language('BIDDING_CHANPINBIANHAO',"产品编号"),
  },
  {
    props: "purchaseQty",
    required: true,
    rule: [
      { type: "number", required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
      {
        validator(rule, value, callback) {
          if (value > 0 && /^\d+$/.test(value)) callback();
          else callback(new Error(rule.message))
        },
        message: language('BIDDING_BXDY0','必须大于0'),
        trigger: 'blur',
      }
    ],
    name: language('BIDDING_CAIGOUSHULIANG',"采购数量"),
  },
  {
    props: "quantityUnit",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    ],
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
  },
  {
    props: "upsetPrice",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        required: true,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_QIPAIJIAGE',"起拍价格"),
  },
  {
    props: "targetPrice",
    required: true,
    rule: [
      // {  required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        // required: true,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "productParm",
    rule: [
      { pattern: /^.{0,20}$/, trigger: "blur" },
    ],
    name: language('BIDDING_CHANPINCANSHU',"产品参数"),
  },

];
export const totalTableTitle = [
  {
    props: "FSNR",
    name: language('BIDDING_FSNR/GSNR',"FSNR/GSNR"),
  },
  {
    props: "productName",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    ],
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
  },
  {
    props: "productCode",
    name: language('BIDDING_CHANPINBIANHAO',"产品编号"),
  },
  {
    props: "purchaseQty",
    required: true,
    rule: [
      { type: "number", required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      { pattern: /^\d+$/, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: "blur" },
      {
        validator(rule, value, callback) {
          if (value > 0 && /^\d+$/.test(value)) callback();
          else callback(new Error(rule.message))
        },
        message: language('BIDDING_BXDY0','必须大于0'),
        trigger: 'blur',
      }
    ],
    name: language('BIDDING_CAIGOUSHULIANG',"采购数量"),
  },
  {
    props: "quantityUnit",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    ],
    name: language('BIDDING_SHULIANGDANWEI',"数量单位"),
  },
  {
    props: "upsetPrice",
    name: language('BIDDING_QIPAIJIAGE',"起拍价格"),
  },
  {
    props: "targetPrice",
    required: true,
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "productParm",
    rule: [
      { pattern: /^\d+$/, trigger: "blur" },
    ],
    name: language('BIDDING_CHANPINCANSHU',"产品参数"),
  }
];


export const baseRules = {
  beginMonth: [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
  ],
  modelProjects: [{ type: 'array', required: true, message: i18n.t('必选'), trigger: "change" }],
  models: [{ type: 'array', required: true, message: i18n.t('必选'), trigger: "change" }],
  // totalPrices: [
  // { rule: [{ pattern: /^[\d]{0,10}(\.[\d]{0,6})?$|^(\d|[1-9]\d)(\.\d+)*$/, trigger: 'blur' }], required: true, message: "起始总价范围是0~9999999999.999999", trigger: "blur" },
  // ],
  totalPrices: [
    { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    {
      validator(rule, value, callback) {
        if (value && value > 0 && /^[\d]{0,15}(\.[\d]{0,2})?$/.test(value)) callback();
        else callback(new Error(rule.message))
      },
      message: language('BIDDING_QSZJFWS0~999999999999999.99','起始总价范围是0~999999999999999.99'),
      trigger: 'blur',
    }
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
export const multiPleTableTitle = [
  {
    props: "fsnrGsnr",
    name: language('BIDDING_FSNR/GSNR',"FSNR/GSNR"),
  },
  {
    props: "productName",
    required: true,
    width: 220,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
    ],
    name: language('BIDDING_CHANPINMINGCHENG',"产品名称"),
  },
  {
    props: "productCode",
    required: true,
    width: 120,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "change" },
    ],
    name: language('BIDDING_LINGJIANHAO',"零件号"),
  },
  {
    props: "factoryPrice",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        required: true,
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
    name: language('BIDDING_QIANDUANBAOZHUANGFEI',"前段包装费"),
  },
  {
    props: "packingFee2",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_HOUDUANBAOZHUANGFEI',"后段包装费"),
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
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        required: true,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_KAIFAFEI',"开发费"),
  },
  {
    props: "targetPrice",
    rule: [
      // { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        // required: true,
        trigger: 'blur'
      }
    ],
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "quantityUnit",
    required: true,
    rule: [
      { required: true, message: language('BIDDING_BITIAN','必填'), trigger: "change" },
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
    width: 50,
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

export const procurementPlanTableColumn = [
  {
    props: "title",
    name: "",
  },
  {
    props: "stage1",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI一DUAN',"第一段"),
  },
  {
    props: "stage2",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI二DUAN',"第二段"),
  },
  {
    props: "stage3",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI三DUAN',"第三段"),
  },
  {
    props: "stage4",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI四DUAN',"第四段"),
  },
  {
    props: "stage5",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI五DUAN',"第五段"),
  },
  {
    props: "stage6",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI六DUAN',"第六段"),
  },
  {
    props: "stage7",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI七DUAN',"第七段"),
  },
  {
    props: "stage8",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI八DUAN',"第八段"),
  },
  {
    props: "stage9",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI九DUAN',"第九段"),
  },
  {
    props: "stage10",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十DUAN',"第十段"),
  },
  {
    props: "stage11",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十一DUAN',"第十一段"),
  },
  {
    props: "stage12",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十二DUAN',"第十二段"),
  },
  {
    props: "stage13",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十三DUAN',"第十三段"),
  },
  {
    props: "stage14",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十四DUAN',"第十四段"),
  },
  {
    props: "stage15",
    required: true,
    rule: [
      { pattern: /^\d+$/, required: true, message: language('BIDDING_BXWZZS',"必须为正整数"), trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|100)$/, message: language('BIDDING_BNDY100',"不能大于100"), trigger: ['blur', 'change'] },
    ],
    name: language('BIDDING_DI十五DUAN',"第十五段"),
  },

];
export const planBaseData = {
  title: '',
  stage1: 0,
  stage2: 0,
  stage3: 0,
  stage4: 0,
  stage5: 0,
  stage6: 0,
  stage7: 0,
  stage8: 0,
  stage9: 0,
  stage10: 0,
  stage11: 0,
  stage12: 0,
  stage13: 0,
  stage14: 0,
  stage15: 0,
};

export const rfqinfoProduct = [
  {
    fsnrGsnr:'FS21-11796',
    productName:'支撑板',
    productCode:'2GG821135A'
  },
  {
    fsnrGsnr:'FS21-11790',
    productName:'支撑板',
    productCode:'2GG821135A'
  },
  {
    fsnrGsnr:'FS21-11789',
    productName:'支撑板',
    productCode:'2GG821136A'
  },
  {
    fsnrGsnr:'FS21-11795',
    productName:'支撑板',
    productCode:'2GG821136A'
  },
  {
    fsnrGsnr:'FS21-11788',
    productName:'支架焊接总成',
    productCode:'2GG821167A'
  },
  {
    fsnrGsnr:'FS21-11794',
    productName:'支架焊接总成',
    productCode:'2GG821167A'
  },
  {
    fsnrGsnr:'FS21-11791',
    productName:'支架焊接总成',
    productCode:'2GG821168A'
  },
  {
    fsnrGsnr:'FS21-11793',
    productName:'支架焊接总成',
    productCode:'2GG821168A'
  },
  {
    fsnrGsnr:'FS21-11787',
    productName:'锁加强板总成',
    productCode:'2GG827173A'
  },
  {
    fsnrGsnr:'FS21-11792',
    productName:'锁加强板总成',
    productCode:'2GG827173A'
  },
]