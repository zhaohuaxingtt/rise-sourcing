/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:52:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-29 17:25:27
 * @Description: 财务目标价相关路由
 * @FilePath: \front-web\src\router\modules\financialtargetprice.js
 */
export default [
  {
    path: "/sourcing/steeldemandcreation",
    component: () => import("@/layout/default"),
    redirect: "/sourcing/steeldemandcreation/home",
    children: [
      {
        path: "/sourcing/steeldemandcreation/home",
        name: "designateHome",
        meta: {title: "钢材管理"},
        component:()=> import("@/views/steelDemandCreation/home/index.vue"),
      }
    ]
  }
]