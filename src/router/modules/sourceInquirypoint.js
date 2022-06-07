/*
 * @Author: your name
 * @Date: 2021-08-26 19:47:20
 * @LastEditTime: 2021-12-08 09:40:48
 * @LastEditors: Luoshuang
 * @Description: 询源与定点
 * @FilePath: \front-sourcing\src\router\modules\sourceInquirypoint.js
 */
import sourcing from './sourcing'
import steeldemandcreation from './steeldemandcreation'
import outsouringorder from './outsouringorder'
export default [
  {
    path: "/sourceinquirypoint",
    name: "寻源与定点",
    meta:{
        title:'寻源与定点',
        activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import("@/layout/default"),
    redirect: "/sourcing/dashboard",
    children:[
      ...sourcing,
      ...steeldemandcreation,
      ...outsouringorder
    ]
  }
]