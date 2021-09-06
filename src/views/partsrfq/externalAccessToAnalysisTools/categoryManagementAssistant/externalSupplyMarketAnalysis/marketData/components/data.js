export const rawMaterialSearch = [
  {
    type: 'selectCascader',
    multiple: true,
    props: 'classTypeSpecsArea',
    cascaderProps: {},
    options: [],
    labelLanguageKey: 'PLGLZS.LEIBIEPAIHAOQUYU',
    label: '类别-牌号-区域',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZELEIBIEPAIHAOQUYU',
    placeholder: '请选择类别-牌号-区域',
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
    props: 'dataSource',
    labelLanguageKey: 'PLGLZS.SHUJULAIYUAN',
    label: '数据来源',
  },
];

export const manpowerSearch = [
  {
    type: 'selectCustom',
    multiple: true,
    props: 'professionList',
    options: [],
    labelLanguageKey: 'PLGLZS.GONGZHONG',
    label: '工种',
    placeholderLanguageKey: 'PLGLZS.QINGXUANGONGZHONG',
    placeholder: '请选择工种',
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
    props: 'dataSourceList',
    labelLanguageKey: 'PLGLZS.SHUJULAIYUAN',
    label: '数据来源',
  },
];

export const energySearch = [
  {
    type: 'select',
    multiple: true,
    width: 140,
    props: 'productNameList',
    options: [],
    labelLanguageKey: 'PLGLZS.CHANPINMINGCHENG',
    label: '产品名称',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZECHANPINMINGCHENG',
    placeholder: '请选择产品名称',
  },
  {
    type: 'select',
    multiple: true,
    props: 'marketNameList',
    options: [],
    labelLanguageKey: 'PLGLZS.SHICHANGMINGCHENG',
    label: '市场名称',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZESHICHANGMINGCHENG',
    placeholder: '请选择市场名称',
  },
  {
    type: 'select',
    multiple: true,
    props: 'priceTypeList',
    options: [],
    labelLanguageKey: 'PLGLZS.JIAGELEIXING',
    label: '价格类型',
    placeholderLanguageKey: 'PLGLZS.QINGXUANZEJIAGELEIXING',
    placeholder: '请选择价格类型',
  },
  {
    type: 'select',
    multiple: true,
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
