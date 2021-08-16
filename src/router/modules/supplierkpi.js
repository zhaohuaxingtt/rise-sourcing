export default [
    {
        path: "/supplier",
        name: "index",
        component: () => import ("@/layout/default"),
        redirect: "/supplier/kpi",
        children:[{
            path: "index",
            name: "index",
            component: () => import("@/views/kpiChart/index"),
        },{
            path: "kpi",
            name: "kpi",
            component: () => import("@/views/kpiChart/supplierkpi"),
            children:[]
        },{
            path: "supplierDetail",
            name: "supplierDetail",
            component: () => import("@/views/kpiChart/components/supplierDetail"),
        },{
            path: "kpiList",
            name: "kpiList",
            component: () => import("@/views/kpiChart/kpiList"),
        },{
            path: "supplierPowerBi",
            name: "supplierPowerBi",
            component: () => import("@/views/kpiChart/supplierPowerBi"),
        },{
            path: "supplierList",
            name: "supplierList",
            component: () => import("@/views/kpiChart/supplierList"),
        },{
            path: "supplierKpiTreeTable",
            name: "supplierKpiTreeTable",
            component: () => import("@/views/kpiChart/supplierKpiTreeTable"),
        },{
            path: "imgKpi",
            name: "imgKpi",
            component: () => import("@/views/kpiChart/imgKpi"),
        }]
        
    }
  ]