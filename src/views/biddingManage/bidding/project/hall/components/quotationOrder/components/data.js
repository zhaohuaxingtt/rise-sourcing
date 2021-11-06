/* eslint-disable no-undef */
export const baseRules = {
  beginMonth: [
    { required: true, message: "必填", trigger: "blur" },
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
    name: "FSNR/GSNR",
  },
  {
    props: "productName",
    name: "产品名称",
  },
  {
    props: "productCode",
    name: "零件号",
  },
  {
    props: "purchaseQty",
    name: "采购数量",
  },
  {
    props: "quantityUnit",
    name: "数量单位",
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
    name: "起拍价格",
  },
  {
    props: "targetPrice",
    name: "目标价",
  },
  {
    props: "productParm",
    name: "产品参数",
  },

];

export const multiPleTableTitle = [
  {
    props: "fsnrGsnr",
    width: 100,
    name: "FSNR/GSNR",
  },
  {
    props: "productName",
    width: 230,
    name: "产品名称",
  },
  {
    props: "productCode",
    width: 120,
    name: "零件号",
  },
  {
    props: "factoryPrice",
    rule: [
      // { message: "必填", trigger: "blur" },
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "出厂价",
  },
  {
    props: "packingFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "前段包装费",
  },
  {
    props: "packingFee2",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "后段包装费",
  },
  {
    props: "transportFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "运输费",
  },
  {
    props: "operationFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "操作费",
  },
  {
    props: "bprice",
    name: "B价",
  },
  {
    props: "moldFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "模具费",
  },
  {
    props: "developFee",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "开发费",
  },
  {
    props: "targetPrice",
    rule: [
      {
        pattern: /^\d+$|^\d*\.\d*$/g,
        trigger: 'blur'
      }
    ],
    name: "目标价",
  },
  {
    props: "quantityUnit",
    rule: [
      { message: "必填", trigger: "change" },
    ],
    name: "数量单位",
  },
  {
    props: "lifecycle",
    name: "生命周期(周)",
  },
  {
    props: "aveAnnualOutput",
    name: "平均年产量",
  },
  {
    props: "maxAnnualOutput",
    name: "最大年产量",
  },
  {
    props: "caozuo",
    fixed: 'right',
    name: "操作",
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
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第一段",
  },
  {
    props: "stage2",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第二段",
  },
  {
    props: "stage3",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第三段",
  },
  {
    props: "stage4",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第四段",
  },
  {
    props: "stage5",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第五段",
  },
  {
    props: "stage6",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第六段",
  },
  {
    props: "stage7",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第七段",
  },
  {
    props: "stage8",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第八段",
  },
  {
    props: "stage9",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第九段",
  },
  {
    props: "stage10",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第十段",
  },
  {
    props: "stage11",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第十一段",
  },
  {
    props: "stage12",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第十二段",
  },
  {
    props: "stage13",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第十三段",
  },
  {
    props: "stage14",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第十四段",
  },
  {
    props: "stage15",
    rule: [
      { pattern: /^\d+$|^\d*\.\d{0,2}$/, message: "必须为正整数", trigger: ['blur', 'change'] },
      { pattern: /^(\d|[0-9]\d|\d*\.\d{0,2}|100)$/, message: "不能大于100", trigger: ['blur', 'change'] },
    ],
    name: "第十五段",
  },

];


