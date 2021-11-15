/*
 * @Descripttion: RFQ & 零件清单数据
 * @Author: Luoshuang
 * @Date: 2021-05-21 11:30:46
 * @LastEditTime: 2021-07-14 18:44:06
 */

export const rfqListTitle = [
  {props:'id',name:'RFQ编号', key: "RFQBIANHAO", tooltip: true},
  {props:'rfqName',name:'RFQ名称', key: "RFQMINGCHEN", tooltip: true, width: 120},
  {props:'rfqType',name:'RFQ类型', key: "RFQLEIXING", tooltip: true},
  {props:'createDate',name:'创建日期', key: "CHUANGJIANRIQI", tooltip: true, width: 120},
  {props:'currentRounds',name:'当前轮次', key: "DANGQIANLUNCI", tooltip: true},
  {props:'suppliers',name:'已询价供应商（数量）', key: "YIXUNJIAGONGYINGSHANG_SHULIANG", tooltip: true, width: 150, type: 'number'},
  {props:'quotations',name:'已报价供应商（数量）', key: "YIBAOJIAGONGYINGSHANG_SHULINAG", tooltip: true, width: 150, type: 'number'},
  {props:'currentStatus',name:'RFQ状态', key: "RFQZHUANGTAI", tooltip: true},
  {props:'currentRoundsEndTime',name:'报价截止日期', key: "BAOJIAJIEZHIRIQI", tooltip: true, width: 120},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieNameZh',name:'LINIE', key: "LINIE", tooltip: true},
  {props:'tpGradeStatus',name:'TP评分状态', key: "TPPINGFENZHUANGTAI", tooltip: true, width: 120},
  {props:'mqGradeStatus',name:'MQ评分状态', key: "MQPINGFENZHUANGTAI", tooltip: true, width: 120},
  // {props:'carType',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'targetGradeStatus',name:'CF目标价状态', key: "CFMUBIAOJIAZHUANGTAI", tooltip: true, width: 120},
  {props:'heavyItem',name:'Heavy Item', key: "HEAVYITEM", tooltip: true, width: 120},
  {props:'kmAnalysis',name:'分析报告', key: "FENXIBAOGAO", tooltip: true},
  // {props:'q',name:'',key: '',tooltip:false,width:'50'}
]

export const partsListTitle = [
  {props:'fsnrGsnrNum',name:'FS/GS/SP No.', key: "FSGSSP", tooltip: true, width: 150},
  {props:'rfqId',name:'RFQ号', key: "RFQHAO", tooltip: true},
  {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
  {props:'partNameZh',name:'零件名（中）', key: "LINGJIANMING_ZH", tooltip: true, width: 120},
  {props:'partNameDe',name:'零件名（德）', key: "LINGJIANMING_DE", tooltip: true, width: 120},
  {props:'mtz',name:'MTZ', key: "MTZ", tooltip: true, width: 120},
  {props:'procureFactoryName',name:'采购工厂', key: "CAIGOUGONGCHANG", tooltip: true},
  {props:'partProjectTypeDesc',name:'零件项目类型', key: "LINGJIANXIANGMULEIXING", tooltip: true, width: 120},
  {props:'cartypeCategory',name:'车型大类', key: "CHEXINGDALEI", tooltip: true},
  {props:'cartypeProjectZh',name:'车型项目', key: "CHEXINGXIANGMU", tooltip: true},
  {props:'statusDesc',name:'零件状态', key: "LINGJIANZHUANGTAI", tooltip: true},
  {props:'buyerName',name:'询价采购员', key: "XUNJIACAIGOUYUAN", tooltip: true},
  {props:'linieName',name:'LINIE', key: "LINIE", tooltip: true},
  {props:'n',name:'CF目标价', key: "CFMUBIAOJIA", tooltip: true},
  // {props:'q',name:'',key: '',tooltip:false,width:'50'}
]