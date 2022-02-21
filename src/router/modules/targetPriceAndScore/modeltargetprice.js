/*
 * @Author: Luoshuang
 * @Date: 2021-11-01 10:26:55
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-08 09:59:55
 * @Description: 模具目标价相关路由
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\modeltargetprice.js
 */

export default [
  {
    path: "modeltargetprice",
    meta: { title: "模具目标价管理", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
    component: () => import("@/views/routerView"),
    redirect: "modeltargetprice/signin",
    children: [
      {
        path: "signin",
        name: "targetPriceSignin",
        meta: { title: "目标价签收", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/modelTargetPrice/signin"),
      },
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "目标价维护", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/modelTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "目标价审批", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/modelTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "目标价查询", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/modelTargetPrice/query"),
      },
      {
        path: "detail",
        name: "targetPriceDetail",
        meta: { title: "目标价详情", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/modelTargetPrice/targetPriceDetail"),
      }
    ]
  }
]