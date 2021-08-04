/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-16 09:54:11
 * @LastEditors: Please set LastEditors
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
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis'),
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
      redirect: 'categoryManagementAssistant/externalSupplyMarketAnalysis/overView',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis'),
      children: [
        {
          path: 'overView',
          name: 'overView',
          meta: { title: "外部供应市场分析概览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis/overView'),
        },
      ]
    },
    {
      //材料组定位
      path: 'categoryManagementAssistant/materialGroupPositioning',
      name: 'externalSupplyMarketAnalysis',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/materialGroupPositioning')
    },
    {
      //举措清单
      path: 'categoryManagementAssistant/listOfInitiatives',
      name: 'listOfInitiatives',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/listOfInitiatives')
    }
  ]
}]

