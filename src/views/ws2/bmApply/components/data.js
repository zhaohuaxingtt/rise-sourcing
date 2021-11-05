
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
  bmNum: '',  //  BM单号
}

//  所有BM单申请表头
export const allTableHead = [
  {
    props: 'bmSerial',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    width: 200,
    tooltip: false
  },
  {
    props: 'bmNum',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    width: 130,
    tooltip: false
  },
  {
    props: 'wbsCode',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    width: 170,
    tooltip: false
  },
  {
    props: 'tmCartypeProName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    width: 150,
    tooltip: false
  },
  {
    props: 'behalfPartsNum',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    width: 150,
    tooltip: false
  },
  {
    props: 'productionFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    width: 120,
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    width: 250,
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
    width: 150,
    tooltip: false
  },
  {
    props: 'deptName',
    name: '科室',
    key: 'LK_KESHI',
    width: 100,
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'Linie',
    key: 'LK_XINDELINIE',
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
    width: 100,
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
    name: 'AEKO类型',
    key: 'LK_AEKOLEIXING',
    tooltip: false
  },
  {
    props: 'aekoNum',
    name: 'AEKO号',
    key: 'LK_XINDEAEKOHAO',
    tooltip: false
  },
  {
    props: 'aekoAddAmount',
    name: 'Aeko增值金额',
    key: 'LK_AEKOZENGZHIJINE',
    width: 150,
    tooltip: false
  },
]

//  待确认BM单表头
export const bmTableHead = [
  {
    props: 'bmSerial',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    width: 200,
    tooltip: false
  },
  {
    props: 'bmNum',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    width: 130,
    tooltip: false
  },
  {
    props: 'wbsCode',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    width: 170,
    tooltip: false
  },
  {
    props: 'tmCartypeProName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    width: 150,
    tooltip: false
  },
  {
    props: 'behalfPartsNum',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    width: 150,
    tooltip: false
  },
  {
    props: 'productionFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    width: 120,
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    width: 250,
    tooltip: false
  },
  {
    props: 'bmAmount',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    width: 100,
    tooltip: false
  },
  {
    props: 'bmStatusName',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
    width: 150,
    tooltip: false
  },
  {
    props: 'deptName',
    name: '科室',
    key: 'LK_KESHI',
    width: 100,
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'Linie',
    key: 'LK_XINDELINIE',
    tooltip: false
  },
  {
    props: 'rsNum',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
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
    props: 'areaControlPerson',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    width: 100,
    tooltip: false
  },
]

//  aeko增值
export const aekoTableHead = [
  {
    props: 'bmSerial',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    width: 200,
    tooltip: false
  },
  {
    props: 'bmNum',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    width: 130,
    tooltip: false
  },
  {
    props: 'wbsCode',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    width: 170,
    tooltip: false
  },
  {
    props: 'tmCartypeProName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    width: 150,
    tooltip: false
  },
  {
    props: 'behalfPartsNum',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    width: 150,
    tooltip: false
  },
  {
    props: 'productionFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    width: 120,
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    width: 250,
    tooltip: false
  },
  {
    props: 'aekoNum',
    name: 'AEKO号',
    key: 'LK_XINDEAEKOHAO',
    tooltip: false
  },
  {
    props: 'aekoAddAmount',
    name: 'Aeko增值金额',
    key: 'LK_AEKOZENGZHIJINE',
    width: 150,
    tooltip: false
  },
  {
    props: 'bmAmount',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    tooltip: false
  },
  {
    props: 'bmStatus',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
    width: 150,
    tooltip: false
  },
  {
    props: 'deptName',
    name: '科室',
    key: 'LK_KESHI',
    width: 100,
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'Linie',
    key: 'LK_XINDELINIE',
    tooltip: false
  },
  {
    props: 'rsNum',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'moldProperties',
    name: '模具属性',
    key: 'LK_MOJUSHUXIN',
    tooltip: false
  },
  {
    props: 'areaControlPerson',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    width: 100,
    tooltip: false
  },
]

//  Aeko减值BM单表头
export const aekoBmTableHead = [
  {
    props: 'bmSerial',
    name: 'BM单流⽔号',
    key: 'LK_BMDANLIUSHUIHAO',
    width: 200,
    tooltip: false
  },
  {
    props: 'bmNum',
    name: 'BM单号',
    key: 'LK_BMDANHAO',
    width: 130,
    tooltip: false
  },
  {
    props: 'wbsCode',
    name: 'WBS编号',
    key: 'LK_WBSBIANHAO',
    width: 170,
    tooltip: false
  },
  {
    props: 'tmCartypeProName',
    name: '车型项目',
    key: 'LK_CHEXINGXIANGMU',
    width: 150,
    tooltip: false
  },
  {
    props: 'behalfPartsNum',
    name: '代表零件号',
    key: 'LK_DAIBIAOLINGJIANHAO',
    width: 150,
    tooltip: false
  },
  {
    props: 'productionFactoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    width: 120,
    tooltip: false
  },
  {
    props: 'designatedSupplierName',
    name: '定点供应商',
    key: 'LK_FIXEDPOINTSUPPLIER',
    width: 250,
    tooltip: false
  },
  {
    props: 'aekoNum',
    name: 'AEKO号',
    key: 'LK_XINDEAEKOHAO',
    tooltip: false
  },
  {
    props: 'aekoMinusAmount',
    name: 'Aeko减值金额',
    key: 'LK_AEKOZENGZHIJINE',
    width: 150,
    tooltip: false
  },
  {
    props: 'bmAmount',
    name: 'BM单金额',
    key: 'LK_BMDANJINE',
    tooltip: false
  },
  {
    props: 'bmStatus',
    name: 'BM单状态',
    key: 'LK_BMZHUANGTAI',
    width: 150,
    tooltip: false
  },
  {
    props: 'deptName',
    name: '科室',
    key: 'LK_KESHI',
    width: 100,
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'Linie',
    key: 'LK_XINDELINIE',
    tooltip: false
  },
  {
    props: 'rsNum',
    name: 'RS单号',
    key: 'LK_RSODDNUMBERS',
    tooltip: false
  },
  {
    props: 'moldProperties',
    name: '模具属性',
    key: 'LK_MOJUSHUXIN',
    tooltip: false
  },
  {
    props: 'areaControlPerson',
    name: '区域控制员',
    key: 'LK_REGINOCONTROLLER',
    width: 100,
    tooltip: false
  },
]

//  Aeko减值BM单表头
export const bmPopupTableHead = [
  {
    props: 'partsNum',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: false
  },
  {
    props: 'partsNameZh',
    name: '零件名称（中）',
    key: 'LK_LINGJIANMINGCHENZHONG',
    tooltip: false
  },
  {
    props: 'partsNameDe',
    name: '零件名称（德）',
    key: 'LK_LINGJIANMINGCHENDE',
    tooltip: false
  },
  {
    props: 'partsFs',
    name: 'FS号',
    key: 'LK_FSHAO',
    tooltip: false
  },
  {
    props: 'bmAmount',
    name: '不含税成本',
    key: 'LK_BUHANSUICHENGBEN',
    tooltip: false
  },
  {
    props: 'partsCsf',
    name: 'CSF',
    key: 'LK_CSF',
    tooltip: false
  },
  {
    props: 'linieName',
    name: 'Linie',
    key: 'LK_XINDELINIE',
    tooltip: false
  },
]