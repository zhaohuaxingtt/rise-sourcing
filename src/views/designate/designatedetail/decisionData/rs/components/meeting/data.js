/*
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:50:41
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-24 15:23:57
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\meeting\data.js
 */

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
  {props: 'carLine', name: '车型', enName: 'Carline'},
  {props: 'lifeTime', name: '生命周期', enName: 'Lifetime'}
]

export const nomalDetailTitleBlue = [
  [
    {props: 'currency', name: '货币', enName: 'Currency'},
    {props: 'unit', name: '单位', enName: 'Unit'},
  ],
  {props: 'mtz', name: '原材料补差价', enName: 'MTZ'},
  {props: 'materialGroup', name: '材料组', enName: 'Material Group'},
  {props: 'rawMaterial', name: '原材料', enName: 'Raw Material'},
  {props: 'plannedInvest', name: '现供应商', enName: 'Current Supplier'},
  {props: 'setPrice', name: '设定价格', enName: 'Set Price'},
  {props: 'emtermin', name: '分摊', enName: 'Amrtisiert'},
  {props: 'quantity', name: '每车用量', enName: 'Quantity'}
]

// GS
export const gsDetailTitleBlue = [
  [
    {props: 'currency', name: '货币', enName: 'Currency'},
    {props: 'unit', name: '单位', enName: 'Unit'},
  ],
  {props: 'mtz', name: '原材料补差价', enName: 'MTZ'},
  {props: 'materialGroup', name: '材料组', enName: 'Material Group'},
  {props: 'rawMaterial', name: '原材料', enName: 'Raw Material'},
  {props: 'plannedInvest', name: '计划投资', enName: 'Planned Invest'},
  {props: 'setPrice', name: '设定价格', enName: 'Set Price'},
  {props: 'emtermin', name: '送样EM周期', enName: 'EM-Termin'},
  {props: 'quantity', name: '每车用量', enName: 'Quantity'},
  {props: 'vffTbt', name: 'VFF时间', enName: 'VFF TBT'},
  {props: 'pvsTbt', name: 'PVS时间', enName: 'PVS TBT'}
]


export const nomalTableTitle = [
  {props:'fsnrGsnrNum',name:'FS号', enName: 'FS-NO.', key: "", minWidth: 60},
  {props:'demand',name:'年需求', enName: 'Demand(K)', key: "", minWidth: 60},
  {props:'output',name:'年产量', enName: 'Demand(K)', key: "", minWidth: 60},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 55},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 85},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 60},
  {props:'supplierName',name:'厂商', enName: 'Code', key: "", minWidth: 45},
  {props:'supplierId',name:'供应商', enName: 'Supplier', key: "", minWidth: 55},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 75},
  {props:'share',name:'份额', enName: 'Share(%)', key: "", minWidth: 55},
  {props:'rw',name:'欧价', enName: 'RW', key: "", minWidth: 35},
  {props:'cfTargetAPrice',name:'财务目标A价', enName: 'CF Target A Price', key: "", minWidth: 95},
  {props:'cfTargetBPrice',name:'财务目标B价', enName: 'CF Target B Price', key: "", minWidth: 95},
  {props:'status',name:'状态', enName: 'Status', key: "", minWidth: 45},
  {props:'aprice',name:'A价', enName: 'A Price', key: "", minWidth: 45},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 45},
  {props:'ltcRateOfThree',name:'年降', enName: 'LTC', key: "", minWidth: 35},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'Start Time of LTC', key: "", minWidth: 90},
  {props:'investFee',name:'投资费(不含税)', enName: 'Invest(excl.VAT)', key: "", minWidth: 80},
  {props:'devFee',name:'开发费(含税)', enName: 'Develop Cost',enName1:'(incl. VAT)', key: "", minWidth: 80},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 65},
]

// 配件
export const sparePartTableTitle = [
  {props:'fsnrGsnrNum',name:'SP号', enName: 'FS-NO.', key: "", minWidth: 60},
  {props:'output',name:'年产量', enName: 'Demand(K)', key: "", minWidth: 60},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 55},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 85},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 60},
  {props:'supplierName',name:'厂商', enName: 'Code', key: "", minWidth: 45},
  {props:'supplierId',name:'供应商', enName: 'Supplier', key: "", minWidth: 55},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 75},
  {props:'share',name:'份额', enName: 'Share(%)', key: "", minWidth: 55},
  {props:'cfTargetBPrice',name:'财务目标价', enName: 'CF Target Price', key: "", minWidth: 95},
  {props:'status',name:'状态', enName: 'Status', key: "", minWidth: 45},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 45},
  {props:'ltcRateOfThree',name:'年降', enName: 'LTC', key: "", minWidth: 35},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'Start Time of LTC', key: "", minWidth: 90},
  {props:'investFee',name:'投资费(不含税)', enName: 'Invest(excl.VAT)', key: "", minWidth: 80},
  {props:'devFee',name:'开发费(含税)', enName: 'Develop Cost',enName1:'(incl. VAT)', key: "", minWidth: 80},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 65},
]

