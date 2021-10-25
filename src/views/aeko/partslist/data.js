/*
 * @Author: wentliao
 * @Date: 2021-09-28 13:48:48
 * @Description: 零件清单相关
 */

// 搜索
export const searchList = [
    {props:'buyerId',label:'专业采购员',type:'select',labelKey:'LK_AEKO_PARTS_ZHUANYECAIGOUYUAN',selectOption:'buyerId',permissionKey:'AEKO_PARTSLIST_SELECT_ZHUANYECAIGOUYUAN|专业采购员',noShowAll:false,filterable:true,clearable:true,isNewSelect: true,searchKey: 'pinyin'},
    {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_PARTSLIST_INPUT_PARTNUM|零件号'},
    {props:'cartypeCode',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',isNewSelect:true,permissionKey:'AEKO_PARTSLIST_SELECT_CARTYPECODE|⻋型项⽬',showCode:['AEKO','MP'],selectOption:'cartypeCode',filterable:true,noShowAll:true,clearable:true,multiple:true, searchKey: 'pinyin'},
    {props:'cartype',label:'车型',type:'select',isNewSelect:true,labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO__PARTSLIST_SELECT_CARTYPE|车型',selectOption:'cartype',showCode:['AEA'],multiple:true,filterable:true,clearable:true,noShowAll:true, searchKey: 'pinyin'},
    {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',permissionKey:'AEKO_PARTSLIST_SELECT_LINIEDEPtNUM|科室',selectOption:'linieDeptNumList',filterable:true,clearable:true,multiple:true,isNewSelect: true,searchKey: 'pinyin'},
  ]


  // 表头
  export const tableTitle = [
    { props: "partNum", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
    { props: "partNameZh", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
    { props: "changeType", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
    { props: "prNumber", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
    { props: "cartypeZh", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
    { props: "linieDeptNum", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
    { props: "buyerName", name: "专业采购员", key: "LK_AEKO_PARTS_ZHUANYECAIGOUYUAN", tooltip: true },
  ]

  // aeko/CSF搜索
export const aekoCSFsearchList = [
  {props: "partNameZh", name: "零件名", labelKey: "LK_LINGJIANMING", tooltip: true },
  {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_PARTSLIST_INPUT_PARTNUM|零件号'},
  {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',permissionKey:'AEKO_PARTSLIST_SELECT_LINIEDEPtNUM|科室',selectOption:'linieDeptNumList',filterable:true,clearable:true,multiple:true,isNewSelect: true,searchKey: 'pinyin'},
  {props:'cartypeCode',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU', permissionKey:'AEKO_PARTSLIST_SELECT_CARTYPECODE|⻋型项⽬',showCode:['AEKO','MP'],selectOption:'cartypeCode',filterable:true,noShowAll:true,clearable:true,multiple:true,isNewSelect: true,searchKey: 'pinyin'},
  {props:'buyerId',label:'专业采购员',type:'select', labelKey:'LK_AEKO_PARTS_ZHUANYECAIGOUYUAN', selectOption:'buyerId',permissionKey:'AEKO_PARTSLIST_SELECT_ZHUANYECAIGOUYUAN|专业采购员',noShowAll:false,filterable:true,clearable:true,isNewSelect: true,searchKey: 'nameEn'},
]


// aeko/CSF表头
export const aekoCSFtableTitle = [
  { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO", tooltip: true },
  { props: "partNameZh", name: "零件名", key: "LK_LINGJIANMING", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_PARTNAME|零件名', tooltip: true },
  { props: "originPartNum", name: "原零件号", key: "YUANLINGJIANHAO", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_ORIGINPARTNAME|原零件号', tooltip: true },
  { props: "newMsgSheet", name: "新建信息单", key: "LK_XINJIANXINXIDAN", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_NEWSIGNSHEET|新建信息单', tooltip: true },
  { props: "changeTypeDesc", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_CHANGETYPE|变更类型', tooltip: true },
  { props: "prNumber", name: "PR", key: "LK_AEKOPR", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_PRNUMBER|PR', tooltip: true },
  { props: "cartypeZh", name: "涉及⻋型项⽬", key: "LK_AEKOSHEJICHEXINGXIANGMU", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_CARTYPE|涉及⻋型项⽬', tooltip: true,width:130 },
  { props: "linieDeptName", name: "科室", key: "LK_AEKOKESHI", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_LINIEDEPTNAME|科室', tooltip: true },
  { props: "buyerName", name: "采购员", key: "CAIGOUYUAN", permissionKey: 'AEKO_PARTLIST_CSFAEKOPARTLIST_BUYERNAME|采购员', tooltip: true },
]