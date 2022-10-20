/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:11:17
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-29 11:22:51
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\components\data.js
 */

export const TAB = [
  {
    value: 1,
    name: '总览',
    message: 0,
    url: '/deliver/overview',
    activePath: 'overview',
    key: '总览',
    // permissionKey: 'PROJECTMGT_OVERVIEW_TAB',
    // permissionName: '送样管理-送样过程监控Tab'
  },
  {
    value: 2,
    name: '延误清单',
    message: 0,
    url: '/deliver/delayanalysis',
    activePath: 'delayanalysis',
    key: '延误清单',
    // permissionKey: 'PROJECTMGT_SCHEASSISTANT_TAB',
    // permissionName: '送样管理-项目送样管理Tab'
  },
  {
    value: 2,
    name: '送样过程监控',
    message: 0,
    url: '/deliver/progressdetail',
    activePath: 'progressdetail',
    key: '送样过程监控',
    // permissionKey: 'PROJECTMGT_SCHEASSISTANT_TAB',
    // permissionName: '送样管理-项目送样管理Tab'
  },
]

export const COMFIRMTAB = [
  {
    value: 1,
    name: '排程助手1',
    message: 0,
    url: '/deliver/projectscheassistant/proconfirm',
    activePath: 'projectscheassistant',
    // key: '排程助手1'
  },
  {
    value: 2,
    name: '项目进度监控',
    message: 0,
    url: '/deliver/projectprogressmonitoring/delayconfirm',
    activePath: 'projectprogressmonitoring',
    key: 'XIANGMUJINDUJIANKONG'
  }
]

export const tableTitle = [
  { props: "cartypeProNameZh", name: "车型项目", key: "", tooltip: true, },
  { props: "rfq", name: "RFQ", key: "", tooltip: true,},
  { props: "materialGroupNameZh", name: "材料组编号", key: "", tooltip: true,  },
  { props: "partNum", name: "零件号", key: "", tooltip: true, },
  { props: "partNameZh", name: "零件名称", key: "", tooltip: true, },
  { props: "partType", name: "零件类型", key: "", tooltip: true,  },
  { props: "soll", name: "Soll", key: "", tooltip: true,  },
  { props: "delayWk", name: "进度", key: "", tooltip: true,  },
  { props: "delayRemaks", name: "延迟原因备注", key: "", tooltip: true, minWidth:200 },
  { props: "supplierNames", name: "零件所属供应商", key: "", tooltip: true, minWidth:200 },
] 

export const tableTitleA = [
  { props: "cartypeProNameZh", name: "车型项目", key: "", tooltip: true,minWidth:100 },
  { props: "rfq", name: "RFQ", key: "", tooltip: true,},
  { props: "materialGroupNameZh", name: "材料组编号", key: "", tooltip: true,minWidth:150 },
  { props: "partNum", name: "零件号", key: "", tooltip: true, },
  { props: "partNameZh", name: "零件名称", key: "", tooltip: true,minWidth:120 },
  { props: "partType", name: "零件类型", key: "", tooltip: true,  },
  { props: "soll", name: "Soll", key: "", tooltip: true,  },
  { props: "progress", name: "进度", key: "", tooltip: true,  },
  { props: "delayRemark", name: "延迟原因备注", key: "", tooltip: true, minWidth:200 },
  { props: "supplierName", name: "零件所属供应商", key: "", tooltip: true, minWidth:200 },
] 

export const shuttleTableTitle = [
  { type: 'customSelection', width: 50 },
  {
    type: 'fullIndex',
    width: 80,
    align: 'left'
  },
  {
    prop: 'name',
    label: '材料组名称',
    i18n: '材料组名称',
    type: 'expanded',
    minWidth: 200,
    align: 'left'
  },{
    prop: 'code',
    label: '材料组号',
    i18n: '材料组号',
    minWidth: 200,
    align: 'center'
  },
]

export const searchList = [
  {prop:'materialGroupIds',label:'材料组',key:'CAILIAOZU',type:'select', selectOption:'deptOptions',multiple:true},
  {prop:'buyerIds',label:'采购员',key:'CAIGOUYUAN',type:'select', selectOption:'buyerList',multiple:true},
  {prop:'cartypeProIds',label:'车型项目',key:'CHEXINGXIANGMU',type:'select', selectOption:'carProjectOptions',multiple:true},
  {prop:'cartypeStatus',label:'车型项目状态',key:'CHEXINGXIANGMUZHUANGTAI',type:'select', selectOption:'statusList'},
]

export const delayAnalysisSearchList = [
  {prop:'cartypeProId',label:'车型项目',key:'CHEXINGXIANGMU',type:'select', selectOption:'cartypeProId'},
  {prop:'rfq',label:'RFQ',key:'RFQ',type:'input' },
  {prop:'materialGroup',label:'材料组',key:'CAILIAOZU',type:'input' },
  {prop:'part',label:'零件编号/零件名称',key:'LINGJIANBIANHAO/LINGJIANMINGCHENG',type:'input' },
  {prop:'partType',label:'零件类型',key:'LINGJIANLEIXING',type:'select', selectOption:'partType'},
  {prop:'cartypeStatus',label:'车型项目状态',key:'CHEXINGXIANGMUZHUANGTAI',type:'select', selectOption:'cartypeStatus'},
  {prop:'delayLevel',label:'延迟级别',key:'YANCHIJIBIE',type:'select', selectOption:'delayLevel'},
  {prop:'delayReason',label:'延迟原因',key:'YANCHIYUANYIN',type:'input' },
  {prop:'completionStatus',label:'完成状况',key:'WANCHENGZHUANGKUANG',type:'select', selectOption:'completionStatus'},
  {prop:'supplierName',label:'供应商',key:'GONGYINGSHANG',type:'input' },
]

export const progressDetailSearchList = [
  {prop:'dept',label:'材料组',key:'CAILIAOZU',type:'select', selectOption:'deptOptions' },
  {prop:'part',label:'零件',key:'LINGJIAN',type:'select', selectOption:'partList' },
  {prop:'supplier',label:'供应商',key:'GONGYINGSHANG',type:'select', selectOption:'supplierList' },
]

export const kickOffSearchList = [
  {prop:'carTypeProId',label:'车型项目',key:'CHEXINGXIANGMU',type:'select', selectOption:'carProjectOptions',disabled:true},
  // {prop:'cartypePro',label:'车型项目',key:'',type:'input',disabled:true},
  {prop:'materialGroupNameZh',label:'材料组',key:'',type:'input'},
  {prop:'rfq',label:'RFQ',key:'',type:'input'},
  {prop:'partNum',label:'零件号',key:'',type:'input'},
  {prop:'partName',label:'零件名称',key:'',type:'input'},
  {prop:'partType',label:'零件类型',key:'',type:'select', selectOption:'partTypeOptions'},
  {prop:'supplier',label:'供应商',key:'',type:'input'},
  {prop:'completion',label:'进度状态',key:'',type:'select', selectOption:'proessOptions'},
]