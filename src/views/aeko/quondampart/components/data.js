/*
 * @Author: your name
 * @Date: 2021-07-27 10:49:28
 * @LastEditTime: 2021-07-27 14:07:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\components\data.js
 */
export const navList = [
  {
    value: 1,
    name: "指定台账库原零件",
    message: 0,
    url: "/aeko/quondampart/ledger",
    activePath: "ledger",
    key: "ZHIDINGTAIZHANGKUYUANLINGJIAN"
  },
  {
    value: 2,
    name: "指定AEKO库原零件",
    message: 0,
    url: "/aeko/quondampart/aeko",
    activePath: "aeko",
    key: "ZHIDINGAEKOKUYUANLINGJIAN"
  },
]

export const ledgerTableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true },
  { props: "partNameZh", name: "零件名称", key: "LINGJIANMINGCHENG", tooltip: true },
  { props: "partType", name: "零件类型", key: "LINGJIANLEIXING", tooltip: true },
  { props: "supplierNo", name: "供应商编号", key: "GONGYINGSHANGBIANHAO", tooltip: true },
  { props: "supplierShortName", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", tooltip: true },
  { props: "currentAPrice", name: "当前A价", key: "DANGQIANAJIA", tooltip: true },
  { props: "factory", name: "采购⼯⼚", key: "CAIGOUGONGCHANG", tooltip: true }
]

export const presentAllInPriceDialogTableTitle = [
  { props: "a", name: "A价", key: "AJIA", tooltip: true },
  { props: "b", name: "货币", key: "HUOBI", tooltip: true },
  { props: "c", name: "起始时间", key: "QISHISHIJIAN", tooltip: true },
  { props: "d", name: "结束时间", key: "JIESHUSHIJIAN", tooltip: true },
  { props: "e", name: "价格单位", key: "JIAGEDANWEI", tooltip: true },
  { props: "f", name: "计量单位", key: "JILIANGDANWEI", tooltip: true },
  { props: "g", name: "申请单号", key: "SHENQINGDANHAO", tooltip: true },
  { props: "h", name: "Linie", key: "LINIE", tooltip: true },
]