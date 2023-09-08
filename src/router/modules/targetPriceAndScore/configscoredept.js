/*
 * @Author: Luoshuang
 * @Date: 2021-11-26 14:27:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-08 09:58:47
 * @Description: 
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\configscoredept.js
 */
export default [
  {
    path: "configscoredept",
    name: 'configscoredept',
    meta: { title: "评分部门设置", activeMenu: ['RISE_WORKBENCH', 'COSTANALYSISMANAGE'] },
    component: () => import("@/views/routerView"),
    children: [
      {
        path: "",
        name: "configscoredeptHome",
        meta: { title: "评分部门设置-首页" },
        component: () => import("@/views/configscoredept"),
      }
    ]
  }
]