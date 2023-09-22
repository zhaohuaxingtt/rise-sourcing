/*
 * @Author: your name
 * @Date: 2021-07-26 16:59:44
 * @LastEditTime: 2021-12-28 13:53:27
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\router\modules\aeko.js
 */
export default [
  {
    path: "/aeko",
    name: "aeko",
    meta: {
      title: 'AEKO技术变更',
      activeMenu: ['RISE_WORKBENCH', 'AEKO']
    },
    component: () => import("@/layout/default"),
    redirect: "/aeko/managelist",
    children: [
      {
        // 旧的申请详情内嵌iframe URL
        path: "aekodetailItem",
        name: "aekoManageList",
        meta: {
          title: 'AEKO申请详情',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/layout/default"),
        redirect: { name: "aekodetailPage" }, // 之前路由携带参数重定向到新路由
      },
      // aeko管理列表页
      {
        path: "managelist",
        name: "aekoManageList",
        meta: {
          title: 'AEKO管理',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/manage")
      },
      // aeko 分配
      {
        path: "assign",
        name: "aeko-manage-assign",
        meta: {
          title: "AEKO-分配列表",
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/manage/assign"),
      },
      // AEKO表态
      {
        path: "stancelist",
        name: "aekoStanceList",
        meta: {
          title: 'AEKO表态',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/stance")
      },
      {
        // AEKO查看
        path: "checklist",
        name: "aekoCheckList",
        meta: {
          title: 'AEKO查看',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/check")
      },
      // 
      {
        path: "aekodetail",
        name: "aekodetail",
        meta: {
          title: 'AEKO详情',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/detail"),
      },
      {
        path: "quondampart",
        name: "quondampart",
        meta: {
          title: 'AEKO-指定原零件',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
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
          title: 'AEKO描述',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/describe"),
      },

      // AEKO零件清单
      {
        path: "partslist",
        name: "aekoPartslist",
        meta: {
          title: 'AEKO零件清单',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/partslist/home")
      },
      // aeko CSF AEKO审批分配人 零件清单页面
      {
        path: "partslist1",
        name: "aekoPartslist1",
        meta: {
          title: 'AEKO零件清单',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/partslist/partList")
      },
      // AEKO零件清单 iSelect 展示demo
      {
        path: "partslist2",
        name: "aekoPartslist2",
        meta: {
          title: 'AEKO零件清单',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/partslist/demo")
      },
      {
        path: "quotationdetail",
        name: "aekoQuotationDetail",
        meta: {
          title: 'AEKO-报价单',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/quotationdetail"),
      },
      {
        path: "approve",
        name: "aekoApprove",
        meta: {
          title: 'AEKO-审批',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        redirect: "/aeko/approve/approvelistcsf/AKEOPendingPage",
        component: () => import("@/views/aeko/approve"),
        children: [
          {
            path: "approvelist",
            name: "aeko-manage-assign",
            meta: {
              title: "AEKO-分配列表",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            redirect: "/aeko/assign",
          },
          {
            path: "approvelistcsf",
            name: "aekoApprove-listcsf",
            meta: {
              title: "AEKO-审批列表",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/approve/approveList/approveList"),
            redirect: "/aeko/approve/approvelistcsf/AKEOPendingPage",
            children: [
              {
                path: "AKEOPendingPage",
                name: "AKEOPendingPage",
                meta: {
                  title: "AEKO-待审批列表",
                  activeMenu: ['RISE_WORKBENCH', 'AEKO']
                },
                component: () => import("@/views/aeko/approve/approveList/AKEOPendingPage"),
              },
              {
                path: "AKEOApprovedPage",
                name: "AKEOApprovedPage",
                meta: {
                  title: "AEKO-已审批列表",
                  activeMenu: ['RISE_WORKBENCH', 'AEKO']
                },
                component: () => import("@/views/aeko/approve/approveList/AKEOApprovedPage"),
              }
            ]
          },
        ]
      },
      //Aeko审批详情
      {
        path: "AEKOApprovalDetails",
        name: "AEKOApprovalDetails",
        meta: {
          title: 'AEKO-审批详情',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/approve/approveDetails"),
        redirect: "/aeko/AEKOApprovalDetails/Approvalform",
        children: [
          {
            path: 'Approvalform',
            name: "Approvalform",
            prop: true,
            meta: {
              title: "AEKO-审批单",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/approve/approveDetails/ApprovalFormDetails"),
          },
          {
            path: "RecommendationTable",
            name: "RecommendationTable",
            meta: {
              title: "AEKO-推荐表",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/approve/approveDetails/components/RecommendationTablePendingApprovalComponents"),
          },
          {
            path: "CBDSummary",
            name: "CBDSummary",
            meta: {
              title: "CBD汇总",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/approve/approveDetails/components/variationCBDSummaryTable"),
          },
          {
            path: "explainattach",
            name: "explainattach",
            meta: {
              title: "AEKO-解释附件",
              subMenuType: 2, // 区分解释附件的子菜单
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/approve/approveList/explainAttach"),
          },
        ]
      },
      {
        path: "relatingParts",
        name: "aekoRelatingParts",
        meta: {
          title: 'AEKO-关联零件',
          activeMenu: ['RISE_WORKBENCH', 'AEKO'],
          permissionKey: '/AEKO_RELATINGPARTS'
        },
        component: () => import("@/views/aeko/relatingParts"),
      },
      {
        path: "mtz",
        name: "mtz",
        meta: {
          title: 'mtz',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/mtz/index"),
        redirect: "/aeko/mtz/list",
        children: [
          {
            path: 'list',
            name: "aekoMtzlist",
            prop: true,
            meta: {
              title: "AEKO-mtz查看",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/mtz/list"),
          },
          {
            path: 'details',
            name: "aekoMtzDetails",
            prop: true,
            meta: {
              title: "AEKO-mtz变更",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/mtz/details"),
          },
        ]
      },
      // 待审批，已审批页面
      {
        path: "AKEOPageContent",
        name: "AKEOPageContent",
        meta: {
          title: 'AEKO-审批',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/approve/pageContent"),
        redirect: "/aeko/AKEOPageContent/approvelistcsf",
        children: [
          {
            path: "approvelistcsf",
            name: "aekoApprove-listcsf",
            meta: {
              title: "AEKO-审批列表",
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/approve/approveList/approveList"),
            redirect: "/aeko/AKEOPageContent/approvelistcsf/AKEOPendingPage",
            children: [
              {
                path: "AKEOPendingPage",
                name: "AKEOPendingPage",
                meta: {
                  title: "AEKO-待审批列表",
                  activeMenu: ['RISE_WORKBENCH', 'AEKO']
                },
                component: () => import("@/views/aeko/approve/approveList/AKEOPendingPage"),
              },
              {
                path: "AKEOApprovedPage",
                name: "AKEOApprovedPage",
                meta: {
                  title: "AEKO-已审批列表",
                  activeMenu: ['RISE_WORKBENCH', 'AEKO']
                },
                component: () => import("@/views/aeko/approve/approveList/AKEOApprovedPage"),
              }
            ]
          },
        ]
      },
      // 逾期报表
      {
        path: "report",
        name: "report",
        meta: {
          title: 'AEKO报表',
          activeMenu: ['RISE_WORKBENCH', 'AEKO']
        },
        component: () => import("@/views/aeko/BIPage/reportPage"),
        redirect: "/aeko/report/overdue",
        children: [
          {
            path: "overdue",
            name: "overdue",
            meta: {
              title: 'AEKO逾期报表',
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/BIPage/components/overdue"),
          },{
            path: "statetrack",
            name: "statetrack",
            meta: {
              title: '状态跟踪报表',
              activeMenu: ['RISE_WORKBENCH', 'AEKO']
            },
            component: () => import("@/views/aeko/BIPage/components/statetrack"),
          },
        ]
      }
    ]
  },
  // 申请详情页内嵌
  {
    path: "/aekodetailPage",
    name: "aekodetailPage",
    meta: {
      title: 'AEKO详情',
      activeMenu: ['RISE_WORKBENCH', 'AEKO'],
      permissionKey: '/AEKO_AEKODETAILPAGE'
    },
    component: () => import("@/views/aeko/detail/aekodetailPage"),
  }
]