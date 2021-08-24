/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-16 09:54:11
 * @LastEditors: 舒杰
 * @Descripttion: your project
 */
/*
 * @Author: yourName
 * @Description: 品类管理助手
 *
 */

export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/default'),
    children: [
      {
        path: '/tooling/modelDetails',
        name: 'toolingModelDetails',
        meta: {
          title: '车型项目详情',
        },
        component: () => import(`@/views/ws2/baApply/details`),
      },

      {
        path: '/tooling',
        name: 'tooling',
        meta: {
          title: '模具'
        },
        component: () => import (`@/views/ws2`),
        children: [
          {
            path: '/',
            redirect: 'budgetManagement/carTypeOverview',
          },
          //  付款计划制定与查看
          {
            path: '/tooling/investmentAdmin',
            redirect: '/tooling/investmentAdmin/payBlock',
          },
          {
            path: '/tooling/investmentAdmin/payBlock',
            name: 'investmentAdminPayBlock',
            meta: {
              title: '付款看板'
            },
            component: () => import (`@/views/ws2/investmentAdmin/payBlock`),
          },
          {
            path: '/tooling/investmentAdmin/yearlyPlan',
            name: 'investmentAdminYearlyPlan',
            meta: {
              title: '年度计划'
            },
            component: () => import (`@/views/ws2/investmentAdmin/yearlyPlan`),
          },
          {
            path: '/tooling/investmentAdmin/monthlyPlan',
            name: 'investmentAdminMonthlyPlan',
            meta: {
              title: '月度计划'
            },
            component: () => import (`@/views/ws2/investmentAdmin/monthlyPlan`),
          },
          // 预算管理
          {
            path: '/tooling/budgetManagement',
            redirect: 'budgetManagement/carTypeOverview',
          },
          {
            path: '/tooling/budgetManagement/carTypeOverview',
            name: 'carTypeOverview',
            meta: {
              title: '生成投资清单'
            },
            component: () => import (`@/views/ws2/budgetManagement/carTypeOverview`),
          },
          {
            path: '/tooling/budgetManagement/generateInvestmentList',
            name: 'generateInvestmentList',
            meta: {
              title: '生成投资清单'
            },
            component: () => import (`@/views/ws2/budgetManagement/generateInvestmentList`),
          },
          {
            path: '/tooling/budgetManagement/investmentListJV',
            name: 'investmentListJV',
            meta: {
              title: '投资清单JV'
            },
            component: () => import (`@/views/ws2/budgetManagement/investmentListJV`),
          },
          {
            path: '/tooling/budgetManagement/investmentListCommon',
            name: 'investmentListCommon',
            meta: {
              title: '投资清单Common'
            },
            component: () => import (`@/views/ws2/budgetManagement/investmentListCommon`),
          },
          {
            path: '/tooling/budgetManagement/commonSourcing',
            name: 'commonSourcing',
            meta: {
              title: 'commonSourcing'
            },
            component: () => import (`@/views/ws2/budgetManagement/commonSourcing/index`),
          },
          {
            path: '/tooling/baApplyIndex',
            name: 'baApplyIndex',
            meta: {
              title: 'BA申请'
            },
            component: () => import (`@/views/ws2/baApply`),
          },
          {
            path: '/tooling/baApprovalIndex',
            name: 'baApprovalIndex',
            meta: {
              title: 'BA审批'
            },
            component: () => import (`@/views/ws2/baApproval`),
          },
          //历史数据库
          {
            path: '/tooling/dataBase',
            name: 'dataBase',
            meta: {
              title: '历史数据库'
            },
            component: () => import (`@/views/ws2/dataBase`),
          },
          //预算审批
          {
            path: '/tooling/budgetApproval',
            name: 'budgetApproval',
            meta: {
              title: '预算审批'
            },
            component: () => import (`@/views/ws2/budgetApproval`),
          },
          {
            path: '/tooling/bmApplyIndex',
            name: 'bmApplyIndex',
            meta: {
              title: 'BM申请'
            },
            component: () => import (`@/views/ws2/bmApply`),
          },
          {
            path: '/tooling/carTypeProOverview',
            name: 'carTypeProOverview',
            meta: {
              title: '车型项目概览'
            },
            component: () => import (`@/views/ws2/investmentReport`),
          },
          {
            path: '/tooling/investmentReport',
            name: 'investmentReport',
            meta: {
              title: '投资报告'
            },
            component: () => import (`@/views/ws2/investmentReport`),
          },
        ]
      },
      {
        path: '/purchase',
        name: 'purchase',
        meta: {
          title: '模具采购'
        },
        component: () => import (`@/views/ws2/purchase`),
        children: [
          {
            path: '/purchase',
            redirect: '/purchase/investmentList',
          },
          {
            path: '/purchase/investmentList',
            name: 'investmentList',
            meta: {
              title: '模具投资清单'
            },
            component: () => import (`@/views/ws2/purchase/investmentList`),
          },
          {
            path: '/purchase/changeTask',
            name: 'changeTask',
            meta: {
              title: '模具投资清单'
            },
            component: () => import (`@/views/ws2/investmentReport`),
          },
          {
            path: '/purchase/mouldBook',
            name: 'mouldBook',
            meta: {
              title: '模具台账'
            },
            component: () => import (`@/views/ws2/purchase/mouldBook`),
          },
          {
            path: '/purchase/modelOrderList',
            name: 'modelorder',
            meta: {
              title: '模具采购订单'
            },
            component: () => import (`@/views/ws2/modelorder`),
          },
        ]
      },
      {
        path: '/purchase/mouldBook/details',
        name: 'mouldBook',
        meta: {
          title: '模具台账详情'
        },
        component: () => import (`@/views/ws2/purchase/mouldBook/details`),
      },
      {
        path: '/purchase/investmentList/bmInfo',
        name: 'bmInfo',
        meta: {
          title: '模具投资清单-BM详情页'
        },
        component: () => import (`@/views/ws2/purchase/investmentList/bmInfo`),
      },

      {
        path: '/purchaseSupplier',
        name: 'purchaseSupplier',
        meta: {
          title: '模具采购'
        },
        component: () => import (`@/views/ws2/purchaseSupplier`),
        children: [
          {
            path: '/purchaseSupplier',
            redirect: '/purchaseSupplier/investmentList',
          },
          {
            path: '/purchaseSupplier/investmentList',
            name: 'investmentList',
            meta: {
              title: '模具投资清单'
            },
            component: () => import (`@/views/ws2/purchaseSupplier/investmentList`),
          },
          {
            path: '/purchaseSupplier/mouldBook',
            name: 'mouldBook',
            meta: {
              title: '模具台账'
            },
            component: () => import (`@/views/ws2/purchaseSupplier/mouldBook`),
          },
        ]
      },
      {
        path: '/purchaseSupplier/mouldBook/details',
        name: 'mouldBook',
        meta: {
          title: '模具台账详情'
        },
        component: () => import (`@/views/ws2/purchaseSupplier/mouldBook/details`),
      },
      {
        path: '/purchaseSupplier/investmentList/bmInfo',
        name: 'bmInfo',
        meta: {
          title: '模具投资清单-BM详情页'
        },
        component: () => import (`@/views/ws2/purchaseSupplier/investmentList/bmInfo`),
      },
    ]
  }
]

