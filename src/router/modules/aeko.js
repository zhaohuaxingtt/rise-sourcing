/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-09-28 10:34:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\aeko.js
 */
export default [
  {
    path: "/aeko",
    name: "aeko",
    meta: {
        title: 'AEKO'
    },
    component: () => import("@/layout/default"),
    redirect: "/aeko/managelist",
    children: [
      // aeko管理列表页
      {
          path: "managelist",
          name: "aekoManageList",
          meta: {
              title: 'AEKO管理'
          },
          component: () => import ("@/views/aeko/manage")
      },
      // AEKO表态
      {
        path: "stancelist",
        name: "aekoStanceList",
        meta: {
            title: 'AEKO表态'
        },
        component: () => import ("@/views/aeko/stance")
    },
      // 
      {
        path: "aekodetail",
        name: "aekodetail",
        meta: {
            title: 'AEKO详情'
        },
        component: () => import("@/views/aeko/detail"),
      },
      {
        path: "quondampart",
        name: "quondampart", 
        meta: {
            title: 'AEKO-指定原零件'
        },
        component: () => import("@/views/aeko/quondampart"),
        // redirect: "quondampart/ledger",
        // children: [
        //   {
        //     path: "ledger",
        //     name: "quondampartLedger",
        //     component: () => import("@/views/aeko/quondampart/components/ledger"),
        //   },
        //   {
        //     path: "aeko",
        //     name: "quondampartAeko",
        //     component: () => import("@/views/aeko/quondampart/components/aeko"),
        //   },
        // ]
      },
      {
        path: "describe",
        name: "aekoDescribe",
        meta: {
            title: 'AEKO描述'
        },
        component: () => import("@/views/aeko/describe"),
      },
      
      // AEKO零件清单
      {
        path: "partslist",
          name: "aekoPartslist",
          meta: {
              title: 'AEKO零件清单'
          },
          component: () => import ("@/views/aeko/partslist")
      },
      {
        path: "quotationdetail",
        name: "aekoQuotationDetail",
        meta: {
          title: 'AEKO-报价单'
        },
        component: () => import("@/views/aeko/quotationdetail"),
      },
      {
        path: "approve",
        name: "aekoApprove",
        meta: {
          title: 'AEKO-审批'
        },
        redirect: "/aeko/approve/approvelist",
        component: () => import("@/views/aeko/approve"),
        children: [
          {
            path: "approvelist",
            name: "aekoApprove-list",
            meta: {
              title: "AEKO-审批列表",
            },
            component: () => import("@/views/aeko/approve/approveList"),
          },
          {
            path: "approvelistcsf",
            name: "aekoApprove-listcsf",
            meta: {
              title: "AEKO-审批列表",
            },
            component: () => import("@/views/aeko/approve/approveList/approveList"),
          },
        ]
      },
    ]
  }
]