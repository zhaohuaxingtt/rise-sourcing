/*
 * @Author: wentliao
 * @Date: 2021-07-28 11:11:32
 * @Description: ；零件清单相关data
 */
export const SearchList = [
  {props:'b',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
  {props:'a',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG'},
  {props:'d',label:'⻋型项⽬',type:'input',labelKey:'LK_AEKOCHEXINGXIANGMU'},
  {props:'c',label:'科室',type:'input',labelKey:'LK_AEKOKESHI'},
  {props:'i',label:'Linie',type:'input',labelKey:'LK_AEKOLINIE'},
  {props:'f',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'f'},
  {props:'e',label:'车型',type:'select',labelKey:'LK_AEKO_CHEXING',selectOption:'e'},
]


export const tableTitle = [
    { props: "a", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
    { props: "b", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
    { props: "c", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
    { props: "d", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
    { props: "e", name: "品牌", key: "LK_AEKOPINGPAI", tooltip: true },
    { props: "f", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
    { props: "g", name: "创建⽇期", key: "LK_AEKOCHUANGJIANRIQI", tooltip: true },
    { props: "h", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
    { props: "operate", name: "操作", key: "LK_CAOZUO" },
    { props: "j", name: "Linie", key: "LK_AEKO_LINIE", tooltip: true },
    { props: "k", name: "退回原因", key: "LK_TUIHUIYUANYIN", tooltip: true },
]

export const linieSearchList = [
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG'},
  {props:'cartypeCode',label:'⻋型项⽬',type:'input',labelKey:'LK_AEKOCHEXINGXIANGMU'},
  {props:'linieDeptNum',label:'科室',type:'input',labelKey:'LK_AEKOKESHI'},
  {props:'i',label:'Linie',type:'input',labelKey:'LK_AEKOLINIE'},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'f'},
  {props:'e',label:'车型',type:'select',labelKey:'LK_AEKO_CHEXING',selectOption:'e'},
]

export const linieQueryForm = {
  brand: "",
  cartypeCode: [],
  partNameZh: "",
  partNum: ""
}

export const linieTableTitle = [
  { props: "partNum", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
  { props: "partNameZh", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
  { props: "changeType", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
  { props: "prNumber", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
  { props: "brand", name: "品牌", key: "LK_AEKOPINGPAI", tooltip: true },
  { props: "carTypeZh", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
  { props: "linieDeptName", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
  { props: "buyerName", name: "Linie", key: "LK_AEKO_LINIE", tooltip: true },
  { props: "aekoPartStatus", name: "内容状态", key: "LK_AEKO_NEIRONGZHUANGTAI", tooltip: true },
]