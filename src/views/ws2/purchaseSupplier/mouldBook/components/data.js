//  bm单视图查询
export const bmForm = {
  behalfPartsNum: '', //  零件号
  aekoNum: '', //  AEKO号
  bmNum: '', //  Bm单号
  sapOrder: '', //  SAP订单号
  enterAccountNum: '', //  入账单号
  tmCartypeProId: '',  //  车型项目
  designatedSupplierId: '',  //  供应商id数组
  deptId: [],  //  科室
  linieId: [],  //  line
  moldInvestmentStatus: '', //  摸具投资状态
}

//  模具视图查询
export const mouldForm = {
  tmCartypeProId: '', //  车型项目
  bmStatus: '', //  Bm单状态
  akeoType: '', //  akeo类型
  deptId: '', //  专业科室
  behalfPartsNum: '', //  零件号
  startDate: '',  //  开始时间
  endDate: '',  //  结束时间
  linieId: '',  //  linie
  bmNum: '',  //  BM单号
}

//  BM单视图table
export const bmTableHead = [
  {
    props: 'bmSerial',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    tooltip: false
  },
  {
    props: 'bmNum',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    tooltip: false
  },
  {
    props: 'tmCartypeProName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'behalfPartsName',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    tooltip: false
  },
  {
    props: 'partsPurchaseType',
    name: '零件采购项目类型',
    key: 'LK_LINGJIANCAIGOUXIANGMULEIXING',
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '供应商',
    key: 'TPZS.GONGYINGSHANG',
    tooltip: false
  },
  {
    props: 'moldInvestmentAmount',
    name: '模具投资金额',
    key: 'LK_MUJUTOUZIJINE',
    tooltip: false
  },
  {
    props: 'moldInvestmentStatusName',
    name: '模具投资清单状态',
    key: 'LK_MUJUTOUZIQINGDANZHUANGTAI',
    tooltip: false
  },
  {
    props: 'businessStatusName',
    name: '业务处理状态',
    key: 'LK_YEWUCHULIZHUANGTAI',
    tooltip: false
  },
  {
    props: 'deptName',
    name: '科室',
    key: 'LK_KESHI',
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'Linie',
    key: 'LK_LINIE',
    tooltip: false
  },
]

//  详情表头
export const detailsTableHead = [
  {
    props: '1',
    name: '序号',
    key: 'LK_XUHAO',
    tooltip: false
  },
  {
    props: '2',
    name: '模具ID',
    key: 'LK_MUJUID',
    tooltip: false
  },
  {
    props: '3',
    name: '固资编号',
    key: 'LK_GUZIBIANHAO',
    tooltip: false
  },
  {
    props: '31',
    name: '固资名称',
    key: 'LK_GUZIMINGCHEN',
    tooltip: false
  },
  {
    props: '4',
    name: '模具制造商',
    key: 'LK_MUJUZHIZHAOSHANG',
    tooltip: false
  },
  {
    props: '5',
    name: '工艺类型',
    key: 'LK_GONGYILEIXING',
    tooltip: false
  },
  {
    props: '6',
    name: '工模具种类',
    key: 'LK_GONGMUJUZHONGLEI',
    tooltip: false
  },
  {
    props: '7',
    name: '资产分类编号',
    key: 'LK_ZICHANFENLEIBIANHAO',
    tooltip: false
  },
  {
    props: '8',
    name: '零件总成名称',
    key: 'LK_LINGJIANZONGCHENMINGCHEN',
    tooltip: false
  },
  {
    props: '9',
    name: '总成零件号',
    key: 'LK_ZONGCHENLINGJIANHAO',
    tooltip: false
  },
  {
    props: '10',
    name: '共享零件号',
    key: 'LK_GONGXIANGLINGJIANHAO',
    tooltip: false
  },
  {
    props: '11',
    name: 'FS号',
    key: 'LK_FSHAO',
    tooltip: false
  },
  {
    props: '12',
    name: '零部件名称',
    key: 'LK_LINGBUJIANMINGCHEN',
    tooltip: false
  },
  {
    props: '13',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: '13',
    name: '数量',
    key: 'LK_SHULIANG',
    tooltip: false
  },
  {
    props: '14',
    name: '资产单价',
    key: 'LK_ZICHANDAN',
    tooltip: false
  },
  {
    props: '15',
    name: '资产总额',
    key: 'LK_ZICHANZONGE',
    tooltip: false
  },
  {
    props: '16',
    name: '调整说明',
    key: 'LK_TIAOZHENGSHUOMING',
    tooltip: false
  },
  {
    props: 'img',
    name: '照片',
    key: 'LK_ZHAOPIAN',
    tooltip: false
  },
]

export const detailsBottomTableHead = [
  {
    props: 'data1',
    name: '变更单号',
    key: 'LK_BIANGENDANHAO',
    tooltip: false
  },
  {
    props: 'data2',
    name: '变更后版本',
    key: 'LK_BIANGENHOUBANBEN',
    tooltip: false
  },
  {
    props: 'data3',
    name: '变更类型',
    key: 'LK_BIANGENLEIXING',
    tooltip: false
  },
  {
    props: 'data4',
    name: '发起人',
    key: 'LK_FAQIREN',
    tooltip: false
  },
  {
    props: 'data5',
    name: '变更日期',
    key: 'LK_BIANGENRIQI',
    tooltip: false
  },
]

//  资产table
export const assetsTableHead = [
  {
    props: '1',
    name: '模具ID',
    key: 'LK_MUJUID',
    tooltip: false
  },
  {
    props: '2',
    name: '固资编号',
    key: 'LK_GUZIBIANHAO',
    tooltip: false
  },
  {
    props: '3',
    name: '固资名称',
    key: 'LK_GUZIMINGCHEN',
    tooltip: false
  },
  {
    props: '4',
    name: '模具制造商',
    key: 'LK_MUJUZHIZHAOSHANG',
    tooltip: false
  },
  {
    props: '5',
    name: '工艺类型',
    key: 'LK_GONGYILEIXING',
    tooltip: false
  },
  {
    props: '6',
    name: '工模具种类',
    key: 'LK_GONGMUJUZHONGLEI',
    tooltip: false
  },
  {
    props: '7',
    name: '资产分类编号',
    key: 'LK_ZICHANFENLEIBIANHAO',
    tooltip: false
  },
  {
    props: '8',
    name: '零件总成名称',
    key: 'LK_LINGJIANZONGCHENMINGCHEN',
    tooltip: false
  },
  {
    props: '9',
    name: '总成零件号',
    key: 'LK_ZONGCHENLINGJIANHAO',
    tooltip: false
  },
  {
    props: '10',
    name: '共享零件号',
    key: 'LK_GONGXIANGLINGJIANHAO',
    tooltip: false
  },
  {
    props: '11',
    name: 'FS号',
    key: 'LK_FSHAO',
    tooltip: false
  },
  {
    props: '12',
    name: '零部件名称',
    key: 'LK_LINGBUJIANMINGCHEN',
    tooltip: false
  },
  {
    props: '13',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: '14',
    name: '数量',
    key: 'LK_SHULIANG',
    tooltip: false
  },
  {
    props: '15',
    name: '资产单价',
    key: 'LK_ZICHANDAN',
    tooltip: false
  },
  {
    props: '16',
    name: '资产总额',
    key: 'LK_ZICHANZONGE',
    tooltip: false
  },
  {
    props: '17',
    name: '调整说明',
    key: 'LK_TIAOZHENGSHUOMING',
    tooltip: false
  },
  {
    props: '18',
    name: '照片',
    key: 'LK_ZHAOPIAN',
    tooltip: false
  },
]

