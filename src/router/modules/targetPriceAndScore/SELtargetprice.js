/*
 * @Author: Luoshuang
 * @Date: 2021-11-01 10:26:55
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-29 15:55:59
 * @Description: 模具目标价相关路由
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\modeltargetprice.js
 */
export default [
  {
    path: "seltargetprice",
    meta: { title: "SEL目标价管理", activeMenu: ['RISE_WORKBENCH', 'FINANCIALMANAGE'] },
    component: () => import("@/views/routerView"),
    redirect: "seltargetprice/signin",
    children: [
      {
        path: "signin",
        name: "targetPriceSignin",
        meta: { title: "SEL目标价-签收" },
        component: () => import("@/views/SELTargetPrice/signin"),
      },
      {
        path: "maintenance",
        name: "targetPriceMaintenance",
        meta: { title: "SEL目标价-维护" },
        component: () => import("@/views/SELTargetPrice/maintenance"),
      },
      {
        path: "approval",
        name: "targetPriceApproval",
        meta: { title: "SEL目标价-审批" },
        component: () => import("@/views/SELTargetPrice/approval"),
      },
      {
        path: "query",
        name: "targetPriceQuery",
        meta: { title: "SEL目标价-查询" },
        component: () => import("@/views/SELTargetPrice/query"),
      },
      {
        path: "batchMaintain",
        name: "batchMaintain",
        meta: { title: "SEL目标价-批量维护" },
        component: () => import("@/views/SELTargetPrice/components/batchMaintain"),
      },
    ]
  }
]