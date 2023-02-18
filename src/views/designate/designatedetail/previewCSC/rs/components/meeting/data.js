/*
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:50:41
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-18 23:37:27
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\meeting\data.js
 */

export const leftTitle = [
  {props: 'partProjectTypeDesc', name: '零件采购项目类型', enName: 'Project Type'},
  {props: 'carTypeName', name: '车型', enName: 'Carline'},
  {props: 'rfqDocDate', name: '询价资料日期', enName: 'RFQ Doc. Date'},
  {props: 'project', name: '项目', enName: 'Project'},
  {props: 'linieName', name: '专业采购员', enName: 'Linie'},
  {props: 'sop', name: '投产时间', enName: 'SOP'},
  {props: 'epen', name: '工程师', enName: 'EP/EN'},
  {props: 'lifeTime', name: '生命周期', enName: 'Lifetime'},
  // {props: 'partName', name: '零件名称', enName: 'Part Name'},
  // {props: 'partNo', name: '零件号', enName: 'Part No'},
  // {props: 'buyer', name: '询价采购员', enName: 'sourcing'},
  // {props: 'rfqId', name: 'RFQ号', enName: 'RFQ-No.'},
]
export const rightTitle = [
  {props: 'currency', name: '货币', enName: 'Currency'},
  {props: 'unit', name: '单位', enName: 'Unit'},
  {props: 'emtermin', name: '送样EM周期', enName: 'EM-Termin'},
  {props: 'mtz', name: '原材料补差', enName: 'MTZ'},
  {props: 'vffTbt', name: 'VFF时间', enName: 'VFF TBT'},
  {props: 'materialGroup', name: '材料组', enName: 'Material Group'},
  {props: 'pvsTbt', name: 'PVS时间', enName: 'PVS TBT'},
  {props: 'plannedInvest', name: '计划投资', enName: ''},
]

export const RSTableTitle = [
  {props:'fsnrGsnrNum',name:'FS No.',enName: '(Plant)', minWidth:84, fixed: true},
  {props:'demand',name:'年需求', enName: 'Demand', enName1:'(K)', minWidth:74, fixed: true},
  {props:'output',name:'年产能', enName: 'Capa.', enName1:'(K)',minWidth:74, fixed: true},
  {props:'partNo',name:'零件号', enName: 'Part No.',minWidth:64, fixed: true},
  {props:'partName',name:'零件名称', enName: 'Part Name',minWidth:76},
  {props:'logNorm',name:'综合每车用量', enName: 'Mixed Qty',minWidth:74},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', minWidth:74},
  {props:'svwCode',name:'厂商', enName: 'Code', minWidth:48},
  {props:'supplierName',name:'供应商', enName: 'Supplier', minWidth:125},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', minWidth:88},
  {props:'share',name:'份额', enName: 'Share', enName1:'(%)', minWidth:60},
  {props:'cfTargetAPrice',name:'财务目标A价', enName: 'F-T(A)', minWidth:80},
  {props:'cfTargetBPrice',name:'财务目标B价', enName: 'F-T(B)', minWidth:80},
  {props:'status',name:'状态', enName: 'Status', minWidth:50},
  {props:'aprice',name:'A价', enName: 'A Price', minWidth: 80},
  {props:'bprice',name:'B价', enName: 'B Price', minWidth: 80},
  {props:'ltc',name:'年降', enName: 'LTC', minWidth: 50},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', minWidth: 96},
  {props:'investFee',name:'投资费', enName: 'Invest', minWidth: 70},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', minWidth: 90},
  {props:'turnover',name:'采购金额', enName: 'Turnover', minWidth: 100},
]
export const briefTableTitle = [
  {props:'fsnrGsnrNum',name:'FS No.',enName: '(Plant)', minWidth:84},
  {props:'partNo',name:'零件号', enName: 'Part Information',minWidth:64},
  {props:'supplierName',name:'供应商', enName: 'Supplier Information', minWidth:125},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', minWidth:88},
  {props:'share',name:'份额', enName: 'Share', enName1:'(%)', minWidth:60},
  {props:'cfTargetAPrice',name:'财务目标A/B价', enName: 'F-T A/BPrice', minWidth:80},
  {props:'status',name:'状态', enName: 'Status', minWidth:50},
  {props:'aprice',name:'A/B价', enName: 'A/B Price', minWidth: 80},
  {props:'ltc',name:'年降', enName: 'LTC', minWidth: 50},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', minWidth: 96},
  {props:'investFee',name:'投资费', enName: 'Invest', minWidth: 70},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', minWidth: 90},
  {props:'turnover',name:'采购金额', enName: 'Turnover', minWidth: 100},
]
export const nomalDetailTitle = [
  {props: 'partName', name: '零件名称', enName: 'Part Name', key:'LINGJIANMINGCHENG'},
  {props: 'partNo', name: '零件号', enName: 'Part-No', key: 'LINGJIANHAO'},
  {props: 'fsnrGsnrNum', name: 'FS号', enName: 'FS-No', key: 'FSNO'},
  {props: 'rfqDocDate', name: '询价资料日期', enName: 'RFQ Doc. Date', key: 'XUNJIAZILIAORIQI'},
  {props: 'buyer', name: '询价采购员', enName: 'Sourcing', key: 'XUNJIACAIGOUYUAN'},
  {props: 'project', name: '项目', enName: 'Project', key: 'XIANGMU'},
  {props: 'linieName', name: '专业采购员', enName: 'Linie', key: 'ZHUANYECAIGOUYUAN'},
  {props: 'sop', name: '投产时间', enName: 'SOP', key: 'TOUCHANSHIJIAN'},
  {props: 'epen', name: '工程师', enName: 'FOP', key: 'GONGCHENGSHI'},
  {props: 'carTypeName', name: '车型', enName: 'Car Type Name', key: 'CHEXING'},
  {props: 'lifeTime', name: '生命周期', enName: 'Lifetime', key: 'SHENGMINGZHOUQI'},
  {props: 'partProjectTypeDesc', name: '零件采购项目类型\n', enName: 'Part Project Type', key: 'LINGJIANCAIGOUXIANGMULEIXING'}

]

