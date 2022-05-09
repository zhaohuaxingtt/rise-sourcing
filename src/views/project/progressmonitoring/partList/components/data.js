/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-16 14:51:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-22 17:02:06
 * @Description: 项目进度监控 - 未进TIPS表和CKD/HT零件 列表表头
 */

// 未进TIP表的已释放零件
export const TIPStableTitle = [
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 200},
  {props:'zp',name:'ZP',key:'ZP',tooltip: true, minWidth: 80},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true, minWidth: 170},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true, minWidth: 200},
  {props:'fop',name:'FOP',key:'FOP',tooltip: true, minWidth: 80},
  {props:'dept',name:'设计科室',key:'SEHJIKESHI',tooltip: true, minWidth: 100},
  {props:'productGroup',name:'产品组', key: "LK_CHANPINZU", tooltip: true, minWidth: 120},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 100},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true, minWidth: 80},
  {props:'fsnrGsnrNum',name:'FS号', key: "LK_FSHAO", tooltip: true, minWidth: 120},
  {props:'partStatusDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true, minWidth: 100},
]

// CKD/HT零件表头
export const CKDHTtableTitle = [
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 200},
  {props:'zp',name:'ZP',key:'ZP',tooltip: true, minWidth: 80},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true, minWidth: 170},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true, minWidth: 200},
  {props:'fop',name:'FOP',key:'FOP',tooltip: true, minWidth: 80},
  {props:'dept',name:'FG',key:'FG',tooltip: true, minWidth: 80},
  {props:'productGroup',name:'产品组', key: "LK_CHANPINZU", tooltip: true, minWidth: 120},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 100},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true, minWidth: 80},
  {props:'bezug',name:'bezug标签', key: "BEZUGBIAOQIAN", tooltip: true, minWidth: 100},
]

export const OTSEMtableTitle = [
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true, minWidth: 200},
  {props:'zp',name:'ZP',key:'ZP',tooltip: true, minWidth: 80},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true, minWidth: 120},
  {props:'partNameZh',name:'零件名称(中)', key: "LINGJIANMINGCHEN_ZH", tooltip: true, minWidth: 170},
  {props:'partNameDe',name:'零件名称(德)', key: "LINGJIANMINGCHEN_DE", tooltip: true, minWidth: 200},
  {props:'fop',name:'FOP',key:'FOP',tooltip: true, minWidth: 80},
  {props:'dept',name:'FG',key:'FG',tooltip: true, minWidth: 80},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true, minWidth: 100},
  {props:'linieName',name:'Linie', key: "LINIE", tooltip: true, minWidth: 100},
  {props:'projectPurchaserName',name:'项目采购员', key: "XIANGMUCAIGOUYUAN", tooltip: true, minWidth: 100},
  {props:'otsIst',name:'OTS IST', tooltip: true, minWidth: 180},
  {props:'emIst',name:'EM IST', tooltip: true, minWidth: 180},
]