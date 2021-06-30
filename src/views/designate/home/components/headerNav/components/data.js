/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-06-30 13:56:08
 * @LastEditors: Please set LastEditors
 * @Description: 定点申请头部
 *
 */
export const TAB = [
  {
    value: 1,
    name: '寻源执行',
    message: 0,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'XUANYUANCAIDAN'
  },
  // {
  //   value: 2,
  //   label: '进度监控',
  //   key: Vue.prototype.$t('partsignLanguage.JinDuJianKong'),
  //   url: '/nomination',
  //   message: 0
  // }
]

export const MENU = [
  {
    value: 1,
    name: '零件签收',
    message: 0,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'LK_LINGJIANQIANSHOU'
  },
  {
    value: 2,
    name: '采购项目建立',
    message: 0,
    url: '/sourcing/partsprocure',
    activePath: 'partsprocure',
    key: 'LK_CAIGOUXIANGMUJIANLI'
  },
  {
    value: 7,
    name: '配件需求签收',
    message: 0,
    url: '/sourcing/signforpartsdemand',
    activePath: 'signforpartsdemand',
    key: 'LK_PEIJIANXUQIUQIANSHOU'
  },
  {
    value: 8,
    name: '配件综合管理',
    message: 0,
    url: '/sourcing/integratedmanage',
    activePath: 'integratedmanage',
    key: 'LK_PEIJIANZONGHEGUANLI'
  },
  {
    value: 5,
    name: '附件需求导入',
    message: 0,
    url: '/sourcing/importfiles',
    activePath: 'importfiles',
    key: 'LK_FUJIANXUQIUDAORU'
  },
  {
    value: 5,
    name: '附件综合管理',
    message: 0,
    url: '/sourcing/filemanage',
    activePath: 'filemanage',
    key: 'LK_FUJIANZONGHEGUANLI'
  },
  {
    value: 3,
    name: 'RFQ管理',
    message: 0,
    url: '/sourcing/partsrfq',
    activePath: 'partsrfq',
    key: 'LK_RFQGUANLI'
  },
  {
    value: 4,
    name: '定点管理',
    message: 0,
    url: '/sourcing/partsnomination',
    activePath: 'partsnomination',
    key: 'LK_DINGDIANGUANLI'
  },
]

export const heaederSubMenu = [
  {
    key:'nomination',
    name:'定点申请综合管理',
    path:'/sourcing/partsnomination'
  },
  {
    key:'rsReview',
    name:'上会RS单复核',
    path:'/sourcing/partsnomination/rsReview'
  },
]