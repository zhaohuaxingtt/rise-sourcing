// 生产
export const nomalTableTitle = [
  {props:'fsnrGsnrNum',name:'FS No.', key: "", minWidth: 50},
  {props:'partNo',name:'Part No.', key: "", minWidth: 64},
  {props:'partNum',name:'Old', enName:'Part No.',key: "", minWidth: 62}, // 12/24 业务说取partNum
  // {props:'oldPartNum',name:'Old Part No.', key: "", minWidth: 95}, // oldPartNo => partNo
  {props:'oldAPrice',name:'Old', enName:'A Price', key: "", minWidth: 58},
  {props:'partName',name:'Part Name', key: "", minWidth: 76},
  {props:'unit',name:'Unit', key: "", minWidth: 45},
  {props:'tpDep',name:'TP Dep.',  key: "", minWidth: 60},
  {props:'zp',name:'ZP',  key: "", minWidth: 30},
  {props:'project',name:'Project',  key: "", minWidth: 60},
  {props:'sapCode',name:'Supplier No.', key: "", minWidth: 86},
  {props:'supplierName',name:'Supplier Name',  key: "", minWidth: 100},
  {props:'prodLocation',name:'Location',  key: "", minWidth: 66},
  {props:'cfTargetAPrice',name:'CF', enName:'A Price', key: "", minWidth: 50},
  {props:'cfTargetBPrice',name:'CF', enName:'B Price', key: "", minWidth: 50},
  {props:'rw',name:'RW', key: "", minWidth: 30},
  {props:'partProjectTypeDesc',name:'Type', key: "", minWidth: 55},
  {props:'aprice',name:'A Price', key: "", minWidth: 50},
  {props:'bprice',name:'B Price', key: "", minWidth: 50},
  {props:'packPrice',name:'Packing', key: "", minWidth: 60},
  {props:'transportPrice',name:'Transportation', key: "", minWidth: 100},
  {props:'operatePrice',name:'Operation', key: "", minWidth: 72},
  {props:'investFee',name:'Invest',enName:'(no tax)',key: "", minWidth: 50},
  {props:'share',name:'Share',enName:'(%)',key: "", minWidth: 48},
  {props:'ltc',name:'LTC', key: "", minWidth: 34},
  {props:'beginYearReduce',name:'LTC Date', key: "", minWidth: 66},
  {props:'demand',name:'Annual Demand', enName:'(K)', key: "", minWidth: 100},
  {props:'output',name:'Annual Capa.', enName:'(K)', key: "", minWidth: 90},
  {props:'turnover',name:'Purchase Price', key: "", minWidth: 100},
  {props:'g',name:'Notes', key: "", minWidth: 50},
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