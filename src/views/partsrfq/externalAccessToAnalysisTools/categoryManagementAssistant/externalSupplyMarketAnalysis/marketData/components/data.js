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
    type: 'selectCustom',
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
    props: 'dataSource',
    labelLanguageKey: 'PLGLZS.SHUJULAIYUAN',
    label: '数据来源',
  },
];

export const RAWMATERIAL = 'rawMaterial';
export const LABOUR = 'labour';
export const ENERGY = 'energy';
