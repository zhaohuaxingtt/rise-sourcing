/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:32:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-06 15:58:33
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\components\data.js
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
    url: '/targetpriceandscore/financialtargetprice',
    activePath: 'financialtargetprice',
    message: 0
  },
  {
    value: 2,
    name: '模具目标价管理',
    key: 'MUJUMUBIAOJIAGUANLI',
    url: '/targetpriceandscore/modeltargetprice',
    activePath: 'modeltargetprice',
    message: 0
  }
]

export const MENU = [
  {
    value: 1,
    name: '目标价签收',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/signin',
    activePath: 'signin',
    key: 'MUBIAOJIAQIANSHOU',
    permissionKey: 'MODELTARGETPRICE_SIGNIN_PAGE',
    permissionName: '模具目标价管理-目标价签收-页面'
  },
  {
    value: 2,
    name: '目标价维护',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/maintenance',
    activePath: 'maintenance',
    key: 'MUBIAOJIAWEIHU',
    permissionKey: 'MODELTARGETPRICE_MAINTENANCE_PAGE',
    permissionName: '模具目标价管理-目标价维护-页面'
  },
  {
    value: 3,
    name: '目标价审批',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/approval',
    activePath: 'approval',
    key: 'MUBIAOJIASHENPI',
    permissionKey: 'MODELTARGETPRICE_APPROVAL_PAGE',
    permissionName: '模具目标价管理-目标价审批-页面'
  },
  {
    value: 4,
    name: '目标价查询',
    message: 0,
    url: '/targetpriceandscore/modeltargetprice/query',
    activePath: 'query',
    key: 'MUBIAOJIACHAXUN',
    permissionKey: 'MODELTARGETPRICE_QUERY_PAGE',
    permissionName: '模具目标价管理-目标价查询-页面'
  },
]