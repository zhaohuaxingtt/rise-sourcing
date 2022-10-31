export default [
    {
      path: "productionCapacity",
      name: "productionCapacity",
      meta: { title: "总成散件", activeMenu: ['RISE_WORKBENCH', 'TARGETPRICEANDSCORE'] },
      component: () => import("@/views/productionCapacity"),
    }
  ]