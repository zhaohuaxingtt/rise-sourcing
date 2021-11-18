/*
 * @Autor: Hao,Jiang
 * @Date: 2021-10-28 16:53:38
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-11-17 13:04:53
 * @Description: mtz
 */

export const tableTitle = [
  { props: "partNum", name: "新零件号", key: "XINLINGJIANHAO", tooltip: true},
  { props: "originPartNum", name: "原零件号", key: "YUANLINGJIANHAO", tooltip: true },
  { props: "supplierNameZh", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", tooltip: true },
  { props: "supplierSapCode", name: "供应商编码", key: "GONGYINGSHANGBIANMA", tooltip: true },
  { props: "materialCode", name: "原材料牌号", key: "YUANCAILIAOPAIHAO", tooltip: true },
  { props: "material", name: "原材料", key: "YUANCHAOLIAO", tooltip: true },
  { props: "price", name: "基价", key: "LK_JIJIA", tooltip: true },
  { props: "priceCountUnit", name: "基价计量单位", key: "LK_JIJIAJILIANGDANWEI", tooltip: true },
  { props: "originDosage", name: "原用量", key: "LK_YUANYONGLIANG", tooltip: true },
  { props: "dosageChange", name: "用量变化", key: "LK_YONGLIANGBIANHUA", tooltip: true, _headerRequiredRight: true},
  { props: "newDosage", name: "新用量", key: "LK_XINYONGLIANG", tooltip: true },
  { props: "dosageMeasureUnit", name: "用量计量单位", key: "LK_YONGLIANGJILIANGDANWEI", tooltip: true },
  { props: "newStartDate", name: "有效期起", key: "LK_XINYOUXIAOQIQI", tooltip: true, _headerRequiredRight: true, width: 140 },
  { props: "newEndDate", name: "有效期止", key: "LK_XINYOUXIAOQIZHI", tooltip: true, _headerRequiredRight: true, width: 140 },
  { props: "priceSource", name: "市场价来源", key: "LK_SHICHANGJIALAIYUAN", tooltip: true },
  { props: "compensationRatio", name: "补差系数", key: "LK_BUCHAXISHU", tooltip: true },
  { props: "threshold", name: "阈值", key: "LK_YUZHI", tooltip: true },
  { props: "thresholdCompensationLogic", name: "阈值补差逻辑", key: "LK_YUZHIBUCHALUOJI", tooltip: true },
  { props: "compensationPeriod", name: "补差周期", key: "LK_BUCHAZHOUQI", tooltip: true },
  { props: "ruleNo", name: "规则编号", key: "LK_GUIZEBIANHAO", tooltip: true },
]


export const mtzListtableTitle = [
  { props: "newPartNum", name: "新零件号", key: "XINLINGJIANHAO", tooltip: true},
  { props: "originPartNum", name: "原零件号", key: "YUANLINGJIANHAO", tooltip: true },
  { props: "supplierName", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", tooltip: true },
  { props: "supplierCode", name: "供应商编码", key: "GONGYINGSHANGBIANMA", tooltip: true },
  { props: "materialCode", name: "原材料牌号", key: "YUANCAILIAOPAIHAO", tooltip: true },
  { props: "material", name: "原材料", key: "YUANCHAOLIAO", tooltip: true },
  { props: "basicPrice", name: "基价", key: "LK_JIJIA", tooltip: true },
  { props: "basicPriceUnit", name: "基价计量单位", key: "LK_JIJIAJILIANGDANWEI", tooltip: true },
  { props: "originAmount", name: "原用量", key: "LK_YUANYONGLIANG", tooltip: true },
  { props: "amountDosage", name: "用量变化", key: "LK_YONGLIANGBIANHUA", tooltip: true, _headerRequiredRight: true},
  { props: "newAmount", name: "新用量", key: "LK_XINYONGLIANG", tooltip: true },
  { props: "amountUnit", name: "用量计量单位", key: "LK_YONGLIANGJILIANGDANWEI", tooltip: true },
  { props: "startDate", name: "有效期起", key: "LK_YOUXIAOQIQI", tooltip: true, _headerRequiredRight: true, width: 140 },
  { props: "endDate", name: "有效期止", key: "LK_YOUXIAOQIZHI", tooltip: true, _headerRequiredRight: true, width: 140 },
  { props: "marketPriceSource", name: "市场价来源", key: "LK_SHICHANGJIALAIYUAN", tooltip: true },
  { props: "sendersCoefficient", name: "补差系数", key: "LK_BUCHAXISHU", tooltip: true },
  { props: "thresholdValue", name: "阈值", key: "LK_YUZHI", tooltip: true },
  { props: "thresholdOffsetLogic", name: "阈值补差逻辑", key: "LK_YUZHIBUCHALUOJI", tooltip: true },
  { props: "sendersCycle", name: "补差周期", key: "LK_BUCHAZHOUQI", tooltip: true },
  { props: "ruleNumber", name: "规则编号", key: "LK_GUIZEBIANHAO", tooltip: true },
]