// GS
export const nomalDetailTitleGS = [
  { props: 'partName', name: '零件名称', enName: 'Part Name', key:'LINGJIANMINGCHENG'},
  {props: 'partNo', name: '零件号', enName: 'Part-No', key: 'LINGJIANHAO'},
  {props: 'fsnrGsnrNum', name: 'GS号', enName: 'GS-No', key: 'FSNO'},
  {props: 'rfqDocDate', name: '询价资料日期', enName: 'RFQ Doc. Date', key: 'XUNJIAZILIAORIQI'},
  {props: 'buyer', name: '询价采购员', enName: 'Sourcing', key: 'XUNJIACAIGOUYUAN'},
  {props: 'project', name: '项目', enName: 'Project', key: 'XIANGMU'},
  {props: 'linieName', name: '专业采购员', enName: 'Linie', key: 'ZHUANYECAIGOUYUAN'},
  {props: 'sop', name: '投产时间', enName: 'SOP', key: 'TOUCHANSHIJIAN'},
  {props: 'epen', name: '工程师', enName: 'FOP', key: 'GONGCHENGSHI'},
  {props: 'carTypeName', name: '车型', enName: 'Car Type Name', key: 'CHEXING'},
  {props: 'lifeTime', name: '生命周期', enName: 'Lifetime', key: 'SHENGMINGZHOUQI'},
  {props: 'partProjectTypeDesc', name: '零件采购项目类型\n', enName: 'Part Project Type', key: 'LINGJIANCAIGOUXIANGMULEIXING'}

]

