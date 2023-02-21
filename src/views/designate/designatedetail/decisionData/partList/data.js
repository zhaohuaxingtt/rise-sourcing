/*
 * @Author: wentliao
 * @Date: 2022-02-23 10:05:54
 * @Description: 
 */
export const tableTitle = [
  { props: 'fsNum', name: 'FS NO.' },
  { props: 'partNum', name: 'Part NO.' },
  { props: 'partNameZh', name: 'Part Name'},
  { props: 'mtz', name: 'MTZ',width:60},
  { props: 'materialGroup', name: 'Material Group',minWidth: 100 },
  { props: 'procureFactory', name: 'Factory' },
  { props: 'project', name: 'Project' },
  { props: 'sopDate', name: 'SOP' },
  { props: 'ebrConfirmValue', name: 'EBR%' },
  { props: 'ebrCalculatedValue', name: 'Mixed Qty' },
  { props: 'unit', name: 'Unit' },
  // { props: 'ebrConfirmValue', name: 'EBR% (input)' },
  { props: 'lifeTime', name: 'Volume (lifetime)',width: 150 },
  { props: 'paVolume', name: 'Volume (p.a.)' },
]

export const detailTableTitle = [
  { props: "engineType", name: "发送机类型", tooltip: true, key: "发送机类型", minWidth: "240" },
  { props: "gearType", name: "变速箱型号", tooltip: true, key: "变速箱型号" , minWidth: "160"},
  { props: "batteryCapacity", name: "电池容量", tooltip: true, key: "电池容量" , minWidth: "135"},
  { props: "otherInfo", name: "其他配置", tooltip: true, key: "其他配置", minWidth: "135" },
  { props: "cartypeLevel", name: "车型等级", tooltip: true, key: "车型等级", minWidth: "100" },
  { props: "perCarDosage", name: "每车用量", tooltip: true, key: "每车用量", minWidth: "100" },
  { props: "cartypeLevelRate", name: "配置比例", tooltip: true, key: "配置比例", minWidth: "100" },
]					