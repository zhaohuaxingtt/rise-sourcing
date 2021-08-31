/*
 * @Author: haojiang
 * @Date: 2021-08-06 15:49:46
 * @LastEditTime: 2021-08-31 11:07:59
 * @LastEditors: Hao,Jiang
 * @Description: 报表管理
 * @FilePath: /front-web/src/router/modules/reportmanage.js
 */

export default [
  // 寻源概览
  {
    path: "/dashboard",
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
        path: "details",
        name: "reportmgmt-details",
        component: () => import ("@/views/dashboard/report")
      },
      // 报表详情
      {
        path: "report",
        name: "reportmgmt-report",
        component: () => import ("@/views/dashboard/report/pbi")
      },
    ]
  },
  {
    path: "/sourceinquirypoint/sourcing/reportmgmt",
    name: "sourcing-reportmgmt",
    component: () => import ("@/layout/default"),
    redirect: "/sourcing/reportmgmt/report",
    children: [
      {
        path: "details",
        name: "reportmgmt-details",
        component: () => import ("@/views/dashboard/report")
      },
      // 报表详情
      {
        path: "report",
        name: "reportmgmt-report",
        component: () => import ("@/views/dashboard/report/pbi")
      },
    ]
  }
  
]