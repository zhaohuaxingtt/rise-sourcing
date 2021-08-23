/*
 * @Author: your name
 * @Date: 2021-05-27 12:00:48
 * @LastEditTime: 2021-08-23 16:10:03
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\router\modules\costanalysismanage.js
 */
export default [
  {
    path: "/",
    component: () => import("@/layout/default-origin"),
    children: [
      {
        path: "/costanalysismanage",
        name: "sourcing",
        component: () => import("@/views/costanalysismanage"),
        redirect: "costanalysismanage/home",
        children: [
          {
            path: "home",
            name: "costAnalysisManageHome",
            meta: { title: "成本分析管理" },
            component: () => import("@/views/costanalysismanage/components/home"),
          },
          {
            path: "datamaintenance",
            name: "costAnalysisManageDataMaintenance",
            meta: { title: "数据维护" },
            component: () => import("@/views/costanalysismanage/components/datamaintenance"),
            redirect: "datamaintenance/costMaintenance",
            children: [
              {
                path: "costMaintenance",
                name: "laborCostMaintenance",
                meta: { title: "人工成本维护" },
                component: () => import("@/views/costanalysismanage/components/datamaintenance/components/costMaintenance"),
              },
              {
                path: "costDataMaintenance",
                name: "laborCostDataMaintenance",
                meta: { title: "人工成本数据维护" },
                component: () => import("@/views/costanalysismanage/components/datamaintenance/components/costDataMaintenance"),
              },
              
            ]
          }
        ]
      },
      {
        path: "/costanalysismanage/rfqdetail",
        name: "costAnalysisManageRfqDetail",
        meta: { title: "RFQ详情" },
        component: () => import("@/views/costanalysismanage/components/rfqdetail"),
      },
      {
        path: "/costanalysismanage/costanalysis",
        name: "costAnalysisManageCostAnalysis",
        meta: { title: "成本分析" },
        component: () => import("@/views/costanalysismanage/components/costanalysis"),
      }
    ]
  }
]