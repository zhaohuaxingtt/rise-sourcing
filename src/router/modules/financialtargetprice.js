/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:52:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-07 17:39:56
 * @Description: 财务目标价相关路由
 * @FilePath: \front-web\src\router\modules\financialtargetprice.js
 */
export default [
  {
    path: "/financialtargetprice",
    meta: { title: "财务目标价管理" },
    component: () => import("@/layout/default"),
    redirect: "/financialtargetprice/maintenance",
    children: [
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "目标价维护" },
        component: () => import("@/views/financialTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "目标价审批" },
        component: () => import("@/views/financialTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "目标价查询" },
        component: () => import("@/views/financialTargetPrice/query"),
      },
      {
        path: "detail",
        name: "targetPriceDetail",
        meta: { title: "目标价详情" },
        component: () => import("@/views/financialTargetPrice/targetPriceDetail"),
      }
    ]
  }
]