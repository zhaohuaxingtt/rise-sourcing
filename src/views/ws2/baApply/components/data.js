
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