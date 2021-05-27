/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-26 17:05:31
 * @LastEditors: Please set LastEditors
 * @Description: 定点管理
 * @metaParams: hideTabLV3 隐藏三级导航
 *
 */

export default [
  {
    path: "/nomination",
    name: "index",
    component: () =>
        import ("@/layout/default"),
    redirect: "/nomination/home",
    children: [
      /* ----定点申请相关路由 start----  */ 
      {
        path: "/nomination/home",
        name: "designateHome",
        meta: {
          title: "定点申请综合管理",
        },
        component: () =>
            import ("@/views/designate/home"),
      },
      // {                             
      //   path: "/designate/rfqdetail",
      //   name: "designateRfqdetail",
      //   meta: {
      //       title: "定点管理-RFQ零件清单",
      //   },
      //   component: () =>
      //     import ("@/views/designate/designatedetail/rfqdetail")
      // }, 
      // {                             
      //   path: "/designate/decisiondata/title",
      //   name: "designateDecisionData",
      //   meta: {
      //       title: "定点管理-决策资料-title",
      //   },
      //   component: () =>
      //     import ("@/views/designate/designatedetail/decisionData/title")
      // },

      /* ----定点申请相关路由 end----  */ 
      {
        path: "/designate/rfqdetail/addRfq",
        name: "designateAddRfq",
        meta: {
          title: "定点管理-RFQ零件清单-新增RFQ",
        },
        component: () =>
          import ("@/views/designate/designatedetail/addRfq")
      },
      {
        path: "/designate/rsSingleMaintenance",
        name: "rsSingleMaintenance",
        meta: {
          title: "定点管理-RS单维护",
        },
        component: () =>
          import ("@/views/designate/designatedetail/rsSingleMaintenance")
      },
      {
        path: "/designate/defaultLogic",
        name: "defaultLogic",
        meta: {
          title: "定点申请预设逻辑",
        },
        component: () =>
          import ("@/views/designate/defaultLogic")
      },
    ]
  },
  {
    path: "/designate",
    name: "designate",
    component: () => import ("@/layout/default"),
    redirect: "/designate/rfq",
    children: [
      {
        path: "/designate/rfq",
        name: "designate-rfq",
        component: () => import ("@/layout/nomination/layout"),
        redirect: "/designate/rfqdetail",
        children: [
          // 供应商&单一供应商
          {                          
            path: "/designate/supplier",
            name: "designateSupplier",
            meta: {
                hideTabLV3: true,
                title: "定点管理-供应商&单一供应商",
            },
            component: () =>
              import ("@/views/designate/supplier/index")
          },
          // 定点建议
          {                          
            path: "/designate/suggestion",
            name: "designateSuggestion",
            meta: {
                hideTabLV3: true,
                title: "定点管理-定点建议",
            },
            component: () =>
              import ("@/views/designate/suggestion/index")
          },
          {                            
            path: "/designate/rfqdetail",
            name: "designateRfqdetail",
            meta: {
                title: "定点管理-RFQ零件清单",
            },
            component: () =>
              import ("@/views/designate/designatedetail/rfqdetail")
          },
          {                             
            path: "/designate/decisiondata/title",
            name: "designateDecisionData",
            meta: {
                title: "定点管理-决策资料-title",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/title")
          },
          {                             
            path: "/designate/decisiondata/partlist",
            name: "designateDecisionDataPartList",
            meta: {
                title: "定点管理-决策资料-Part List",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/partList")
          },
          {                             
            path: "/designate/decisiondata/singlesourcing",
            name: "designateDecisionDataSingleSourcing",
            meta: {
                title: "定点管理-决策资料-Single Sourcing",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/singleSourcing")
          },
          {                             
            path: "/designate/decisiondata/timeline",
            name: "designateDecisionDataTimeLine",
            meta: {
                title: "定点管理-决策资料-Time Line",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/timeLine")
          },
          {                             
            path: "/designate/decisiondata/bdl",
            name: "designateDecisionDataBDL",
            meta: {
                title: "定点管理-决策资料-BDL",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/bdl")
          },
          {                             
            path: "/designate/decisiondata/drawing",
            name: "designateDecisionDrawing",
            meta: {
                title: "定点管理-决策资料-drawing",
            },
            component: () =>
              import ("@/views/designate/designatedetail/drawing")
          },
        ]
      }
    ]
  },
  
]