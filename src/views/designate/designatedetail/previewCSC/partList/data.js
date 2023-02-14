/*
 * @Author: wentliao
 * @Date: 2022-02-23 10:05:54
 * @Description: 
 */
export const tableTitle = [
  { props: 'fsNum',isHeaderSetting:true, HeaderSettingList:[{name:'采购项目编号'},{name:'FS No.'},], minWidth:180 },
  { props: 'partNum',  align: 'left', isHeaderSetting:true, HeaderSettingList:[{name:'零件信息'},{name:'Part Information'},],minWidth:250 },
  { props: 'project',  align: 'left', isHeaderSetting:true, HeaderSettingList:[{name:'项目信息'},{name:'Project Information'},],minWidth:250 },
  { props: 'ebrConfirmValue',isHeaderSetting:true, HeaderSettingList:[{name:'装车率'},{name:'EBR'},],minWidth:100 },
  { props: 'ebrCalculatedValue',isHeaderSetting:true, HeaderSettingList:[{name:'综合每车用量'},{name:'Mixed Qty'},],showTips:true,tips:()=>' Mixed Qty=∑ EBR*Qty',minWidth: 160 },
  { props: 'lifeTime',isHeaderSetting:true, HeaderSettingList:[{name:'询价量(生命周期)'},{name:'Volume (Lifetime)'},],minWidth: 190 },
  { props: 'paVolume',isHeaderSetting:true, HeaderSettingList:[{name:'最高年询价量'},{name:'Volume (peak p.a.)'},],minWidth: 170 },
  { props: 'unit',isHeaderSetting:true, HeaderSettingList:[{name:'单位'},{name:'Unit'},],minWidth:110 },
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