/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:32:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-08 15:34:35
 * @Description: 
 * @FilePath: \front-web\src\views\financialTargetPrice\components\data.js
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
    name: '财务目标价管理',
    key: 'CAIWUMUBIAOJIAGUANLI',
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
    key: 'MUBIAOJIAWEIHU'
  },
  {
    value: 2,
    name: '目标价审批',
    message: 0,
    url: '/financialtargetprice/approval',
    activePath: 'approval',
    key: 'MUBIAOJIASHENPI'
  },
  {
    value: 3,
    name: '目标价查询',
    message: 0,
    url: '/financialtargetprice/query',
    activePath: 'query',
    key: 'MUBIAOJIACHAXUN'
  },
]