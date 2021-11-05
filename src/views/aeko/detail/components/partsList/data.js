/*
 * @Author: wentliao
 * @Date: 2021-07-28 11:11:32
 * @Description: ；零件清单相关data
 */
export const SearchList = [
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_PARTNUM|零件号'},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_PARTNAME|零件名称'},
  {props:'cartypeCode',label:'⻋型项⽬',isNewSelect:true,type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_CARTYPECODE|⻋型项⽬',selectOption:'cartypeCode',showCode:['Aeko','MP'],multiple:true,filterable:true},
  {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',selectOption:'linieDeptNumList',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_LINIEDEP|科室',filterable:true,multiple:true,},
  {props:'buyerName',label:'Linie',type:'select',labelKey:'LK_AEKOLINIE',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_BUYERNAME|Linie',selectOption:'buyerName',noShowAll:true,filterable:true,clearable:true},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_BRAND|品牌',selectOption:'brand'},
  {props:'cartype',label:'车型',isNewSelect:true,type:'select',labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_CARTYPE|车型',selectOption:'cartype',multiple:true,showCode:['AeA'],filterable:true},
  {props:'sendStatus',label:'分派状态',type:'select',labelKey:'LK_AEKO_FENPAIZHUANGTAI',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_FENPAIZHUANGTAI|分派状态',selectOption:'sendStatus',clearable:true,isDicoptions:true,dicoptionKey:'AEKO_SEND_STATUS'}
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

export const commodityTableTitle = [
  { props: "partNum", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
  { props: "partNameZh", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
  { props: "changeType", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
  { props: "prNumber", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
  { props: "brand", name: "品牌", key: "LK_AEKOPINGPAI", tooltip: true },
  { props: "cartypeZh", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
  { props: "linieDeptName", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
  { props: "buyerName", name: "Linie", key: "LK_AEKO_LINIE", tooltip: true },
  { props: "operate", name: "操作", key: "LK_CAOZUO" },
  { props: "aekoPartStatusDesc", name: "内容状态", key: "LK_AEKO_NEIRONGZHUANGTAI", tooltip: true },
]

export const linieSearchList = [
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey: "AEKO_AEKODETAIL_PARTLIST_INPUT_PARTNUM|零件号-LINIE"},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey: "AEKO_AEKODETAIL_PARTLIST_INPUT_PARTNAMEZH|零件名称-LINIE"},
  {props:'cartypeCode',label:'⻋型项⽬',type:'select',selectOption:'cartypeCode',multiple:true,labelKey:'LK_AEKOCHEXINGXIANGMU',showCode:['Aeko','MP'],permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_CARTYPECODE|⻋型项⽬-LINIE"},
  {props:'linieDeptNumList',label:'科室',selectOption:'linieDeptNumList',type:'select',labelKey:'LK_AEKOKESHI', disabled:false,filterable:true,multiple:true,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_LINIEDEPTNUM|科室-LINIE"},
  {props:'buyerName',label:'Linie',selectOption:'buyerName',type:'select',noShowAll:true,clearable:true,labelKey:'LK_AEKOLINIE',disabled:false,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_LINIE|Linie-LINIE"},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand',permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_BRAND|品牌-LINIE"},
  {props:'cartype',label:'车型',type:'select',multiple:true,labelKey:'LK_AEKO_CHEXING',selectOption:'cartypeCode',showCode:['AeA'],permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_CARTYPECODE|车型-LINIE"},
]

export const checkSearchList=[
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey: "AEKO_AEKODETAIL_PARTLIST_INPUT_PARTNUM|零件号-LINIE"},
  {props:'partNameZh',label:'零件名称',type:'input',labelKey:'LK_LINGJIANMINGCHENG',permissionKey: "AEKO_AEKODETAIL_PARTLIST_INPUT_PARTNAMEZH|零件名称-LINIE"},
  // 内容状态
  {props:'contentStatusList',label:'内容状态',type:'select',clearable:true,labelKey:'LK_AEKO_NEIRONGZHUANGTAI',selectOption:'contentStatusList',disabled:false,filterable:true,multiple:true,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_NEIRONGZHUANGTAI|内容状态-搜索栏"},
  {props:'linieDeptNumList',label:'科室',selectOption:'linieDeptNumList',type:'select',labelKey:'LK_AEKOKESHI', disabled:false,filterable:true,multiple:true,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_LINIEDEPTNUM|科室-LINIE"},
  {props:'buyerName',label:'Linie',selectOption:'buyerName',type:'select',noShowAll:true,clearable:true,labelKey:'LK_AEKOLINIE',disabled:false,permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_LINIE|Linie-LINIE"},
  {props:'cartype',label:'车型',isNewSelect:true,type:'select',labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_INPUT_CARTYPE|车型',selectOption:'cartype',multiple:true,showCode:['AeA'],filterable:true},
  {props:'cartypeCode',label:'⻋型项⽬',isNewSelect:true,type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',permissionKey:'AEKO_DETAIL_TAB_LINGJIANQINGDAN_SELECT_CARTYPECODE|⻋型项⽬',selectOption:'cartypeCode',showCode:['Aeko','MP'],multiple:true,filterable:true},
  {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand',permissionKey: "AEKO_AEKODETAIL_PARTLIST_SELECT_BRAND|品牌-LINIE"},
]

export const linieQueryForm = {
  brand: "",
  cartypeCode:[''],
  cartype:[''],
  partNameZh: "",
  partNum: "",
  linieDeptNumList:[''],
  buyerName:'',
  contentStatusList:[''],
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


// 新增零件表单
export const addPartsForm = [
  {props:'partNameZh',label:'零件名(中)',labelKey:'LK_LINGJIANMINGZHONG'},
  {props:'partNameDe',label:'零件名(德)',labelKey:'LK_LINGJIANMINGDE'},
  {props:'bmg',label:'BMG',labelKey:'LK_BMG',isBoolean:true},
  {props:'unitNameZh',label:'零件单位',labelKey:'LK_LINGJIANDANWEI'},
  {props:'changeType',label:'变更类型',labelKey:'LK_AEKOBIANGENGLEIXING',required:true,type:'select',selectOption:'changeType'},
  {props:'pid',label:'涉及PID',labelKey:'LK_AEKO_SHEJIPID',required:true,type:'select',selectOption:'pid',multiple:true,filterable:true,clearable:true},
  {props:'perCarDosage',label:'每⻋⽤量',labelKey:'LK_AEKO_ADDPARTS_MEICHEYONGLIANG',required:true,type:'input'},
]