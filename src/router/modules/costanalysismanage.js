/*
 * @Author: your name
 * @Date: 2021-05-27 12:00:48
 * @LastEditTime: 2021-05-27 17:47:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\costanalysismanage.js
 */
export default [
  {
    path: "/",
    component: () => import("@/layout/default"),
    children: [
      {
        path: "/costanalysismanage",
        name: "sourcing",
        component: () => import("@/views/costanalysismanage"),
        redirect: "/costanalysismanage/home",
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
          }
        ]
      },
      {
        path: "/costanalysismanage/rfqdetail",
        name: "costAnalysisManageRfqDetail",
        meta: { title: "RFQ详情" },
        component: () => import("@/views/costanalysismanage/components/rfqdetail"),
      }
    ]
  }
]