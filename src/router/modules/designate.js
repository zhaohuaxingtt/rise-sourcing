/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-20 17:58:54
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
        name: "designateDecisionData",
        meta: {
            title: "定点管理-决策资料-title",
        },
        component: () =>
          import ("@/views/designate/designatedetail/decisionData/title")
      },

      /* ----定点申请相关路由 end----  */ 
    ]
  }
]