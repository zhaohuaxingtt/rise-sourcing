/*
 * @Author: Luoshuang
 * @Date: 2021-05-27 20:30:44
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-07 09:30:19
 * @Description: 
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\data.js
 */

export const tableTitle = [
  {props:'supplierCode',name:'厂商号', key: "CHANGSHANGHAO", tooltip: true, width: 120},
  {props:'supplierNameCn',name:'供应商名(中)', key: "GONGYINGSHANGMING_ZH", tooltip: true, width: 120},
  {props:'nominateDate',name:'定点日期', key: "DINGDIANRIQI", tooltip: true, width: 120},
  {props:'share',name:'比例(%)', key: "BILI", tooltip: true, width: 100},
  {props:'apriceNoModel',name:'A价', key: "AJIA", tooltip: true, width: 120},
  {props:'bpriceNoModel',name:'B价', key: "BJIA", tooltip: true},
  {props:'apriceModel',name:'含模A价', key: "HANMOAJIA", tooltip: true},
  {props:'bpriceModel',name:'含模B价', key: "HANMOBJIA", tooltip: true, width: 120},
  {props:'packPrice',name:'包装费', key: "BAOZHUANGFEI", tooltip: true, width: 120},
  {props:'transportPrice',name:'运输费', key: "YUNSHUFEI", tooltip: true, width: 120},
  {props:'operatePrice',name:'操作费', key: "CAOZUOFEI", tooltip: true, width: 120},
  {props:'exchangeRate',name:'汇率', key: "HUILV", tooltip: true},
  {props:'currency',name:'货币', key: "HUOBI", tooltip: true},
  {props:'moldPrice',name:'模具价格(不含税)', key: "MOJUJIAGE_BUHANSHUI", tooltip: true, width: 100},
  {props:'isMoldApportion',name:'是否模具分摊', key: "SHIFOUMOJUFENTAN", tooltip: true, width: 100},
  {props:'moldApportionQuantity',name:'模具费分摊数量', key: "MOJUFENTANSHULIANG", tooltip: true, width: 100},
  {props:'moldApportionPrice',name:'模具费分摊金额', key: "MOJUFENTANJINE", tooltip: true, width: 120},
  {props:'moldExchangeRate',name:'模具汇率', key: "MOJUHUILV", tooltip: true, width: 120},
  {props:'moldTcCurrency',name:'模具货币', key: "MOJUHUOBI", tooltip: true, width: 120},
  {props:'priceStatus',name:'价格状态', key: "JIAGEZHUANGTAI", tooltip: true, width: 120},
  {props:'startProduceDate',name:'起步生产时间', key: "QIBUSHENGCHANSHIJIAN", tooltip: true},
  {props:'developPrice',name:'开发费(不含税)', key: "KAIFAFEI_BUHANSHUI", tooltip: true, width: 100},
  {props:'isDevelopApportion',name:'开发费是否分摊', key: "KAIFAFEISHIFOUFENTAN", tooltip: true, width: 120},
  {props:'developApportionQuantity',name:'开发费分摊数量', key: "KAIFAFEIFENTANSHULIANG", tooltip: true, width: 120},
  {props:'developApportionPrice',name:'开发费分摊金额', key: "KAIFAFEIFENTANJINE", tooltip: true, width: 120},
  {props:'tpGrade',name:'技术评分', key: "JISHUPINGFEN", tooltip: true, width: 120},
  {props:'mqGrade',name:'质量评分', key: "ZHILIANGPINGFEN", tooltip: true},
  {props:'plGrade',name:'物流评分', key: "WULIUPINGFEN", tooltip: true, width: 120},
  {props:'nomiState',name:'定点', key: "DINGDIAN", tooltip: true, width: 120},
  {props:'nomiSource',name:'手动创建', key: "SHOUDONGCHUANGJIAN", tooltip: true},
]

export const fileTableTitle = [
  {props:'fileName',name:'文件名称', key: "WENJIANMINGCHENG", tooltip: true},
  {props:'fileSize',name:'大小', key: "DAXIAO", tooltip: true},
  {props:'uploadDate',name:'上传日期', key: "SHANGCHUANRIQI", tooltip: true},
  {props:'uploadBy',name:'上传人', key: "SHANGCHUANREN", tooltip: true},
]