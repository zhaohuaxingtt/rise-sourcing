/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:02:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 10:28:40
 * @Description: 
 * @FilePath: \front-sourcing\src\router\modules\deliver.js
 */

export default [
  {
    path: "/deliver",
    component: () => import("@/layout/default"),
    redirect: "/deliver/overview",
    meta: {
      title: "送样管理",
      activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
    },
    children: [
      {
        path: "overview",
        name: "overview",
        meta: {
          title: "送样管理-总览",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/overview"),
      },
      {
        path: "delayanalysis",
        name: "overview",
        meta: {
          title: "送样管理-延误清单",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/delayAnalysis"),
      },
      {
        path: "progressdetail",
        name: "overview",
        meta: {
          title: "送样管理-送样过程监控",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/progressDetail"),
      }
    ]
  }
]
