/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:17:08
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-27 10:38:41
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\data.js
 */

export const MENU = [
  {
    value: 1,
    name: '产品组排程',
    message: 0,
    url: '/projectmgt/projectscheassistant/progroupscheduling',
    activePath: 'progroupscheduling',
    key: 'CHANPINZUPAICHENG'
  },
  {
    value: 2,
    name: '零件排程',
    message: 0,
    url: '/projectmgt/projectscheassistant/partscheduling',
    activePath: 'partscheduling',
    key: 'LINGJIANPAICHENG'
  },
  {
    value: 3,
    name: '进度确认汇总',
    message: 0,
    url: '/projectmgt/projectscheassistant/progressconfirmsummary',
    activePath: 'progressconfirmsummary',
    key: 'JINDUQUERENHUIZONG'
  },
  {
    value: 4,
    name: '排程版本查询',
    message: 0,
    url: '/projectmgt/projectscheassistant/scheduleversion',
    activePath: 'scheduleversion',
    key: 'PAICHENGBANBENCHAXUN'
  },
  {
    value: 5,
    name: '历史进度数据库',
    message: 0,
    url: '/projectmgt/projectscheassistant/historyprocessdb',
    activePath: 'historyprocessdb',
    key: 'LISHIJINDUSHUJUKU'
  },
]

export const MENUFS = [
  {
    value: 1,
    name: '进度确认',
    message: 0,
    url: '/projectmgt/projectscheassistant/proconfirm',
    activePath: 'proconfirm',
    key: 'JINDUQUEREN'
  },
  {
    value: 2,
    name: '延误原因确认',
    message: 0,
    url: '/projectmgt/projectprogressmonitoring/delayconfirm',
    activePath: 'delayconfirm',
    key: 'YANWUYUANYINQUEREN'
  },
]