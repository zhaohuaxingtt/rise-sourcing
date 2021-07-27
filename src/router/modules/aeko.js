/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-07-26 18:10:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\aeko.js
 */
export default [
  {
    path: "/aeko",
    name: "aeko",
    component: () => import("@/layout/default"),
    redirect: "/aekomanage/home",
    children: [
      // {
      //   path: "home",
      //   name: "home",
      //   component: () => import("@/views/aekomanage"),
      // }, 
      {
        path: "aekodetail",
        name: "aekodetail",
        component: () => import("@/views/aeko/detail"),
      },
      // {
      //   path: "partscore",
      //   name: "partscore",
      //   component: () => import("@/views/supplierscore/components/partscore"),
      // }
    ]
  }
]