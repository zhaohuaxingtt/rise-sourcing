/*
 * @Author: your name
 * @Date: 2021-06-22 14:40:19
 * @LastEditTime: 2021-12-08 10:00:05
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\supplierscore.js
 */
export default [
  {
    path: "supplierscore",
    meta: {
      title: "评分任务",
      activeMenu: ['RISE_WORKBENCH', 'CSCSCOREMANAGE']
    },
    component: () => import("@/views/routerView"),
    redirect: "supplierscore/home",
    children: [
      {
        path: "home",
        name: "supplierscoreHome",
        meta: {
          title: "评分任务-首页",
          activeMenu: ['RISE_WORKBENCH', 'CSCSCOREMANAGE']
        },
        component: () => import("@/views/supplierscore"),
      }, 
      {
        path: "rfqdetail",
        name: "supplierscoreRfqDetail",
        meta: {
          title: "评分任务-RFQ详情",
          activeMenu: ['RISE_WORKBENCH', 'CSCSCOREMANAGE'],
          permissionKey: 'COSTANALYSISMANAGE_SUPPLIERSCORE_RFQDETAIL'
        },
        component: () => import("@/views/supplierscore/components/rfqdetail"),
      },
      {
        path: "partscore",
        name: "supplierscorePartscore partscore",
        meta: {
          title: "评分任务-零件评分",
          activeMenu: ['RISE_WORKBENCH', 'CSCSCOREMANAGE']
        },
        component: () => import("@/views/supplierscore/components/partscore"),
      }
    ]
  }
]