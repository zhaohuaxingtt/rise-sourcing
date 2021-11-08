/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-11-08 16:31:21
 * @LastEditors: Please set LastEditors
 * @Description: 定点管理
 * @metaParams: hideTabLV3 隐藏三级导航
 *
 */

export default [
  {
    path: "/designate",
    name: "designate",
    meta: {
      title: "定点管理",
    },
    component: () => import ("@/layout/default"),
    redirect: "/designate/rfq",
    children: [
      {
        path: "/sourcing/partsnomination",
        name: "designateHome",
        meta: {
          title: "定点申请综合管理",
        },
        component: () =>
            import ("@/views/designate/home"),
      },
      {
        path: "/sourcing/partsnomination/rsreview",
        name: "designateRsReview",
        meta: {
          title: "上会RS单复核",
        },
        component: () =>
            import ("@/views/designate/home/rsReview"),
      },
      {
        path: "/sourcing/partsnomination/rsreview/details",
        name: "designateRsreviewDetails",
        meta: {
          title: "上会RS单复核详情",
        },
        component: () =>
            import ("@/views/designate/home/rsReview/details"),
      },
      {
        path: "/sourcing/partsnomination/record",
        name: "designateRecord",
        meta: {
          title: "定点记录综合管理",
        },
        component: () =>
            import ("@/views/designate/home/record"),
      },
      {
        path:'/sourcing/partsnomination/record/detail',
        name:'designateRecordDetails',
        meta: {
          title:'定点记录详情'
        },
        component: () => 
          import("@/views/designate/home/record/detail")
      },
      {
        path: "/sourcing/partsnomination/signSheet",
        name: "designateSignSheet",
        meta: {
          title: "签字单列表",
        },
        component: () => import ("@/views/designate/home/signSheet"),
      },
      {
        path: "/sourcing/partsnomination/signSheet/addSignOverView",
        name: "addSignOverView",
        meta: {
          title: "签字单导航",
        },
        component: () =>
            import ("@/views/designate/home/signSheet/components/headerNav/index"),
        redirect: '/sourcing/partsnomination/signSheet/addSignOverView/details',
        children: [
          {
            path: "details",
            name: "designateNewSignSheet",
            meta: {
              title: "新建签字单",
            },
            component: () =>
                import ("@/views/designate/home/signSheet/details"),
          },
          {
            path: "mtzDetails",
            name: "mtzDesignateNewSignSheet",
            meta: {
              title: "MTZ定点申请单",
            },
            component: () =>
                import ("@/views/designate/home/signSheet/mtzDetails"),
          }
        ]
      },
      {
        path: "/sourcing/designate/rfqdetail/addRfq",
        name: "designateAddRfq",
        meta: {
          title: "定点管理-RFQ零件清单-新增RFQ",
        },
        component: () =>
          import ("@/views/designate/designatedetail/addRfq")
      },
      {
        path: "/sourcing/designate/rsSingleMaintenance",
        name: "rsSingleMaintenance",
        meta: {
          title: "定点管理-RS单维护",
        },
        component: () =>
          import ("@/views/designate/designatedetail/rsSingleMaintenance")
      },
      {
        path: "/sourcing/designate/defaultLogic",
        name: "defaultLogic",
        meta: {
          title: "定点申请预设逻辑",
        },
        component: () =>
          import ("@/views/designate/defaultLogic")
      },
      {
        path: "/designate/rfq",
        name: "designate-rfq",
        component: () => import ("@/layout/nomination/layout"),
        meta: {
          title: "定点申请单详情",
        },
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
                hideTabLV3: true,
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
          {                            
            path: "/designate/approvalpersonrecord",
            name: "approvalPersonAndRecord",
            meta: {
                title: "定点管理-审批人审批记录",
                hideTabLV3: true,
            },
            component: () =>
              import ("@/views/designate/approvalPersonAndRecord/index")
          },
          {                             
            path: "/designate/decisiondata/mtz",
            name: "designateDecisionDataMTZ",
            meta: {
                title: "定点管理-决策资料-MTZ",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/mtz")
          },
          {                             
            path: "/designate/decisiondata/attachment",
            name: "designateDecisionAttachment",
            meta: {
                title: "定点管理-决策资料-attachment",
            },
            component: () =>
              import ("@/views/designate/designatedetail/attachment")
          },
          {                             
            path: "/designate/decisiondata/tasks",
            name: "designateDecisionTasks",
            meta: {
                title: "定点管理-决策资料-tasks",
            },
            component: () =>
              import ("@/views/designate/designatedetail/tasks")
          },
          {                             
            path: "/designate/decisiondata/awardingscenario",
            name: "designateDecisionAwardingscenario",
            meta: {
                title: "定点管理-决策资料-awardingscenario",
            },
            component: () =>
              import ("@/views/designate/designatedetail/awardingscenario")
          },
          {
            path: "/designate/decisiondata/rs",
            name: "designateDecisionRS",
            meta: {
                title: "定点管理-决策资料-RS",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/rs/home")
          },
          {
            path: "/designate/decisiondata/rscapacityexpan",
            name: "designateDecisionRSexpan",
            meta: {
                title: "定点管理-决策资料-扩产能",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/rsCapacityExpan")
          },
          {
            path: "/designate/decisiondata/abprice",
            name: "designateDecisionAbPrice",
            meta: {
                title: "定点管理-决策资料-abprice",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/abPrice")
          },
          {
            path: "/designate/decisiondata/costanalysis",
            name: "designateDecisionRS",
            meta: {
                title: "定点管理-决策资料-costanalysis",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/costanalysis")
          },
          {
            path: "/designate/decisiondata/strategy",
            name: "designateDecisionRS",
            meta: {
                title: "定点管理-决策资料-strategy",
            },
            component: () =>
              import ("@/views/designate/designatedetail/decisionData/strategy")
          }
        ]
      }
    ]
  },
  {                          
    path: "/designate/designatesuggestion",
    name: "designateSuggestion",
    meta: {
        title: "定点管理-定点建议",
    },
    component: () =>
      import ("@/views/designate/suggestion/index")
  },
  {                          
    path: "/designate/designateCirculateRS",
    name: "designateSuggestion",
    meta: {
        title: "定点管理-rs流转",
    },
    component: () =>
      import ("@/views/designate/designatedetail/decisionData/rs/index")
  },
  {
    path: "/sourcing/partsnomination/signSheet/preview",
    name: "designateSignSheetPreview",
    meta: {
      title: "签字单预览下载",
    },
    component: () =>
        import ("@/views/designate/home/signSheet/preview"),
  },
]