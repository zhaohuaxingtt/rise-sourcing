/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 21:13:51
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-04 13:53:25
 * @Description: 
 * @FilePath: \front-portal\src\views\projectMgt\defaultScheLogic\data.js
 */

export const tabList = [
  {
    value: 6,
    name: '默认排程算法配置',
    message: 0,
    url: '/scheassistant/defaultscheLogic',
    activePath: 'defaultschelogic',
    key: 'MORENPAICHENGSUANFAPEIZHI'
  }
]

export const productLogicList = [
  {value: 'cartype', label: '车型', type: 'select', i18n_label: 'CHEXING', selectOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'year', label: '年份', type: 'select', i18n_label: 'NIANFEN', selectOption: 'YEAR_CONFIG_OPTIONS'},
  {value: 'value', label: '取值处理', type: 'select', i18n_label: 'QUZHICHULI', selectOption: 'VALUE_CONFIG_OPTIONS'},
  {value: 'algorithm', label: '计算方式', type: 'select', i18n_label: 'LKJISUANFANGSHI', selectOption: 'CALCULATE_CONFIG_OPTIONS'}
]

export const partLogicList = [
  {value: 'cartype', label: '车型', type: 'select', i18n_label: 'CHEXING', selectOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'year', label: '年份', type: 'select', i18n_label: 'NIANFEN', selectOption: 'YEAR_CONFIG_OPTIONS'},
  {value: 'category', label: '材料组', type: 'select', i18n_label: 'CAILIAOZU', selectOption: 'CATEGORY_CONFIG_OPTIONS'},
  {value: 'value', label: '取值处理', type: 'select', i18n_label: 'QUZHICHULI', selectOption: 'VALUE_CONFIG_OPTIONS'},
  {value: 'algorithm', label: '计算方式', type: 'select', i18n_label: 'LKJISUANFANGSHI', selectOption: 'CALCULATE_CONFIG_OPTIONS'}
]