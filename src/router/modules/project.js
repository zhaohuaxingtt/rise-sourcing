/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:02:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-03 15:05:01
 * @Description: 
 * @FilePath: \front-web\src\router\modules\project.js
 */

export default [
  {
    path: "/projectmgt",
    component: () => import("@/layout/default"),
    redirect: "/projectmgt/projectoverview",
    meta: {
      title: "项目管理",
    },
    children: [
      {
        path: "projectoverview",
        name: "overview",
        meta: {
          title: "项目管理-概览",
        },
        component: () => import("@/views/project/overview"),
      },
      {
        path: "projectscheassistant",
        name: "schedulingAssistant",
        meta: {
          title: "项目管理-排程助手",
        },
        component: () => import("@/views/project/schedulingassistant"),
        redirect: "/projectmgt/projectscheassistant/progroupscheduling",
        children: [
          {
            path: 'progroupscheduling',
            name: "productGroupScheduling",
            meta: {
              title: "项目管理-排程助手-产品组排程",
            },
            component: () => import("@/views/project/schedulingassistant/progroup")
          },
          {
            path: 'partscheduling',
            name: "partScheduling",
            meta: {
              title: "项目管理-排程助手-零件排程",
            },
            component: () => import("@/views/project/schedulingassistant/part")
          },
          {
            path: 'progressconfirmsummary',
            name: "progressConfirmSummary",
            meta: {
              title: "项目管理-排程助手-进度确认汇总",
            },
            component: () => import("@/views/project/schedulingassistant/progressconfirm")
          },
          {
            path: 'scheduleversion',
            name: "scheduleVersion",
            meta: {
              title: "项目管理-排程助手-排程版本查询",
            },
            component: () => import("@/views/project/schedulingassistant/scheduleVersion")
          },
          {
            path: 'historyprocessdb',
            name: "historyProcessDb",
            meta: {
              title: "项目管理-排程助手-历史进度数据库",
            },
            component: () => import("@/views/project/schedulingassistant/historyprocessdb")
          },
          {
            path: 'proconfirm',
            name: "proconfirm",
            meta: {
              title: "项目管理-排程助手-进度确认",
            },
            component: () => import("@/views/project/schedulingassistant/progressconfirm")
          }
        ]
      },
      {
        path: "projectprogressmonitoring",
        name: "projectProgressMonitoring",
        meta: {
          title: "项目管理-项目进度监控",
        },
        component: () => import("@/views/project/progressmonitoring"),
        redirect: "/projectmgt/projectprogressmonitoring/home",
        children: [
          {
            path: "home",
            name: "progressmonitoring-monitoring",
            meta: {
              title: "项目管理-项目进度监控",
            },
            component: () => import("@/views/project/progressmonitoring/home"),
          }
        ]
      },
      {
        path: "projectprogressreport",
        name: "projectProgressReport",
        meta: {
          title: "项目管理-项目进度报告",
        },
        component: () => import("@/views/project/progressreport"),
      }
    ]
  }
]
