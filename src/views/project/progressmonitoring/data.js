/*
 * @Author: your name
 * @Date: 2021-08-24 14:53:57
 * @LastEditTime: 2021-09-23 10:48:20
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/project/progressmonitoring/data.js
 */

export const MENU = [
  {
    value: 1,
    name: '项目进度监控',
    message: 0,
    url: '/projectmgt/projectprogressmonitoring/home',
    activePath: 'home',
    key: 'XIANGMUJINDUJIANKONG'
  },
  {
    value: 2,
    name: '延误原因汇总',
    message: 0,
    url: '/projectmgt/projectprogressmonitoring/delaySummary',
    activePath: 'delaySummary',
    key: 'YANWUYUANYINHUIZONG'
  },
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
    key: 'LK_YANWU',
    delayLevel: 3,
    icon: 'iconbaojiapingfengenzong-jiedian-hong',
    delayWeekRight: '',
    delayWeekLeft: '',
    crossOver: [false, true],
  },
  {
    level: '风险',
    key: 'LK_FENGXIAN',
    delayLevel: 2,
    icon: 'iconbaojiapingfengenzong-jiedian-huang',
    delayWeekRight: '',
    delayWeekLeft: '',
    crossOver: [false, true],
  },
  {
    level: '正常',
    key: 'LK_ZHENGCHANG',
    delayLevel: 1,
    icon: 'iconbaojiapingfengenzong-jiedian-lv',
    delayWeekRight: '',
    delayWeekLeft: '',
    crossOver: [true, true],
  },
]