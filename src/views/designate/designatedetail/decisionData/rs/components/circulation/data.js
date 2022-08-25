/*
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:50:41
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-29 14:50:50
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\circulation\data.js
 */
export const fileTableTitle = [
  {props: 'fileName', name: '文件名', key: 'WENJIANMING'},
  {props: 'uploadDate', name: '上传日期', key: 'SHANGCHUANRIQI'},
  {props: 'uploadBy', name: '上传人', key: 'SHANGCHUANREN'},
]
export const nomalDetailTitle = [
  {props: 'partName', name: '零件名称', enName: 'Part Name'},
  {props: 'partNo', name: '零件号', enName: 'Part-No'},
  {props: 'fsnrGsnrNum', name: 'FS号', enName: 'FS-No'},
  {props: 'rfqDocDate', name: '询价资料日期', enName: 'RFQ Doc. Date'},
  {props: 'fsBuyer', name: '前期采购员', enName: 'FS'},
  {props: 'project', name: '项目', enName: 'Project'},
  {props: 'buyer', name: '采购员', enName: 'Buyer'},
  {props: 'sop', name: '投产时间', enName: 'SOP'},
  {props: 'epen', name: '工程师', enName: 'EP/EN'},
  {props: 'carTypeName', name: '车型', enName: 'Car Type Name'},
  {props: 'lifeTime', name: '生命周期', enName: 'Lifetime'}
]

export const nomalDetailTitleBlue = [
  [
    {props: 'currency', name: '货币', enName: 'Currency'},
    {props: 'unit', name: '单位', enName: 'Unit'},
  ],
  {props: 'mtz', name: '原材料补差', enName: 'MTZ'},
  {props: 'materialGroup', name: '材料组', enName: 'Material Group'},
  {props: 'rawMaterial', name: '原材料', enName: 'Raw Material'},
  {props: 'plannedInvest', name: '计划投资', enName: 'Planned Invest'},
  {props: 'setPrice', name: '设定价格', enName: 'Set Price'},
  {props: 'emtermin', name: '送样EM周期', enName: 'EM-Termin'},
  {props: 'quantity', name: '每车用量', enName: 'Quantity'},
  {props: 'vffTbt', name: 'VFF时间', enName: 'VFF TBT'},
  {props: 'pvsTbt', name: 'PVS时间', enName: 'PVS TBT'}
]

export const infos = [
  { props: 'partProjectTypeDesc', name: '零件类型' },
  { props: 'buyer', name: '询价采购员' },
  { props: 'linieName', name: '专业采购员' },
  { props: 'currency', name: '货币单位' },
  { props: 'exchange', name: '汇率' },
  { props: 'nominateAppId', name: '申请单号' },
  // { props: 'nominateAppTime', name: '申请时间' }
]

