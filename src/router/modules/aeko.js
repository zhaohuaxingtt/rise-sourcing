/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-07-30 16:17:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\aeko.js
 */
export default [
  {
    path: "/aeko",
    name: "aeko",
    component: () => import("@/layout/default"),
    redirect: "/aeko/managelist",
    children: [
      // aeko管理列表页
      {
          path: "managelist",
          name: "aekoManageList",
          component: () => import ("@/views/aeko/manage")
      },
      // AEKO表态
      {
        path: "stancelist",
        name: "aekoStanceList",
        component: () => import ("@/views/aeko/stance")
    },
      // 
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
      },
      {
        path: "describe",
        name: "aekoDescribe",
        component: () => import("@/views/aeko/describe"),
      }
    ]
  }
]