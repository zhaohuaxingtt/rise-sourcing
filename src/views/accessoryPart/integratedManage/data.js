/*
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:58
 * @LastEditors: YoHo
 * @LastEditTime: 2022-04-02 12:55:26
 * @Description: 
 * @FilePath: \front-sourcing\src\views\accessoryPart\integratedManage\data.js
 */

export const tableTitle = [
  {props:'sparePartCode',name:'编号', key: "BIANHAO", tooltip: true, width: 100, fixed: "left", sortable: true},
  {props:'spnrNum',name:'SP号', key: "SPHAO", tooltip: true, width: 120, fixed: "left", sortable: true},
  {props:'rfqNum',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true, width: 105, fixed: "left", sortable: true},
  {props:'assemblyPartNum',name:'批量供货总成号', key: "PILIANGGONGHUOZONGCHENGHAO", tooltip: true, width: 150, fixed: "left", sortable: true},
  {props:'partNum',name:'配件零件号', key: "PEIJIANLINGJIANHAO", tooltip: true, width: 120, fixed: "left", sortable: true},
  {props:'partNameCh',name:'配件零件名称', key: "PEIJIANLINGJIANMINGCHENG", tooltip: true, width: 140, sortable: true},
  {props:'supplierSapCode',name:'供应商号', key: "GONGYINGSHANGHAO", tooltip: true, width: 120, sortable: true},
  {props:'supplierNameZh',name:'供应商中文名', key: "GONGYINGSHANGMINGCHENG", tooltip: true, width: 240, sortable: true},
  {props:'respDeptName',name:'LINIE科室', key: "LINIEKESHI", tooltip: true, width: 140, sortable: true},
  {props:'respLinieName',name:'LINIE', key: "LINIE", tooltip: true, width: 100, sortable: true},
  {props:'csfuserDeptName',name:'询价科室', key: "XUNJIAKESHI", tooltip: true, width: 105, sortable: true},
  {props:'csfuserName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, width: 120, sortable: true},
  {props:'deliveryWarehouse',name:'送货仓库', key: "SONGHUOCANGKU", tooltip: true, width: 105, sortable: true},
  {props:'brand',name:'品牌', key: "PINPAI", tooltip: true, sortable: true},
  {props:'stateDesc',name:'配件状态', key: "PEIJIANZHUANGTAI", tooltip: true, width: 120, sortable: true},
  {props:'accessoryStatusDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true, width: 120, sortable: true},
  {props:'signDate',name:'需求签收日期', key: "XUQIUQIANSHOURIQI", tooltip: true, width: 185, sortable: true},
  {props:'carType',name:'配件车型', key: "PEIJIANCHEXING", tooltip: true, width: 120, sortable: true},
  {props:'carProject',name:'配件车型项目', key: "PEIJIANCHEXINGXIANGMU", tooltip: true, width: 140, sortable: true},
  {props:'idState',name:'ID状态', key: "IDZHUANGTAI", tooltip: true, sortable: true, width: 90},
  {props:'priceType',name:'价格类型', key: "JIAGELEIXING", tooltip: true, sortable: true, width: 105},
  {props:'tcUnitName',name:'单位', key: "DANWEI", tooltip: true, sortable: true},
  {props:'sendDate',name:'需求发送日期', key: "XUQIUFASONGRIQI", tooltip: true, width: 135, sortable: true},
]

export const tableMockData = [
  {a: 'FS21-0123', a1: '23D4328947', b: 'xxx', c: 'shagnhaihuizhong', d: '10002', e: '', f: '2.13', g: '2.13', h: '100000', i: 'Y', j: '100000', 'k': 'Y', m: '2021-01-01', n: '13%'}
]

export const searchList = [
  {value: 'partNumFuzzySearch', label: '配件零件号', type: 'multiLineInput', key: 'PEIJIANLINGJIANHAO', permission: 'APREPART_MANAGFMENT_PARTNUM|配件-配件管理-配件零件号'},
  {value: 'partNameCh', label: '配件零件中文名', type: 'input', key: 'PEIJIANLINGJIANZHONGWENMING', permission: 'APREPART_MANAGFMENT_PARTNAMECH|配件-配件管理-配件零件中文名'},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'multiLineInput', key: 'GONGYINGSHANGSAPHAO', permission: 'APREPART_MANAGFMENT_SUPPLIERSAPCODE|配件-配件管理-供应商SAP号'},
  {value: 'supplierNameZh', label: '供应商中文名', type: 'input', key: 'GONGYINGSHANGZHONGWENMING', permission: 'APREPART_MANAGFMENT_SUPPLIERNAMEZH|配件-配件管理-供应商中文名'},
  {value: 'assemblyPartNumFuzzySearch', label: '批量供货总成号', type: 'input', key: 'PILIANGGONGHUOZONGCHENGHAO', permission: 'APREPART_MANAGFMENT_ASSEMBLYPARTNUM|配件-配件管理-批量供货总成号'},
  {value: 'spNuFuzzySearch', label: 'SP号', type: 'input', key: 'SPHAO', permission: 'APREPART_MANAGFMENT_SPNUM|配件-配件管理-SP号'},
  {value: 'sparePartCodeFuzzySearch', label: '编号', type: 'input', key: 'BIANHAO', permission: 'APREPART_MANAGFMENT_CODE|配件-配件管理-编号'},
  {value: 'carType', label: '配件车型', type: 'select', key: 'PEIJIANCHEXING', selectOption: 'carTypeOptions', permission: 'APREPART_MANAGFMENT_CARTYPE|配件-配件管理-配件车型'},
  {value: 'carProject', label: '配件车型项目', type: 'select', key: 'PEIJIANCHEXINGXIANGMU', selectOption: 'cartypeProjectOptions', width: 150, permission: 'APREPART_MANAGFMENT_CARPROJECT|配件-配件管理-配件车型项目'},
  {value: 'state', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: 'accessoryTypeOption', permission: 'APREPART_MANAGFMENT_STATE|配件-配件管理-配件状态'},
  {value: 'respDeptName', label: 'LINIE科室', type: 'input', key: 'LINIEKESHI', permission: 'APREPART_MANAGFMENT_LINIEDEPT|配件-配件管理-LINIE科室'},
  {value: 'respLinieName', label: 'LINIE', type: 'input', key: 'LINIE', permission: 'APREPART_MANAGFMENT_LINIE|配件-配件管理-LINIE'},
  {value: 'csfuserDeptName', label: '询价科室', type: 'input',key: 'XUNJIAKESHI', permission: 'APREPART_MANAGFMENT_CSFDEPTNAME|配件-配件管理-询价科室'},
  {value: 'csfuserName', label: '询价采购员', type: 'input', key: 'XUNJIACAIGOUYUAN', permission: 'APREPART_MANAGFMENT_CSFUSERNAME|配件-配件管理-询价采购员'},
  {value: 'accessoryStatus', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: 'partStateOption', permission: 'APREPART_MANAGFMENT_PARTSTATS|配件-配件管理-零件状态'},
  // {value: 'partState', label: '合同状态', type: 'select', key: 'HETONGZHUANGTAI', selectOption: 'contactStateOption'},
  // {value: 'cfTargetPrice', label: '是否有财务目标价', type: 'select', key: 'SHIFOUYOUCAIWUMUBIAOJIA', selectOption: 'yesOrNoOption'},
  // {value: 'nomiType', label: '定点状态', type: 'select', key: 'DINGDIANZHUANGTAI', selectOption: 'nominateStateOption'},
  {value: 'rfqId', label: 'rfq编号', type: 'input', key: 'RFQBIANHAO', permission: 'APREPART_MANAGFMENT_RFQBIANHAO|配件-配件管理-RFQ编号', inputType: "int"},
  {value: 'idState', label: 'ID状态', type: 'select', key: 'IDZHUANGTAI', selectOption: 'accessoryIdStateOption', permission: 'APREPART_MANAGFMENT_IDSTATS|配件-配件管理-ID状态'},
  {value: 'signDate', label: '签收时间', type: 'date', key: 'QIANSHOUSHIJIAN', permission: 'APREPART_MANAGFMENT_QIANSHOUSHIJIAN|配件-配件管理-签收时间'},  // 不配置权限的话,不会显示
  {value: 'showSelf', label: '是否自己', type: 'select', key: 'SHIFOUZIJI', selectOption: 'trueOrFalseOption',permission: 'APREPART_MANAGEMENT_ISME|附件-附件管理-是否自己'},
  {value: 'linieApportionStatus', label: 'LINIE分配状态', type: 'select', selectOption: 'linieStatusOption' ,key: 'LINIEFENPEIZHUANGTAI',permission: 'APREPART_MANAGFMENT_LINIESTATUS|配件-配件管理-LINIE分配状态'},
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