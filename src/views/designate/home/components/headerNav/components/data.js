/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-20 14:24:02
 * @LastEditors: Please set LastEditors
 * @Description: 定点申请头部
 *
 */
import Vue from 'vue'

export const TAB = [
  {
    value: 1,
    label: '寻源执行',
    key: Vue.prototype.$t('partsignLanguage.XunYuanZhiXing'),
    url: '/nomination',
    message: 0
  },
  {
    value: 2,
    label: '进度监控',
    key: Vue.prototype.$t('partsignLanguage.JinDuJianKong'),
    url: '/nomination',
    message: 0
  }
]

export const MENU = [
  {
    label: '零件签收',
    key: Vue.prototype.$t('partsignLanguage.XunYuanZhiXing'),
    url: '/nomination'
  },
  {
    label: '采购项目建立',
    key: Vue.prototype.$t('partsignLanguage.JinDuJianKong'),
    url: ''
  },
  {
    label: 'RFQ管理',
    key: Vue.prototype.$t('LK_RFQGUANLI'),
    url: ''
  },
  {
    label: '定点管理',
    key: Vue.prototype.$t('LK_DINGDIANGUANLI'),
    url: ''
  }
]