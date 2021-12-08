/*
 * @Author: Luoshuang
 * @Date: 2021-06-22 10:52:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-08 09:47:22
 * @Description: 财务目标价相关路由
 * @FilePath: \front-sourcing\src\router\modules\steeldemandcreation.js
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
        meta: {title: "钢材管理", activeMenu: ['RISE_WORKBENCH', '/SOURCEINQUIRYPOINT']},
        component:()=> import("@/views/steelDemandCreation/home/index.vue"),
      }
    ]
  }
]