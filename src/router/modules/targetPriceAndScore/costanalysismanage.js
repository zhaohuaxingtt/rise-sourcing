/*
 * @Author: your name
 * @Date: 2021-05-27 12:00:48
 * @LastEditTime: 2021-09-03 15:13:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\router\modules\costanalysismanage.js
 */
export default [
  {
    path: "costanalysismanage",
    meta: { title: "KM成本分析" },
    component: () => import("@/views/routerView"),
    redirect: "costanalysismanage/home",
    children: [
      {
        path: "home",
        name: "costAnalysisManageHome",
        meta: { title: "KM成本分析-成本分析管理" },
        component: () => import("@/views/costanalysismanage/components/home"),
      },
      {
        path: "datamaintenance",
        name: "costAnalysisManageDataMaintenance",
        meta: { title: "KM成本分析-数据维护" },
        component: () => import("@/views/costanalysismanage/components/datamaintenance"),
        redirect: "datamaintenance/costMaintenance",
        children: [
          {
            path: "costMaintenance",
            name: "laborCostMaintenance",
            meta: { title: "KM成本分析-人工成本维护" },
            component: () => import("@/views/costanalysismanage/components/datamaintenance/components/costMaintenance"),
          },
          {
            path: "costDataMaintenance",
            name: "laborCostDataMaintenance",
            meta: { title: "KM成本分析-人工成本数据维护" },
            component: () => import("@/views/costanalysismanage/components/datamaintenance/components/costDataMaintenance"),
          },
        ]
      },
      {
        path: "rfqdetail",
        name: "costAnalysisManageRfqDetail",
        meta: { title: "KM成本分析-RFQ详情" },
        component: () => import("@/views/costanalysismanage/components/rfqdetail"),
      },
      {
        path: "costanalysis",
        name: "costAnalysisManageCostAnalysis",
        meta: { title: "KM成本分析-成本分析" },
        component: () => import("@/views/costanalysismanage/components/costanalysis"),
      }
    ]
  }
]