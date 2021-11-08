import language from "@/utils/language";

export const RFQTurnList = [
  // { value: "01", label: "普通询价" },
  { value: "02", label: language('BIDDING_ZAIXIANKAIBIAO','在线开标') },
  { value: "03", label: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式') },
]

export const procureTypeList = [
  { value: "01", label: language('BIDDING_SHENGCHANCAIGOU','生产采购') },
  { value: "02", label: language('BIDDING_YIBANCAIGOU','一般采购') },
]

export const manualBiddingTypeList = [
  {
    name: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式'),
    manualBiddingType: "01",
  },
  {
    name: language('BIDDING_ZAIXIANJINGJIA_HESHI','在线竞价-荷式'),
    manualBiddingType: "02",
  },
]