// 生产
export const nomalTableTitle = [
  { props: 'fsnrGsnrNum', name: 'FS号', key: '', minWidth: 95, fixed: true },
  { props: 'partNo', name: '零件号', key: '', minWidth: 95, fixed: true },
  { props: 'partNum', name: '原零件号', key: '', minWidth: 95 }, // 12/24 业务说取partNum
  { props: 'oldAPrice', name: '原A价', key: '', minWidth: 100 },
  { props: 'partName', name: '零件名称', key: '', minWidth: 110 },
  { props: 'unit', name: '零件单位', key: '', minWidth: 82 },
  { props: 'tpDep', name: 'E-line', key: '', minWidth: 64 },
  { props: 'zp', name: 'ZP属性', key: '', minWidth: 68 },
  { props: 'project', name: '项目名称', key: '', minWidth: 95 },
  { props: 'svwCode', name: '厂商号', key: '', minWidth: 70 },
  { props: 'supplierName', name: '供应商名称', key: '', minWidth: 110 },
  { props: 'prodLocation', name: '产地', key: '', minWidth: 70 },
  { props: 'cfTargetAPrice', name: '财务目标A价', key: '', minWidth: 106 },
  { props: 'cfTargetBPrice', name: '财务目标B价', key: '', minWidth: 106 },
  // { props: 'rw', name: '欧价', key: '', minWidth: 54 },
  { props: 'status', name: '状态', key: '', minWidth: 66 },
  { props: 'aprice', name: 'A价', key: '', minWidth: 100 },
  { props: 'bprice', name: 'B价', key: '', minWidth: 100 },
  { props: 'packPrice', name: '包装费', key: '', minWidth: 70 },
  { props: 'transportPrice', name: '运输费', key: '', minWidth: 70 },
  { props: 'operatePrice', name: '操作费', key: '', minWidth: 70 },
  { props: 'investFee', name: '投资费(不含税)', key: '', minWidth: 134 },
  { props: 'share', name: '份额(%)', key: '', minWidth: 70 },
  { props: 'ltc', name:'年降', key: '', minWidth: 100 },
  { props: 'beginYearReduce', name: '年降开始时间', key: '', minWidth: 120 },
  { props: 'demand', name: '年需求(K)', key: '', minWidth: 90 },
  { props: 'output', name: '年产能(K)', key: '', minWidth: 90 },
  { props: 'turnover', name: '采购金额', key: '', minWidth: 115 },
  { props: 'remarks', name: '备注', key: '', minWidth: 200 },
]
// 生产
export const nomalTableTitleSub = [
  { props: 'fsnrGsnrNum', name: 'FS号', key: '', minWidth: 95, fixed: true },
  { props: 'partNo', name: '零件号', key: '', minWidth: 76, fixed: true },
  { props: 'partNum', name: '原零件号', key: '', minWidth: 70 }, // 12/24 业务说取partNum
  { props: 'oldAPrice', name: '原A价', key: '', minWidth: 49 },
  { props: 'partName', name: '零件名称', key: '', minWidth: 67 },
  { props: 'unit', name: '零件', subItem:['单位'], key: '', minWidth: 33 },
  { props: 'tpDep', name: 'E-line', key: '', minWidth: 48 },
  { props: 'zp', name: 'ZP属性', key: '', minWidth: 49 },
  { props: 'project', name: '项目名称', key: '', minWidth: 61 },
  { props: 'svwCode', name: '厂商号', key: '', minWidth: 33 },
  { props: 'supplierName', name: '供应商名称', key: '', minWidth: 72 },
  { props: 'prodLocation', name: '产地', key: '', minWidth: 57 },
  { props: 'cfTargetAPrice', name: '财务目标A价', key: '', minWidth: 57 },
  { props: 'cfTargetBPrice', name: '财务目标B价', key: '', minWidth: 57 },
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
  { props: 'demand', name: '年需求(K)', key: '', minWidth: 50 },
  { props: 'output', name: '年产能(K)', key: '', minWidth: 50 },
  { props: 'turnover', name: '采购金额', key: '', minWidth: 86 },
  { props: 'remarks', name: '备注', key: '', minWidth: 120 },
]
// export const nomalTableTitle = [
//   {props:'fsnrGsnrNum',name:'FS No.', key: "", minWidth: 110},
//   {props:'partNo',name:'Part No.', key: "", minWidth: 95},
//   {props:'partNum',name:'Old Part No.', key: "", minWidth: 95}, // 12/24 业务说取partNum
//   // {props:'oldPartNum',name:'Old Part No.', key: "", minWidth: 95}, // oldPartNo => partNo
//   {props:'oldAPrice',name:'Old A Price', key: "", minWidth: 85},
//   {props:'partName',name:'Part Name', key: "", minWidth: 85},
//   {props:'unit',name:'Unit', key: "", minWidth: 45},
//   {props:'tpDep',name:'TP Dep.',  key: "", minWidth: 75},
//   {props:'zp',name:'ZP',  key: "", minWidth: 50},
//   {props:'project',name:'Project',  key: "", minWidth: 100},
//   {props:'svwCode',name:'Supplier No.', key: "", minWidth: 90},
//   {props:'supplierName',name:'Supplier Name',  key: "", minWidth: 110},
//   {props:'prodLocation',name:'Location',  key: "", minWidth: 80},
//   {props:'cfTargetAPrice',name:'CF A Price', key: "", minWidth: 80},
//   {props:'cfTargetBPrice',name:'CF B Price', key: "", minWidth: 80},
//   {props:'rw',name:'RW', key: "", minWidth: 55},
//   {props:'partProjectTypeDesc',name:'Type', key: "", minWidth: 70},
//   {props:'aprice',name:'A Price', key: "", minWidth: 60},
//   {props:'bprice',name:'B Price', key: "", minWidth: 60},
//   {props:'packPrice',name:'Packing', key: "", minWidth: 70},
//   {props:'transportPrice',name:'Transportation', key: "", minWidth: 105},
//   {props:'operatePrice',name:'Operation', key: "", minWidth: 85},
//   {props:'investFee',name:'Invest(no tax)', key: "", minWidth: 100},
//   {props:'share',name:'Share(%)', key: "", minWidth: 75},
//   {props:'ltc',name:'LTC', key: "", minWidth: 100},
//   {props:'beginYearReduce',name:'LTC Date', key: "", minWidth: 100},
//   {props:'demand',name:'Annual Demand(K)', key: "", minWidth: 125},
//   {props:'output',name:'Annual Capa.(K)', key: "", minWidth: 110},
//   {props:'turnover',name:'Purchase Price', key: "", minWidth: 110},
//   {props:'g',name:'Notes', key: "", minWidth: 80},
// ]

