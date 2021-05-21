/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-21 15:34:39
 * @LastEditors: Please set LastEditors
 * @Description: 定点管理
 *
 */

export default [
  {
    path: "/designate",
    name: "index",
    component: () =>
        import ("@/layout/default"),
    redirect: "/designate/home",
    children: [
      /* ----定点申请相关路由 start----  */ 
      {
        path: "/designate/home",
        name: "designateHome",
        meta: {
          title: "定点申请综合管理",
        },
        component: () =>
            import ("@/views/designate/home"),
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
        name: "designateDecisionDataTitle",
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

      /* ----定点申请相关路由 end----  */ 
    ]
  }
]