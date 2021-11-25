import financialtargetpriceRoutes from "./financialtargetprice" // 财务目标价
import modeltargetpriceRoutes from "./modeltargetprice" // 模具目标价
import supplierscoreRoutes from "./supplierscore" // 供应商评分
import configscoredeptRoutes from "./configscoredept" // 设置评分部门
import costanalysismanageRoutes from "./costanalysismanage" // KM成本分析

export default [
  {
    path: "/targetPriceAndScore",
    meta: { title: "目标价及评分管理" },
    component: () => import("@/layout/default"),
    redirect: "/financialtargetprice/maintenance",
    children: [
      ...financialtargetpriceRoutes,
      ...modeltargetpriceRoutes,
      ...supplierscoreRoutes,
      ...configscoredeptRoutes,
      ...costanalysismanageRoutes
    ]
  }
]