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
  meta: { title: "寻源" },
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
          path: 'output',
          name: 'output',
          meta: { title: "产量总览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/output'),
        },
        {
          path: 'batchSupplier',
          name: 'batchSupplier',
          meta: { title: "批量供应商概览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/batchSupplier'),
        },
        {
          path: 'sop',
          name: 'sop',
          meta: { title: "SOP进度轴" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/sop'),
        },
        {
          path: 'carPrice',
          name: 'carPrice',
          meta: { title: "车型价格对比" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/carPrice'),
        },
        {
          path: 'technology',
          name: 'technology',
          meta: { title: "技术路线" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/technology'),
        },
        {
          path: 'costAnalysisMain',
          name: 'costAnalysisMain',
          meta: { title: "成本分析-系统筛选" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain'),
        },
        {
          path: 'costAnalysis',
          name: 'costAnalysis',
          meta: { title: "成本分析库" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/costAnalysis'),
        },
        {
          path: 'costAnalysisAdd',
          name: 'costAnalysisAdd',
          meta: { title: "成本分析新增" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/costAnalysisAdd'),
        },
        {
          path: 'costAnalysisHandleInput',
          name: 'costAnalysisHandleInput',
          meta: { title: "手工输入" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/costAnalysisHandleInput'),
        },
        {
          path: 'bulkSupplierPandect',
          name: 'bulkSupplierPandect',
          meta: { title: "批量供应商概览" },
          component: () => import('@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/negotiateBasicInfor/components/bulkSupplierPandect.vue'),
        },
        {
          path: 'historyPoint',
          name: 'historyPoint',
          meta: { title: "定点历史记录" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/historyPoint/index.vue'),
        },
        {
          path: 'purchaseAmountOverall',
          name: 'purchaseAmountOverall',
          meta: { title: "采购金额总览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/purchaseAmountOverall/index.vue'),
        },
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
        {
          path: 'industryReport',
          name: 'overView',
          meta: { title: "行业报告" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis/industryReport'),
        },
        {
          path: 'marketData',
          name: 'marketData',
          meta: { title: "市场数据" },
          component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis/marketData'),
        },
        {
          path: 'svw',
          name: 'svw',
          meta: { title: "svw" },
          component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis/svw'),
        },
        {
          path: 'supplyChainOverall',
          name: 'supplyChainOverall',
          meta: { title: "采购金额总览" },
          component: () => import('@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/externalSupplyMarketAnalysis/supplyChainOverall/index.vue'),
        },
      ]
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
    },
    
  ]
}]

