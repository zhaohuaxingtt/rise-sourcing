/*
 * @Author: wentliao
 * @Date: 2021-12-30 17:36:03
 * @Description: 评分设置-- 暂时放在souring里面 后期会移动到protal里面
 */

export default [
    {
      path: "/scoreConfig",
      meta: { title: "设置评分管理"},
      component: () => import("@/layout/default"),
      redirect: "/scoreConfig/configscoredept",
      children: [
        {
            path: "configscoredept",
            name: "configscoredept",
            meta: { title: "评分部门设置"},
            component: () => import("@/views/scoreConfig/configscoredept"),
        },
        // <---demo,后期可以删除
        {
          path: "configscoredeptDemo",
          name: "configscoredept",
          meta: { title: "评分部门设置"},
          component: () => import("@/views/scoreConfig/configscoredept/demo"),
        },
        // demo,后期可以删除 --->

        {
            path: "qualityscorerules",
            name: "qualityscorerules",
            meta: { title: "质量评分预设规则"},
            component: () => import("@/views/scoreConfig/qualityscorerules"),
          }
      ]
    }
  ]