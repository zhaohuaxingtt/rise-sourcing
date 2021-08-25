/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:17:08
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-02 15:29:06
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\data.js
 */

export const MENU = [
  {
    value: 1,
    name: '产品组排程',
    message: 0,
    url: '/projectscheassistant/progroupscheduling',
    activePath: 'progroupscheduling',
    key: 'CHANPINZUPAICHENG'
  },
  {
    value: 2,
    name: '零件排程',
    message: 0,
    url: '/projectscheassistant/partscheduling',
    activePath: 'partscheduling',
    key: 'LINGJIANPAICHENG'
  },
  {
    value: 3,
    name: '进度确认汇总',
    message: 0,
    url: '/projectscheassistant/progressconfirmsummary',
    activePath: 'progressconfirmsummary',
    key: 'JINDUQUERENHUIZONG'
  },
  {
    value: 4,
    name: '排程版本查询',
    message: 0,
    url: '/projectscheassistant/scheduleversion',
    activePath: 'scheduleversion',
    key: 'PAICHENGBANBENCHAXUN'
  },
  {
    value: 5,
    name: '历史进度数据库',
    message: 0,
    url: '/projectscheassistant/historyprocessdb',
    activePath: 'historyprocessdb',
    key: 'LISHIJINDUSHUJUKU'
  },
  {
    value: 6,
    name: '默认排程算法配置',
    message: 0,
    url: '/projectscheassistant/defaultAlgorithmConfig',
    activePath: 'defaultAlgorithmConfig',
    key: 'MORENSUANFAPEIZHI'
  }
]

export const MENUFS = [
  {
    value: 1,
    name: '进度确认',
    message: 0,
    url: '/projectscheassistant/proconfirm',
    activePath: 'proconfirm',
    key: 'JINDUQUEREN'
  },
]