export const nomalDetailTitlePF = [
  {props: 'partName', name: '零件名称', enName: 'Part Name', key:'LINGJIANMINGCHENG'},
  {props: 'partNo', name: '零件号', enName: 'Part-No', key: 'LINGJIANHAO'},
  {props: 'fsnrGsnrNum', name: 'SP号', enName: 'SP-No', key: 'FSNO'},
  {props: 'rfqDocDate', name: '询价资料日期', enName: 'RFQ Doc. Date', key: 'XUNJIAZILIAORIQI'},
  {props: 'buyer', name: '询价采购员', enName: 'Sourcing', key: 'XUNJIACAIGOUYUAN'},
  {props: 'project', name: '项目', enName: 'Project', key: 'XIANGMU'},
  {props: 'linieName', name: '专业采购员', enName: 'Linie', key: 'ZHUANYECAIGOUYUAN'},
  {props: 'sop', name: '投产时间', enName: 'SOP', key: 'TOUCHANSHIJIAN'},
  {props: 'epen', name: '工程师', enName: 'FOP', key: 'GONGCHENGSHI'},
  {props: 'carTypeName', name: '车型', enName: 'Car Type Name', key: 'CHEXING'},
  {props: 'lifeTime', name: '生命周期', enName: 'Lifetime', key: 'SHENGMINGZHOUQI'},
  {props: 'partProjectTypeDesc', name: '零件采购项目类型\n', enName: 'Part Project Type', key: 'LINGJIANCAIGOUXIANGMULEIXING'}

]


// GS
export const nomalDetailTitleBlue = [
  [
    {props: 'currency', name: '货币', enName: 'Currency', key: 'HUOBI'},
    {props: 'unit', name: '单位', enName: 'Unit', key: 'DANWEI'},
  ],
  {props: 'mtz', name: '原材料补差', enName: 'MTZ', key: 'YUANCAILIAOBUCHA'},
  {props: 'materialGroup', name: '材料组', enName: 'Material Group', key: 'CAILIAOZU'},
  {props: 'rawMaterial', name: '原材料', enName: 'Raw Material', key: 'YUANCAILIAO'},
  {props: 'suppliersNow', name: '现供应商', enName: 'Current Supplier', key:'XIANGONGYINGSHANG'},
  {props: 'setPrice', name: '设定价格', enName: 'Set Price', key:'SHEDINGJIAGE'},
  {props: 'isApportion', name: '分摊', enName: 'Amrtisiert', key: 'FENTAN'},
  {props: 'quantityNull', name: '每车用量', enName: 'Quantity', key: 'MEICHEYONGLIANG'} // 2022/5/31 CRW-9040 每车用量置空不取值
]

export const gsDetailTitleBlue = [
  [
    {props: 'currency', name: '货币', enName: 'Currency', key: 'HUOBI'},
    {props: 'unit', name: '单位', enName: 'Unit', key: 'DANWEI'},
  ],
  {props: 'mtz', name: '原材料补差', enName: 'MTZ', key: ''},
  {props: 'materialGroup', name: '材料组', enName: 'Material Group'},
  {props: 'rawMaterial', name: '原材料', enName: 'Raw Material'},
  {props: 'plannedInvest', name: '计划投资', enName: 'Planned Invest'},
  {props: 'setPrice', name: '设定价格', enName: 'Set Price'},
  {props: 'emtermin', name: '送样EM周期', enName: 'EM-Termin'},
  {props: 'quantityNull', name: '每车用量', enName: 'Quantity'}, // 2022/5/31 CRW-9040 每车用量置空不取值
  {props: 'vffTbt', name: 'VFF时间', enName: 'VFF TBT'},
  {props: 'pvsTbt', name: 'PVS时间', enName: 'PVS TBT'}
]


