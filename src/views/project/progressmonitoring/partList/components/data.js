/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-16 14:51:18
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-28 11:01:20
 * @Description: 项目进度监控 - 未进TIPS表和CKD/HT零件 列表表头
 */

// 未进TIP表的已释放零件
export const TIPStableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'zp',name:'ZP',key:'ZP',tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true},
  {props:'fop',name:'FOP',key:'FOP',tooltip: true},
  {props:'dept',name:'设计科室',key:'SEHJIKESHI',tooltip: true},
  {props:'productGroup',name:'产品组', key: "LK_CHANPINZU", tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true},
  {props:'fsnrGsnrNum',name:'FS号', key: "LK_FSHAO", tooltip: true},
  {props:'partStatusDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true},
]

// CKD/HT零件表头
export const CKDHTtableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'zp',name:'ZP',key:'ZP',tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true},
  {props:'fop',name:'FOP',key:'FOP',tooltip: true},
  {props:'dept',name:'FG',key:'FG',tooltip: true},
  {props:'productGroup',name:'产品组', key: "LK_CHANPINZU", tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true},
  {props:'bezug',name:'bezug标签', key: "BEZUGBIAOQIAN", tooltip: true},
]

export const OTSEMtableTitle = [
  {props:'cartypeProject',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'zp',name:'ZP',key:'ZP',tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true},
  {props:'fop',name:'FOP',key:'FOP',tooltip: true},
  {props:'dept',name:'FG',key:'FG',tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true},
  {props:'buyerName',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true},
  {props:'',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true},
]