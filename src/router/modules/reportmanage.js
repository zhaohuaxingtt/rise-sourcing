/*
 * @Author: haojiang
 * @Date: 2021-08-06 15:49:46
 * @LastEditTime: 2021-09-07 17:10:54
 * @LastEditors: Hao,Jiang
 * @Description: 报表管理
 * @FilePath: /front-web/src/router/modules/reportmanage.js
 */

export default [
  // 寻源概览
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "寻源概览",
    },
    component: () => import ("@/layout/default"),
    children: [
      {
        path: "/sourcing/dashboard",
        name: "reportmgmt-report",
        meta: {
          title: "寻源概览",
        },
        component: () => import ("@/views/dashboard/index")
      },
    ]
  },
  {
    path: "/sourceinquirypoint/sourcing/reportmgmt",
    name: "sourcing-reportmgmt",
    meta: {
      title: "报表管理",
    },
    component: () => import ("@/layout/default"),
    redirect: "/sourceinquirypoint/sourcing/reportmgmt/report",
    children: [
      {
        path: "details",
        name: "reportmgmt-details",
        meta: {
          title: "状态跟踪报表",
        },
        component: () => import ("@/views/dashboard/report")
      },
      // 报表详情
      {
        path: "report",
        name: "reportmgmt-report",
        meta: {
          title: "状态跟踪详情",
        },
        component: () => import ("@/views/dashboard/report/pbi")
      },
    ]
  }
  
]