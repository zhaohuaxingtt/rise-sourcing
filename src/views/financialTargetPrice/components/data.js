/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:32:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-06 16:00:13
 * @Description: 
 * @FilePath: \front-sourcing\src\views\financialTargetPrice\components\data.js
 */

export const TAB = [
  {
    value: 1,
    name: '财务目标价管理',
    key: 'CAIWUMUBIAOJIAGUANLI',
    url: '/targetpriceandscore/financialtargetprice',
    activePath: 'financialtargetprice',
    message: 0,
    permissionKey: "FINANCIALTARGETMGT_TAB",
    permissionName: "财务目标价管理"
  },
  {
    value: 2,
    name: '模具目标价管理',
    key: 'MUJUMUBIAOJIAGUANLI',
    url: '/targetpriceandscore/modeltargetprice',
    activePath: 'modeltargetprice',
    message: 0,
    permissionKey: "MODELTARGETMGT_TAB",
    permissionName: "模具目标价管理"
  },
  {
    value: 3,
    name: '评分任务',
    url: "/targetpriceandscore/supplierscore",
    activePath: "/supplierscore",
    key: "PINGFENRENWU",
    permissionKey: "SUPPLIERSCORE_TAB",
    permissionName: "评分任务"
  },
  {
    value: 4,
    name: '评分部门设置',
    url: "/targetpriceandscore/configscoredept",
    activePath: "/configscoredept",
    key: "PINGFENBUMENSHEZHI",
    permissionKey: "CONFIGSCOREDEPT_TAB",
    permissionName: "评分部门设置"
  },
  {
    value: 5,
    name: "成本分析管理",
    url: "/targetpriceandscore/costanalysismanage/home",
    activePath: "/costanalysismanage/home",
    key: "CHENGBENFENXIGUANLI",
    permissionKey: "COSTANALYSISMANAGE_HOME_TAB",
    permissionName: "成本分析管理"
  },
  {
    value: 6,
    name: "数据维护",
    url: "/targetpriceandscore/datamaintenance/costMaintenance",
    activePath: "/datamaintenance",
    key: "SHUJUWEIHU",
    permissionKey: "COSTANALYSISMANAGE_DATAMAINTENANCE_TAB",
    permissionName: "数据维护"
  },
  
]

export const MENU = [
  {
    value: 1,
    name: '目标价维护',
    message: 0,
    url: '/targetpriceandscore/financialtargetprice/maintenance',
    activePath: 'maintenance',
    key: 'MUBIAOJIAWEIHU',
    permissionKey: 'FINANCIALTARGETPRICE_MAINTENANCE_PAGE',
    permissionName: '财务目标价管理-目标价维护-页面'
  },
  {
    value: 2,
    name: '目标价审批',
    message: 0,
    url: '/targetpriceandscore/financialtargetprice/approval',
    activePath: 'approval',
    key: 'MUBIAOJIASHENPI',
    permissionKey: 'FINANCIALTARGETPRICE_APPROVAL_PAGE',
    permissionName: '财务目标价管理-目标价审批-页面'
  },
  {
    value: 3,
    name: '目标价查询',
    message: 0,
    url: '/targetpriceandscore/financialtargetprice/query',
    activePath: 'query',
    key: 'MUBIAOJIACHAXUN',
    permissionKey: 'FINANCIALTARGETPRICE_QUERY_PAGE',
    permissionName: '财务目标价管理-目标价查询-页面'
  },
]