export const rawMaterialSearch = [
  {
    type: 'select',
    multiple: true,
    props: 'classTypeList',
    options: [],
    labelLanguageKey: 'PLGLZS.LEIBIE',
    label: '类别',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZELEIBIE',
    placeholder: '请选择类别',
  },
  {
    type: 'select',
    multiple: true,
    props: 'specsList',
    options: [],
    labelLanguageKey: 'PLGLZS.GUIGEPAIHAO',
    label: '规格/牌号',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZEPAIHAO',
    placeholder: '请选择牌号',
  },
  {
    type: 'select',
    multiple: true,
    props: 'areaList',
    options: [],
    labelLanguageKey: 'PLGLZS.QUYU',
    label: '区域',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZEQUYU',
    placeholder: '请选择区域',
  },
  {
    type: 'dateMonth',
    props: 'rangeDate',
    labelLanguageKey: 'PLGLZS.SHIJIANFANWEI',
    label: '时间范围',
  },
  {
    type: 'select',
    multiple: false,
    props: 'dataSourceList',
    labelLanguageKey: 'PLGLZS.SHUJULAIYUAN',
    label: '数据来源',
  },
];

export const manpowerSearch = [
  {
    type: 'select',
    props: 'professionList',
    options: [],
    labelLanguageKey: 'PLGLZS.GONGZHONG',
    label: '工种',
    placeholderLanguageKey: 'PLGLZS.QINGXUANGONGZHONG',
    placeholder: '请选择工种',
  },
  {
    type: 'select',
    props: 'areaList',
    options: [],
    labelLanguageKey: 'PLGLZS.QUYU',
    label: '区域',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZEQUYU',
    placeholder: '请选择区域',
  },
  {
    type: 'dateMonth',
    props: 'rangeDate',
    labelLanguageKey: 'PLGLZS.SHIJIANFANWEI',
    label: '时间范围',
  },
  {
    type: 'select',
    props: 'dataSourceList',
    labelLanguageKey: 'PLGLZS.SHUJULAIYUAN',
    label: '数据来源',
  },
];

export const energySearch = [
  {
    type: 'select',
    props: 'productNameList',
    options: [],
    labelLanguageKey: 'PLGLZS.CHANPINMINGCHENG',
    label: '产品名称',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZECHANPINMINGCHENG',
    placeholder: '请选择产品名称',
  },
  {
    type: 'select',
    props: 'marketNameList',
    options: [],
    labelLanguageKey: 'PLGLZS.SHICHANGMINGCHENG',
    label: '市场名称',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZESHICHANGMINGCHENG',
    placeholder: '请选择市场名称',
  },
  {
    type: 'select',
    props: 'priceTypeList',
    options: [],
    labelLanguageKey: 'PLGLZS.JIAGELEIXING',
    label: '价格类型',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZEJIAGELEIXING',
    placeholder: '请选择价格类型',
  },
  {
    type: 'select',
    props: 'unitList',
    options: [],
    labelLanguageKey: 'PLGLZS.DANWEI',
    label: '单位',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZEDANWEI',
    placeholder: '请选择单位',
  },
  {
    type: 'dateMonth',
    props: 'rangeDate',
    labelLanguageKey: 'PLGLZS.SHIJIANFANWEI',
    label: '时间范围',
  },
  {
    type: 'select',
    props: 'dataSourceList',
    labelLanguageKey: 'PLGLZS.SHUJULAIYUAN',
    label: '数据来源',
  },
];

export const RAWMATERIAL = 'rawMaterial';
export const LABOUR = 'labour';
export const ENERGY = 'energy';
