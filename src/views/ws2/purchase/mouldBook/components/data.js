//  bm单视图查询
export const bmForm = {
  behalfPartsNum: '', //  零件号
  aekoNum: '', //  AEKO号
  bmNum: '', //  Bm单号
  sapOrder: '', //  SAP订单号
  enterAccountNum: '', //  入账单号
  tmCartypeProId: [],  //  车型项目
  designatedSupplierId: '',  //  供应商id数组
  deptId: [],  //  科室
  linieId: [],  //  line
  moldInvestmentStatus: [], //  摸具投资状态
}

//  模具视图查询
export const mouldForm = {
  assetTypeNum: '', //  资产分类编号
  categoryName: '', //  材料组名称
  craftType: '', //  工艺类型
  deptId: [], //  科室
  partsNum: '', //  零件号
  supplier: '',  //  供应商
  tmCartypeProId: [],  //  车型项目
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
    props: 'behalfPartsNum',
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
    props: 'moldId',
    name: '模具ID',
    key: 'LK_MUJUID',
    tooltip: false
  },
  {
    props: 'assetNum',
    name: '固资编号',
    key: 'LK_GUZIBIANHAO',
    width: 100,
    tooltip: false
  },
  {
    props: 'assetName',
    name: '固资名称',
    key: 'LK_GUZIMINGCHEN',
    width: 150,
    tooltip: false
  },
  {
    props: 'moldManufacturer',
    name: '模具制造商',
    key: 'LK_MUJUZHIZHAOSHANG',
    width: 150,
    tooltip: false
  },
  {
    props: 'craftType',
    name: '工艺类型',
    key: 'LK_GONGYILEIXING',
    tooltip: false
  },
  {
    props: 'moldType',
    name: '工模具种类',
    key: 'LK_GONGMUJUZHONGLEI',
    width: 100,
    tooltip: false
  },
  {
    props: 'assetTypeNum',
    name: '资产分类编号',
    key: 'LK_ZICHANFENLEIBIANHAO',
    width: 100,
    tooltip: false
  },
  {
    props: 'partsTotalName',
    name: '零件总成名称',
    key: 'LK_LINGJIANZONGCHENMINGCHEN',
    width: 100,
    tooltip: false
  },
  {
    props: 'partsTotalNum',
    name: '总成零件号',
    key: 'LK_ZONGCHENLINGJIANHAO',
    width: 100,
    tooltip: false
  },
  {
    props: 'partsShareNum',
    name: '共享零件号',
    key: 'LK_GONGXIANGLINGJIANHAO',
    width: 100,
    tooltip: false
  },
  {
    props: 'fsNum',
    name: 'FS号',
    key: 'LK_FSHAO',
    tooltip: false
  },
  {
    props: 'moldType',
    name: '零部件名称',
    key: 'LK_LINGBUJIANMINGCHEN',
    tooltip: false
  },
  {
    props: 'partsNum',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: 'count',
    name: '数量',
    key: 'LK_SHULIANG',
    tooltip: false
  },
  {
    props: 'assetPrice',
    name: '资产单价',
    key: 'LK_ZICHANDANJIA',
    tooltip: false
  },
  {
    props: 'assetTotal',
    name: '资产总额',
    key: 'LK_ZICHANZONGE',
    tooltip: false
  },
  {
    props: 'changeReason',
    name: '调整说明',
    key: 'LK_TIAOZHENGSHUOMING',
    tooltip: false
  },
  {
    props: 'picture',
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
    props: 'moldId',
    name: '模具ID',
    key: 'LK_MUJUID',
    tooltip: false
  },
  {
    props: 'assetNum',
    name: '固资编号',
    key: 'LK_GUZIBIANHAO',
    width: 100,
    tooltip: false
  },
  {
    props: 'assetName',
    name: '固资名称',
    key: 'LK_GUZIMINGCHEN',
    width: 200,
    tooltip: false
  },
  {
    props: 'moldManufacturer',
    name: '模具制造商',
    key: 'LK_MUJUZHIZHAOSHANG',
    width: 100,
    tooltip: false
  },
  {
    props: 'craftType',
    name: '工艺类型',
    key: 'LK_GONGYILEIXING',
    width: 100,
    tooltip: false
  },
  {
    props: 'moldType',
    name: '工模具种类',
    key: 'LK_GONGMUJUZHONGLEI',
    width: 100,
    tooltip: false
  },
  {
    props: 'assetTypeNum',
    name: '资产分类编号',
    key: 'LK_ZICHANFENLEIBIANHAO',
    width: 150,
    tooltip: false
  },
  {
    props: 'partsTotalName',
    name: '零件总成名称',
    key: 'LK_LINGJIANZONGCHENMINGCHEN',
    width: 200,
    tooltip: false
  },
  {
    props: 'partsTotalNum',
    name: '总成零件号',
    key: 'LK_ZONGCHENLINGJIANHAO',
    width: 100,
    tooltip: false
  },
  {
    props: 'partsShareNum',
    name: '共享零件号',
    key: 'LK_GONGXIANGLINGJIANHAO',
    width: 150,
    tooltip: false
  },
  {
    props: 'fsNum',
    name: 'FS号',
    key: 'LK_FSHAO',
    tooltip: false
  },
  {
    props: 'carTypeProName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'partsName',
    name: '零部件名称',
    key: 'LK_LINGBUJIANMINGCHEN',
    width: 200,
    tooltip: false
  },
  {
    props: 'partsNum',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: 'count',
    name: '数量',
    key: 'LK_SHULIANG',
    tooltip: false
  },
  {
    props: 'assetPrice',
    name: '资产单价',
    key: 'LK_ZICHANDANJIA',
    tooltip: false
  },
  {
    props: 'assetTotal',
    name: '资产总额',
    key: 'LK_ZICHANZONGE',
    tooltip: false
  },
  {
    props: 'changeReason',
    name: '调整说明',
    key: 'LK_TIAOZHENGSHUOMING',
    tooltip: false
  },
  {
    props: 'picture',
    name: '照片',
    key: 'LK_ZHAOPIAN',
    tooltip: false
  },
]

