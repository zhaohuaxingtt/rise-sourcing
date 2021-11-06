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
    name: "出厂价",
  },
  {
    props: "packingFee",
    name: "前段包装费",
  },
  {
    props: "packingFee2",
    name: "后段包装费",
  },
  {
    props: "transportFee",
    name: "运输费",
  },
  {
    props: "operationFee",
    name: "操作费",
  },
  {
    props: "bprice",
    name: "B价",
  },
  {
    props: "moldFee",
    name: "模具费",
  },
  {
    props: "developFee",
    name: "开发费",
  },
  {
    props: "targetPrice",
    name: "目标价",
  },
  {
    props: "quantityUnit",
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
    name: "第一段",
  },
  {
    props: "stage2",
    name: "第二段",
  },
  {
    props: "stage3",
    name: "第三段",
  },
  {
    props: "stage4",
    name: "第四段",
  },
  {
    props: "stage5",
    name: "第五段",
  },
  {
    props: "stage6",
    name: "第六段",
  },
  {
    props: "stage7",
    name: "第七段",
  },
  {
    props: "stage8",
    name: "第八段",
  },
  {
    props: "stage9",
    name: "第九段",
  },
  {
    props: "stage10",
    name: "第十段",
  },
  {
    props: "stage11",
    name: "第十一段",
  },
  {
    props: "stage12",
    name: "第十二段",
  },
  {
    props: "stage13",
    name: "第十三段",
  },
  {
    props: "stage14",
    name: "第十四段",
  },
  {
    props: "stage15",
    name: "第十五段",
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