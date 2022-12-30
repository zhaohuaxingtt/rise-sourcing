/*
 * @Author: Luoshuang
 * @Date: 2021-11-26 14:27:07
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-08 15:39:25
 * @Description: 
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\index.js
 */
import financialtargetpriceRoutes from "./financialtargetprice" // 财务目标价
import modeltargetpriceRoutes from "./modeltargetprice" // 模具目标价
import supplierscoreRoutes from "./supplierscore" // 供应商评分
import configscoredeptRoutes from "./configscoredept" // 设置评分部门
import costanalysismanageRoutes from "./costanalysismanage" // KM成本分析
import productionCapacity from "./productionCapacity" // 零件台账
import SELTargetPriceRoutes from "./SELtargetprice" // SEL目标价

export default [
  {
    path: "/targetpriceandscore",
    meta: { title: "目标价及评分管理", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
    component: () => import("@/layout/default"),
    redirect: "/targetpriceandscore/financialtargetprice/maintenance",
    children: [
      ...financialtargetpriceRoutes,
      ...modeltargetpriceRoutes,
      ...supplierscoreRoutes,
      ...configscoredeptRoutes,
      ...costanalysismanageRoutes,
      ...productionCapacity,
      ...SELTargetPriceRoutes,
    ]
  }
]