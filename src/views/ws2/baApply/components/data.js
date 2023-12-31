
//  BA申请首页列表入参
export const indexFrom = {
  'cartypeProjectId': '', //车型项目
}

//  车型项目详情列表入参
export const detailsForm = {
  'tmCartypeProId': '', //车型项目
  'moldStatus':  '1', //  模具预算状态
  'locationFactoryId': '',  //  采购工厂
  'startDate': '', //  申请开始时间
  'endDate': '',  //  申请结束时间
  "partNum":"",//零件号
  "deptId":"",//专业科室
  "sourceType":"",//定点来源类型
  "supplierId":"",//供应商
}

//  BA申请table表头1
export const layerTableHead1 = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'locationFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'dataType',
    name: '定点来源类型',
    key: '定点来源类型',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '专业科室',
    key: 'LK_ZHUANYEKESHI',
    tooltip: false
  },
  {
    props: 'baNum',
    name: 'BA号分配',
    key: 'LK_BANUMBERDISTRIBUTION',
    tooltip: false
  },
  {
    props: 'amount',
    name: '金额（RMB）',
    key: 'LK_AMOUNTMONEYRMB',
    tooltip: false
  },
]

//  BA申请table表头2
export const layerTableHead2 = [
  {
    props: 'locationFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '专业科室',
    key: 'LK_ZHUANYEKESHI',
    tooltip: false
  },
  {
    props: 'baNum',
    name: 'BA号分配',
    key: 'LK_BANUMBERDISTRIBUTION',
    tooltip: false
  },
  {
    props: 'amount',
    name: '金额（RMB）',
    key: 'LK_AMOUNTMONEYRMB',
    tooltip: false,
    width: '200',
  },
]

//  BA申请车型详情table表头
export const detailsTableHead = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'locationFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'categoryName',
    name: '材料组',
    key: 'LK_CAILIAOZU',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '专业科室',
    key: 'LK_ZHUANYEKESHI',
    tooltip: false
  },
  {
    props: 'baNum',
    name: 'BA号',
    key: 'LK_BANMUBER',
    tooltip: false
  },
  {
    props: 'partsNum',
    name: '零件号',
    key: 'LK_SPAREPARTSNUMBER',
    tooltip: false
  },
  {
    props: 'partsName',
    name: '零件名称',
    key: 'LK_LINGJIANMINGCHENG',
    tooltip: false
  },{
    props: 'nomiType',
    name: 'BA账户类型',
    key: 'LK_BAACCOUNTTYPE',
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    tooltip: false
  },
  {
    props: 'moldAmount',
    name: '模具定点金额',
    key: 'LK_MODULFIXEDPOINTMONEY',
    tooltip: false
  },
  {
    props: 'approveName',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    tooltip: false
  }, {
    props: 'sourceType',
    name: '定点来源类型',
    key: '定点来源类型',
    tooltip: false
  },
  {
    props: 'rsNum',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'applyDate',
    name: '申请日期',
    key: 'LK_SHENQINGRIQI',
    tooltip: false
  },
  {
    props: 'moldStatusName',
    name: '模具预算状态',
    key: 'LK_MOULDBUDGETSTATUS',
    tooltip: false
  },
]

//  BA申请首页table表头
export const indexTableHead = [{
  props: 'carTypeProjectName',
  name: '车型项目',
  key: 'LK_CHEXINGXIANGMU',
  tooltip: false
},{
  props: 'totalAmount',
  name: '总预算金额',
  key: 'LK_BUDGETAMOUNTTOTAL',
  width: 150,
  tooltip: false
},{
  props: 'totalApplyAmount',
  name: '总申请投资金额',
  key: 'LK_APPLYINVESTAMOUNTTOTAL',
  width: 150,
  tooltip: false
},{
  props: 'totalPointAmount',
  name: '总定点投资金额',
  key: 'LK_FIXEDINVESTTOTAL',
  width: 150,
  tooltip: false
}]


export const historyTitle1 = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'locationFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'dataType',
    name: '定点来源类型',
    key: '定点来源类型',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '专业科室',
    key: 'LK_ZHUANYEKESHI',
    tooltip: false
  },
  {
    props: 'baNum',
    name: 'BA号分配',
    key: 'LK_BANUMBERDISTRIBUTION',
    tooltip: false
  },
  {
    props: 'amount',
    name: '金额（RMB）',
    key: 'LK_AMOUNTMONEYRMB',
    tooltip: false
  },
]

export const historyTitle2 = [
  {
    props: 'locationFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'dataType',
    name: '定点来源类型',
    key: '定点来源类型',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '专业科室',
    key: 'LK_ZHUANYEKESHI',
    tooltip: false
  },
  {
    props: 'baNum',
    name: 'BA号分配',
    key: 'LK_BANUMBERDISTRIBUTION',
    tooltip: false
  },
  {
    props: 'amount',
    name: '金额（RMB）',
    key: 'LK_AMOUNTMONEYRMB',
    tooltip: false
  },
]