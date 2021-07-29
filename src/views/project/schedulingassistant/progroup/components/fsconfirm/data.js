/*
 * @Author: Luoshuang
 * @Date: 2021-07-28 16:01:20
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-28 16:06:39
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\fsconfirm\data.js
 */

export const tableTitle = [
  {props:'sparePartCode',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'spnrNum',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true},
  {props:'rfqNum',name:'产品组中文名称', key: "CHANPINZUZHONGWENMINGCHENG", tooltip: true},
  {props:'assemblyPartNum',name:'产品组德文名称', key: "CHANPINZUDEWENMINGCHENG", tooltip: true},
  {props:'partNum',name:'BF-1st tryout (周)', key: "BF1STTRYOUTZHOU", tooltip: true},
  {props:'partNameCh',name:'1st tryout-EM (周)', key: "1STTRYOUTEMZHOU", tooltip: true},
  {props:'supplierSapCode',name:'1st tryout-OTS (周)', key: "1STTRYOUTOTSZHOU", tooltip: true},
  {props:'supplierNameZh',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, editable: true, type: 'select', selectOption: ''},
  {props:'respDeptName',name:'确认时长截止日期', key: "QUERENSHICHANGJIEZHIRIQI", tooltip: true, editable: true, type: 'date'},
]