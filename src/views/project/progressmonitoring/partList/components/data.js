/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-16 14:51:18
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-24 15:30:56
 * @Description: 项目进度监控 - 未进TIPS表和CKD/HT零件 列表表头
 */

// 未进TIP表的已释放零件
export const TIPStableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true},
  {props:'partStatus',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true},
  {props:'productGroup',name:'产品组', key: "LK_CHANPINZU", tooltip: true},
  {props:'fsnrGsnrNum',name:'FS号', key: "LK_FSHAO", tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true},
  {props:'fop',name:'零件对应的EP',key:'LK_PARTEPCRRSPONDING',tooltip: true}
]

// CKD/HT零件表头
export const CKDHTtableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'bezug',name:'bezug标签', key: "BEZUGBIAOQIAN", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true},
  {props:'productGroup',name:'产品组', key: "LK_CHANPINZU", tooltip: true},
  {props:'fop',name:'零件对应的EP',key:'LK_PARTEPCRRSPONDING',tooltip: true}
]