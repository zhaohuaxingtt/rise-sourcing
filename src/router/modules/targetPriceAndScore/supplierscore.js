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
    path: "supplierscore",
    meta: {
      title: "评分任务",
    },
    component: () => import("@/views/routerView"),
    redirect: "supplierscore/home",
    children: [
      {
        path: "home",
        name: "supplierscoreHome",
        meta: {
          title: "评分任务-首页",
        },
        component: () => import("@/views/supplierscore"),
      }, 
      {
        path: "rfqdetail",
        name: "supplierscoreRfqDetail",
        meta: {
          title: "评分任务-RFQ详情",
        },
        component: () => import("@/views/supplierscore/components/rfqdetail"),
      },
      {
        path: "partscore",
        name: "supplierscorePartscore partscore",
        meta: {
          title: "评分任务-零件评分",
        },
        component: () => import("@/views/supplierscore/components/partscore"),
      }
    ]
  }
]