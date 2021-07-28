/*
 * @Author: wentliao
 * @Date: 2021-07-28 16:11:15
 * @Description: 
 */


// 搜索
export const searchList = [
    {props:'a',label:'AEKO号',type:'input',labelKey:'LK_AEKOHAO_MANAGE'},
    {props:'b',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
    {props:'d',label:'⻋型项⽬',type:'input',labelKey:'LK_AEKOCHEXINGXIANGMU'},
    {props:'g',label:'AEKO状态',type:'select',labelKey:'LK_AEKOZHUANGTAI',selectOption:'g',multiple:true},
    {props:'h',label:'封面状态',type:'select',labelKey:'LK_AEKOFENGMIANZHUANGTAI',selectOption:'h',multiple:true},
    {props:'e',label:'车型',type:'input',labelKey:'LK_AEKO_CHEXING',selectOption:'e'},
    {props:'f',label:'分派日期',type:'datePicker',labelKey:'LK_AEKOFENPAIRIQI'},
    {props:'g',label:'截至日期',type:'datePicker',labelKey:'LK_AEKOJIEZHIRIQI'},
  ]
  
  // 表头
  export const tableTitle = [
      { props: "a", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true },
      { props: "b", name: "⽇志", key: "LK_RIZHI", tooltip: true },
      { props: "c", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
      { props: "f", name: "车型项目", key: "LK_AEKOCHEXINGXIANGMU", tooltip: true },
      { props: "d", name: "AEKO状态", key: "LK_AEKOZHUANGTAI", tooltip: true },
      { props: "e", name: "封⾯状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
      { props: "g", name: "分派日期", key: "LK_AEKOFENPAIRIQI", tooltip: true },
      { props: "h", name: "截至日期", key: "LK_AEKOJIEZHIRIQI", tooltip: true },
      { props: "i", name: "审批单", key: "LK_AEKOSHENPIDAN" },
  ]
  
  // 查看附件表头
  export const filesTableTitle = [
    {name:'文件名',key:'LK_WENJIANMING',props:'fileName'},
    {name:'上传日期',key:'LK_SHANGCHUANRIQI',props:'uploadDate'},
    {name:'来源',key:'LK_AEKO_FILES_LAIYUAN',props:'a'},
    {name:'上传人',key:'LK_SHANGCHUANREN',props:'uploadBy'},
    {name:'大小',key:'LK_DAXIAO',props:'size'},
  ]
  