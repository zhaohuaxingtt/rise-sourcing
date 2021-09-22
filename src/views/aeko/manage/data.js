/*
 * @Author: wentliao
 * @Date: 2021-07-26 17:14:03
 * @Description:  aeko管理页相关data
 */

// 搜索
export const searchList = [
  {props:'aekoCode',label:'AEKO号',type:'input',labelKey:'LK_AEKOHAO_MANAGE',permissionKey:'AEKO_MANAGELIST_INPUT_AEKOCODE|AEKO号'},
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_MANAGELIST_INPUT_PARTNUM|零件号'},
  {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',permissionKey:'AEKO_MANAGELIST_SELECT_LINIEDEPtNUM|科室',selectOption:'linieDeptNumList',filterable:true,clearable:true,multiple:true,},
  {props:'carTypeCodeList',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',isNewSelect:true,permissionKey:'AEKO_MANAGELIST_SELECT_CARTYPECODE|⻋型项⽬',selectOption:'carTypeCodeList',filterable:true,noShowAll:true,clearable:true,multiple:true,},
  {props:'frozenDate',label:'冻结⽇期',type:'datePicker',labelKey:'LK_AEKODONGJIERIQI',permissionKey:'AEKO_MANAGELIST_DATEPICKER_FROZENDATE|冻结⽇期',},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand',permissionKey:'AEKO_MANAGELIST_SELECT_BRAND|品牌'},
  {props:'aekoStatusList',label:'AEKO状态',type:'select',labelKey:'LK_AEKOZHUANGTAI',selectOption:'aekoStatusList',permissionKey:'AEKO_MANAGELIST_SELECT_AEKOSTATUS|AEKO状态',multiple:true,clearable:true},
  {props:'coverStatusList',label:'封面状态',type:'select',labelKey:'LK_AEKOFENGMIANZHUANGTAI',selectOption:'coverStatusList',permissionKey:'AEKO_MANAGELIST_SELECT_COVERSTATUS|封面状态',multiple:true,clearable:true},
  {props:'buyerName',label:'Linie',type:'select',labelKey:'LK_AEKOLINIE',selectOption:'buyerName',permissionKey:'AEKO_MANAGELIST_SELECT_BUYERNAME|Linie',noShowAll:true,filterable:true,clearable:true},
]

// 表头
export const tableTitle = [
    { props: "aekoCode", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true,width:140 },
    { props: "log", name: "⽇志", key: "LK_RIZHI", tooltip: true },
    { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
    { props: "aekoStatusDesc", name: "AEKO状态", key: "LK_AEKOZHUANGTAI", tooltip: true },
    { props: "coverStatusDesc", name: "封⾯状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
    { props: "tcmResultDesc", name: "狼堡决议", key: "LK_AEKOLANGBAOJUEYI", tooltip: true },
    { props: "createDate", name: "创建⽇期", key: "LK_AEKOCHUANGJIANRIQI", tooltip: true },
    { props: "deadLine", name: "截⽌⽇期", key: "LK_AEKOJIEZHIRIQI", tooltip: true },
    { props: "frozenDate", name: "冻结⽇期", key: "LK_AEKODONGJIERIQI", tooltip: true },
]

// 查看附件表头
export const filesTableTitle = [
  {name:'文件名',key:'LK_WENJIANMING',props:'fileName'},
  {name:'上传日期',key:'LK_SHANGCHUANRIQI',props:'uploadDate'},
  {name:'来源',key:'LK_AEKO_FILES_LAIYUAN',props:'sourceDesc'},
  {name:'上传人',key:'LK_SHANGCHUANREN',props:'uploadBy'},
  {name:'大小',key:'LK_DAXIAO',props:'fileSize'},
]

// TCM导入清单-搜索
export const tcmSearchList = [
  {props:'aekoCode',label:'AEKO号',type:'input',key:'LK_AEKOHAO_MANAGE',permissionKey:'AEKO_TCMLIST_INPUT_AEKOCODE|AEKO号'},
  {props:'a',label:'收到日期',type:'datePicker',key:'LK_AEKO_SHOUDAORIQI'},
  {props:'b',label:'状态',type:'select',key:'LK_ZHUANGTAI',selectOption:'status'},
]

// TCM导入清单表头
export const tcmTableTitle = [
  { props: "aekoCode", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true,width:140 },
  { props: "a", name: "标题", key: "LK_TCMLIST_TABLE_TITLE", tooltip: true },
  { props: "b", name: "收到⽇期", key: "LK_TCMLIST_TABLE_SHOUDAORIQI", tooltip: true },
  { props: "d", name: "状态", key: "LK_TCMLIST_TABLE_STATUS", tooltip: true },
]