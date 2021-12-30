/*
 * @Author: wentliao
 * @Date: 2021-12-30 14:24:09
 * @Description: 质量评分预设规则
 */

export default [
    {
      path: "qualityscorerules",
      name: 'qualityscorerules',
      meta: { title: "质量评分预设规则", activeMenu: ['RISE_WORKBENCH', '/TARGETPRICEANDSCORE'] },
      component: () => import("@/views/routerView"),
      children: [
        {
          path: "",
          name: "qualityscorerulesHome",
          meta: { title: "质量评分预设规则-首页", activeMenu: ['RISE_WORKBENCH', '/TARGETPRICEANDSCORE'] },
          component: () => import("@/views/qualityscorerules"),
        }
      ]
    }
  ]