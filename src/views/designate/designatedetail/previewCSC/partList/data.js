/*
 * @Author: wentliao
 * @Date: 2022-02-23 10:05:54
 * @Description: 
 */
export const tableTitle = [
  { props: 'fsNum',isHeaderSetting:true, HeaderSettingList:[{name:'采购项目编号'},{name:'FS No.'},] },
  { props: 'partNum',  align: 'left', isHeaderSetting:true, HeaderSettingList:[{name:'零件信息'},{name:'Part Information'},],minWidth:100 },
  { props: 'project',  align: 'left', isHeaderSetting:true, HeaderSettingList:[{name:'项目信息'},{name:'Project Information'},],minWidth:100 },
  { props: 'ebrCalculatedValue',isHeaderSetting:true, HeaderSettingList:[{name:'装车率'},{name:'EBR'},] },
  { props: 'qty',isHeaderSetting:true, HeaderSettingList:[{name:'综合每车用量'},{name:'Mixed Qty'},],showTips:true,tips:()=>'这是一个icon提示', },
  { props: 'lifeTime',isHeaderSetting:true, HeaderSettingList:[{name:'询价量（生命周期）'},{name:'Volume (Lifetime)'},],width: 150 },
  { props: 'paVolume',isHeaderSetting:true, HeaderSettingList:[{name:'最高年询价量'},{name:'Volume (peak p.a.)'},] },
  { props: 'unit',isHeaderSetting:true, HeaderSettingList:[{name:'单位'},{name:'Unit'},] },
]

export const detailTableTitle = [
  { props: "fileName", name: "发送机类型", tooltip: true, key: "发送机类型", minWidth: "250" },
  { props: "uploadTime", name: "变速箱型号", tooltip: true, key: "变速箱型号" , minWidth: "120"},
  { props: "uploader", name: "电池容量", tooltip: true, key: "电池容量" },
  { props: "flag", name: "其他配置", tooltip: true, key: "其他配置" },
  { props: "sortOrder", name: "车型等级", tooltip: true, key: "车型等级" },
  { props: "sortOrder", name: "配置比例", tooltip: true, key: "配置比例" },
]					