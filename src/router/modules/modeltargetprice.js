/*
 * @Author: Luoshuang
 * @Date: 2021-11-01 10:26:55
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-02 16:36:21
 * @Description: 模具目标价相关路由
 * @FilePath: \front-web\src\router\modules\modeltargetprice.js
 */

export default [
  {
    path: "/modeltargetprice",
    meta: { title: "模具目标价管理" },
    component: () => import("@/layout/default"),
    redirect: "/modeltargetprice/signin",
    children: [
      {
        path: "signin",
        name: "targetPriceSignin",
        meta: { title: "目标价签收" },
        component: () => import("@/views/modelTargetPrice/signin"),
      },
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "目标价维护" },
        component: () => import("@/views/modelTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "目标价审批" },
        component: () => import("@/views/modelTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "目标价查询" },
        component: () => import("@/views/modelTargetPrice/query"),
      },
      {
        path: "detail",
        name: "targetPriceDetail",
        meta: { title: "目标价详情" },
        component: () => import("@/views/modelTargetPrice/targetPriceDetail"),
      }
    ]
  }
]