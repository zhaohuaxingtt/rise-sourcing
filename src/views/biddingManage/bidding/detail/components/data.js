import language from "@/utils/language";

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
    name: language('BIDDING_CHUCHANJIA',"出厂价"),
  },
  {
    props: "packingFee",
    name: language('BIDDING_QIANDUANBAOZHUANGFEI',"前段包装费"),
  },
  {
    props: "packingFee2",
    name: language('BIDDING_HOUDUANBAOZHUANGFEI',"后段包装费"),
  },
  {
    props: "transportFee",
    name: language('BIDDING_YUNSHUFEI',"运输费"),
  },
  {
    props: "operationFee",
    name: language('BIDDING_CAOZUOFEI',"操作费"),
  },
  {
    props: "bprice",
    name: language('BIDDING_BJIA',"B价"),
  },
  {
    props: "moldFee",
    name: language('BIDDING_MOJUFEI',"模具费"),
  },
  {
    props: "developFee",
    name: language('BIDDING_KAIFAFEI',"开发费"),
  },
  {
    props: "targetPrice",
    name: language('BIDDING_MUBIAOJIA',"目标价"),
  },
  {
    props: "quantityUnit",
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
    name: language('BIDDING_DI一DUAN',"第一段"),
  },
  {
    props: "stage2",
    name: language('BIDDING_DI二DUAN',"第二段"),
  },
  {
    props: "stage3",
    name: language('BIDDING_DI三DUAN',"第三段"),
  },
  {
    props: "stage4",
    name: language('BIDDING_DI四DUAN',"第四段"),
  },
  {
    props: "stage5",
    name: language('BIDDING_DI五DUAN',"第五段"),
  },
  {
    props: "stage6",
    name: language('BIDDING_DI六DUAN',"第六段"),
  },
  {
    props: "stage7",
    name: language('BIDDING_DI七DUAN',"第七段"),
  },
  {
    props: "stage8",
    name: language('BIDDING_DI八DUAN',"第八段"),
  },
  {
    props: "stage9",
    name: language('BIDDING_DI九DUAN',"第九段"),
  },
  {
    props: "stage10",
    name: language('BIDDING_DI十DUAN',"第十段"),
  },
  {
    props: "stage11",
    name: language('BIDDING_DI十一DUAN',"第十一段"),
  },
  {
    props: "stage12",
    name: language('BIDDING_DI十二DUAN',"第十二段"),
  },
  {
    props: "stage13",
    name: language('BIDDING_DI十三DUAN',"第十三段"),
  },
  {
    props: "stage14",
    name: language('BIDDING_DI十四DUAN',"第十四段"),
  },
  {
    props: "stage15",
    name: language('BIDDING_DI十五DUAN',"第十五段"),
  },

];

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