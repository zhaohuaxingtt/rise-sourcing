/*
 * @Author: wentliao
 * @Date: 2021-07-28 11:11:32
 * @Description: ；零件清单相关data
 */
export const SearchList = [
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO'},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG'},
  {props:'cartypeCode',label:'⻋型项⽬',type:'input',labelKey:'LK_AEKOCHEXINGXIANGMU',showCode:'aeko/mp'},
  {props:'linieDeptNum',label:'科室',type:'input',labelKey:'LK_AEKOKESHI'},
  {props:'buyerName',label:'Linie',type:'input',labelKey:'LK_AEKOLINIE'},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand'},
  {props:'cartypeCode',label:'车型',type:'select',labelKey:'LK_AEKO_CHEXING',selectOption:'cartypeCode',showCode:'AeA',filterable:true},
]


export const tableTitle = [
    { props: "partNum", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
    { props: "partNameZh", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
    { props: "changeType", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
    { props: "prNumber", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
    { props: "brand", name: "品牌", key: "LK_AEKOPINGPAI", tooltip: true },
    { props: "cartypeZh", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
    { props: "linieDeptName", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
    { props: "operate", name: "操作", key: "LK_CAOZUO" },
    { props: "buyerName", name: "Linie", key: "LK_AEKO_LINIE", tooltip: true },
    { props: "withdrawReason", name: "退回原因", key: "LK_TUIHUIYUANYIN", tooltip: true },
]

export const linieTableTitle = [
  { props: "a", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
  { props: "b", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
  { props: "c", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
  { props: "d", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
  { props: "e", name: "品牌", key: "LK_AEKOPINGPAI", tooltip: true },
  { props: "f", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
  { props: "g", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
  { props: "h", name: "Linie", key: "LK_AEKO_LINIE", tooltip: true },
  { props: "i", name: "内容状态", key: "LK_AEKO_NEIRONGZHUANGTAI", tooltip: true },
]