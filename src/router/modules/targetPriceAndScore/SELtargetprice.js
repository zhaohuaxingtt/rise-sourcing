/*
 * @Author: Luoshuang
 * @Date: 2021-11-01 10:26:55
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-06 17:19:21
 * @Description: 模具目标价相关路由
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\modeltargetprice.js
 */
export default [
  {
    path: "seltargetprice",
    meta: { title: "模具目标价管理", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
    component: () => import("@/views/routerView"),
    redirect: "seltargetprice/signin",
    children: [
      {
        path: "signin",
        name: "targetPriceSignin",
        meta: { title: "目标价签收", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/SELTargetPrice/signin"),
      },
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "目标价维护", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/SELTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "目标价审批", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/SELTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "目标价查询", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/SELTargetPrice/query"),
      },
      {
        path: "detail",
        name: "targetPriceDetail",
        meta: { title: "目标价详情", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/SELTargetPrice/targetPriceDetail"),
      }
    ]
  }
]