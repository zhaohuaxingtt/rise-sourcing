/*
 * @Author: lvjiahong
 * @Date: 2022-05-18 11:23:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-23 18:41:25
 * @Description: 财务目标价相关路由
 * @FilePath: \front-sourcing\src\router\modules\outsouringorder.js
 */
export default [
 {
  path: "sourcing",
  meta: {
   title: '询源执行'
  },
  component: () => import("@/layout/default-white"),
  children: [
   {
    path: "partsign/outsouringorder",
    name: "outsouringorder",
    meta: { title: "工序委外", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'] },
    component: () => import("@/views/outsouringorder/index.vue"),
   }
  ]
 }
]