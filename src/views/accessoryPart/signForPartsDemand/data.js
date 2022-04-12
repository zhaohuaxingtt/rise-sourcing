/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 14:41:07
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-25 13:51:50
 * @Description: 
 * @FilePath: \front-sourcing\src\views\accessoryPart\signForPartsDemand\data.js
 */
export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "BIANHAO", tooltip: true, width: 100, fixed: "left", sortable: true},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, width: 110, fixed: "left", sortable: true},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "PILIANGGONGHUOZONGCHENGHAO", tooltip: true, width: 150, fixed: "left", sortable: true},
  {props:'partNum',name:'配件零件号', key: "PEIJIANLINGJIANHAO", tooltip: true, width: 130, fixed: "left", sortable: true},
  {props:'partNameCh',name:'配件零件中文名', key: "PEIJIANLINGJIANZHONGWENMING", tooltip: true, width: 150, fixed: "left", sortable: true},
  {props:'carType',name:'配件车型', key: "PEIJIANCHEXING", tooltip: true, width: 130, sortable: true},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true,width:105, sortable: true},
  {props:'supplierSapCode',name:'供应商号', key: "GONGYINGSHANGHAO", tooltip: true, width: 105, sortable: true},
  {props:'supplierNameZh',name:'供应商中文名', key: "GONGYINGSHANGZHONGWENMING", tooltip: true, width: 200, sortable: true},
  {props:'sendDate',name:'需求发送日期', key: "XUQIUFASONGRIQI", tooltip: true, width: 140, sortable: true},
  {props:'stateDesc',name:'配件状态', key: "PEIJIANZHUANGTAI", tooltip: true, width: 140, sortable: true},
  {props:'annualQuantity',name:'年需求量', key: "NIANXUQIULIANG", tooltip: true,width:105, sortable: true},
  {props:'csfuserDeptName',name:'询价科室', key: "XUJIAKESHI", tooltip: true,width:105, sortable: true},
  {props:'csfuserName',name:'询价采购员', key: "XUJIACAIGOUYUAN", tooltip: true, width: 120, sortable: true},
  {props:'respDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, width: 115, sortable: true},
  {props:'respLinieName',name:'LINIE', key: "LINIE", tooltip:true, width: 100, sortable: true},
  {props:'partNameDe',name:'配件零件德文名', key: "PEIJIANLINGJIANDEWENMING", tooltip: true, width: 220, sortable: true},
  {props:'supplierSvwTempCode',name:'供应商临时号', key: "GONGYINGSHANGLINGSHIHAO", tooltip: true, width: 135, sortable: true},
  {props:'carProject',name:'配件车型项目', key: "PEIJIANCHEXINGXIANGMU", tooltip: true, width: 160, sortable: true},
  {props:'technicianStaffName',name:'售后技术人员名称', key: "SHOUHOUJISHURENYUANMINGCHENG", tooltip: true, width: 165, sortable: true},
  {props:'brand',name:'品牌', key: "PINPAI", tooltip: true, sortable: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNumFuzzySearch', label: '配件零件号', type: 'input', key: 'PEIJIANLINGJIANHAO',permission: 'APREPART_SIGN_PARTNUM|配件-配件签收-配件零件号'},
  {value: 'partNameCh', label: '配件零件中文名', type: 'input', key: 'PEIJIANLINGJIANZHONGWENMING',permission: 'APREPART_SIGN_PARTNAMECH|配件-配件签收-配件零件中文名'},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'multiLineInput', key: 'GONGYINGSHANGSAPHAO',permission: 'APREPART_SIGN_SUPPLIERSAPCODE|配件-配件签收-供应商SAP号'},
  {value: 'supplierNameZh', label: '供应商中文名', type: 'input', key: 'GONGYINGSHANGZHONGWENMING',permission: 'APREPART_SIGN_SUPPLIERNAMEZH|配件-配件签收-供应商中文名'},
  {value: 'assemblyPartNumFuzzySearch', label: '批量供货总成号', type: 'input', key: 'PILIANGGONGHUOZONGCHENGHAO',permission: 'APREPART_SIGN_ASSEMBLYPARTNUM|配件-配件签收-批量供货总成号'},
  {value: 'spNumFuzzySearch', label: 'SP号', type: 'input', key: 'SPHAO',permission: 'APREPART_SIGN_SPNUM|配件-配件签收-SP号'},
  {value: 'sparePartCodeFuzzySearch', label: '编号', type: 'input', key: 'BIANHAO',permission: 'APREPART_SIGN_CODE|配件-配件签收-编号'},
  {value: 'carType', label: '配件车型', type: 'select', key: 'PEIJIANCHEXING',selectOption: 'cartTypeOptions',permission: 'APREPART_SIGN_CARTYPE|配件-配件签收-配件车型'},
  {value: 'carProject', label: '配件车型项目', type: 'select', key: 'PEIJIANCHEXINGXIANGMU',selectOption: 'cartypeProjectOptions',permission: 'APREPART_SIGN_CARPROJECT|配件-配件签收-配件车型项目'},
  {value: 'state', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: 'accessoryTypeOption',permission: 'APREPART_SIGN_PARTSTATE|配件-配件签收-配件状态'},
  {value: 'csfUserDept', label: '是否有询价科室', type: 'select', key: 'SHIFOUYOUXUNJIAKESHI', selectOption: 'yesOrNoOption',permission: 'APREPART_SIGN_HASDEPT|配件-配件签收-是否有询价科室'},
  {value: 'csfUserId', label: '是否有询价采购员', type: 'select', key: 'SHIFOUYOUXUNJIACAIGOUYUAN', selectOption: 'yesOrNoOption',permission: 'APREPART_SIGN_HASBUYER|配件-配件签收-是否有询价采购员'},
  {value: 'sendDate', label: '需求发送起止日期', type: 'date', key: 'XUQIUFASONGQIZHIRIQI',permission: 'APREPART_SIGN_SENDDATE|配件-配件签收-需求发送起止日期'},
  {value: 'linieApportionStatus', label: 'LINIE分配状态', type: 'select', selectOption: 'linieStatusOption' ,key: 'LINIEFENPEIZHUANGTAI',permission: 'APREPART_SIGN_LINIESTATUS|配件-配件签收-LINIE分配状态'},
  // {value: 'showSelf', label: '是否自己', type: 'select', key: 'SHIFOUZIJI', selectOption: 'trueOrFalseOption',permission: 'APREPART_SIGN_ISME|附件-附件管理-是否自己'},
]

