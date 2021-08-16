/*
 * @Author: haojiang
 * @Date: 2021-08-06 15:49:46
 * @LastEditTime: 2021-08-15 11:03:37
 * @LastEditors: Please set LastEditors
 * @Description: 报表管理
 * @FilePath: /front-web/src/router/modules/reportmanage.js
 */

export default [
  // 寻源概览
  {
    path: "/sourcing/dashboard",
    name: "dashboard",
    component: () => import ("@/layout/default"),
    children: [
      {
        path: "/sourcing/dashboard",
        name: "reportmgmt-report",
        component: () => import ("@/views/dashboard/index")
      },
    ]
  },
  // 状态跟踪详情报表
  {
    path: "/sourcing/reportmgmt",
    name: "sourcing-reportmgmt",
    component: () => import ("@/layout/default"),
    redirect: "/sourcing/reportmgmt/report",
    children: [
      {
        path: "/sourcing/reportmgmt/details",
        name: "reportmgmt-report",
        component: () => import ("@/views/dashboard/report")
      },
      // 报表详情
      {
        path: "/sourcing/reportmgmt/report",
        name: "reportmgmt-details",
        component: () => import ("@/views/dashboard/report/pbi")
      },
    ]
  }
  
]