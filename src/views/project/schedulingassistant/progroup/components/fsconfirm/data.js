/*
 * @Author: Luoshuang
 * @Date: 2021-07-28 16:01:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 10:42:50
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\fsconfirm\data.js
 */

export const tableTitle = [
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true,minWidth: 200},
  {props:'projectPurchaser',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true},
  {props:'productGroupZh',name:'产品组中文名称', key: "CHANPINZUZHONGWENMINGCHENG", tooltip: true},
  {props:'productGroupDe',name:'产品组德文名称', key: "CHANPINZUDEWENMINGCHENG", tooltip: true},
  {props:'scheBfToFirstTryoutWeek',name:'数据冻结-1st tryout (周)', key: "SHUJUDONJIE1STTRYOUTZHOU", tooltip: true},
  {props:'scheFirstTryEmWeek',name:'1st tryout-EM (周)', key: "1STTRYOUTEMZHOU", tooltip: true},
  {props:'scheFirstTryOtsWeek',name:'1st tryout-OTS (周)', key: "1STTRYOUTOTSZHOU", tooltip: true},
  {props:'fsId',name:'询价采购员', key: "XUNJIACAIGOUYUAN", editable: true, type: 'select'},
  {props:'confirmDateDeadline',name:'确认时长截止日期', key: "QUERENSHICHANGJIEZHIRIQI", editable: true, type: 'date',minWidth: 100},
]