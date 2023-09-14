export default [
    {
      path: "productionCapacity",
      name: "productionCapacity",
      meta: { title: "零件经销价", activeMenu: ['RISE_WORKBENCH', 'FINANCIALMANAGE'] },
      component: () => import("@/views/productionCapacity"),
    }
  ]