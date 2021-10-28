/*
 * @Author: wentliao
 * @Date: 2021-10-26 14:27:46
 * @Description: AEKO查看相关
 */


export const SearchList = [
    {props:'aekoCode',label:'AEKO号',type:'input',labelKey:'LK_AEKOHAO_MANAGE',permissionKey:'AEKO_CHECKLIST_INPUT_AEKOCODE|AEKO号'},
    {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_CHECKLIST_INPUT_PARTNUM|零件号'},
    {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',permissionKey:'AEKO_CHECKLIST_SELECT_LINIEDEPtNUM|科室',selectOption:'linieDeptNumList',filterable:true,clearable:true,multiple:true,},
    {props:'cartypeCode',label:'车型',type:'select',isNewSelect:true,labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO_CHECKLIST_SELECT_CARTYPE|车型',selectOption:'cartypeCode',multiple:true,filterable:true,clearable:true,noShowAll:true,},
    {props:'carTypeCodeList',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',isNewSelect:true,permissionKey:'AEKO_CHECKLIST_SELECT_CARTYPECODE|⻋型项⽬',selectOption:'carTypeCodeList',filterable:true,noShowAll:true,clearable:true,multiple:true,},
    {props:'buyerId',label:'专业采购员',type:'select',labelKey:'LK_AEKO_PARTS_ZHUANYECAIGOUYUAN',selectOption:'buyerId',permissionKey:'AEKO_CHECKLIST_SELECT_ZHUANYECAIGOUYUAN|专业采购员',noShowAll:false,filterable:true,clearable:true,isNewSelect: true,},
    {props:'aekoStatusList',label:'AEKO状态',type:'select',labelKey:'LK_AEKOZHUANGTAI',selectOption:'aekoStatusList',permissionKey:'AEKO_CHECKLIST_SELECT_AEKOSTATUS|AEKO状态',multiple:true,clearable:true},
    {props:'coverStatusList',label:'封面状态',type:'select',labelKey:'LK_AEKOFENGMIANZHUANGTAI',selectOption:'coverStatusList',permissionKey:'AEKO_CHECKLIST_SELECT_COVERSTATUS|封面状态',multiple:true,clearable:true},
    {props:'frozenDate',label:'冻结⽇期',type:'datePicker',labelKey:'LK_AEKODONGJIERIQI',permissionKey:'AEKO_CHECKLIST_DATEPICKER_FROZENDATE|冻结⽇期',}, 
    {props:'brand',label:'品牌',type:'select',labelKey:'LK_AEKOPINGPAI',selectOption:'brand',permissionKey:'AEKO_CHECKLIST_SELECT_BRAND|品牌'},
]

// 表头
export const tableTitle = [
    { props: "aekoCode", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true,width:140 },
    { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
    { props: "aekoStatusDesc", name: "AEKO状态", key: "LK_AEKOZHUANGTAI", tooltip: true },
    { props: "coverStatusDesc", name: "封⾯状态", key: "LK_AEKOFENGMIANZHUANGTAI", tooltip: true },
    // 这里需要插入一个内容状态
    { props: "aekoPartStatusDesc", name: "内容状态", key: "LK_AEKO_NEIRONGZHUANGTAI", tooltip: true },
    
    { props: "tcmResultDesc", name: "狼堡决议", key: "LK_AEKOLANGBAOJUEYI", tooltip: true },
    { props: "createDate", name: "创建⽇期", key: "LK_AEKOCHUANGJIANRIQI", tooltip: true },
    { props: "deadLine", name: "截⽌⽇期", key: "LK_AEKOJIEZHIRIQI", tooltip: true },
    { props: "frozenDate", name: "冻结⽇期", key: "LK_AEKODONGJIERIQI", tooltip: true },
    { props: "assignsheet", name: "审批单", key: "LK_AEKOSHENPIDAN", tooltip: true },
]