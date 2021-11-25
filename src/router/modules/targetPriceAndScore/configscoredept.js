export default [
  {
    path: "/configscoredept",
    name: 'configscoredept',
    meta: { title: "配置评分部门" },
    component: () => import("@/views/routerView"),
    children: [
      {
        path: "",
        name: "configscoredeptHome",
        meta: { title: "配置评分部门-首页" },
        component: () => import("@/views/costanalysismanage/components/home"),
      }
    ]
  }
]