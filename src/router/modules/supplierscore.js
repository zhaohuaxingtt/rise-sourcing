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
    meta: {
      title: "供应商评分",
    },
    component: () => import("@/layout/default"),
    redirect: "/supplierscore/home",
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/supplierscore"),
      }, 
      {
        path: "rfqdetail",
        name: "rfqdetail",
        meta: {
          title: "RFQ详情",
        },
        component: () => import("@/views/supplierscore/components/rfqdetail"),
      },
      {
        path: "partscore",
        name: "partscore",
        meta: {
          title: "零件评分",
        },
        component: () => import("@/views/supplierscore/components/partscore"),
      }
    ]
  }
]