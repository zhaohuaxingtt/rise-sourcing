/*
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:50:41
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-31 11:17:30
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\circulation\data.js
 */

export const nomalDetailTitle = [
  {props: 'partName', name: '零件名称', enName: 'Part Name'},
  {props: 'partNum', name: '零件号', enName: 'Part-No'},
  {props: 'fsNum', name: 'FS号', enName: 'FS-No'},
  {props: 'date', name: '询价资料日期', enName: 'RFQ Doc. Date'},
  {props: 'a', name: '前期采购员', enName: 'FS'},
  {props: 'a', name: '项目', enName: 'Project'},
  {props: 'a', name: '采购员', enName: 'Buyer'},
  {props: 'a', name: '投产时间', enName: 'SOP'},
  {props: 'a', name: '工程师', enName: 'EP/EN'},
  {props: 'a', name: '车型', enName: 'Carline'},
  {props: 'a', name: '生命周期', enName: 'Lifetime'}
]

export const nomalDetailTitleBlue = [
  [
    {props: 'a', name: '货币', enName: 'Currency'},
    {props: 'a', name: '单位', enName: 'Unit'},
  ],
  {props: 'a', name: '原材料补差价', enName: 'MTZ'},
  {props: 'a', name: '材料组', enName: 'Material Group'},
  {props: 'a', name: '原材料', enName: 'Raw Material'},
  {props: 'a', name: '计划投资', enName: 'Planned Invest'},
  {props: 'a', name: '设定价格', enName: 'Set Price'},
  {props: 'a', name: '送样EM周期', enName: 'EM-Termin'},
  {props: 'a', name: '每车用量', enName: 'Quantity'},
  {props: 'a', name: 'VFF时间', enName: 'VFF TBT'},
  {props: 'a', name: 'PVS时间', enName: 'PVS TBT'}
]

// 生产
export const nomalTableTitle = [
  {props:'supplier',name:'FS No.', key: "", minWidth: 60},
  {props:'supplierNo',name:'Part No.', key: "", minWidth: 60},
  {props:'location',name:'Old Part No.', key: "", minWidth: 100},
  {props:'c',name:'Old A Price', key: "", minWidth: 60},
  {props:'d',name:'Part Name', key: "", minWidth: 85},
  {props:'e',name:'Unit', key: "", minWidth: 80},
  {props:'f',name:'TP Dep.',  key: "", minWidth: 80},
  {props:'g',name:'ZP',  key: "", minWidth: 80},
  {props:'c',name:'Project',  key: "", minWidth: 80},
  {props:'d',name:'Supplier No.', key: "", minWidth: 80},
  {props:'e',name:'Supplier Name',  key: "", minWidth: 90},
  {props:'f',name:'Location',  key: "", minWidth: 95},
  {props:'g',name:'CF A Price', key: "", minWidth: 95},
  {props:'f',name:'CF B Price', key: "", minWidth: 95},
  {props:'g',name:'RW', key: "", minWidth: 80},
  {props:'c',name:'Type', key: "", minWidth: 45},
  {props:'d',name:'A Price', key: "", minWidth: 90},
  {props:'e',name:'B Price', key: "", minWidth: 90},
  {props:'f',name:'Packing', key: "", minWidth: 80},
  {props:'g',name:'Transportation', key: "", minWidth: 80},
  {props:'g',name:'Operation', key: "", minWidth: 65},
  {props:'c',name:'Invest(no tax)', key: "", minWidth: 120},
  {props:'d',name:'Share(%)', key: "", minWidth: 90},
  {props:'e',name:'LTC', key: "", minWidth: 90},
  {props:'f',name:'LTC Date', key: "", minWidth: 120},
  {props:'g',name:'Annual Demand(K)', key: "", minWidth: 80},
  {props:'g',name:'Annual Capa.(K)', key: "", minWidth: 65},
  {props:'g',name:'Purchase Price', key: "", minWidth: 80},
  {props:'g',name:'Notes', key: "", minWidth: 65},
]

// 附件列表
export const accessoryTableTitle = [
  {props:'supplier',name:'FS No.', key: "", minWidth: 60},
  {props:'supplierNo',name:'Series Part No.', key: "", minWidth: 60},
  {props:'location',name:'Accessory Part No.', key: "", minWidth: 100},
  {props:'c',name:'Accessory Part Name', key: "", minWidth: 60},
  {props:'d',name:'Carline', key: "", minWidth: 85},
  {props:'e',name:'Code', key: "", minWidth: 80},
  {props:'f',name:'Supplier',  key: "", minWidth: 80},
  {props:'g',name:'Prod.Location',  key: "", minWidth: 80},
  {props:'c',name:'Demand(K)',  key: "", minWidth: 80},
  {props:'d',name:'B Price', key: "", minWidth: 80},
  {props:'e',name:'CF B Price',  key: "", minWidth: 90},
  {props:'f',name:'Old B Price',  key: "", minWidth: 95},
  {props:'g',name:'Sales Price', key: "", minWidth: 95},
  {props:'f',name:'Series B Price', key: "", minWidth: 95},
  {props:'g',name:'Price Start Date', key: "", minWidth: 80},
  {props:'c',name:'Turnover(K)', key: "", minWidth: 45},
  {props:'d',name:'Share(%)', key: "", minWidth: 90},
  {props:'e',name:'LTC', key: "", minWidth: 90},
  {props:'f',name:'Start', key: "", minWidth: 80},
  {props:'g',name:'Time of LTC', key: "", minWidth: 80},
  {props:'g',name:'Remark', key: "", minWidth: 65}
]

// 配件列表
export const sparePartTableTitle = [
  {props:'supplier',name:'FS No.', key: "", minWidth: 60},
  {props:'supplierNo',name:'Series Part No.', key: "", minWidth: 60},
  {props:'location',name:'Spare Part No.', key: "", minWidth: 100},
  {props:'c',name:'Spare Part Name', key: "", minWidth: 60},
  {props:'d',name:'Carline', key: "", minWidth: 85},
  {props:'e',name:'Code', key: "", minWidth: 80},
  {props:'f',name:'Supplier',  key: "", minWidth: 80},
  {props:'c',name:'Prod.Location',  key: "", minWidth: 80},
  {props:'d',name:'Demand(K)', key: "", minWidth: 80},
  {props:'e',name:'B Price',  key: "", minWidth: 90},
  {props:'f',name:'CF B Price',  key: "", minWidth: 95},
  {props:'g',name:'Old Price', key: "", minWidth: 95},
  {props:'f',name:'Series Price', key: "", minWidth: 95},
  {props:'g',name:'Price Start Date', key: "", minWidth: 80},
  {props:'c',name:'Turnover(K)', key: "", minWidth: 45},
  {props:'d',name:'Share(%)', key: "", minWidth: 90},
  {props:'e',name:'LTC', key: "", minWidth: 90},
  {props:'f',name:'Start Time of LTC', key: "", minWidth: 80},
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