/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: zbin
 * @Descripttion: your project
 */
/*
 * @Author: yourname
 * @Descripttion: your project
 */
export const tabRouterList = [
    {
      value: 1,
      name: '供应商360',
      url: '/supplier/index',
      activePath: '',
      key: '供应商360',
    },
    {
      value: 2,
      name: '供应商绩效',
      url: '/supplier/kpi',
      activePath: '/supplier/kpi',
      key: '供应商绩效',
    },
    {
        value: 3,
        name: 'KPI',
        url: '/supplier/kpiList',
        activePath: '/supplier/kpiList',
        key: 'KPI',
      },
      {
        value: 4,
        name: '黑名单',
        url: '/supplier/kpi',
        activePath: '/supplier/kpi',
        key: '黑名单',
      },
      {
        value: 2,
        name: 'N级供应链',
        url: '/supplier/kpi',
        activePath: '/supplier/kpi',
        key: 'N级供应链',
      },
  ];
  
//   export const categoryManagementAssistantList = [
//     {
//       value: 1,
//       name: '总览',
//       url: '/sourcing/categoryManagementAssistant/internalDemandAnalysis',
//       activePath: '/sourcing/categoryManagementAssistant/internalDemandAnalysis',
//       key: '总览',
//     },
//     {
//       value: 2,
//       name: '供应商绩效',
//       url: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis',
//       activePath: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis',
//       key: '供应商绩效',
//     },
//     {
//       value: 3,
//       name: '年度回顾&绩效追踪 ',
//       url: '/sourcing/categoryManagementAssistant/materialGroupPositioning',
//       activePath: '/sourcing/categoryManagementAssistant/materialGroupPositioning',
//       key: '年度回顾&绩效追踪 ',
//     },
//     {
//       value: 4,
//       name: '举措清单',
//       url: '/sourcing/categoryManagementAssistant/listOfInitiatives',
//       activePath: '/sourcing/categoryManagementAssistant/listOfInitiatives',
//       key: '举措清单',
//     },
//   ];

  export const categoryManagementAssistantList = [
    {
      value: 1,
      name: '总览',
      url: '/supplier/supplierKpiTreeTable',
      activePath: '/supplier/supplierKpiTreeTable',
      key: '总览',
    },
    {
      value: 2,
      name: '维护',
      url: '/supplier/imgKpi',
      activePath: '/supplier/imgKpi',
      key: '维护',
    }
  ];
  