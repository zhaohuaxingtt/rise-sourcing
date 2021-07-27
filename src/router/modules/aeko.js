/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-07-27 11:21:25
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
      // aeko管理列表页
      {
          path: "managelist",
          name: "aekoManageList",
          component: () => import ("@/views/aeko/manage")
      },
      {
        path: "aekodetail",
        name: "aekodetail",
        component: () => import("@/views/aeko/detail"),
      },
      {
        path: "describe",
        name: "aekoDescribe",
        component: () => import("@/views/aeko/describe"),
      }
    ]
  }
]