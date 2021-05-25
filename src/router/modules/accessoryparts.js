/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 11:41:22
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-25 15:22:05
 * @Description: 配件相关路由
 * @FilePath: \front-web\src\router\modules\accessoryparts.js
 */

export default [
  {
    path: "/sourcing",
    name: "sourcing",
    component: () => import("@/layout/default"),
    children: [
      {
        path: "sourcingexecution",
        name: "sourcingExecution",
        component: () => import("@/views/accessoryPart/index"),
        redirect: "/sourcing/sourcingexecution/signforpartsdemand",
        children: [
          {
            path: "signforpartsdemand",
            name: "signForPartsDemand",
            meta: { title: "配件需求签收" },
            component: () => import("@/views/accessoryPart/components/signForPartsDemand/index"),
          },
          {
            path: "integratedmanage",
            name: "integratedManage",
            meta: { title: "配件综合管理" },
            component: () => import("@/views/accessoryPart/components/signForPartsDemand/index"),
          }
        ]
      },
      {
        path: "accessorypartdetail",
        name: "accessoryPartDetail",
        meta: { title: "配件详情" },
        component: () => import("@/views/accessoryPart/components/accessoryPartDetail/index"),
      }
    ]
  }
]