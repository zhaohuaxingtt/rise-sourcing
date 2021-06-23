/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:52:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 09:34:19
 * @Description: 财务目标价相关路由
 * @FilePath: \front-web\src\router\modules\financialtargetprice.js
 */
export default [
  {
    path: "/financialtargetprice",
    component: () => import("@/layout/default"),
    redirect: "/financialtargetprice/maintenance",
    children: [
      {
        path: "/financialtargetprice/maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "目标价维护" },
        component: () => import("@/views/financialTargetPrice/maintenance"),
      },
      {
        path: "/financialtargetprice/approval",
        name: "targetPriceApproval",
        meta: { title: "目标价审批" },
        component: () => import("@/views/financialTargetPrice/approval"),
      },
      {
        path: "/financialtargetprice/query",
        name: "targetPriceQuery",
        meta: { title: "目标价查询" },
        component: () => import("@/views/financialTargetPrice/query"),
      },
      {
        path: "/financialtargetprice/detail",
        name: "targetPriceDetail",
        meta: { title: "目标价详情" },
        component: () => import("@/views/financialTargetPrice/targetPriceDetail"),
      }
    ]
  }
]