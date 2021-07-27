/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-07-27 11:07:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\aeko.js
 */
export default [
  {
    path: "/aeko",
    name: "aeko",
    component: () => import("@/layout/default"),
    redirect: "/aeko/home",
    children: [
      // {
      //   path: "home",
      //   name: "home",
      //   component: () => import("@/views/aeko"),
      // }, 
      {
        path: "aekodetail",
        name: "aekodetail",
        component: () => import("@/views/aeko/detail"),
      },
      {
        path: "quondampart",
        name: "quondampart",
        component: () => import("@/views/aeko/quondampart"),
        redirect: "quondampart/ledger",
        children: [
          {
            path: "ledger",
            name: "quondampartLedger",
            component: () => import("@/views/aeko/quondampart/components/ledger"),
          },
          {
            path: "aeko",
            name: "quondampartAeko",
            component: () => import("@/views/aeko/quondampart/components/aeko"),
          },
        ]
      }
    ]
  }
]