/*
 * @Author: wentliao
 * @Date: 2021-09-28 13:48:48
 * @Description: 零件清单相关
 */

// 搜索
export const searchList = [
    {props:'buyerName',label:'专业采购员',type:'select',labelKey:'LK_AEKO_PARTS_ZHUANYECAIGOUYUAN',selectOption:'buyerName',permissionKey:'AEKO_PARTSLIST_SELECT_ZHUANYECAIGOUYUAN|专业采购员',noShowAll:true,filterable:true,clearable:true},
    {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_PARTSLIST_INPUT_PARTNUM|零件号'},
    {props:'cartypeCode',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',isNewSelect:true,permissionKey:'AEKO_PARTSLIST_SELECT_CARTYPECODE|⻋型项⽬',selectOption:'cartypeCode',filterable:true,noShowAll:true,clearable:true,multiple:true,},
    {props:'cartype',label:'车型',type:'select',isNewSelect:true,labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO__PARTSLIST_SELECT_CARTYPE|车型',selectOption:'cartype',multiple:true,filterable:true,clearable:true,noShowAll:true,},
    {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',permissionKey:'AEKO_PARTSLIST_SELECT_LINIEDEPtNUM|科室',selectOption:'linieDeptNumList',filterable:true,clearable:true,multiple:true,},
  ]


  // 表头
  export const tableTitle = [
    { props: "partNum", name: "零件号 ", key: "LK_LINGJIANHAO", tooltip: true },
    { props: "partNameZh", name: "零件名称", key: "LK_LINGJIANMINGCHENG", tooltip: true },
    { props: "changeType", name: "变更类型", key: "LK_AEKOBIANGENGLEIXING", tooltip: true },
    { props: "prNumber", name: "PR号", key: "LK_AEKOPRHAO", tooltip: true },
    { props: "cartypeZh", name: "涉及⻋型项⽬/⻋型", key: "LK_AEKOSHEJICHEXINGXIANGMUCHEXING", tooltip: true,width:130 },
    { props: "linieDeptName", name: "科室", key: "LK_AEKOKESHI", tooltip: true },
    { props: "buyerName", name: "专业采购员", key: "LK_AEKO_PARTS_ZHUANYECAIGOUYUAN", tooltip: true },
  ]