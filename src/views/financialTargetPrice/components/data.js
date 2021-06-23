/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:32:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-22 11:25:14
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\components\data.js
 */

export const TAB = [
  {
    value: 1,
    label: '寻源执行',
    key: 'LK_XUNYUANZHIHANG',
    url: '/sourcing/partsign',
    activePath: 'sourcing',
    message: 0
  },
  {
    value: 2,
    label: '进度监控',
    key: 'LK_JINDUJIANKONG',
    url: '/nomination',
    message: 0
  },
  {
    value: 3,
    label: '财务目标价管理',
    key: '财务目标价管理',
    url: '/financialtargetprice',
    activePath: 'financialtargetprice',
    message: 0
  }
]

export const MENU = [
  {
    value: 1,
    name: '目标价维护',
    message: 0,
    url: '/financialtargetprice/maintenance',
    activePath: 'maintenance',
    key: 'LK_MUBIAOJIAWEIHU'
  },
  {
    value: 2,
    name: '目标价审批',
    message: 0,
    url: '/financialtargetprice/approval',
    activePath: 'approval',
    key: 'LK_MUBIAOJIASHENPI'
  },
  {
    value: 7,
    name: '目标价查询',
    message: 0,
    url: '/financialtargetprice/query',
    activePath: 'query',
    key: 'LK_MUBIAOJIACHAXUN'
  },
]