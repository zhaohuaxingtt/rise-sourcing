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
        name: "delayanalysis",
        meta: {
          title: "送样管理-延误清单-定点",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/delayAnalysis"),
      },
      {
        path: "delayanalysis/StartUp",
        name: "delayanalysisStartUp",
        meta: {
          title: "送样管理-延误清单-启动",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/delayAnalysis"),
      },
      {
        path: "delayanalysis/BF",
        name: "delayanalysisBF",
        meta: {
          title: "送样管理-延误清单-BF",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/delayAnalysis"),
      },
      {
        path: "delayanalysis/Tryout",
        name: "delayanalysisTryout",
        meta: {
          title: "送样管理-延误清单-1st Tryout",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/delayAnalysis"),
      },
      {
        path: "delayanalysis/OTS",
        name: "delayanalysisOTS",
        meta: {
          title: "送样管理-延误清单-OTS",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/delayAnalysis"),
      },
      {
        path: "delayanalysis/EM",
        name: "delayanalysisEM",
        meta: {
          title: "送样管理-延误清单-EM",
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
      },
      {
        path: "kickoff",
        name: "kickoff",
        meta: {
          title: "送样管理-kickoff",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/overview/components/kickOff"),
      },
      {
        path: "shuttle",
        name: "shuttle",
        meta: {
          title: "送样管理-shuttle",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/shuttle"),
      },
      {
        path: "activity",
        name: "activity",
        meta: {
          title: "送样管理-activity",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/activity"),
      },
      {
        path: "deliverPlan",
        name: "deliverPlan",
        meta: {
          title: "送样管理-deliverPlan",
          activeMenu: ['RISE_WORKBENCH', 'PROJECTMGT']
        },
        component: () => import("@/views/deliver/deliverPlan"),
      },
      
      
    ]
  }
]
