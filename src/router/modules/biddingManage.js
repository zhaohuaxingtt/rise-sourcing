/*
 * @Author: your name
 * @Date: 2021-11-06 14:31:12
 * @LastEditTime: 2021-11-06 15:21:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\router\modules\biddingManage.js
 */
import bidding from "./bidding";

export default [
  {
    path: "/bidding",
    name: "bidding",
    component: () => import("@/layout/default"),
    meta: {
      title: "竞价管理",
    },
    children: [...bidding],
  },
];
