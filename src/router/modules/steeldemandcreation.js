/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:52:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-30 14:07:17
 * @Description: 财务目标价相关路由
 * @FilePath: \front-web\src\router\modules\financialtargetprice.js
 */
export default [
  {
    path: "sourcing",
    meta:{
      title:'询源执行'
    },
    component: () => import("@/layout/default-white"),
    children: [
      {
        path: "steeldemandcreation",
        name: "designateHome",
        meta: {title: "钢材管理"},
        component:()=> import("@/views/steelDemandCreation/home/index.vue"),
      }
    ]
  }
]