export const searchList = [
  {prop:'catTypeProName',label:'车型项目',key:'CHEXINGXIANGMU',type:'input'},
  {prop:'partNum',label:'零件号',key:'LINGJIANHAO',type:'input'},
  {prop:'partName',label:'零件名称',key:'LINGJIANMINGCHENG',type:'input'},
]

export const tableTitleLeft = [
  { props: "carTypeProNameZh", name: "车型项目", key: "", tooltip: true, width:100 },
  { props: "partNum", name: "零件编号", key: "", tooltip: true, width:100 },
  { props: "partNameZh", name: "零件名称", key: "", tooltip: true, width:120 },
  { props: "sendTime", name: "任务发送时间", key: "", tooltip: true, width:140 },
  { props: "col5", name: "操作", key: "", minWidth:200 },
]

export const tableTitleRight1 = [
  { props: "node", name: "节点", key: "", tooltip: true, width:200 },
  { props: "planStartTime", name: "预计开始(SOLL)", key: "", tooltip: true, width:160 },
  { props: "planEndTime", name: "预计结束(SOLL)", key: "", tooltip: true, width:160 },
  { props: "col4", name: "操作", key: "", minWidth:120 },
]

export const tableTitleRight2 = [
  { props: "node", name: "节点", key: "", tooltip: true, width:200 },
  { props: "actualStartTime", name: "实际开始(SOLL)", key: "", tooltip: true, width:160 },
  { props: "actualEndTime", name: "实际结束(SOLL)", key: "", tooltip: true, width:160 },
  { props: "col4", name: "操作", key: "", minWidth:120 },
]