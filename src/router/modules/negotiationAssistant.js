/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-16 09:54:11
 * @LastEditors: zbin
 * @Descripttion: your project
 */
/*
 * @Author: yourName
 * @Description: 谈判助手
 *
 */

export default [{
  path: "/sourcing",
  name: "sourcingNegotiationAssistant",
  component: () => import("@/layout/default"),
  children: [
    {
      path: 'partsrfq/vpAnalyseDetail',
      name: 'vpAnalyseDetail',
      component: () => import('../../views/partsrfq/vpAnalyse/vpAnalyseDetail')
    },
    {
      path: "partsrfq/reportList",
      name: "reportList",
      meta: {
        title: "报告清单",
      },
      component: () =>
        import("@/views/partsrfq/reportList"),
    },
    {
      path: "partsrfq/vpAnalyCreat",
      name: "vpAnalyCreat",
      component: () =>
        import("@/views/partsrfq/vpAnalyse/vpAnalyCreat/index"),
    },
    {
      path: 'partsrfq/externalNegotiationAssistant',
      name: 'externalNegotiationAssistant',
      component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/negotiationAssistant')
    },
    {
      path: "partsrfq/bob",
      name: "bob",
      meta: {
        title: "BOB",
      },
      component: () =>
        import("@/views/partsrfq/bob/bob"),
    },
    {
      path: "partsrfq/bobNew",
      name: "bobNew",
      meta: {
        title: "BOBNew",
      },
      component: () =>
        import("@/views/partsrfq/bob/newReport"),
    },
    {
      path: "partsrfq/mekInfoData",
      name: "mekInfoData",
      meta: {
        title: "MEKInfoData",
      },
      component: () =>
        import("@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/mekInfoData/index.vue"),
    },
    {
      path: 'partsrfq/piAnalyseDetail',
      name: 'piAnalyseDetail',
      component: () => import('../../views/partsrfq/piAnalyse/piDetail')
    },
  ]
}]