export const nomalTableTitle = [
  {props:'fsnrGsnrNum',name:'FS No.',enName: '(Plant)', minWidth:100},
  {props:'demand',name:'年需求', enName: 'Demand', enName1:'(K)', minWidth:80},
  {props:'output',name:'年产能', enName: 'Capa.', enName1:'(K)',minWidth:65},
  {props:'partNo',name:'零件号', enName: 'Part No.',width:110},
  {props:'partName',name:'零件名称', enName: 'Part Name',width:100},
  {props:'mixQty',name:'综合每车用量', enName: 'Mixed Qty',width:90},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', width:70},
  {props:'svwCode',name:'厂商', enName: 'Code', width:48},
  {props:'supplierName',name:'供应商', enName: 'Supplier', minWidth:125},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', minWidth:100},
  {props:'share',name:'份额', enName: 'Share', enName1:'(%)', minWidth:65},
  {props:'cfTargetAPrice',name:'财务目标A价', enName: 'F-T(A)', minWidth:85},
  {props:'cfTargetBPrice',name:'财务目标B价', enName: 'F-T(B)', minWidth:85},
  {props:'status',name:'状态', enName: 'Status', minWidth:50},
  {props:'aprice',name:'A价', enName: 'A Price', minWidth: 70},
  {props:'bprice',name:'B价', enName: 'B Price', minWidth: 70},
  {props:'ltc',name:'年降', enName: 'LTC', minWidth: 48},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', minWidth: 105},
  {props:'investFee',name:'投资费', enName: 'Invest', minWidth: 60},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', minWidth: 95},
  {props:'turnover',name:'采购金额', enName: 'Turnover', minWidth: 88},

  // {props:'fsnrGsnrNum',enName: 'FS-NO.', key: "",minWidth:84, fixed: true},
  // {props:'demand',name:'年需求', enName: 'Demand', enName1:'(K)', key: "",minWidth:74, fixed: true},
  // {props:'output',name:'年产能', enName: 'Capa.', enName1:'(K)',key: "",minWidth:74, fixed: true},
  // {props:'partNo',name:'零件号', enName: 'Part No.', key: "",minWidth:64, fixed: true},
  // {props:'partName',name:'零件名称', enName: 'Part Name', key: "",minWidth:76},
  // {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "",minWidth:74},
  // {props:'svwCode',name:'厂商', enName: 'Code', key: "",minWidth:48},
  // {props:'supplierName',name:'供应商', enName: 'Supplier', key: "",minWidth:125},
  // {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "",minWidth:88},
  // {props:'share',name:'份额', enName: 'Share', enName1:'(%)', key: "",minWidth:60},
  // // {props:'rw',name:'欧价', enName: 'RW', key: "",minWidth:60},
  // {props:'cfTargetAPrice',name:'财务目标A价', enName: 'F-T(A)', key: "",minWidth:80},
  // {props:'cfTargetBPrice',name:'财务目标B价', enName: 'F-T(B)', key: "",minWidth:80},
  // {props:'status',name:'状态', enName: 'Status', key: "",minWidth:50},
  // {props:'aprice',name:'A价', enName: 'A Price', key: "",minWidth: 80},
  // {props:'bprice',name:'B价', enName: 'B Price', key: "",minWidth: 80},
  // {props:'ltc',name:'年降', enName: 'LTC', key: "", minWidth: 50},
  // {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', key: "", minWidth: 96},
  // {props:'investFee',name:'投资费', enName: 'Invest', key: "", minWidth: 70},
  // {props:'devFee',name:'开发费', enName: 'Develop Cost', key: "", minWidth: 90},
  // {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", key: "", minWidth: 100},
]

// 配件
export const sparePartTableTitle = [
  {props:'fsnrGsnrNum',enName: 'SP-NO.', key: "", minWidth: 84, fixed: true},
  {props:'output',name:'年产能', enName: 'Capa.(K)', key: "", minWidth: 74, fixed: true},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 64, fixed: true},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 76},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 74},
  {props:'svwCode',name:'厂商', enName: 'Code', key: "", minWidth: 70},
  {props:'supplierName',name:'供应商', enName: 'Supplier', key: "", minWidth: 70,lang:'en'},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 88,lang:'en'},
  {props:'share',name:'份额', enName: 'Share(%)', key: "", minWidth: 60},
  {props:'cfTargetBPrice',name:'财务目标价', enName: 'CF Target Price', key: "", minWidth: 105},
  {props:'status',name:'状态', enName: 'Status', key: "", minWidth: 50},
  {props:'aprice',name:'A价', enName: 'A Price', key: "", minWidth: 80},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 80},
  {props:'ltc',name:'年降', enName: 'LTC', key: "", width: 100},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', key: "", minWidth: 96},
  {props:'investFee',name:'投资费', enName: 'Invest', key: "", minWidth: 70},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', key: "", minWidth: 90},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 110},
]

