export const searchList = [
  {prop:'name',label:'节点名称',key:'JIEDIANMINGCHEN',type:'input'},
  {prop:'type',label:'节点类型',key:'JIEDIANLEIXING',type:'select', selectOption:'typeOptions'},
  {prop:'node',label:'是否扩展节点',key:'SHIFOUKUOZHANJIEDIAN',type:'select', selectOption:'kzOptions'},
]

export const tableTitle = [
  { props: "col1", name: "节点(Activity)序号", key: "", tooltip: true, width:120 },
  { props: "col2", name: "节点(Activity)", key: "", tooltip: true, minWidth:120 },
  { props: "col3", name: "节点(Activity)类型", key: "", tooltip: true, minWidth:120 },
  { props: "col4", name: "扩展节点", key: "", tooltip: true, minWidth:120 },
  { props: "col5", name: "Soll", key: "", tooltip: true, width:120 },
  { props: "col6", name: "lst", key: "", tooltip: true, width:120 },
  { props: "col7", name: "操作", key: "", tooltip: true, width:120 },
]