/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-08 10:56:04
 * @Description: 
 * @FilePath: \front-web\src\views\designateFiles\fileManage\data.js
 */

export const tableTitle = [
  {props:'partNum',name:'附件零件号', key: "FUJIANLINGJIANHAO", tooltip: true, minWidth: 120},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, minWidth: 120},
  {props:'code',name:'编号', key: "BIANHAO", tooltip: true, minWidth: 100},
  {props:'item',name:'导入项次', key: "DAORUXIANGCI", tooltip: true, minWidth: 100},
  {props:'rfqId',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 70},
  {props:'csfuserDeptName',name:'CSF科室', key: "CSFKESHI", tooltip: true, minWidth: 140},
  {props:'csfUser',name:'CSF', key: "CSF", tooltip: true, minWidth: 100},
  {props:'csfuserDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, minWidth: 120},
  {props:'csfUser',name:'LINIE', key: "LINIE", tooltip: true, minWidth: 100},
  {props:'statusDesc',name:'状态', key: "ZHUANGTAI", tooltip: true, minWidth: 140},
  {props:'partNameCh',name:'附件零件名称', key: "FUJIANLINGJIANMINGCHENG", tooltip: true, minWidth: 140},
  {props:'carType',name:'使用车型', key: "SHIYONGCHEXING", tooltip: true, minWidth: 120},
  {props:'carQty',name:'每车用量', key: "MEICHEYONGLIANG", tooltip: true},
  {props:'fujian',name:'附件', key: "FUJIAN", tooltip: true},
  {props:'timeToMarket',name:'附件上市时间', key: "FUJIANSHANGSHISHIJIAN", tooltip: true, minWidth: 120},
  {props:'firstYearQty',name:'第1年需求量', key: "DIYINIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'secondYearQty',name:'第2年需求量', key: "DIERNIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'thirdYearQty',name:'第3年需求量', key: "DISANNIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'forthYearQty',name:'第4年需求量', key: "DISINIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'fifthYearQty',name:'第5年需求量', key: "DIWUNIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'sixthYearQty',name:'第6年需求量', key: "DILIUNIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'seventhYearQty',name:'第7年需求量', key: "DIQINIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'eighthYearQty',name:'第8年需求量', key: "DIBANIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'ninthYearQty',name:'第9年需求量', key: "DIJIUNIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'tenthYearQty',name:'第10年需求量', key: "DISHINIANXUQIULIANG", tooltip: true, minWidth: 120},
  {props:'purchasePrice',name:'建议采购价(不含税)', key: "JIANYICAIGOUJIA_BUHANSHUI", tooltip: true, minWidth: 140},
  {props:'salesPrice',name:'建议销售价(不含税)', key: "JIANYIXIAOSHOUJIA_BUHANSHUI", tooltip: true, minWidth: 140},
  {props:'marketRetailPrice',name:'市场零售价(不含税)', key: "SHICHANGLINGSHOUJIA_BUHANSHUI", tooltip: true, minWidth: 140},
  {props:'accessoryDeptManager',name:'附件科主管人', key: "FUJIANKEZHUGUANREN", tooltip: true, minWidth: 120},
  {props:'remark',name:'备注', key: "BEIZHU", tooltip: true, minWidth: 120},
  {props:'reason',name:'退回原因（仅股长可见）', key: "TUIHUIYUANYIN_JINGUZHANGKEJIAN", tooltip: true, minWidth: 160},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: '4324m234k32', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNum', label: '附件零件号', type: 'input', key: 'FUJIANLINGJIANHAO',permission: 'ACCESSORY_MANAGEMENT_PARTNUM|附件-附件管理-附件零件号'},
  {value: 'partNameCh', label: '附件零件名称', type: 'input', key: 'FUJIANLINGJIANMINGCHENG',permission: 'ACCESSORY_MANAGEMENT_PARTNAME|附件-附件管理-附件零件名称'},
  {value: 'carType', label: '使用车型', type: 'input', key: 'SHIYONGCHEXING',permission: 'ACCESSORY_MANAGEMENT_CARTYPE|附件-附件管理-使用车型'},
  {value: 'timeToMarket', label: '附件上市时间', type: 'date', key: 'FUJIANSHANGSHISHIJIAN',permission: 'ACCESSORY_MANAGEMENT_TIMETOMARKET|附件-附件管理-附件上市时间'},
  {value: 'dept', label: '科室', type: 'input', key: 'KESHI',permission: 'ACCESSORY_MANAGEMENT_DEPT|附件-附件管理-科室'},
  {value: 'linieId', label: 'LINIE', type: 'select', filterable: true, key: 'LINIE', selectOption: 'linieOptions',permission: 'ACCESSORY_MANAGEMENT_LINIE|附件-附件管理-LINIE'},
  {value: 'code', label: '编号', type: 'input', key: 'BIANHAO',permission: 'ACCESSORY_MANAGEMENT_CODE|附件-附件管理-编号'},
  {value: 'partStatus', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: 'partStatusOption',permission: 'ACCESSORY_MANAGEMENT_PARTSTATS|附件-附件管理-零件状态'},
  {value: 'item', label: '配件序号', type: 'input', key: 'PEIJIANXUHAO',permission: 'ACCESSORY_MANAGEMENT_ITEMXUHAO|附件-附件管理-序号'},
  // {value: 'isEop', label: '是否EOP', type: 'select', key: '', selectOption: []},
  // {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', key: '',},
  {value: 'status', label: '状态', type: 'select', key: 'ZHUANGTAI', selectOption: 'statusOption',permission: 'ACCESSORY_MANAGEMENT_STATS|附件-附件管理-状态'},
  // {value: 'procureGroup', label: '参考采购组', type: 'input'},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', key: 'GONGYINGSHANGSAPHAO',permission: 'ACCESSORY_MANAGEMENT_SUPPLIERSAPCODE|附件-附件管理-供应商SAP号'},
  {value: 'spNum', label: 'SP号', type: 'input', key: 'SPHAO',permission: 'ACCESSORY_MANAGEMENT_SPNUM|附件-附件管理-SP号'},
  {value: 'isShow', label: '是否自己', type: 'select', key: 'SHIFOUZIJI', selectOption: 'yesOrNoOption',permission: 'ACCESSORY_MANAGEMENT_ISME|附件-附件管理-是否自己'},
]

export const fileSearchList = [
  {value: 'partNum', label: '附件零件编号', type: 'input', key: 'FUJIANLINGJIANBIANHAO',},
  {value: 'partNameCh', label: '附件零件名称', type: 'input', key: 'FUJIANLINGJIANMINGCHENG',},
  {value: 'carType', label: '使用车型', type: 'input', key: 'SHIYONGCHEXING',},
  {value: 'timeToMarket', label: '附件上市时间', type: 'date', key: 'FUJIANSHANGSHISHIJIAN',},
]