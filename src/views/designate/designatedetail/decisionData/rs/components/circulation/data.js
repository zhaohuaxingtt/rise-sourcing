/*
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:50:41
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-29 14:46:15
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


export const nomalTableTitle = [
  {props:'supplier',name:'FS号', key: "", minWidth: 60},
  {props:'supplierNo',name:'零件号', key: "", minWidth: 60},
  {props:'location',name:'原零件号', key: "", minWidth: 100},
  {props:'c',name:'原A价', key: "", minWidth: 60},
  {props:'d',name:'零件名称', key: "", minWidth: 85},
  {props:'e',name:'零件单位', key: "", minWidth: 80},
  {props:'f',name:'TP科室',  key: "", minWidth: 80},
  {props:'g',name:'ZP属性',  key: "", minWidth: 80},
  {props:'c',name:'项目名称',  key: "", minWidth: 80},
  {props:'d',name:'厂商号', key: "", minWidth: 80},
  {props:'e',name:'供应商名称',  key: "", minWidth: 90},
  {props:'f',name:'产地',  key: "", minWidth: 95},
  {props:'g',name:'财务目标A价', key: "", minWidth: 95},
  {props:'f',name:'财务目标B价', key: "", minWidth: 95},
  {props:'g',name:'欧价', key: "", minWidth: 80},
  {props:'c',name:'状态', key: "", minWidth: 45},
  {props:'d',name:'A价', key: "", minWidth: 90},
  {props:'e',name:'B价', key: "", minWidth: 90},
  {props:'f',name:'包装费', key: "", minWidth: 80},
  {props:'g',name:'运输费', key: "", minWidth: 80},
  {props:'g',name:'操作费', key: "", minWidth: 65},
  {props:'c',name:'投资费(不含税)', key: "", minWidth: 120},
  {props:'d',name:'定点份额(%)', key: "", minWidth: 90},
  {props:'e',name:'年降', key: "", minWidth: 90},
  {props:'f',name:'年降开始时间', key: "", minWidth: 120},
  {props:'g',name:'年需求', key: "", minWidth: 80},
  {props:'g',name:'年产能', key: "", minWidth: 65},
  {props:'g',name:'采购金额', key: "", minWidth: 80},
  {props:'g',name:'备注', key: "", minWidth: 65},
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