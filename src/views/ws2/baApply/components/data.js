
//  BA申请首页列表入参
export const indexFrom = {
  'search.cartypeProjectZh': '', //车型项目
}

//  车型项目详情列表入参
export const detailsForm = {
  'search.cartypeProjectZh': '', //车型项目
  'search.':  '', //  模具预算状态
  'search.': '',  //  采购工厂
  'search.': '', //  申请日期起止
}

//  BA申请车型详情table表头
export const detailsTableHead = [
  {
    props: 'data1',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'data2',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'data3',
    name: '材料组',
    key: 'LK_CAILIAOZU',
    tooltip: false
  },
  {
    props: 'data4',
    name: '专业科室',
    key: 'LK_ZHUANYEKESHI',
    tooltip: false
  },
  {
    props: 'data5',
    name: 'BA号',
    key: 'LK_BANMUBER',
    tooltip: false
  },
  {
    props: 'data6',
    name: '零件号',
    key: 'LK_SPAREPARTSNUMBER',
    tooltip: false
  },
  {
    props: 'data7',
    name: '零件名称',
    key: 'LK_LINGJIANMINGCHENG',
    tooltip: false
  },
  {
    props: 'data8',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    tooltip: false
  },
  {
    props: 'data9',
    name: '模具定点金额',
    key: 'LK_MODULFIXEDPOINTMONEY',
    tooltip: false
  },
  {
    props: 'data10',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    tooltip: false
  },
  {
    props: 'data11',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'data12',
    name: '申请日期',
    key: 'LK_SHENQINGRIQI',
    tooltip: false
  },
  {
    props: 'data12',
    name: '模具预算状态',
    key: 'LK_MOULDBUDGETSTATUS',
    tooltip: false
  },
]

//  BA申请首页table表头
export const indexTableHead = [{
  props: 'data1',
  name: '车型项目',
  key: 'LK_CHEXINGXIANGMU',
  tooltip: false
},{
  props: 'data2',
  name: '总预算金额',
  key: 'LK_BUDGETAMOUNTTOTAL',
  tooltip: false
},{
  props: 'data3',
  name: '总申请投资金额',
  key: 'LK_APPLYINVESTAMOUNTTOTAL',
  tooltip: false
},{
  props: 'data4',
  name: '总定点投资金额',
  key: 'LK_FIXEDINVESTTOTAL',
  tooltip: false
}]