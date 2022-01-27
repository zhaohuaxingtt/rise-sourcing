/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
/*
 * @Author: yourname
 * @Descripttion: your project
 */
export const tabRouterList = [
  {
    value: 1,
    name: '品类管理助手',
    url: '/sourcing/categoryManagementAssistant',
    activePath: '/sourcing/categoryManagementAssistant',
    key: 'TPZS.PINLEIGUANLIZHUSHOU',
    permissionKey: 'CATEGORY_ASSISTANT',
  },
  {
    value: 2,
    name: '谈判助手',
    url: '/sourcing/partsrfq/externalNegotiationAssistant',
    activePath: '/sourcing/partsrfq/externalNegotiationAssistant',
    key: 'TPZS.TANPANZHUSHOU',
    permissionKey: 'WORKBENCH_RFQ_TANPANZHUSHOU',
  },
]

export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '内部需求分析',
    url: '/sourcing/categoryManagementAssistant/internalDemandAnalysis',
    activePath: '/sourcing/categoryManagementAssistant/internalDemandAnalysis',
    key: '内部需求分析',
    permissionKey:"CATEGORY_ASSISTANT_NEIBUXUQIUFENXI"
  },
  {
    value: 2,
    name: '外部供应市场分析',
    url: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis',
    activePath:
      '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis',
    key: '外部供应市场分析',
    permissionKey:"CATEGORY_ASSISTANT_WBGYSCFX"
  },
  {
    value: 3,
    name: '材料组定位',
    url: '/sourcing/categoryManagementAssistant/materialGroupPositioning',
    activePath:
      '/sourcing/categoryManagementAssistant/materialGroupPositioning',
    key: '材料组定位',
    permissionKey:"CATEGORY_ASSISTANT_CAILIAOZUDINGWEI"
  },
  {
    value: 4,
    name: '举措清单',
    url: '/sourcing/categoryManagementAssistant/listOfInitiatives',
    activePath: '/sourcing/categoryManagementAssistant/listOfInitiatives',
    key: '举措清单',
    permissionKey:"CATEGORY_ASSISTANT_JUCUOQINGDAN"
  },
]
