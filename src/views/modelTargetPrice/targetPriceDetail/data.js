/*
 * @Author: Luoshuang
 * @Date: 2021-06-23 13:46:59
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-23 15:28:28
 * @Description: 
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\data.js
 */

export const historyTableTitle = [
  {props:'fsNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'targetPrice',name:'投资目标价', key: "TOUZIMUBIAOJIA", tooltip: true},
  {props:'isValidDesc',name:'状态', key: "ZHUANGTAI", tooltip: true},
  {props:'updateUserName',name:'修改人', key: "XIUGAIREN", tooltip: true},
  {props:'updateDate',name:'修改日期', key: "XIUGAIRIQI", tooltip: true},
]

export const applyTableTitle = [
  {props:'fsnrGsnrNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'procureFactoryName',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true},
  {props:'partNameZh',name:'零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true},
  {props:'partNameDe',name:'零件名(德)', key: "LINGJIANMINGDE", tooltip: true},
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'originalTargetPrice',name:'原目标价', key: "YUANMUBIAOJIA", tooltip: true},
  {props:'businessTypeDesc',name:'类型', key: "LEIXING", tooltip: true},
  {props:'expectedTargetPrice',name:'期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true},
  {props:'targetPrice',name:'目标价', key: "MUBIAOJIA", tooltip: true},
  {props:'operation',name:'', key: "", tooltip: true}
]