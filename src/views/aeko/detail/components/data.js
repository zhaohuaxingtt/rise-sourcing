/*
 * @Author: your name
 * @Date: 2021-07-26 16:46:49
 * @LastEditTime: 2021-07-28 17:48:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\components\data.js
 */
export const contentDeclareQueryForm = {
  partNum: "",
  supplierSapCode: "",
  cartypeProjectCode: [""],
  status: [""],
  isMtz: "",
  procureFactory: "",
  supplierNameZh: "",
  investCarTypePro: ""
}

export const contentDeclareTableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true },
  { props: "partNameZh", name: "零件名称", key: "LINGJIANMINGCHENG", tooltip: true },
  { props: "isReference", name: "相关表态", key: "XIANGGUANBIAOTAI", tooltip: true },
  { props: "status", name: "内容状态", key: "NEIRONGZHUANGTAI", tooltip: true },
  { props: "changeType", name: "变更类型", key: "BIANGENGLEIXING", tooltip: true },
  { props: "cartypeZh", name: "涉及⻋型/⻋型项⽬", key: "SHEJICHEXINGCHEXINGXIANGMU", tooltip: true, width: 130 },
  { props: "oldPartNumPreset", name: "原零件号", key: "YUANLINGJIANHAO", tooltip: true, width: 140 },
  { props: "oldPartNamePreset", name: "原零件名称", key: "YUANLINGJIANMINGCHENG", tooltip: true },
  { props: "factoryName", name: "采购⼯⼚", key: "CAIGOUGONGCHANG", tooltip: true },
  { props: "supplierSapCode", name: "供应商编号", key: "GONGYINGSHANGBIAOHAO", tooltip: true },
  { props: "supplierNameZh", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", tooltip: true },
  { props: "bpriceChange", name: "B价变动(含分摊)", key: "BJIABIANDONGHANFENTAN", tooltip: true, width: 110 },
  { props: "mouldPriceChange", name: "模具投资变动", key: "MUJUTOUZIBIANDONG", tooltip: true, width: 100 },
  { props: "dosage", name: "装⻋率/每⻋⽤量", key: "ZHUANGCHELVMEICHEYONGLIANG", tooltip: true, width: 120 },
  { props: "quotation", name: "报价单", key: "BAOJIADAN", tooltip: true },
  { props: "priceAxis", name: "价格轴", key: "JIAGEZHOU", tooltip: true },
  { props: "investCarTypePro", name: "指定投资⻋型项⽬", key: "ZHIDINGTOUZICHEXINGXIANGMU", tooltip: true, width: 150 },
  { props: "isMtz", name: "MTZ变更", key: "MTZBIANGENG", tooltip: true },
  { props: "oldBnkStatus", name: "原BNK状态", key: "YUANBNKZHUANGTAI", tooltip: true },
  { props: "newBnkStatus", name: "新BNK状态", key: "XINBNKZHUANGTAI", tooltip: true }
]

export const mtzOptions = [
  { key: 1, label: "是", value: 1 },
  { key: 0, label: "否", value: 0 }
]

export const isReferenceMap = {
  0: "无关",
  1: "相关"
}