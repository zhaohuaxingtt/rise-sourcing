export default [
  {
    path: "/decisionDataView",
    name: "decisionDataView",
    meta: {
      title: 'DecisionDataView'
    },
    component: () => import("@/views/decisionDataView/iframe"),
  }
]