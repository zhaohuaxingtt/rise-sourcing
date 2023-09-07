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
    meta: { title: "财务目标价管理", activeMenu: ['RISE_WORKBENCH', 'FINANCIALMANAGE'] },
    component: () => import("@/views/routerView"),
    redirect: "financialtargetprice/maintenance",
    children: [
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "零件目标价-维护" },
        component: () => import("@/views/financialTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "零件目标价-审批" },
        component: () => import("@/views/financialTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "零件目标价-查询" },
        component: () => import("@/views/financialTargetPrice/query"),
      },
      {
        path: "detail",
        name: "targetPriceDetail",
        meta: { title: "零件目标价-详情" },
        component: () => import("@/views/financialTargetPrice/targetPriceDetail"),
      },
    ]
  }
]