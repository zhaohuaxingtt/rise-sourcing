/*
 * @Author: haojiang
 * @Date: 2021-08-06 15:49:46
 * @LastEditTime: 2021-12-08 10:17:21
 * @LastEditors: Luoshuang
 * @Description: 报表管理
 * @FilePath: \front-sourcing\src\router\modules\reportmanage.js
 */

export default [
  // 寻源概览
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "寻源概览",
      activeMenu: ['RISE_WORKBENCH', '/SOURCEINQUIRYPOINT']
    },
    component: () => import ("@/layout/default"),
    children: [
      {
        path: "/sourcing/dashboard",
        name: "reportmgmt-report",
        meta: {
          title: "寻源概览",
          activeMenu: ['RISE_WORKBENCH', '/SOURCEINQUIRYPOINT']
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
      activeMenu: ['RISE_WORKBENCH', '/SOURCEINQUIRYPOINT']
    },
    component: () => import ("@/layout/default"),
    redirect: "/sourceinquirypoint/sourcing/reportmgmt/report",
    children: [
      {
        path: "/sourceinquirypoint/sourcing/reportmgmt/report",
        name: "reportmgmt-report",
        meta: {
          title: "状态跟踪报表",
          activeMenu: ['RISE_WORKBENCH', '/SOURCEINQUIRYPOINT']
        },
        component: () => import ("@/views/dashboard/report/pbi")
      },
      {
        path: "/sourceinquirypoint/sourcing/reportmgmt/details",
        name: "reportmgmt-details",
        meta: {
          title: "状态跟踪详情",
          activeMenu: ['RISE_WORKBENCH', '/SOURCEINQUIRYPOINT']
        },
        component: () => import ("@/views/dashboard/report")
      },
    ]
  }
  
]