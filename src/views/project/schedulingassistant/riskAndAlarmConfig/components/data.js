/*
 * @Author: your name
 * @Date: 2021-08-24 14:53:57
 * @LastEditTime: 2022-03-23 16:03:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\riskAndAlarmConfig\components\data.js
 */

export const MENU = [
  {
    value: 21,
    name: '风险预警配置',
    message: 0,
    url: '/scheassistant/riskAndAlarmConfig',
    activePath: 'riskAndAlarmConfig',
    key: 'FENGXIANYUJINGPEIZHI'
  }
]

export const riskAndAlarmTitle = [
  {
    props: 'delayTypeDesc',
    name: '风险类型',
    key: 'FENGXIANLEIXING',
    tooltip: false
  },
  {
    props: 'delayLevelDesc',
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
  }
]

export const riskAndAlarmData = [
  {
    level: '高风险',
    key: 'LK_GAOFENGXIAN',
    delayLevel: 3,
    icon: 'iconbaojiapingfengenzong-jiedian-hong',
    delayWeekRight: '',
    delayWeekLeft: '',
    crossOver: [false, true]
  },
  {
    level: '中风险',
    key: 'LK_DIFENGXIAN',
    delayLevel: 2,
    icon: 'iconbaojiapingfengenzong-jiedian-huang',
    delayWeekRight: '',
    delayWeekLeft: '',
    crossOver: [false, true]
  },
  {
    level: '无风险',
    key: 'LK_WUZHENGCHANG',
    delayLevel: 1,
    icon: 'iconbaojiapingfengenzong-jiedian-lv',
    delayWeekRight: '',
    delayWeekLeft: '',
    crossOver: [true, true]
  }
]