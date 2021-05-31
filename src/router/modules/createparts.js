/*
 * @Author: your name
 * @Date: 2021-05-24 16:05:07
 * @LastEditTime: 2021-05-24 17:20:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\createparts.js
 */
export default [
  {
    path: "/sourcing",
    name: "sourcing",
    component: () => import("@/layout/default"),
    children: [
      {
        path: "createparts",
        name: "createParts",
        component: () => import("@/views/partsprocure/createparts"),
        redirect: "/sourcing/createparts/home",
        children: [
          {
            path: "home",
            name: "createPartsHome",
            meta: { title: "手工采购项目创建" },
            component: () => import("@/views/partsprocure/createparts/components/home"),
          },
          {
            path: "steelbatchpurchase",
            name: "createPartsSteelBatchPurchase",
            meta: { title: "钢材批量采购" },
            component: () => import("@/views/partsprocure/createparts/components/steelbatchpurchase"),
          },
          {
            path: "steelsinglepurchase",
            name: "createPartsSteelSinglePurchase",
            meta: { title: "钢材一次性采购" },
            component: () => import("@/views/partsprocure/createparts/components/steelsinglepurchase"),
          },
          {
            path: "factoryrelocate",
            name: "createPartsFactoryRelocate",
            meta: { title: "工厂迁移" },
            component: () => import("@/views/partsprocure/createparts/components/factoryrelocate"),
          }
        ]
      }
    ]
  }
]