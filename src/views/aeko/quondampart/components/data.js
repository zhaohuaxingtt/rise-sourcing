/*
 * @Author: your name
 * @Date: 2021-07-27 10:49:28
 * @LastEditTime: 2021-07-30 14:34:58
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

export const ledgerQueryForm = {
  partNum: "",
  supplierSapCode: "",
  supplierName: "",
  factoryCode: ""
}

export const ledgerTableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true },
  { props: "partName", name: "零件名称", key: "LINGJIANMINGCHENG", tooltip: true },
  { props: "partType", name: "零件类型", key: "LINGJIANLEIXING", tooltip: true },
  { props: "supplierCode", name: "供应商编号", key: "GONGYINGSHANGBIANHAO", tooltip: true },
  { props: "supplierName", name: "供应商简称", key: "GONGYINGSHANGJIANCHENG", tooltip: true },
  { props: "aprice", name: "当前A价", key: "DANGQIANAJIA", tooltip: true },
  { props: "facadeName", name: "采购⼯⼚", key: "CAIGOUGONGCHANG", tooltip: true }
]

export const presentAllInPriceDialogTableTitle = [
  { props: "aprice", name: "A价", key: "AJIA", tooltip: true },
  { props: "currency", name: "货币", key: "HUOBI", tooltip: true },
  { props: "startTime", name: "起始时间", key: "QISHISHIJIAN", tooltip: true },
  { props: "endTime", name: "结束时间", key: "JIESHUSHIJIAN", tooltip: true },
  { props: "priceUnit", name: "价格单位", key: "JIAGEDANWEI", tooltip: true },
  { props: "measureUnit", name: "计量单位", key: "JILIANGDANWEI", tooltip: true },
  { props: "applyCode", name: "申请单号", key: "SHENQINGDANHAO", tooltip: true },
  { props: "linieName", name: "Linie", key: "LINIE", tooltip: true },
]