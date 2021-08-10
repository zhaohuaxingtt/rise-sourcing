/*
 * @Author: wentliao
 * @Date: 2021-07-28 16:11:15
 * @Description: 
 */


// 搜索
export const searchList = [
    {props:'aekoCode',label:'AEKO号',type:'input',labelKey:'LK_AEKOHAO_MANAGE'},
    {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
    {props:'cartypeProjectCodeList',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',selectOption:'cartypeProjectCodeList',multiple:true,filterable:true,noShowAll:true,clearable:true},
    {props:'aekoStatusList',label:'AEKO状态',type:'select',labelKey:'LK_AEKOZHUANGTAI',selectOption:'aekoStatusList',multiple:true,clearable:true,noShowAll:true},
    {props:'coverStatusList',label:'封面状态',type:'select',labelKey:'LK_AEKOFENGMIANZHUANGTAI',selectOption:'coverStatusList',multiple:true,clearable:true,noShowAll:true},
    {props:'cartypeCodeList',label:'车型',type:'select',labelKey:'LK_AEKO_CHEXING',selectOption:'cartypeCodeList',multiple:true,filterable:true,clearable:true},
    {props:'linieAssignTime',label:'分派日期',type:'datePicker',labelKey:'LK_AEKOFENPAIRIQI'},
    {props:'deadLine',label:'截至日期',type:'datePicker',labelKey:'LK_AEKOJIEZHIRIQI'},
  ]
  
  // 表头
  export const tableTitle = [
      { props: "aekoCode", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true },
      { props: "log", name: "⽇志", key: "LK_RIZHI", tooltip: true },
      { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
      { props: "cartypeCode", name: "车型项目", key: "LK_AEKOCHEXINGXIANGMU", tooltip: true },
      { props: "aekoStatus", name: "AEKO状态", key: "LK_AEKOZHUANGTAI", tooltip: true },
      { props: "coverStatus", name: "封⾯状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
      { props: "linieAssignTime", name: "分派日期", key: "LK_AEKOFENPAIRIQI", tooltip: true },
      { props: "deadLine", name: "截至日期", key: "LK_AEKOJIEZHIRIQI", tooltip: true },
      { props: "approval", name: "审批单", key: "LK_AEKOSHENPIDAN" },
  ]
  
  // 查看附件表头
  export const filesTableTitle = [
    {name:'文件名',key:'LK_WENJIANMING',props:'fileName'},
    {name:'上传日期',key:'LK_SHANGCHUANRIQI',props:'uploadDate'},
    {name:'来源',key:'LK_AEKO_FILES_LAIYUAN',props:'a'},
    {name:'上传人',key:'LK_SHANGCHUANREN',props:'uploadBy'},
    {name:'大小',key:'LK_DAXIAO',props:'size'},
  ]
  