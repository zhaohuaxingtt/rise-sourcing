/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:49:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-31 14:42:20
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\data.js
 */

export const productLogicList = [
  {value: 'cartype', label: '车型', type: 'selectDict', i18n_label: 'CHEXING', selectOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'year', label: '年份', type: 'selectDict', i18n_label: 'NIANFEN', selectOption: 'YEAR_CONFIG_OPTIONS'},
  {value: 'value', label: '取值处理', type: 'selectDict', i18n_label: 'QUZHICHULI', selectOption: 'VALUE_CONFIG_OPTIONS'},
  {value: 'algorithm', label: '计算方式', type: 'selectDict', i18n_label: 'JISUANFANGSHI', selectOption: 'CALCULATE_CONFIG_OPTIONS'},
]

export const partLogicList = [
  {value: 'partNum', label: '车型', type: 'select', i18n_label: 'CHEXING', selectOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'partNameZh', label: '年份', type: 'select', i18n_label: 'NIANFEN', selectOption: 'YEAR_CONFIG_OPTIONS'},
  {value: 'procureFactory', label: '材料组', type: 'select', i18n_label: 'CAILIAOZU', selectOption: 'CATEGORY_CONFIG_OPTIONS'},
  {value: 'applyType', label: '取值处理', type: 'select', i18n_label: 'QUZHICHULI', selectOption: 'VALUE_CONFIG_OPTIONS'},
  {value: 'applyType', label: '计算方式', type: 'select', i18n_label: 'JISUANFANGSHI', selectOption: 'CALCULATE_CONFIG_OPTIONS'},
]