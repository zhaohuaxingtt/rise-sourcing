export default [
    {
        path: "/supplier/kpi",
        name: "index",
        component: () => import ("@/layout/default"),
        redirect: "/supplier/kpi",
        children:[{
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
        }]
        
    }
  ]