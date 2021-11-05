//  所有BA申请入参
export const allBAApplySearch = {
  'applyUserId': '', // 申请人Id
  'baStatus':  '', //  ba单状态
  'endDate': '',  //  申请结束时间
  'localFactoryId': '', //  采购工厂id
  'sixBa': '',  //  6位A号
  'startDate': '',  //  申请开始时间
  'tmCartypeProId': '', //  车型项目id
  'baAccountType': '',  //  账户类型
}

//  所有BA申请表头
export const allBAATableHead = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'localFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'sixBa',
    name: 'BA单号',
    key: 'LK_BAODDNUMBERS',
    tooltip: false
  },
  {
    props: 'currentAmount',
    name: '当前金额',
    key: 'LK_CURRENTAMOUNT',
    tooltip: false
  },
  {
    props: 'approveAmount',
    name: '申请金额',
    key: 'LK_APPLYAMOUNT',
    tooltip: false
  },
  {
    props: 'afterApproveAmount',
    name: '申请后金额',
    key: 'LK_APPLYAMOUNTTHEN',
    tooltip: false
  },
  {
    props: 'applyUserName',
    name: '申请人',
    key: 'LK_SHENQINGREN',
    tooltip: false
  },
  {
    props: 'applyDate',
    name: '申请日期',
    key: 'LK_SHENQINGRIQI',
    tooltip: false
  },
  {
    props: 'baAccountType',
    name: 'BA账户类型',
    key: 'LK_BAACCOUNTTYPE',
    tooltip: false
  },
  {
    props: 'baStatusName',
    name: 'BA单状态',
    key: 'LK_BADANSTATUS',
    tooltip: false
  },
  {
    props: 'detailed',
    name: '',
    key: '',
    tooltip: false
  },
]

//  待确认table表头
export const waitBAATableHead =[
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'localFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'currentAmount',
    name: '当前金额',
    key: 'LK_CURRENTAMOUNT',
    tooltip: false
  },
  {
    props: 'approveAmount',
    name: '申请金额',
    key: 'LK_APPLYAMOUNT',
    tooltip: false
  },
  {
    props: 'afterApproveAmount',
    name: '申请后金额',
    key: 'LK_APPLYAMOUNTTHEN',
    tooltip: false
  },
  {
    props: 'applyUserName',
    name: '申请人',
    key: 'LK_SHENQINGREN',
    tooltip: false
  },
  {
    props: 'applyDate',
    name: '申请日期',
    key: 'LK_SHENQINGRIQI',
    tooltip: false
  },
  {
    props: 'baAccountType',
    name: 'BA账户类型',
    key: 'LK_BAACCOUNTTYPE',
    tooltip: false
  },
  {
    props: 'baStatusName',
    name: 'BA单状态',
    key: 'LK_BADANSTATUS',
    tooltip: false
  },
  {
    props: 'sixBa',
    name: 'BA单号',
    key: 'LK_BAODDNUMBERS',
    minWidth: '130',
    tooltip: false
  },
  {
    props: 'detailed',
    name: '',
    key: '',
    tooltip: false
  },
]

//  待确认追加金额表头
export const waitAddTableHead = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'localFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'sixBa',
    name: 'BA单号',
    key: 'LK_BAODDNUMBERS',
    tooltip: false
  },
  {
    props: 'currentAmount',
    name: '当前金额',
    key: 'LK_CURRENTAMOUNT',
    tooltip: false
  },
  {
    props: 'approveAmount',
    name: '申请金额',
    key: 'LK_APPLYAMOUNT',
    tooltip: false
  },
  {
    props: 'afterApproveAmount',
    name: '申请后金额',
    key: 'LK_APPLYAMOUNTTHEN',
    tooltip: false
  },
  {
    props: 'applyUserName',
    name: '申请人',
    key: 'LK_SHENQINGREN',
    tooltip: false
  },
  {
    props: 'applyDate',
    name: '申请日期',
    key: 'LK_SHENQINGRIQI',
    tooltip: false
  },
  {
    props: 'baAccountType',
    name: 'BA账户类型',
    key: 'LK_BAACCOUNTTYPE',
    tooltip: false
  },
  {
    props: 'baStatusName',
    name: 'BA单状态',
    key: 'LK_BADANSTATUS',
    tooltip: false
  },
  {
    props: 'detailed',
    name: '',
    key: '',
    tooltip: false
  },
]

//  明细表头
export const detailedTableHead = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
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
    name: '科室名称',
    key: 'LK_DEPNAME',
    tooltip: false
  },
  {
    props: 'baNum',
    name: 'BA单号',
    key: 'LK_BAODDNUMBERS',
    tooltip: false
  },
  {
    props: 'partsId',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: 'partsName',
    name: '零件名称',
    key: 'LK_LINGJIANMINGCHENG',
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
    props: 'rsNum',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
]

//  确认详情表头
export const confirmTableHead = [
  {
    props: 'carTypeName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '科室名称',
    key: 'LK_DEPNAME',
    tooltip: false
  },
  {
    props: 'baNumber',
    name: 'BA单号',
    key: 'LK_BAODDNUMBERS',
    tooltip: false
  },
  {
    props: 'amount',
    name: '金额（RMB）',
    key: 'LK_AMOUNTMONEYRMB',
    tooltip: false
  },
]
