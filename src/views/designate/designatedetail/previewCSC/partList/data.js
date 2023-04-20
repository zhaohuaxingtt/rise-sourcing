/*
 * @Author: wentliao
 * @Date: 2022-02-23 10:05:54
 * @Description: 
 */
export const tableTitle = [
  { props: 'fsNum',isHeaderSetting:true, HeaderSettingList:[{name:'采购项目编号 (工厂)'},{name:'FS No. (Plant)'},], minWidth:180 },
  { props: 'partNum',  align: 'left', isHeaderSetting:true, HeaderSettingList:[{name:'零件信息'},{name:'Part Information'},],minWidth:250 },
  { props: 'project',  align: 'left', isHeaderSetting:true, HeaderSettingList:[{name:'项目信息'},{name:'Project Information'},],minWidth:250 },
  { props: 'ebrConfirmValue',isHeaderSetting:true, HeaderSettingList:[{name:'装车率'},{name:'EBR'},],minWidth:100 },
  { props: 'ebrCalculatedValue',isHeaderSetting:true, HeaderSettingList:[{name:'综合每车用量'},{name:'Mixed Qty'},],showTips:true,tips:()=>' Mixed Qty=∑ EBR*Qty',minWidth: 160 },
  { props: 'lifeTime',isHeaderSetting:true, HeaderSettingList:[{name:'询价量 (生命周期)'},{name:'Volume (Lifetime)'},],minWidth: 190 },
  { props: 'paVolume',isHeaderSetting:true, HeaderSettingList:[{name:'最高年询价量'},{name:'Volume (peak p.a.)'},],minWidth: 170 },
  { props: 'unit',isHeaderSetting:true, HeaderSettingList:[{name:'单位'},{name:'Unit'},],minWidth:110 },
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