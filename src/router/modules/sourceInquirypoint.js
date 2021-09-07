/*
 * @Author: your name
 * @Date: 2021-08-26 19:47:20
 * @LastEditTime: 2021-09-03 15:05:09
 * @LastEditors: Please set LastEditors
 * @Description: 询源与定点
 * @FilePath: \front-web\src\router\modules\sourceInquirypoint.js
 */
import sourcing from './sourcing'
import steeldemandcreation from './steeldemandcreation'
export default [
  {
    path: "/sourceinquirypoint",
    name: "询源到定点",
    meta:{
        title:'询源到定点'
    },
    component: () => import("@/layout/default"),
    redirect: "/sourceinquirypoint/sourcing",
    children:[
      ...sourcing,
      ...steeldemandcreation
    ]
  }
]