// 附件
export const accessoryTableTitle = [
  {props:'fsnrGsnrNum',enName: 'SP-NO.', key: "", minWidth: 84, fixed: true},
  {props:'output',name:'年产能', enName: 'Capa.(K)', key: "", minWidth: 74, fixed: true},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 64, fixed: true},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 76},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 74},
  {props:'svwCode',name:'厂商', enName: 'Code', key: "", minWidth: 70},
  {props:'supplierName',name:'供应商', enName: 'Supplier', key: "", minWidth: 70,lang:'en'},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 88,lang:'en'},
  {props:'share',name:'份额', enName: 'Share(%)', key: "", minWidth: 60},
  {props:'cfTargetBPrice',name:'财务目标价', enName: 'CF Target Price', key: "", minWidth: 95},
  {props:'status',name:'状态', enName: 'Status', key: "", minWidth: 50},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 80},
  {props:'ltc',name:'年降', enName: 'LTC', key: "", width: 100},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', key: "", minWidth: 96},
  {props:'investFee',name:'投资费', enName: 'Invest', key: "", minWidth: 70},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', key: "", minWidth: 90},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 110},
]

// GS零件
export const gsTableTitle = [
  {props:'fsnrGsnrNum',enName: 'GS-NO.', key: "",minWidth:84, fixed: true},
  {props:'demand',name:'年需求', enName: 'Demand', enName1:'(K)', key: "", minWidth: 74, fixed: true},
  {props:'output',name:'年产能', enName: 'Capa.', enName1:'(K)', key: "", minWidth: 74, fixed: true},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 68, fixed: true},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 70},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 70},
  {props:'suppliersNow',name:'现供供应商', enName: 'Current Supplier', key: "", minWidth: 110},
  {props:'svwCode',name:'供应商号', enName: 'Code', key: "", minWidth: 58},
  {props:'supplierName',name:'供应商', enName: 'Supplier', key: "", minWidth: 66},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 88},
  {props:'share',name:'份额', enName: 'Share', enName1:'(%)', key: "", minWidth: 60},
  {props:'carTypeName',name:'车型', enName: 'Car Type Name', key: "", minWidth: 60},
  {props:'presentPrice',name:'现供价格', enName: 'Current Price', key: "", minWidth: 90},
  {props:'status',name:'供货状态', enName: 'Status', key: "", minWidth: 68},
  {props:'aprice',name:'A价', enName: 'A Price', key: "", minWidth: 80 },
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 80},
  {props:'ltc',name:'年降', enName: 'LTC', key: "", width: 100 },
  {props:'beginYearReduce',name:'年降开始时间', enName: 'Start Time of LTC', key: "", minWidth: 116},
  {props:'investFee',name:'投资费', enName: 'Invest', key: "", minWidth: 70},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', key: "", minWidth: 90},
  {props:'addFee',name:'认可费', enName: 'Release Cost', key: "", minWidth: 85},
  {props:'savingFee',name:'估算节约值', enName: 'Estimaled Savings', key: "", minWidth: 120},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 110},
]

// DB零件
export const dbTableTitle = [
  {props:'fsnrGsnrNum',enName: 'FS-NO.', key: "", minWidth: 84, fixed: true},
  {props:'demand',name:'年需求', enName: 'Demand', enName1:'(K)', key: "", minWidth: 74, fixed: true},
  {props:'output',name:'年产能', enName: 'Capa.', enName1:'(K)', key: "", minWidth: 74, fixed: true},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 68, fixed: true},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 70},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 70},
  {props:'svwCode',name:'供应商号', enName: 'Code', key: "", minWidth: 58},
  {props:'supplierName',name:'供应商', enName: 'Supplier', key: "", minWidth: 66},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 88},
  {props:'share',name:'份额', enName: 'Share', enName1:'(%)', key: "", minWidth: 60},
  // {props:'rw',name:'欧价', enName: 'RW', key: "", minWidth: 60},
  {props:'cfTargetAPrice',name:'财务目标A价', enName: 'F-T(A)', key: "", minWidth: 84},
  {props:'cfTargetBPrice',name:'财务目标B价', enName: 'F-T(B)', key: "", minWidth: 84},
  {props:'status',name:'状态', enName: 'Status', key: "", minWidth: 50},
  {props:'purchaseClause',name:'采购条款', enName: 'Purchasing Term', key: "", minWidth: 106},
  {props:'payClause',name:'支付条款', enName: 'Payment Term', key: "", minWidth: 96},
  {props:'aprice',name:'A价', enName: 'A Price', key: "", minWidth: 80},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 80},
  {props:'ltc',name:'年降', enName: 'LTC', key: "", width: 100},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'LTC Start Time', key: "", minWidth: 96},
  {props:'investFee',name:'投资费', enName: 'Invest', key: "", minWidth: 80},
  {props:'devFee',name:'开发费', enName: 'Develop Cost', key: "", minWidth: 90},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 110},
]

