/*
 * @Author: your name
 * @Date: 2021-05-27 13:50:49
 * @LastEditTime: 2021-08-23 15:25:25
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\components\data.js
 */
export const tableTitle = [
  { props: "fileName", name: "上传文件名称", key: "SHANGCHUANWENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "uploadDate", name: "时间", key: "SHIJIAN", tooltip: true },
  { props: "uploadBy", name: "上传人", key: "SHANGCHUANREN", tooltip: true },
  // { props: "remark", name: "备注", key: "costanalysismanage.BeiZhu", tooltip: true }
]

export const navList= [
  {
    value: 1,
    name: "人工成本维护",
    url: "/costanalysismanage/datamaintenance/costMaintenance",
    activePath: "/costanalysismanage/datamaintenance/costMaintenance",
    key: "RENGONGCHENGBENWEIHU",
    permissionKey: "COSTANALYSISMANAGE_DATAMAINTENANCE_COSTMAINTENANCE_TAB",
    permissionName: "人工成本维护"
  },
  {
    value: 2,
    name: "人工成本数据维护",
    url: "/costanalysismanage/datamaintenance/costDataMaintenance",
    activePath: "/costanalysismanage/datamaintenance/costDataMaintenance",
    key: "RGCBSJWH",
    permissionKey: "COSTANALYSISMANAGE_DATAMAINTENANCE_COSTDATAMAINTENANCE_TAB",
    permissionName: "人工成本数据维护"
  },
  {
    value: 3,
    name: "Heavy Item清单维护",
    url: "/costanalysismanage/datamaintenance/heavyItem",
    activePath: "/costanalysismanage/datamaintenance/heavyItem",
    key: "HEAVYITEMQDWH",
    permissionKey: "COSTANALYSISMANAGE_DATAMAINTENANCE_HEAVYITEM_TAB",
    permissionName: "Heavy Item清单维护"
  }
]