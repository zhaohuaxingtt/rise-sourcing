/*
 * @Author: wentliao
 * @Date: 2021-07-28 11:11:32
 * @Description: ；零件清单相关data
 */
export const SearchList = [
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_PARTNUM'},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_PARTNAME'},
  {props:'cartypeCode',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_CARTYPECODE',selectOption:'cartypeCode',showCode:'Aeko',multiple:true,filterable:true},
  {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',selectOption:'linieDeptNumList',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_LINIEDEP',filterable:true,multiple:true,},
  {props:'buyerName',label:'Linie',type:'select',labelKey:'LK_AEKOLINIE',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_BUYERNAME',selectOption:'buyerName',noShowAll:true,filterable:true,clearable:true},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_BRAND',selectOption:'brand'},
  {props:'cartype',label:'车型',type:'select',labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_CARTYPE',selectOption:'cartype',multiple:true,showCode:'AeA',filterable:true},
]


export const tableTitle = [
    { props: "partNum", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
    { props: "partNameZh", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
    { props: "changeTypeDesc", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
    { props: "prNumber", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
    { props: "brand", name: "品牌", key: "LK_AEKOPINGPAI", tooltip: true },
    { props: "cartypeZh", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
    { props: "linieDeptName", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
    { props: "operate", name: "操作", key: "LK_CAOZUO" },
    { props: "buyerName", name: "Linie", key: "LK_AEKO_LINIE", tooltip: true },
    { props: "withdrawReason", name: "退回原因", key: "LK_TUIHUIYUANYIN", tooltip: true },
]

export const linieSearchList = [
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey: "AEKO_AEKODETAIL_PARTLIST_INPUT_PARTNUM"},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey: "AEKO_AEKODETAIL_PARTLIST_INPUT_PARTNAMEZH"},
  {props:'cartypeCode',label:'⻋型项⽬',type:'select',multiple:true,labelKey:'LK_AEKOCHEXINGXIANGMU',showCode:'aeko/mp',permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_CARTYPECODE"},
  {props:'linieDeptNum',label:'科室',type:'input',labelKey:'LK_AEKOKESHI', disabled:true,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_LINIEDEPTNUM"},
  {props:'buyerName',label:'Linie',type:'input',labelKey:'LK_AEKOLINIE',disabled:true,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_LINIE"},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand',permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_BRAND"},
  {props:'cartypeCode',label:'车型',type:'select',multiple:true,labelKey:'LK_AEKO_CHEXING',selectOption:'cartypeCode',showCode:'AeA',permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_CARTYPECODE"},
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
  { props: "aekoPartStatusDesc", name: "内容状态", key: "LK_AEKO_NEIRONGZHUANGTAI", tooltip: true },
]