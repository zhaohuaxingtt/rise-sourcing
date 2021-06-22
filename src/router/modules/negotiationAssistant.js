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
        import("@/views/partsrfq/vpAnalyse/vpAnalyCreat/index.vue"),
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
        import("@/views/partsrfq/bob/bob.vue"),
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
      path: "partsrfq/specialAnalysisTool",
      name: "specialAnalysisTool",
      meta: {
        title: "specialAnalysisTool",
      },
      component: () =>
        import("@/views/partsrfq/negotiationsAssistant/index.vue"),
    },
    {
      path: "partsrfq/bobAnalysis",
      name: "bobAnalysis",
      meta: {
        title: "Bob分析",
      },
      component: () =>
        import("@/views/partsrfq/bobAnalysis"),
    },
  ]
}]

