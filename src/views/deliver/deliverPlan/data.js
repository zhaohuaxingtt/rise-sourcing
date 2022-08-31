export const searchList = [
  {prop:'dept',label:'车型项目',key:'CHEXINGXIANGMU',type:'input'},
  {prop:'part',label:'零件号',key:'LINGJIANHAO',type:'input'},
  {prop:'partName',label:'零件名称',key:'LINGJIANMINGCHENG',type:'input'},
]

export const tableTitleLeft = [
  { props: "col1", name: "车型项目", key: "", tooltip: true, width:100 },
  { props: "col2", name: "零件编号", key: "", tooltip: true, width:100 },
  { props: "col3", name: "零件名称", key: "", tooltip: true, width:120 },
  { props: "col4", name: "任务发送时间", key: "", tooltip: true, width:140 },
  { props: "col5", name: "操作", key: "", minWidth:200 },
]

export const tableTitleRight = [
  { props: "col1", name: "节点", key: "", tooltip: true, width:200 },
  { props: "col2", name: "实际开始(SOLL)", key: "", tooltip: true, width:160 },
  { props: "col3", name: "实际结束(SOLL)", key: "", tooltip: true, width:160 },
  { props: "col4", name: "操作", key: "", minWidth:120 },
]