/*
 * @Author: yourName
 * @Description: 谈判助手
 *
 */

export default [
  {
    path: "/sourcing",
    name: "sourcingNegotiationAssistant",
    component: () => import ("@/layout/default"),
    children: [
      {
        path: 'negotiationAssistant/vpAnalyseDetail',
        name: 'vpAnalyseDetail',
        component: ()=> import('../../views/negotiationAssistant/vpAnalyseDetail')
      },
    ]}
]
