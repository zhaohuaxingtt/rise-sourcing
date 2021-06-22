
//  所有bm申请查询
export const bmApplyForm = {
  tmCartypeProId: '', //  车型项目
  bmStatus: '', //  Bm单状态
  akeoType: '', //  akeo类型
  deptId: '', //  专业科室
  behalfPartsNum: '', //  零件号
  startDate: '',  //  开始时间
  endDate: '',  //  结束时间
  linieId: '',  //  linie
}

//  所有BM单申请表头
export const allTableHead = [
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
    props: 'wbsCode',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
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
    name: '代表零件',
    key: 'LK_DAIBIAOLINGJIAN',
    tooltip: false
  },
  {
    props: 'productionFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    tooltip: false
  },
  {
    props: 'bmAmount',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    tooltip: false
  },
  {
    props: 'bmStatusName',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
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
  {
    props: 'rsNum',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'areaControlPerson',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    tooltip: false
  },
  {
    props: 'moldProperties',
    name: '模具属性',
    key: 'LK_MOJUSHUXIN',
    tooltip: false
  },
  {
    props: 'nomiType',
    name: '定点类型',
    key: 'LK_DINGDIANLEIXING',
    tooltip: false
  },
  {
    props: 'akeoTypeName',
    name: 'Aeko类型',
    key: 'LK_AEKOLEIXING',
    tooltip: false
  },
  {
    props: 'aekoNum',
    name: 'Aeko号',
    key: 'LK_AEKOHAO',
    tooltip: false
  },
  {
    props: 'aekoAddAmount',
    name: 'Aeko增值金额',
    key: 'LK_AEKOZENGZHIJINE',
    tooltip: false
  },
]

//  待确认BM单表头
export const bmTableHead = [
  {
    props: 'data1',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    tooltip: false
  },
  {
    props: 'data2',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    tooltip: false
  },
  {
    props: 'data3',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    tooltip: false
  },
  {
    props: 'data4',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'data5',
    name: '代表零件',
    key: 'LK_DAIBIAOLINGJIAN',
    tooltip: false
  },
  {
    props: 'data6',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'data7',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    tooltip: false
  },
  {
    props: 'data8',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    tooltip: false
  },
  {
    props: 'data9',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
    tooltip: false
  },
  {
    props: 'data10',
    name: '科室',
    key: 'LK_KESHI',
    tooltip: false
  },
  {
    props: 'data11',
    name: 'Linie',
    key: 'LK_LINIE',
    tooltip: false
  },
  {
    props: 'data12',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'data15',
    name: '定点类型',
    key: 'LK_DINGDIANLEIXING',
    tooltip: false
  },
  {
    props: 'data13',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    tooltip: false
  },
]

//  待确认BM单表头
export const aekoTableHead = [
  {
    props: 'data1',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    tooltip: false
  },
  {
    props: 'data2',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    tooltip: false
  },
  {
    props: 'data3',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    tooltip: false
  },
  {
    props: 'data4',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'data5',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    tooltip: false
  },
  {
    props: 'data6',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'data7',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    tooltip: false
  },
  {
    props: 'data17',
    name: 'Aeko号',
    key: 'LK_AEKOHAO',
    tooltip: false
  },
  {
    props: 'data18',
    name: 'Aeko增值金额',
    key: 'LK_AEKOZENGZHIJINE',
    tooltip: false
  },
  {
    props: 'data8',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    tooltip: false
  },
  {
    props: 'data9',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
    tooltip: false
  },
  {
    props: 'data10',
    name: '科室',
    key: 'LK_KESHI',
    tooltip: false
  },
  {
    props: 'data11',
    name: 'Linie',
    key: 'LK_LINIE',
    tooltip: false
  },
  {
    props: 'data12',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'data13',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    tooltip: false
  },
]

//  Aeko减值BM单表头
export const aekoBmTableHead = [
  {
    props: 'data1',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    tooltip: false
  },
  {
    props: 'data2',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    tooltip: false
  },
  {
    props: 'data3',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    tooltip: false
  },
  {
    props: 'data4',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    tooltip: false
  },
  {
    props: 'data5',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    tooltip: false
  },
  {
    props: 'data6',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: false
  },
  {
    props: 'data7',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    tooltip: false
  },
  {
    props: 'data17',
    name: 'Aeko号',
    key: 'LK_AEKOHAO',
    tooltip: false
  },
  {
    props: 'data18',
    name: 'Aeko增值金额',
    key: 'LK_AEKOZENGZHIJINE',
    tooltip: false
  },
  {
    props: 'data8',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    tooltip: false
  },
  {
    props: 'data9',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
    tooltip: false
  },
  {
    props: 'data10',
    name: '科室',
    key: 'LK_KESHI',
    tooltip: false
  },
  {
    props: 'data11',
    name: 'Linie',
    key: 'LK_LINIE',
    tooltip: false
  },
  {
    props: 'data12',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'data13',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    tooltip: false
  },
]

//  Aeko减值BM单表头
export const bmPopupTableHead = [
  {
    props: 'data1',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: 'data2',
    name: '零件名称（中）',
    key: 'LK_LINGJIANMINGCHENZHONG',
    tooltip: false
  },
  {
    props: 'data3',
    name: '零件名称（德）',
    key: 'LK_LINGJIANMINGCHENDE',
    tooltip: false
  },
  {
    props: 'data4',
    name: 'FS号',
    key: 'LK_FSHAO',
    tooltip: false
  },
  {
    props: 'data5',
    name: 'CSF',
    key: 'LK_CSF',
    tooltip: false
  },
  {
    props: 'data11',
    name: 'Linie',
    key: 'LK_LINIE',
    tooltip: false
  },
]