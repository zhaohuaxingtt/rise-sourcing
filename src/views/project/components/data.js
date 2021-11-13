/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:11:17
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-12 17:37:58
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\components\data.js
 */

export const TAB = [
  {
    value: 1,
    name: '概览',
    message: 0,
    url: '/projectmgt/projectoverview',
    activePath: 'projectoverview',
    key: 'GAILAN'
  },
  {
    value: 2,
    name: '排程助手',
    message: 0,
    url: '/projectmgt/projectscheassistant',
    activePath: 'projectscheassistant',
    key: 'PAICHENGZHUSHOU'
  },
  {
    value: 3,
    name: '项目进度监控',
    message: 0,
    url: '/projectmgt/projectprogressmonitoring',
    activePath: 'projectprogressmonitoring',
    key: 'XIANGMUJINDUJIANKONG'
  },
  {
    value: 4,
    name: '项目进度报告',
    message: 0,
    url: '/projectmgt/projectprogressreport',
    activePath: 'projectprogressreport',
    key: 'XIANGMUJINDUBAOGAO'
  }
]

export const COMFIRMTAB = [
  {
    value: 1,
    name: '排程助手',
    message: 0,
    url: '/projectmgt/projectscheassistant/proconfirm',
    activePath: 'projectscheassistant',
    key: 'PAICHENGZHUSHOU'
  },
  {
    value: 2,
    name: '项目进度监控',
    message: 0,
    url: '/projectmgt/projectprogressmonitoring/delayconfirm',
    activePath: 'projectprogressmonitoring',
    key: 'XIANGMUJINDUJIANKONG'
  }
]