// 附件列表
export const accessoryTableTitle = [
  {props:'fsnrGsnrNum',name:'SP号', key: "", minWidth: 95, fixed: true },
  // {props:'supplierNo',name:'Series Part No.', key: "", minWidth: 60},
  {props:'partNum',name:'附件零件号', key: "", minWidth: 120, fixed: true },
  {props:'partName',name:'附件零件名称', key: "", minWidth: 110},
  {props:'carTypeName',name:'车型', key: "", minWidth: 85},
  {props:'svwCode',name:'厂商号', key: "", minWidth: 70},
  {props:'supplierName',name:'供应商名称',  key: "", minWidth: 110},
  {props:'prodLocation',name:'产地',  key: "", minWidth: 70},
  {props:'demand',name:'年需求量(K)',  key: "", minWidth: 90},
  {props:'bprice',name:'附件价格', key: "", minWidth: 100},
  {props:'cfTargetBPrice',name:'CF目标价',  key: "", minWidth: 100},
  {props:'originalPrice',name:'原附件价格',  key: "", minWidth: 110},
  {props:'salesPrice',name:'附件销售价格', key: "", minWidth: 120},
  {props:'assemblyBprice',name:'批量零件价格', key: "", minWidth: 120},
  {props:'quotationSopDate',name:'价格起始日', key: "", minWidth: 120},
  {props:'turnover',name:'年采购金额', key: "", minWidth: 115},
  {props:'share',name:'份额(%)', key: "", minWidth: 70},
  {props:'ltc',name:'年降', key: "", minWidth: 100},
  {props:'beginYearReduce',name:'年降开始时间', key: "", minWidth: 120},
  {props:'remarks',name:'备注', key: "", minWidth: 200}
]
// export const accessoryTableTitle = [
//   {props:'fsnrGsnrNum',name:'SP No.', key: "", minWidth: 120},
//   // {props:'supplierNo',name:'Series Part No.', key: "", minWidth: 60},
//   {props:'partNum',name:'Accessory Part No.', key: "", minWidth: 120},
//   {props:'partName',name:'Accessory Part Name', key: "", minWidth: 120},
//   {props:'carLine',name:'Carline', key: "", minWidth: 85},
//   {props:'supplierSapCode',name:'Code', key: "", minWidth: 80},
//   {props:'supplierName',name:'Supplier',  key: "", minWidth: 80},
//   {props:'prodLocation',name:'Prod.Location',  key: "", minWidth: 100},
//   {props:'demand',name:'Demand(K)',  key: "", minWidth: 80},
//   {props:'bprice',name:'B Price', key: "", minWidth: 80},
//   {props:'cfTargetBPrice',name:'CF B Price',  key: "", minWidth: 90},
//   {props:'originalPrice',name:'Old B Price',  key: "", minWidth: 95},
//   {props:'marketRetailPrice',name:'Sales Price', key: "", minWidth: 95},
//   // {props:'f',name:'Series B Price', key: "", minWidth: 95},
//   {props:'quotationSopDate',name:'Price Start Date', key: "", minWidth: 120},
//   {props:'turnover',name:'Turnover(K)', key: "", minWidth: 45},
//   {props:'share',name:'Share(%)', key: "", minWidth: 90},
//   {props:'ltc',name:'LTC', key: "", minWidth: 120},
//   {props:'beginYearReduce',name:'Start Time of LTC', key: "", minWidth: 120},
//   {props:'g',name:'Remark', key: "", minWidth: 65}
// ]

