/*
 * @Author: haojiang
 * @Date: 2021-08-06 15:49:46
 * @LastEditTime: 2022-02-18 14:41:08
 * @LastEditors: YoHo
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
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import("@/layout/default"),
    children: [
      {
        path: "/sourcing/dashboard",
        name: "reportmgmt-report",
        meta: {
          title: "寻源概览",
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import("@/views/dashboard/layout"),
        redirect: "/sourcing/dashboard/index",
        children: [
          {
            path: "index",
            name: "reportmgmt-report",
            meta: {
              title: "寻源与定点-概览",
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import("@/views/dashboard/index")
          }, {
            path: "report",
            name: "reportmgmt-report",
            meta: {
              title: "寻源与定点-状态跟踪报表",
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import("@/views/dashboard/report/pbi")
          },
          {
            path: "details",
            name: "reportmgmt-details",
            meta: {
              title: "寻源与定点-状态跟踪详情",
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import("@/views/dashboard/report")
          },
        ]
      },
    ]
  },
  {
    path: "/sourceinquirypoint/sourcing/reportmgmt",
    name: "sourcing-reportmgmt",
    meta: {
      title: "报表管理",
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import("@/layout/default"),
    redirect: "/sourceinquirypoint/sourcing/reportmgmt/report",
    children: [
      {
        path: "/sourceinquirypoint/sourcing/reportmgmt/report",
        name: "reportmgmt-report",
        meta: {
          title: "状态跟踪报表",
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import("@/views/dashboard/report/pbi")
      },
      {
        path: "/sourceinquirypoint/sourcing/reportmgmt/details",
        name: "reportmgmt-details",
        meta: {
          title: "状态跟踪详情",
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import("@/views/dashboard/report")
      },
    ]
  }

]