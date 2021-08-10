/*
 * @Author: haojiang
 * @Date: 2021-08-06 15:49:46
 * @LastEditTime: 2021-08-09 09:07:00
 * @LastEditors: Please set LastEditors
 * @Description: 报表管理
 * @FilePath: /front-web/src/router/modules/reportmanage.js
 */

export default [
  // 状态跟踪详情报表
  {
    path: "/sourcing/dashboardreport",
    name: "designate",
    component: () => import ("@/layout/default"),
    redirect: "/designate/dashboard/report",
    children: [
      {
        path: "/sourcing/dashboard/report",
        name: "dashboard-report",
        component: () => import ("@/views/dashboard/report")
      },
    ]
  }
  
]