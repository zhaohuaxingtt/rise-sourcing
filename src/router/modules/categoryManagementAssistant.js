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
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis')
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
    },
    {
      //开发阶段用——成本结构分析图-系统筛选
      path: 'categoryManagementAssistant/costAnalysisMain',
      name: 'costAnalysisMain',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/components/costAnalysisMain/index')
    },
    {
      //开发阶段用——成本结构分析图
      path: 'categoryManagementAssistant/costAnalysis',
      name: 'costAnalysis',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/components/costAnalysisMain/components/costAnalysis/index')
    },
    {
      //开发阶段用——成本结构数据添加
      path: 'categoryManagementAssistant/costAnalysisAdd',
      name: 'costAnalysisAdd',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/components/costAnalysisMain/components/costAnalysisAdd/index')
    },
    {
      //开发阶段用——成本结构分析图-手工输入
      path: 'categoryManagementAssistant/costAnalysisHandleInput',
      name: 'costAnalysisHandleInput',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/components/costAnalysisMain/components/costAnalysisHandleInput/index')
    }
  ]
}]

