/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-24 10:19:15
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
        ]
      }
    ]
  }
]