export const TAB = [
  {
    value: 1,
    name: '寻源执行',
    message: 0,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'XUANYUANCAIDAN'
  },
  // {
  //   value: 2,
  //   label: '进度监控',
  //   key: Vue.prototype.$t('partsignLanguage.JinDuJianKong'),
  //   url: '/nomination',
  //   message: 0
  // }
]

export const navManagingDemandList = [
  {
    value: 1,
    name: "配件签收",
    message: 0,
    url: "/sourceinquirypoint/sourcing/signforpartsdemand",
    activePath: "signforpartsdemand",
    key: "LK_PEIJIANXUQIUQIANSHOU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_SIGNFORPARTSDEMAND',
    permissionName: '寻源执行-配件签收'
  },
  {
    value: 2,
    name: "配件管理",
    message: 0,
    url: "/sourceinquirypoint/sourcing/signforpartsdemand/integratedmanage",
    activePath: "integratedmanage",
    key: "LK_PEIJIANZONGHEGUANLI",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_INTEGRATEDMANAGE',
    permissionName: '寻源执行-配件管理'
  },
  {
    value: 3,
    name: "附件导入",
    message: 0,
    url: "/sourceinquirypoint/sourcing/signforpartsdemand/importfiles",
    activePath: "importfiles",
    key: "LK_FUJIANXUQIUDAORU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_IMPORTFILES',
    permissionName: '寻源执行-附件导入'
  },
  {
    value: 4,
    name: "附件管理",
    message: 0,
    url: "/sourceinquirypoint/sourcing/signforpartsdemand/filemanage",
    activePath: "filemanage",
    key: "LK_FUJIANZONGHEGUANLI",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_FILEMANAGE',
    permissionName: '寻源执行-附件管理'
  },
]