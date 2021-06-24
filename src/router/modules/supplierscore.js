/*
 * @Author: your name
 * @Date: 2021-06-22 14:40:19
 * @LastEditTime: 2021-06-24 10:56:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\supplierscore.js
 */
export default [
  {
    path: "/supplierscore",
    name: "supplierscore",
    component: () => import("@/layout/default"),
    redirect: "/supplierscore/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/supplierscore"),
      }, 
      {
        path: "rfqdetail",
        name: "rfqdetail",
        component: () => import("@/views/supplierscore/components/rfqdetail"),
      },
      {
        path: "partscore",
        name: "partscore",
        component: () => import("@/views/supplierscore/components/partscore"),
      }
    ]
  }
]