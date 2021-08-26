/*
 * @Author: haojiang
 * @Date: 2021-08-26 09:28:02
 * @LastEditTime: 2021-08-26 09:40:01
 * @LastEditors: Please set LastEditors
 * @Description: 默认排程算法配置
 * @FilePath: /front-web/src/views/project/schedulingassistant/defaultAlgorithmConfig/components/data.js
 */

export const productLogicList = [
  {value: 'cartype', label: '车型', type: 'dictionary', i18n_label: 'CHEXING', dictionaryOption: 'CAR_TYPE_CONFIG_OPTIONS'},
  {value: 'year', label: '年份', type: 'dictionary', i18n_label: 'NIANFEN', dictionaryOption: 'YEAR_CONFIG_OPTIONS'},
  {value: 'value', label: '取值处理', type: 'dictionary', i18n_label: 'QUZHICHULI', dictionaryOption: 'VALUE_CONFIG_OPTIONS'},
  {value: 'algorithm', label: '计算方式', type: 'dictionary', i18n_label: 'JISUANFANGSHI', dictionaryOption: 'CALCULATE_CONFIG_OPTIONS'},
]

export const partLogicList = [
  {value: 'partNum', label: '车型', type: 'dictionary', i18n_label: 'CHEXING', dictionaryOption: ''},
  {value: 'partNameZh', label: '年份', type: 'dictionary', i18n_label: 'NIANFEN', dictionaryOption: ''},
  {value: 'procureFactory', label: '材料组', type: 'dictionary', i18n_label: 'CAILIAOZU', dictionaryOption: ''},
  {value: 'applyType', label: '取值处理', type: 'dictionary', i18n_label: 'QUZHICHULI', dictionaryOption: ''},
  {value: 'applyType', label: '计算方式', type: 'dictionary', i18n_label: 'JISUANFANGSHI', dictionaryOption: ''},
]