export const meetingRemark = [
  {label: '询价采购员上会备注', value: 'ww', type: 'CSF_MEET_MEMO', remarkType:'csfMeetMemo', key: 'XUNJIACAIGOUYUANSHANGHUIBEIZHU', permissionKey: "DESIGNATE_DECISIONDATA_RS_INPUT_BUYER_MEETING_REMARKS|询价采购员上会备注"},
  {label: 'LINIE上会备注', value: 'xxx', type: 'LINIE_MEET_MEMO', remarkType:'linieMeetMemo',key: 'LINIESHANGHUIBEIZHU', permissionKey: "DESIGNATE_DECISIONDATA_RS_INPUT_LINIE_MEETING_REMARKS|LINIE上会备注"},
  {label: 'CS*1上会备注', value: 'ttt', type: 'CS1_MEET_MEMO',remarkType:'cs1MeetMemo', key: 'CS1SHANGHUIBEIZHU', permissionKey: "DESIGNATE_DECISIONDATA_RS_INPUT_CS1_MEETING_REMARKS|CS*1上会备注"}
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


export const prototypeTitleList = [
  {i18nName: 'FS号', props: 'fsGsNum', i18nKey: 'FSNUMBER'},
  {i18nName: '零件号', props: 'partNum', i18nKey: 'LINGJIANHAO'},
  {i18nName: '供应商', props: 'supplierCode', i18nKey: 'GONGYINGSHANGHAO'},
  {i18nName: '供应商名称', props: 'supplierName', i18nKey: 'GONGYINGSMINGC'},
  {i18nName: '工装样件状态', props: 'toolingSampleRemark', i18nKey: 'GONGZHUANGYANGJIANZHUANGTAI'},
  {i18nName: '单件价格', props: 'sampleUnitPrice', i18nKey: 'DANJIANJIAGE'},
  {i18nName: '样件模具价格', props: 'addionalMouldCost', i18nKey: 'YANGJIANMOKUJIAGE'}
]

// 单独处理下年降或年降计划
export const resetLtcData = function(row, type) {
  if (!row) return ''

  // 年降开始时间
  if(type == 'beginYearReduce'){
    // 取第一个非0的年份
    const list = row.filter((item)=> item.ltcRateStr!='0');
    return list.length ? moment(list[0].ltcDate).format("YYYY-MM") : '-'
  }else{ // 年降
   // 从非0开始至非0截至的数据 不包含0
   let strList = [];
  //  let strFlag = false;

  //  for(let i =0;i<row.length;i++){
     
  //    if(row[i].ltcRateStr !='0' && row[i].ltcRateStr){
  //       strFlag = true;
  //      strList.push(row[i].ltcRateStr-0);
  //    }else if(strFlag && row[i].ltcRateStr == '0'){
  //      break
  //    }
  //  }
  //  return strList.length ? strList.join('/') : '-'
    const ltcRateStrArr = row.map(item => item.ltcRateStr)

    let i = 0
    do {
      i = ltcRateStrArr.length
      if (ltcRateStrArr[0] == 0) ltcRateStrArr.shift()
      if (ltcRateStrArr[ltcRateStrArr.length - 1] == 0) ltcRateStrArr.pop()
    } while (i !== ltcRateStrArr.length)

    return ltcRateStrArr.length ? ltcRateStrArr.join('/') : '-'
  }
}

// 备注处理
export const remarkProcess = function(remark) {
  const remarkStr = remark || remark === 0 ? remark + '' : ''
  return remarkStr.replace(/(\r|\n)/g, '<br/>')
}