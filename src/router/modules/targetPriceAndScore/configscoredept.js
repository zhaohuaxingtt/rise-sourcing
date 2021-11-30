export default [
  {
    path: "configscoredept",
    name: 'configscoredept',
    meta: { title: "评分部门设置" },
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