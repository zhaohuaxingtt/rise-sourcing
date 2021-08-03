/*
 * @Author: wentliao
 * @Date: 2021-07-26 17:14:03
 * @Description:  aeko管理页相关data
 */

// 搜索
export const searchList = [
  {props:'aekoCode',label:'AEKO号',type:'input',labelKey:'LK_AEKOHAO_MANAGE'},
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
  {props:'linieDeptNum',label:'科室',type:'input',labelKey:'LK_AEKOKESHI'},
  {props:'cartypeCode',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',selectOption:'cartypeCode',filterable:true},
  {props:'frozenDate',label:'冻结⽇期',type:'datePicker',labelKey:'LK_AEKODONGJIERIQI'},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand'},
  {props:'aekoStatusList',label:'AEKO状态',type:'select',labelKey:'LK_AEKOZHUANGTAI',selectOption:'aekoStatusList',multiple:true},
  {props:'coverStatusList',label:'封面状态',type:'select',labelKey:'LK_AEKOFENGMIANZHUANGTAI',selectOption:'coverStatusList',multiple:true},
  {props:'buyerName',label:'Linie',type:'input',labelKey:'LK_AEKOLINIE'},
]

// 表头
export const tableTitle = [
    { props: "aekoCode", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true },
    { props: "log", name: "⽇志", key: "LK_RIZHI", tooltip: true },
    { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
    { props: "aekoStatus", name: "AEKO状态", key: "LK_AEKOZHUANGTAI", tooltip: true },
    { props: "coverStatus", name: "封⾯状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
    { props: "tcmResult", name: "狼堡决议", key: "LK_AEKOLANGBAOJUEYI", tooltip: true },
    { props: "createDate", name: "创建⽇期", key: "LK_AEKOCHUANGJIANRIQI", tooltip: true },
    { props: "deadLine", name: "截⽌⽇期", key: "LK_AEKOJIEZHIRIQI", tooltip: true },
    { props: "frozenDate", name: "冻结⽇期", key: "LK_AEKODONGJIERIQI", tooltip: true },
]

// 查看附件表头
export const filesTableTitle = [
  {name:'文件名',key:'LK_WENJIANMING',props:'fileName'},
  {name:'上传日期',key:'LK_SHANGCHUANRIQI',props:'uploadDate'},
  {name:'来源',key:'LK_AEKO_FILES_LAIYUAN',props:'source'},
  {name:'上传人',key:'LK_SHANGCHUANREN',props:'uploadBy'},
  {name:'大小',key:'LK_DAXIAO',props:'fileSize'},
]
