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

export default [{
  path: "/sourcing",
  name: "categoryManagementAssistant",
  component: () => import("@/layout/default"),
  children: [
    {
      path: 'categoryManagementAssistant',
      redirect: 'categoryManagementAssistant/internalDemandAnalysis',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis')
    },
    {
      //内部需求分析
      path: 'categoryManagementAssistant/internalDemandAnalysis',
      name: 'internalDemandAnalysis',
      redirect: 'categoryManagementAssistant/internalDemandAnalysis/overView',
      component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis'),
      children: [
        {
          path: 'overView',
          name: 'overView',
          meta: { title: "内部需求分析概览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/overView'),
        },
        {
          path: 'technology',
          name: 'technology',
          meta: { title: "技术路线" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/technology'),
        }
      ]
    },
    {
      //外部供应市场分析
      path: 'categoryManagementAssistant/externalSupplyMarketAnalysis',
      name: 'externalSupplyMarketAnalysis',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis')
    },
    {
      //材料组定位
      path: 'categoryManagementAssistant/materialGroupPositioning',
      name: 'materialGroupPositioning',
      redirect: 'categoryManagementAssistant/materialGroupPositioning/overView',
      component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/materialGroupPositioning'),
      children: [
        {
          path: 'overView',
          name: 'overView',
          meta: { title: "材料组定位概览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/materialGroupPositioning/overView'),
        },
        {
          path: 'materialGroup',
          name: 'materialGroup',
          meta: { title: "材料组定位" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/materialGroupPositioning/materialGroup'),
        }
      ]
    },
    {
      //举措清单
      path: 'categoryManagementAssistant/listOfInitiatives',
      name: 'listOfInitiatives',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/listOfInitiatives')
    }
  ]
}]

