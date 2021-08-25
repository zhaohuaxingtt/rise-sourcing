/*
 * @Author: your name
 * @Date: 2021-08-24 14:53:57
 * @LastEditTime: 2021-08-24 16:29:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/project/progressmonitoring/data.js
 */

export const MENU = [
  {
    value: 1,
    name: '概览',
    message: 0,
    url: '/projectprogressmonitoring/home',
    activePath: 'home',
    key: 'LK_GAILAN'
  },
  {
    value: 2,
    name: '风险预警配置',
    message: 0,
    url: '/projectprogressmonitoring/riskAndAlarmConfig',
    activePath: 'riskAndAlarmConfig',
    key: 'FENGXIANYUJINGPEIZHI'
  }
]

export const riskAndAlarmTitle = [
  {
    props: 'level',
    name: '风险等级',
    key: 'FENGXIANDENGJI',
    tooltip: false
  },
  {
    props: 'icon',
    name: '颜色',
    key: 'LK_YANSE',
    tooltip: false
  },
  {
    props: 'delayTime',
    name: '延误时间(周)',
    key: 'YANWYSHIJIANZHOU',
    tooltip: false
  },
]

export const riskAndAlarmData = [
  {
    level: '延误',
    icon: 'iconbaojiapingfengenzong-jiedian-hong',
    max: '',
    min: '',
    crossOver: [false, true],
  },
  {
    level: '风险',
    icon: 'iconbaojiapingfengenzong-jiedian-huang',
    max: '',
    min: '',
    crossOver: [false, true],
  },
  {
    level: '正常',
    icon: 'iconbaojiapingfengenzong-jiedian-lv',
    max: '',
    min: '',
    crossOver: [true, true],
  },
]