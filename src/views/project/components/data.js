/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:11:17
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-29 11:22:51
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
    key: 'GAILAN',
    permissionKey: 'PROJECTMGT_OVERVIEW_TAB',
    permissionName: '项目管理-概览Tab'
  },
  {
    value: 2,
    name: '排程助手',
    message: 0,
    url: '/projectmgt/projectscheassistant',
    activePath: 'projectscheassistant',
    key: 'PAICHENGZHUSHOU',
    permissionKey: 'PROJECTMGT_SCHEASSISTANT_TAB',
    permissionName: '项目管理-排程助手Tab'
  },
  {
    value: 3,
    name: '项目进度监控',
    message: 0,
    url: '/projectmgt/projectprogressmonitoring',
    activePath: 'projectprogressmonitoring',
    key: 'XIANGMUJINDUJIANKONG',
    permissionKey: 'PROJECTMGT_PROGRESSMONITORING_TAB',
    permissionName: '项目管理-项目进度监控Tab'
  },
  // {
  //   value: 4,
  //   name: '项目进度报告',
  //   message: 0,
  //   url: '/projectmgt/projectprogressreport',
  //   activePath: 'projectprogressreport',
  //   key: 'XIANGMUJINDUBAOGAO',
  //   permissionKey: 'PROJECTMGT_PROGRESSREPORT_TAB',
  //   permissionName: '项目管理-项目进度报告Tab'
  // }
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

export const navList = [
  {
      value: 1,
      name: '零件进度报告',
      url: '/projectmgt/projectprogressreport/partprogress',
      activePath: '/projectmgt/projectprogressreport/partprogress',
      key: '零件进度报告',
      permissionKey:'PROJECTMGT_PROJECTPROGRESSREPORT_PARTPROGRESS',
  },
  {
      value: 2,
      name: '材料成本报告',
      url: '/projectmgt/projectprogressreport/materialcost',
      activePath: '/projectmgt/projectprogressreport/materialcost',
      key: '材料成本报告',
      permissionKey:'PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST',
  },
  {
      value: 3,
      name: '项目管理绩效分析',
      url: '/projectmgt/projectprogressreport/performanceanalysis',
      activePath: '/projectmgt/projectprogressreport/performanceanalysis',
      key: '项目管理绩效分析',
      permissionKey:'PROJECTMGT_PROJECTPROGRESSREPORT_PERFORMANCEANALYSIS',
  },
]