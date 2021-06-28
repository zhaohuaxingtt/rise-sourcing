/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-15 17:51:30
 * @Description: 
 * @FilePath: \front-web\src\views\designateFiles\fileManage\data.js
 */

export const tableTitle = [
  {props:'partNum',name:'附件零件号', key: "FUJIANLINGJIANHAO", tooltip: true, width: 100},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, width: 100},
  {props:'code',name:'编号', key: "BIANHAO", tooltip: true, width: 100},
  {props:'item',name:'导入项次', key: "DAORUXIANGCI", tooltip: true, width: 100},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 100},
  {props:'csfuserDeptName',name:'CSF科室', key: "CSFKESHI", tooltip: true, width: 100},
  {props:'csfUser',name:'CSF', key: "CSF", tooltip: true, width: 100},
  {props:'csfuserDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, width: 100},
  {props:'csfUser',name:'LINIE', key: "LINIE", tooltip: true, width: 100},
  {props:'status',name:'状态', key: "ZHUANGTAI", tooltip: true, width: 100},
  {props:'partNameCh',name:'附件零件名称', key: "FUJIANLINGJIANMINGCHENG", tooltip: true, width: 100},
  {props:'carType',name:'使用车型', key: "SHIYONGCHEXING", tooltip: true, width: 100},
  {props:'carQty',name:'每车用量', key: "MEICHEYONGLIANG", tooltip: true},
  {props:'fujian',name:'附件', key: "FUJIAN", tooltip: true},
  {props:'timeToMarket',name:'附件上市时间', key: "FUJIANSHANGSHISHIJIAN", tooltip: true, width: 120},
  {props:'firstYearQty',name:'第1年需求量', key: "DIYINIANXUQIULIANG", tooltip: true, width: 120},
  {props:'secondYearQty',name:'第2年需求量', key: "DIERNIANXUQIULIANG", tooltip: true, width: 120},
  {props:'thirdYearQty',name:'第3年需求量', key: "DISANNIANXUQIULIANG", tooltip: true, width: 120},
  {props:'forthYearQty',name:'第4年需求量', key: "DISINIANXUQIULIANG", tooltip: true, width: 120},
  {props:'fifthYearQty',name:'第5年需求量', key: "DIWUNIANXUQIULIANG", tooltip: true, width: 120},
  {props:'sixthYearQty',name:'第6年需求量', key: "DILIUNIANXUQIULIANG", tooltip: true, width: 120},
  {props:'seventhYearQty',name:'第7年需求量', key: "DIQINIANXUQIULIANG", tooltip: true, width: 120},
  {props:'eighthYearQty',name:'第8年需求量', key: "DIBANIANXUQIULIANG", tooltip: true, width: 120},
  {props:'ninthYearQty',name:'第9年需求量', key: "DIJIUNIANXUQIULIANG", tooltip: true, width: 120},
  {props:'tenthYearQty',name:'第10年需求量', key: "DISHINIANXUQIULIANG", tooltip: true, width: 120},
  {props:'purchasePrice',name:'建议采购价(不含税)', key: "JIANYICAIGOUJIA_BUHANSHUI", tooltip: true, width: 120},
  {props:'salesPrice',name:'建议销售价(不含税)', key: "JIANYIXIAOSHOUJIA_BUHANSHUI", tooltip: true, width: 120},
  {props:'marketRetailPrice',name:'市场零售价(不含税)', key: "SHICHANGLINGSHOUJIA_BUHANSHUI", tooltip: true, width: 120},
  {props:'accessoryDeptManager',name:'附件科主管人', key: "FUJIANKEZHUGUANREN", tooltip: true, width: 120},
  {props:'remark',name:'备注', key: "BEIZHU", tooltip: true, width: 120},
  {props:'reason',name:'退回原因（仅股长可见）', key: "TUIHUIYUANYIN_JINGUZHANGKEJIAN", tooltip: true, width: 120},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: '4324m234k32', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNum', label: '附件零件编号', type: 'input', key: 'FUJIANLINGJIANBIANHAO',},
  {value: 'partNameCh', label: '附件零件名称', type: 'input', key: 'FUJIANLINGJIANMINGCHENG',},
  {value: 'carType', label: '使用车型', type: 'input', key: 'SHIYONGCHEXING',},
  {value: 'timeToMarket', label: '附件上市时间', type: 'date', key: 'FUJIANSHANGSHISHIJIAN',},
  {value: 'dept', label: '科室', type: 'input', key: 'KESHI'},
  {value: 'linieId', label: 'LINIE', type: 'select', filterable: true, key: 'LINIE', selectOption: 'linieOptions'},
  {value: 'code', label: '编号', type: 'input', key: 'BIANHAO',},
  {value: 'partStatus', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: 'partStatusOption'},
  {value: 'item', label: '配件序号', type: 'input', key: 'PEIJIANXUHAO',},
  // {value: 'isEop', label: '是否EOP', type: 'select', key: '', selectOption: []},
  // {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', key: '',},
  {value: 'status', label: '状态', type: 'select', key: 'ZHUANGTAI', selectOption: 'statusOption'},
  // {value: 'procureGroup', label: '参考采购组', type: 'input'},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', key: 'GONGYINGSHANGSAPHAO',},
  {value: 'spNum', label: 'SP号', type: 'input', key: 'SPHAO'},
  {value: 'isShow', label: '是否自己', type: 'select', key: 'SHIFOUZIJI', selectOption: 'yesOrNoOption'},
]

export const fileSearchList = [
  {value: 'partNum', label: '附件零件编号', type: 'input', key: 'FUJIANLINGJIANBIANHAO',},
  {value: 'partNameCh', label: '附件零件名称', type: 'input', key: 'FUJIANLINGJIANMINGCHENG',},
  {value: 'carType', label: '使用车型', type: 'input', key: 'SHIYONGCHEXING',},
  {value: 'timeToMarket', label: '附件上市时间', type: 'date', key: 'FUJIANSHANGSHISHIJIAN',},
]