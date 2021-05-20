/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-05-20 14:24:02
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
        name: "designate/rfqdetail",
        meta: {
            title: "定点管理-RFQ零件清单",
        },
        component: () =>
          import ("@/views/designate/designatedetail/rfqdetail")
      },

      /* ----定点申请相关路由 end----  */ 
    ]
  }
]