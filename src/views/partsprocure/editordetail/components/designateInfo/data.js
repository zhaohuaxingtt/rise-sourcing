/*
 * @Author: Luoshuang
 * @Date: 2021-05-27 20:30:44
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 11:51:28
 * @Description: 
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\data.js
 */

export const tableTitle = [
  {props:'supplierCode',name:'厂商号', key: "", tooltip: true, width: 120},
  {props:'supplierNameCn',name:'供应商名(中)', key: "", tooltip: true, width: 120},
  {props:'nominateDate',name:'定点日期', key: "", tooltip: true, width: 120},
  {props:'proportion',name:'比例(%)', key: "", tooltip: true, width: 100},
  {props:'apriceNoModel',name:'A价', key: "", tooltip: true, width: 120},
  {props:'bpriceNoModel',name:'B价', key: "", tooltip: true},
  {props:'apriceModel',name:'含模A价', key: "", tooltip: true},
  {props:'bpriceModel',name:'含模B价', key: "", tooltip: true, width: 120},
  {props:'packPrice',name:'包装费', key: "", tooltip: true, width: 120},
  {props:'transportPrice',name:'运输费', key: "", tooltip: true, width: 120},
  {props:'operatePrice',name:'操作费', key: "", tooltip: true, width: 120},
  {props:'exchangeRate',name:'汇率', key: "", tooltip: true},
  {props:'tcCurrency',name:'货币', key: "", tooltip: true},
  {props:'moldPrice',name:'模具价格(不含税)', key: "", tooltip: true, width: 100},
  {props:'isMoldApportion',name:'是否模具分摊', key: "", tooltip: true, width: 100},
  {props:'moldApportionQuantity',name:'模具费分摊数量', key: "", tooltip: true, width: 100},
  {props:'moldApportionPrice',name:'模具费分摊金额', key: "", tooltip: true, width: 120},
  {props:'moldExchangeRate',name:'模具汇率', key: "", tooltip: true, width: 120},
  {props:'moldTcCurrency',name:'模具货币', key: "", tooltip: true, width: 120},
  {props:'priceStatus',name:'价格状态', key: "", tooltip: true, width: 120},
  {props:'startProduceDate',name:'起步生产时间', key: "", tooltip: true},
  {props:'developPrice',name:'开发费(不含税)', key: "", tooltip: true, width: 100},
  {props:'isDevelopApportion',name:'开发费是否分摊', key: "", tooltip: true, width: 120},
  {props:'developApportionQuantity',name:'开发费分摊数量', key: "", tooltip: true, width: 120},
  {props:'developApportionPrice',name:'开发费分摊金额', key: "", tooltip: true, width: 120},
  {props:'tpGrade',name:'技术评分', key: "", tooltip: true, width: 120},
  {props:'mqGrade',name:'质量评分', key: "", tooltip: true},
  {props:'plGrade',name:'物流评分', key: "", tooltip: true, width: 120},
  {props:'nomiState',name:'定点', key: "", tooltip: true, width: 120},
  {props:'nomiSource',name:'手动创建', key: "", tooltip: true},
]

export const fileTableTitle = [
  {props:'fileName',name:'文件名称', key: "LK_WENJIANMINGCHENG", tooltip: true},
  {props:'fileSize',name:'大小', key: "LK_WENJIANDAXIAO", tooltip: true},
  {props:'uploadDate',name:'上传日期', key: "LK_SHANGCHUANRIQI", tooltip: true},
  {props:'uploadBy',name:'上传人', key: "LK_SHANGCHUANREN", tooltip: true},
]