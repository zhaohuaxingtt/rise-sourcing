/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:52:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-08 09:59:28
 * @Description: 财务目标价相关路由
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\financialtargetprice.js
 */
export default [
  {
    path: "financialtargetprice",
    meta: { title: "财务目标价管理", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
    component: () => import("@/views/routerView"),
    redirect: "financialtargetprice/maintenance",
    children: [
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "目标价维护", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/financialTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "目标价审批", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/financialTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "目标价查询", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/financialTargetPrice/query"),
      },
      {
        path: "detail",
        name: "targetPriceDetail",
        meta: { title: "目标价详情", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
        component: () => import("@/views/financialTargetPrice/targetPriceDetail"),
      },
    ]
  }
]