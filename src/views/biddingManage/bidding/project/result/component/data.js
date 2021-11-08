import language from "@/utils/language";

// 不含可抵扣税
export const projectResultTableTitle = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', '排名'),
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO',"操作"),
  },
]

// 荷氏-不含可抵扣税
export const projectResultTableTitleHe = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "isTax",
    name: language('BIDDING_BHKDKS', '不含可抵扣税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
]

// 荷氏-含税
export const projectResultTitleHe = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI','含税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
]

// 含税
export const projectResultTitle = [
  {
    props: "currentSort",
    name: language('BIDDING_PAIMING', "排名"),
  },
  {
    props: "isTax",
    name: language('BIDDING_HANSHUI','含税'),
  },
  {
    props: "supplierName",
    name: language('BIDDING_GYSMC', "供应商名称"),
  },
  {
    props: "serverTime",
    name: language('BIDDING_BAOJIASHIJIAN', "报价时间"),
  },
  {
    props: "operation",
    name: language('BIDDING_CAOZUO',"操作"),
  },
]

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