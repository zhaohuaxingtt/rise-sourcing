/*
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:50:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-09 20:31:14
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
  {props: 'plannedInvest', name: '计划投资', enName: 'Planned Invest'},
  {props: 'setPrice', name: '设定价格', enName: 'Set Price'},
  {props: 'emtermin', name: '送样EM周期', enName: 'EM-Termin'},
  {props: 'quantity', name: '每车用量', enName: 'Quantity'},
  {props: 'vffTbt', name: 'VFF时间', enName: 'VFF TBT'},
  {props: 'pvsTbt', name: 'PVS时间', enName: 'PVS TBT'}
]


// 生产
export const nomalTableTitle = [
  {props:'fsnrGsnrNum',name:'FS No.', key: "", minWidth: 110},
  {props:'partNo',name:'Part No.', key: "", minWidth: 95},
  {props:'oldPartNum',name:'Old Part No.', key: "", minWidth: 95}, // oldPartNo => partNo
  {props:'oldAPrice',name:'Old A Price', key: "", minWidth: 85},
  {props:'partName',name:'Part Name', key: "", minWidth: 85},
  {props:'unit',name:'Unit', key: "", minWidth: 45},
  {props:'tpDep',name:'TP Dep.',  key: "", minWidth: 75},
  {props:'zp',name:'ZP',  key: "", minWidth: 50},
  {props:'project',name:'Project',  key: "", minWidth: 100},
  {props:'sapCode',name:'Supplier No.', key: "", minWidth: 90},
  {props:'supplierName',name:'Supplier Name',  key: "", minWidth: 110},
  {props:'prodLocation',name:'Location',  key: "", minWidth: 80},
  {props:'cfTargetAPrice',name:'CF A Price', key: "", minWidth: 80},
  {props:'cfTargetBPrice',name:'CF B Price', key: "", minWidth: 80},
  {props:'rw',name:'RW', key: "", minWidth: 55},
  {props:'partProjectTypeDesc',name:'Type', key: "", minWidth: 70},
  {props:'aprice',name:'A Price', key: "", minWidth: 60},
  {props:'bprice',name:'B Price', key: "", minWidth: 60},
  {props:'packPrice',name:'Packing', key: "", minWidth: 70},
  {props:'transportPrice',name:'Transportation', key: "", minWidth: 105},
  {props:'operatePrice',name:'Operation', key: "", minWidth: 85},
  {props:'investFee',name:'Invest(no tax)', key: "", minWidth: 100},
  {props:'share',name:'Share(%)', key: "", minWidth: 75},
  {props:'ltc',name:'LTC', key: "", minWidth: 100},
  {props:'beginYearReduce',name:'LTC Date', key: "", minWidth: 100},
  {props:'demand',name:'Annual Demand(K)', key: "", minWidth: 125},
  {props:'output',name:'Annual Capa.(K)', key: "", minWidth: 110},
  {props:'turnover',name:'Purchase Price', key: "", minWidth: 110},
  {props:'g',name:'Notes', key: "", minWidth: 80},
]

// 附件列表
export const accessoryTableTitle = [
  {props:'fsnrGsnrNum',name:'SP No.', key: "", minWidth: 120},
  // {props:'supplierNo',name:'Series Part No.', key: "", minWidth: 60},
  {props:'partNum',name:'Accessory Part No.', key: "", minWidth: 120},
  {props:'partName',name:'Accessory Part Name', key: "", minWidth: 120},
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
  {props:'turnover',name:'Turnover(K)', key: "", minWidth: 45},
  {props:'share',name:'Share(%)', key: "", minWidth: 90},
  {props:'ltc',name:'LTC', key: "", minWidth: 120},
  {props:'beginYearReduce',name:'Start Time of LTC', key: "", minWidth: 120},
  {props:'g',name:'Remark', key: "", minWidth: 65}
]

// 配件列表
export const sparePartTableTitle = [
  {props:'supplier',name:'SP No.', key: "", minWidth: 100},
  {props:'assemblyPartNum',name:'Series Part No.', key: "", minWidth: 120},
  {props:'partNum',name:'Spare Part No.', key: "", minWidth: 100},
  {props:'partName',name:'Spare Part Name', key: "", minWidth: 120},
  {props:'carLine',name:'Carline', key: "", minWidth: 85},
  {props:'supplierSapCode',name:'Code', key: "", minWidth: 120},
  {props:'supplierName',name:'Supplier',  key: "", minWidth: 120},
  {props:'prodLocation',name:'Prod.Location',  key: "", minWidth: 120},
  {props:'demand',name:'Demand(K)', key: "", minWidth: 80},
  {props:'bprice',name:'B Price',  key: "", minWidth: 90},
  {props:'cfTargetBPrice',name:'CF B Price',  key: "", minWidth: 120},
  {props:'originalPrice',name:'Old Price', key: "", minWidth: 120},
  {props:'assemblyBprice',name:'Series Price', key: "", minWidth: 120},
  {props:'quotationSopDate',name:'Price Start Date', key: "", minWidth: 120},
  {props:'turnover',name:'Turnover(K)', key: "", minWidth: 45},
  {props:'share',name:'Share(%)', key: "", minWidth: 90},
  {props:'ltc',name:'LTC', key: "", minWidth: 120},
  {props:'beginYearReduce',name:'Start Time of LTC', key: "", minWidth: 120},
  {props:'g',name:'Remark', key: "", minWidth: 80},
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