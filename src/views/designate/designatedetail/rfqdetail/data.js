/*
 * @Descripttion: RFQ & 零件清单数据
 * @Author: Luoshuang
 * @Date: 2021-05-21 11:30:46
 * @LastEditTime: 2021-06-02 20:57:20
 */

export const rfqListTitle = [
  {props:'id',name:'RFQ编号', key: "", tooltip: true},
  {props:'rfqName',name:'RFQ名称', key: "", tooltip: true, width: 120},
  {props:'rfqType',name:'RFQ类型', key: "", tooltip: true},
  {props:'createDate',name:'创建日期', key: "", tooltip: true, width: 120},
  {props:'currentRounds',name:'当前轮次', key: "", tooltip: true},
  {props:'suppliers',name:'已询价供应商（数量）', key: "", tooltip: true, width: 150},
  {props:'quotations',name:'已报价供应商（数量）', key: "", tooltip: true, width: 150},
  {props:'currentStatus',name:'RFQ状态', key: "", tooltip: true},
  {props:'currentRoundsEndTime',name:'报价截止日期', key: "", tooltip: true, width: 120},
  {props:'buyerName',name:'询价采购员', key: "", tooltip: true},
  {props:'linieNameZh',name:'LINIE', key: "", tooltip: true},
  {props:'tpGradeStatus',name:'TP评分状态', key: "", tooltip: true, width: 120},
  {props:'mqGradeStatus',name:'MQ评分状态', key: "", tooltip: true, width: 120},
  {props:'carType',name:'车型项目', key: "", tooltip: true},
  {props:'targetGradeStatus',name:'CF目标价状态', key: "", tooltip: true, width: 120},
  {props:'o',name:'Heavy Item', key: "", tooltip: true, width: 120},
  {props:'p',name:'分析报告', key: "", tooltip: true},
  // {props:'q',name:'',key: '',tooltip:false,width:'50'}
]

export const partsListTitle = [
  {props:'fsnrGsnrNum',name:'FSNR/GSNR/SPNR', key: "", tooltip: true, width: 130},
  {props:'rfqId',name:'RFQ号', key: "", tooltip: true},
  {props:'partNum',name:'零件号', key: "", tooltip: true},
  {props:'partNameZh',name:'零件名（中）', key: "", tooltip: true, width: 120},
  {props:'partNameDe',name:'零件名（德）', key: "", tooltip: true, width: 120},
  {props:'procureFactory',name:'采购工厂', key: "", tooltip: true},
  {props:'partProjectType',name:'零件项目类型', key: "", tooltip: true, width: 120},
  {props:'cartypeCategory',name:'车型大类', key: "", tooltip: true},
  {props:'cartypeProjectZh',name:'车型项目', key: "", tooltip: true},
  {props:'partStatus',name:'零件状态', key: "", tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "", tooltip: true},
  {props:'linieName',name:'LINIE', key: "", tooltip: true},
  {props:'n',name:'CF目标价', key: "", tooltip: true},
  // {props:'q',name:'',key: '',tooltip:false,width:'50'}
]