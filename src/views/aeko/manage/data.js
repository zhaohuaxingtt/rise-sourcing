/*
 * @Author: wentliao
 * @Date: 2021-07-26 17:14:03
 * @Description:  aeko管理页相关data
 */

// 搜索
export const searchList = [
  {props:'a',label:'AEKO号',type:'input',labelKey:'LK_AEKOHAO_MANAGE'},
  {props:'b',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
  {props:'c',label:'科室',type:'input',labelKey:'LK_AEKOKESHI'},
  {props:'d',label:'⻋型项⽬',type:'input',labelKey:'LK_AEKOCHEXINGXIANGMU'},
  {props:'e',label:'冻结⽇期',type:'datePicker',labelKey:'LK_AEKODONGJIERIQI'},
  {props:'f',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'f'},
  {props:'g',label:'AEKO状态',type:'select',labelKey:'LK_AEKOZHUANGTAI',selectOption:'g',multiple:true},
  {props:'h',label:'封面状态',type:'select',labelKey:'LK_AEKOFENGMIANZHUANGTAI',selectOption:'h',multiple:true},
  {props:'i',label:'Linie',type:'input',labelKey:'LK_AEKOLINIE'},
]

// 表头
export const tableTitle = [
    { props: "a", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true },
    { props: "b", name: "⽇志", key: "LK_RIZHI", tooltip: true },
    { props: "c", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
    { props: "d", name: "AEKO状态", key: "LK_AEKOZHUANGTAI", tooltip: true },
    { props: "e", name: "封⾯状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
    { props: "f", name: "狼堡决议", key: "LK_AEKOLANGBAOJUEYI", tooltip: true },
    { props: "g", name: "创建⽇期", key: "LK_AEKOCHUANGJIANRIQI", tooltip: true },
    { props: "h", name: "截⽌⽇期", key: "LK_AEKOJIEZHIRIQI", tooltip: true },
    { props: "i", name: "冻结⽇期", key: "LK_AEKODONGJIERIQI", tooltip: true },
]
