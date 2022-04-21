/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:02:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 10:28:40
 * @Description: 
 * @FilePath: \front-sourcing\src\router\modules\project.js
 */

export default [
  {
    path: "/projectmgt",
    component: () => import("@/layout/default"),
    redirect: "/projectmgt/projectoverview",
    meta: {
      title: "项目管理",
      activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
    },
    children: [
      {
        path: "projectoverview",
        name: "overview",
        meta: {
          title: "项目管理-概览",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/project/overview"),
      },
      {
        path: "projectscheassistant",
        name: "schedulingAssistant",
        meta: {
          title: "项目管理-排程助手",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/project/schedulingassistant"),
        redirect: "/projectmgt/projectscheassistant/progroupscheduling",
        children: [
          {
            path: 'progroupscheduling',
            name: "productGroupScheduling",
            meta: {
              title: "项目管理-排程助手-产品组排程",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/schedulingassistant/progroup")
          },
          {
            path: 'partscheduling',
            name: "partScheduling",
            meta: {
              title: "项目管理-排程助手-零件排程",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/schedulingassistant/part")
          },
          {
            path: 'progressconfirmsummary',
            name: "progressConfirmSummary",
            meta: {
              title: "项目管理-排程助手-进度确认汇总",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/schedulingassistant/progressconfirm")
          },
          {
            path: 'scheduleversion',
            name: "scheduleVersion",
            meta: {
              title: "项目管理-排程助手-排程版本查询",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/schedulingassistant/scheduleVersion")
          },
          {
            path: 'historyprocessdb',
            name: "historyProcessDb",
            meta: {
              title: "项目管理-排程助手-历史进度数据库",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/schedulingassistant/historyprocessdb")
          },
          // {
          //   path: 'proconfirm',
          //   name: "proconfirm",
          //   meta: {
          //     title: "项目管理-排程助手-进度确认",
          //     activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
          //   },
          //   component: () => import("@/views/project/schedulingassistant/progressconfirm")
          // },
          {
            path: 'defaultscheLogic',
            name: 'defaultScheLogic',
            meta: {
              title: '排程助手-默认排程算法配置',
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import('@/views/project/schedulingassistant/defaultScheLogic')
          },
          {
            path: 'riskAndAlarmConfig',
            name: 'riskAndAlarmConfig',
            meta: {
              title: '排程助手-风险预警配置',
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import('@/views/project/schedulingassistant/riskAndAlarmConfig')
          }
        ]
      },
      {
        path: "projectprogressmonitoring",
        name: "projectProgressMonitoring",
        meta: {
          title: "项目管理-项目进度监控",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/project/progressmonitoring"),
        redirect: "/projectmgt/projectprogressmonitoring/home",
        children: [
          {
            path: "home",
            name: "progressmonitoring-monitoring",
            meta: {
              title: "项目管理-项目进度监控",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressmonitoring/home"),
          },
          {
            path: "delaysummary",
            name: "progressmonitoring-delaySummary",
            meta: {
              title: "延误原因汇总",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressmonitoring/delaySummary"),
          },
          {
            path: "partList",
            name: "progressmonitoring-monitoring-partList",
            meta: {
              title: "零件列表",
              withoutTop: true,
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressmonitoring/partList"),
          },
          {
            path: "partstask",
            name: "progressmonitoring-parts-taskList",
            meta: {
              title: "项目管理-零件任务清单",
              withoutTop: true,
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressmonitoring/partsTaskList")
          },
          {
            path: "monitordetail",
            name: "progressmonitoring-detail",
            meta: {
              title: "项目管理-监控明细",
              withoutTop: true,
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT'],
              collapse: true
            },
            component: () => import("@/views/project/progressmonitoring/monitorDetail")
          },
          {
            path: "delayconfirm",
            name: "progressmonitoring-delayconfirm",
            meta: {
              title: "延误原因确认",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressmonitoring/delaySummary"),
          },
          {
            path: 'proconfirm',
            name: "proconfirm",
            meta: {
              title: "项目管理-排程助手-进度确认",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/schedulingassistant/progressconfirm")
          },
        ]
      },
      {
        path: "projectprogressreport",
        name: "projectProgressReport",
        meta: {
          title: "项目管理-项目进度报告",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/project/progressreport"),
        redirect: "/projectmgt/projectprogressreport/partprogress",
        children: [
          {
            path: "partprogress",
            name: "partprogress",
            meta: {
              title: "项目管理-项目进度报告-零件进度报告",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressreport/partprogress"),
          },
          {
            path: "materialcost",
            name: "materialcost",
            meta: {
              title: "项目管理-项目进度报告-材料成本报告",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressreport/materialcost"),
          },
          {
            path: "performanceanalysis",
            name: "performanceanalysis",
            meta: {
              title: "项目管理-项目进度报告-项目管理绩效分析",
              activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
            },
            component: () => import("@/views/project/progressreport/performanceanalysis"),
          }
        ]
      }
    ]
  }
]
