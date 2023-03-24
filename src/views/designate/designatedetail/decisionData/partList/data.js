/*
 * @Author: wentliao
 * @Date: 2022-02-23 10:05:54
 * @Description: 
 */
export const tableTitle = [
  { props: 'fsNum', name: 'FS NO.' },
  { props: 'procureFactory', name: 'Factory' },
  { props: 'partNum', name: 'Part NO.' },
  { props: 'partNameZh', name: 'Part Name'},
  { props: 'mtz', name: 'MTZ',width:60},
  { props: 'materialGroup', name: 'Material Group',minWidth: 100 },
  { props: 'project', name: 'Project' },
  { props: 'sopDate', name: 'SOP' },
  { props: 'ebrConfirmValue', name: 'EBR%' },
  { props: 'ebrCalculatedValue', name: 'Mixed Qty' },
  // { props: 'ebrConfirmValue', name: 'EBR% (input)' },
  { props: 'lifeTime', name: 'Volume (lifetime)',width: 150 },
  { props: 'paVolume', name: 'Volume (p.a.)' },
  { props: 'unit', name: 'Unit' },
]

export const detailTableTitle = [
  { props: "engineType",isHeaderSetting:true, HeaderSettingList:[{name:'发送机类型'},{name:'Engine type'},], minWidth: "240" },
  { props: "gearType", isHeaderSetting:true, HeaderSettingList:[{name:'变速箱型号'},{name:'Gearbox model'},], minWidth: "150"},
  { props: "batteryCapacity", isHeaderSetting:true, HeaderSettingList:[{name:'电池容量'},{name:'Battery capacity'},], minWidth: "135"},
  { props: "otherInfo", isHeaderSetting:true, HeaderSettingList:[{name:'其他配置'},{name:'Other configuration'},], minWidth: "135" },
  { props: "cartypeLevel", isHeaderSetting:true, HeaderSettingList:[{name:'车型等级'},{name:'Model class'},], minWidth: "90" },
  { props: "perCarDosage", isHeaderSetting:true, HeaderSettingList:[{name:'每车用量'},{name:'Quantity'},], minWidth: "90" },
  { props: "cartypeLevelRate", isHeaderSetting:true, HeaderSettingList:[{name:'配置比例'},{name:'Configuration ratio%'},], minWidth: "145" },
]