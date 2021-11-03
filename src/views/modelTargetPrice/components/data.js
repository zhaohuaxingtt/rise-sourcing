/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:32:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-01 16:29:58
 * @Description: 
 * @FilePath: \front-web\src\views\modelTargetPrice\components\data.js
 */

export const TAB = [
  // {
  //   value: 1,
  //   name: '寻源执行',
  //   key: 'LK_XUNYUANZHIHANG',
  //   url: '/sourceinquirypoint/sourcing/partsign',
  //   activePath: 'sourcing',
  //   message: 0
  // },
  // {
  //   value: 2,
  //   name: '进度监控',
  //   key: 'LK_JINDUJIANKONG',
  //   url: '/nomination',
  //   message: 0
  // },
  {
    value: 1,
    name: '模具目标价管理',
    key: 'MUJUMUBIAOJIAGUANLI',
    url: '/modeltargetprice',
    activePath: 'modeltargetprice',
    message: 0
  }
]

export const MENU = [
  {
    value: 1,
    name: '目标价签收',
    message: 0,
    url: '/modeltargetprice/signin',
    activePath: 'signin',
    key: 'MUBIAOJIAQIANSHOU'
  },
  {
    value: 2,
    name: '目标价维护',
    message: 0,
    url: '/modeltargetprice/maintenance',
    activePath: 'maintenance',
    key: 'MUBIAOJIAWEIHU'
  },
  {
    value: 3,
    name: '目标价审批',
    message: 0,
    url: '/modeltargetprice/approval',
    activePath: 'approval',
    key: 'MUBIAOJIASHENPI'
  },
  {
    value: 4,
    name: '目标价查询',
    message: 0,
    url: '/modeltargetprice/query',
    activePath: 'query',
    key: 'MUBIAOJIACHAXUN'
  },
]