// 附件
export const accessoryTableTitle = [
  {props:'fsnrGsnrNum',name:'SP号', enName: 'FS-NO.', key: "", minWidth: 60},
  {props:'output',name:'年产量', enName: 'Demand(K)', key: "", minWidth: 60},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 55},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 85},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 60},
  {props:'supplierName',name:'厂商', enName: 'Code', key: "", minWidth: 45},
  {props:'supplierId',name:'供应商', enName: 'Supplier', key: "", minWidth: 55},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 75},
  {props:'share',name:'份额', enName: 'Share(%)', key: "", minWidth: 55},
  {props:'cfTargetBPrice',name:'财务目标价', enName: 'CF Target Price', key: "", minWidth: 95},
  {props:'status',name:'状态', enName: 'Status', key: "", minWidth: 45},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 45},
  {props:'ltcRateOfThree',name:'年降', enName: 'LTC', key: "", minWidth: 35},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'Start Time of LTC', key: "", minWidth: 90},
  {props:'investFee',name:'投资费(不含税)', enName: 'Invest(excl.VAT)', key: "", minWidth: 80},
  {props:'devFee',name:'开发费(含税)', enName: 'Develop Cost',enName1:'(incl. VAT)', key: "", minWidth: 80},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 65},
]

// GS零件
export const gsTableTitle = [
  {props:'fsnrGsnrNum',name:'GS号', enName: 'GS-NO.', key: "", minWidth: 60},
  {props:'demand',name:'年需求', enName: 'Demand(K)', key: "", minWidth: 60},
  {props:'output',name:'年产量', enName: 'Demand(K)', key: "", minWidth: 60},
  {props:'partNo',name:'零件号', enName: 'Part No.', key: "", minWidth: 55},
  {props:'partName',name:'零件名称', enName: 'Part Name', key: "", minWidth: 85},
  {props:'logNorm',name:'物流标准', enName: 'Log Norm', key: "", minWidth: 60},
  {props:'logNorm',name:'现供供应商', enName: 'Current Supplier', key: "", minWidth: 60},
  {props:'supplierName',name:'厂商', enName: 'Code', key: "", minWidth: 45},
  {props:'supplierId',name:'供应商', enName: 'Supplier', key: "", minWidth: 55},
  {props:'prodLocation',name:'产地', enName: 'Prod.Location', key: "", minWidth: 75},
  {props:'share',name:'份额', enName: 'Share(%)', key: "", minWidth: 55},
  {props:'rw',name:'车型', enName: 'Carline', key: "", minWidth: 35},
  {props:'cfTargetAPrice',name:'现供价格', enName: 'Current Price', key: "", minWidth: 95},
  {props:'status',name:'供货状态', enName: 'Status', key: "", minWidth: 45},
  {props:'aprice',name:'A价', enName: 'A Price', key: "", minWidth: 45},
  {props:'bprice',name:'B价', enName: 'B Price', key: "", minWidth: 45},
  {props:'ltcRateOfThree',name:'年降', enName: 'LTC', key: "", minWidth: 35},
  {props:'beginYearReduce',name:'年降开始时间', enName: 'Start Time of LTC', key: "", minWidth: 90},
  {props:'investFee',name:'投资费(不含税)', enName: 'Invest(excl.VAT)', key: "", minWidth: 80},
  {props:'devFee',name:'开发费(含税)', enName: 'Develop Cost',enName1:'(incl. VAT)', key: "", minWidth: 80},
  {props:'turnover',name:'认可费', enName: 'Release Cost', key: "", minWidth: 65},
  {props:'turnover',name:'估算节约值', enName: 'Estimaled Savings', key: "", minWidth: 65},
  {props:'turnover',name:'采购金额', enName: 'Turnover', key: "", minWidth: 65},
]

export const meetingRemark = [
  {label: '询价采购员上会备注', value: 'ww', type: 'CSF_MEET_MEMO'},
  {label: 'LINIE上会备注', value: 'xxx', type: 'LINIE_MEET_MEMO'},
  {label: 'CS*1上会备注', value: 'ttt', type: 'CS1_MEET_MEMO'}
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