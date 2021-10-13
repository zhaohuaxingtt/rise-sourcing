/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-10-13 16:38:58
 * @LastEditors: Hao,Jiang
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
      // aeko CSF AEKO审批分配人 零件清单页面
      {
        path: "partslist1",
          name: "aekoPartslist1",
          meta: {
              title: 'AEKO零件清单'
          },
          component: () => import ("@/views/aeko/partslist/partList")
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
        //Aeko审批详情
      {
        path: "AEKOApprovalDetails",
        name: "AEKOApprovalDetails",
        meta: {
          title: 'AEKO-审批详情'
        },
        component: () => import("@/views/aeko/approve/approveDetails"),
        redirect: "/aeko/AEKOApprovalDetails/Approvalform",
        children: [
          {
            path: 'Approvalform',
            name: "Approvalform",
            prop:true,
            meta: {
              title: "AEKO-审批单",
            },
            component: () => import("@/views/aeko/approve/approveDetails/ApprovalFormDetails"),
          },
          {
            path: "CBDSummary",
            name: "CBDSummary",
            meta: {
              title: "CBD汇总",
            },
            component: () => import("@/views/aeko/approve/approveDetails/components/variationCBDSummaryTable"),
          },
          {
            path: "explainattach",
            name: "explainattach",
            meta: {
              title: "AEKO-解释附件",
              subMenuType: 2 // 区分解释附件的子菜单
            },
            component: () => import("@/views/aeko/approve/approveList/explainAttach"),
          },
        ]
      },
    ]
  }
]