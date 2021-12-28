import language from "@/utils/language";

// 不含可抵扣税
export const projectResultTableTitle = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', '排名'),
    key:'BIDDING_PAIMING'
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
    key:'BIDDING_BHKDKS'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO',"操作"),
    key:'BIDDING_CAOZUO'
  },
]

// 荷氏-不含可抵扣税
export const projectResultTableTitleHe = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
    key:'BIDDING_BHKDKS'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
]

// 荷氏-含税
export const projectResultTitleHe = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI','含税'),
    key:'BIDDING_HANSHUI'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
]

// 含税
export const projectResultTitle = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
    key:'BIDDING_PAIMING'
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI','含税'),
    key:'BIDDING_HANSHUI'
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
    key:'BIDDING_GYSMC'
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
    key:'BIDDING_BAOJIASHIJIAN'
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO',"操作"),
    key:'BIDDING_CAOZUO'
  },
]

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
