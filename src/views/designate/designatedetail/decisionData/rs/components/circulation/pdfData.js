/*
 * @Author: YoHo
 * @Date: 2022-03-29 22:37:36
 * @LastEditTime: 2022-03-31 00:25:23
 * @LastEditors: YoHo
 * @Description: 
 */
// 生产
export const nomalTableTitleSub = [
  { props: 'fsnrGsnrNum', name: 'FS号', key: '', minWidth: 95, fixed: true },
  { props: 'partNo', name: '零件号', key: '', minWidth: 76, fixed: true },
  { props: 'partNum', name: '原零件号', key: '', minWidth: 76 }, // 12/24 业务说取partNum
  { props: 'oldAPrice', name: '原A价', key: '', minWidth: 49 },
  { props: 'partName', name: '零件名称', key: '', minWidth: 67 },
  { props: 'unit', name: '零件', subItem:['单位'], key: '', minWidth: 33 },
  { props: 'tpDep', name: 'E-line', key: '', minWidth: 48 },
  { props: 'zp', name: 'ZP属性', key: '', minWidth: 49 },
  { props: 'project', name: '项目名称', key: '', minWidth: 61 },
  { props: 'svwCode', name: '厂商', subItem:['号'], key: '', minWidth: 33 },
  { props: 'supplierName', name: '供应商名称', key: '', minWidth: 80 },
  { props: 'prodLocation', name: '产地', key: '', minWidth: 57 },
  { props: 'cfTargetAPrice', name: '财务目', subItem:['标A价'], key: '', minWidth: 57 },
  { props: 'cfTargetBPrice', name: '财务目', subItem:['标B价'], key: '', minWidth: 57 },
  // { props: 'rw', name: '欧价', key: '', minWidth: 54 },
  { props: 'status', name: '状态', key: '', minWidth: 38 },
  { props: 'aprice', name: 'A价', key: '', minWidth: 57 },
  { props: 'bprice', name: 'B价', key: '', minWidth: 57 },
  { props: 'packPrice', name: '包装费', key: '', minWidth: 47 },
  { props: 'transportPrice', name: '运输费', key: '', minWidth: 47 },
  { props: 'operatePrice', name: '操作费', key: '', minWidth: 47 },
  { props: 'investFee', name: '投资费', subItem:['(不含税)'], key: '', minWidth: 56 },
  { props: 'share', name: '份额(%)', key: '', minWidth: 53 },
  { props: 'ltc', name:'年降', key: '', minWidth: 48 },
  { props: 'beginYearReduce', name: '年降开', subItem:['始时间'], key: '', minWidth: 62 },
  { props: 'demand', name: '年需', subItem:['求(K)'], key: '', minWidth: 46 },
  { props: 'output', name: '年产', subItem:['能(K)'], key: '', minWidth: 46 },
  { props: 'turnover', name: '采购金额', key: '', minWidth: 86 },
  { props: 'remarks', name: '备注', key: '', minWidth: 200 },
]

// 附件列表
export const accessoryTableTitle = [
  {props:'fsnrGsnrNum',name:'SP No.', key: "", minWidth: 60},
  // {props:'supplierNo',name:'Series Part No.', key: "", minWidth: 60},
  {props:'partNum',name:'Accessory Part No.', key: "", minWidth: 120},
  {props:'partName',name:'Accessory Part Name', key: "", minWidth: 130},
  {props:'carLine',name:'Carline', key: "", minWidth: 85},
  {props:'supplierSapCode',name:'Code', key: "", minWidth: 80},
  {props:'supplierName',name:'Supplier',  key: "", minWidth: 80},
  {props:'prodLocation',name:'Prod.Location',  key: "", minWidth: 100},
  {props:'demand',name:'Demand(K)',  key: "", minWidth: 80},
  {props:'bprice',name:'B Price', key: "", minWidth: 80},
  {props:'cfTargetBPrice',name:'CF B Price',  key: "", minWidth: 90},
  {props:'originalPrice',name:'Old B Price',  key: "", minWidth: 95},
  {props:'marketRetailPrice',name:'Sales Price', key: "", minWidth: 95},
  // {props:'f',name:'Series B Price', key: "", minWidth: 95},
  {props:'quotationSopDate',name:'Price Start Date', key: "", minWidth: 120},
  {props:'turnover',name:'Turnover(K)', key: "", minWidth: 80},
  {props:'share',name:'Share(%)', key: "", minWidth: 90},
  {props:'ltc',name:'LTC', key: "", minWidth: 120},
  {props:'beginYearReduce',name:'Start Time of LTC', key: "", minWidth: 120},
  {props:'g',name:'Remark', key: "", minWidth: 65}
]

// 配件列表
export const sparePartTableTitle = [
  {props:'supplier',name:'SP No.', key: "", minWidth: 60},
  {props:'assemblyPartNum',name:'Series Part No.', key: "", minWidth: 120},
  {props:'partNum',name:'Spare Part No.', key: "", minWidth: 120},
  {props:'partName',name:'Spare Part Name', key: "", minWidth: 120},
  {props:'carLine',name:'Carline', key: "", minWidth: 60},
  {props:'supplierSapCode',name:'Code', key: "", minWidth: 60},
  {props:'supplierName',name:'Supplier',  key: "", minWidth: 120},
  {props:'prodLocation',name:'Prod.Location',  key: "", minWidth: 120},
  {props:'demand',name:'Demand(K)', key: "", minWidth: 80},
  {props:'bprice',name:'B Price',  key: "", minWidth: 90},
  {props:'cfTargetBPrice',name:'CF B Price',  key: "", minWidth: 90},
  {props:'originalPrice',name:'Old Price', key: "", minWidth: 90},
  {props:'assemblyBprice',name:'Series Price', key: "", minWidth: 90},
  {props:'quotationSopDate',name:'Price Start Date', key: "", minWidth: 120},
  {props:'turnover',name:'Turnover(K)', key: "", minWidth: 80},
  {props:'share',name:'Share(%)', key: "", minWidth: 90},
  {props:'ltc',name:'LTC', key: "", minWidth: 90},
  {props:'beginYearReduce',name:'Start Time of LTC', key: "", minWidth: 120},
  {props:'g',name:'Remark', key: "", minWidth: 80},
]