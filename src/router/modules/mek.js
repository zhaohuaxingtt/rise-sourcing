/*
 * @Author: your name
 * @Date: 2021-08-05 07:05:54
 * @LastEditTime: 2021-08-05 07:33:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\mek.js
 */

export default [
  {
    path: "/sourcing",
    name: "MEK",
    meta: {
      title: "谈判",
      activeMenu: ['RISE_WORKBENCH', 'WORKBENCH_NEGOCIATE'],
    },
    component: () => import("@/layout/default"),
    children: [
      {
        //MEK
        path: "mek",
        redirect: "mek/mekDetails",
        component: () =>
          import(
            "@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/index.vue"
          ),
      },
      {
        path: "mek/mekDetails",
        name: "mekDetails",
        meta: {
          title: "MEK分析库",
        },
        component: () =>
          import(
            "@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/mekDetails"
          ),
      },
    ],
  },
];