// 配件列表
export const sparePartTableTitle = [
  {props:'fsnrGsnrNum',name:'SP编号', key: "", minWidth: 95, fixed: true },
  {props:'assemblyPartNum',name:'批量零件号', key: "", minWidth: 120, fixed: true},
  {props:'partNum',name:'配件零件号', key: "", minWidth: 120, fixed: true},
  {props:'partName',name:'配件零件名称', key: "", minWidth: 110},
  {props:'carTypeName',name:'车型', key: "", minWidth: 85},
  {props:'svwCode',name:'厂商号', key: "", minWidth: 70},
  {props:'supplierName',name:'供应商名称',  key: "", minWidth: 110},
  {props:'prodLocation',name:'产地',  key: "", minWidth: 70},
  {props:'demand',name:'年需求量(K)', key: "", minWidth: 90},
  {props:'bprice',name:'配件价格',  key: "", minWidth: 100},
  {props:'cfTargetBPrice',name:'CF目标价',  key: "", minWidth: 120},
  {props:'originalPrice',name:'原配件价格', key: "", minWidth: 120},
  {props:'assemblyBprice',name:'批量零件价格', key: "", minWidth: 120},
  {props:'quotationSopDate',name:'价格起始日', key: "", minWidth: 120},
  {props:'turnover',name:'年采购金额', key: "", minWidth: 115},
  {props:'share',name:'份额(%)', key: "", minWidth: 70},
  {props:'ltc',name:'年降', key: "", minWidth: 100},
  {props:'beginYearReduce',name:'年降开始时间', key: "", minWidth: 120},
  {props:'remarks',name:'备注', key: "", minWidth: 200},
]
// export const sparePartTableTitle = [
//   {props:'supplier',name:'SP No.', key: "", minWidth: 100},
//   {props:'assemblyPartNum',name:'Series Part No.', key: "", minWidth: 120},
//   {props:'partNum',name:'Spare Part No.', key: "", minWidth: 100},
//   {props:'partName',name:'Spare Part Name', key: "", minWidth: 120},
//   {props:'carLine',name:'Carline', key: "", minWidth: 85},
//   {props:'supplierSapCode',name:'Code', key: "", minWidth: 120},
//   {props:'supplierName',name:'Supplier',  key: "", minWidth: 120},
//   {props:'prodLocation',name:'Prod.Location',  key: "", minWidth: 120},
//   {props:'demand',name:'Demand(K)', key: "", minWidth: 80},
//   {props:'bprice',name:'B Price',  key: "", minWidth: 90},
//   {props:'cfTargetBPrice',name:'CF B Price',  key: "", minWidth: 120},
//   {props:'originalPrice',name:'Old Price', key: "", minWidth: 120},
//   {props:'assemblyBprice',name:'Series Price', key: "", minWidth: 120},
//   {props:'quotationSopDate',name:'Price Start Date', key: "", minWidth: 120},
//   {props:'turnover',name:'Turnover(K)', key: "", minWidth: 45},
//   {props:'share',name:'Share(%)', key: "", minWidth: 90},
//   {props:'ltc',name:'LTC', key: "", minWidth: 120},
//   {props:'beginYearReduce',name:'Start Time of LTC', key: "", minWidth: 120},
//   {props:'g',name:'Remark', key: "", minWidth: 80},
// ]

export const gsTableTitle = [
  { props: 'fsnrGsnrNum', name: 'GS号', key: "", minWidth: 100, fixed: true },
  { props: 'partNo', name: '零件号', key: '', minWidth: 95, fixed: true },
  { props: 'status', name: '供货状态', key: '', minWidth: 90 },
  { props: 'partName', name: '零件名称', key: '', minWidth: 110 },
  { props: 'unit', name: '零件单位', key: '', minWidth: 82 },
  { props: 'carTypeName', name: '车型', key: '', minWidth: 70 },
  { props: 'svwCode', name: '厂商号', key: '', minWidth: 70 },
  { props: 'supplierName', name: '供应商名称', key: '', minWidth: 110 },
  { props: 'prodLocation', name: '产地', key: '', minWidth: 70 },
  { props: 'presentPrice', name: '现供B价', key: '', minWidth: 120 },
  // { props: 'rw', name: '欧价', key: '', minWidth: 54 },
  { props: 'aprice', name: 'A价', key: '', minWidth: 100 },
  { props: 'bprice', name: 'B价', key: '', minWidth: 100 },
  { props: 'packPrice', name: '包装费', key: '', minWidth: 70 },
  { props: 'transportPrice', name: '运输费', key: '', minWidth: 70 },
  { props: 'operatePrice', name: '操作费', key: '', minWidth: 70 },
  { props: 'investFee', name: '投资费(不含税)', key: '', minWidth: 134 },
  { props: 'addFee', name: '认可费', key: '', minWidth: 100 },
  { props: 'share', name: '份额(%)', key: '', minWidth: 70 },
  { props: 'ltc', name:'年降', key: '', minWidth: 100 },
  { props: 'beginYearReduce', name: '年降开始时间', key: '', minWidth: 120 },
  { props: 'savingFee', name: '节约值', key: '', minWidth: 115 },
  { props: 'turnover', name: '采购金额', key: '', minWidth: 115 },
  { props: 'remarks', name: '备注', key: '', minWidth: 200 },
]

export const meetingRemark = [
  {label: '询价采购员上会备注', value: 'ww'},
  {label: 'LINIE上会备注', value: 'xxx'},
  {label: 'CS*1上会备注', value: 'ttt'}
]

export const checkList = [
  {department: 'TL', date: '2020-01-01', status: '1'},
  {department: 'MSQ', date: '2020-01-01', status: '1'},
  {department: 'CFD', date: '2020-01-01', status: '1'},
  {department: 'CSE', date: '2020-01-01', status: '0'},
  {department: 'CSF', date: '2020-01-01', status: '2'},
  {department: 'TPN', date: '2020-01-01', status: '1'},
  {department: 'CS', date: '2020-01-01', status: '1'}
]

export const dateFilter = (val, format = "YYYY-MM-DD HH:mm:ss", sourceFormat) => {
  return typeof val === 'string' ||  typeof val === 'number' ? (val ? window.moment(val, sourceFormat).format(format) : '') : val
}