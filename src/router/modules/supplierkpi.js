export default [
    {
        path: "/supplier/index",
        name: "index",
        component: () => import ("@/layout/default"),
        redirect: "/supplier/kpi",
        children:[{
            path: "/supplier/index",
            name: "index",
            component: () => import("@/views/kpiChart/index"),
        },{
            path: "/supplier/kpi",
            name: "supplierkpi",
            component: () => import("@/views/kpiChart/supplierkpi"),
        },{
            path: "/supplier/kpiList",
            name: "kpiList",
            component: () => import("@/views/kpiChart/kpiList"),
        },{
            path: "/supplier/imgKpi",
            name: "imgKpi",
            component: () => import("@/views/kpiChart/imgKpi"),
        },{
            path: "/supplier/supplierList",
            name: "supplierList",
            component: () => import("@/views/kpiChart/supplierList"),
        },{
            path: "/supplier/supplierDetail",
            name: "supplierDetail",
            component: () => import("@/views/kpiChart/components/supplierDetail"),
        },{
            path: "/supplier/supplierPowerBi",
            name: "supplierPowerBi",
            component: () => import("@/views/kpiChart/supplierPowerBi"),
        },{
            path: "/supplier/supplierKpiTreeTable",
            name: "supplierKpiTreeTable",
            component: () => import("@/views/kpiChart/supplierKpiTreeTable"),
        }]
        
    }
  ]