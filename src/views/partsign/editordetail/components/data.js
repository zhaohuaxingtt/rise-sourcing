/*
 * @Author: shujie
 * @Date: 2021-02-24 10:17:53
 * @LastEditTime: 2021-02-24 10:17:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\data.js
 */
export const partTitle = [
  {key:'partNum',name:'零件号'},
  {key:'partNameCn',name:'零件名（中）'},
  {key:'partNameEn',name:'零件名（德）'},
  {key:'e',name:'车型大类'},
  {key:'f',name:'车型项目'},
  {key:'h',name:'信息单类型'},
  {key:'tpPartID',name:'新建信息单流水号'},
  {key:'j',name:'采购员'},
  {key:'k',name:'信息单状态'},
]
export const partDetailTitle=[
	{key:'b',name:'设计工程师姓名'},
	{key:'c',name:'零件名（英）'},
	{key:'stuffNumber',name:'采购员工号'},
	{key:'e',name:'退回原因'},
	{key:'f',name:'取消原因'},
	{key:'createDate',name:'信息单生成时间'},
	{key:'i',name:'创建时间'},
	{key:'creatorNum',name:'创建人工号'},
	{key:'creatorName',name:'创建人姓名'},
	{key:'l',name:'设计科室'},
	{key:'m',name:'设计工程师号'},
	{key:'farbeNum',name:'色标号'},
	{key:'drawingDate',name:'图纸日期'},
	{key:'material',name:'材料'},
	{key:'weight',name:'重量'},
	{key:'optionalPart',name:'选装件'},
	{key:'size',name:'尺寸'},
	{key:'isSecondTier',name:'是否二次件'},
	{key:'AEKONum',name:'Aeko号'},
	{key:'productGroupNum',name:'原配厂'},
	{key:'isBMG',name:'BMG'},
	{key:'partDerived',name:'从零件派生'},
	{key:'pa',name:'被代替零件'},
	{key:'inheritedPropertyNum',name:'沿用车型大类代码'},
	{key:'ra',name:'零件类型'},
	{key:'零件类型代码',name:'零件类型代码'},
	{key:'LCCMemo',name:'深度国产化备注'},
	{key:'CSCMeetingRequiredDate',name:'要求CSC会议日期'},
	{key:'specialRequirement',name:'特殊要求'},
	{key:'LCCDegreeNum',name:'深度国产化代码'},
	{key:'isLCC',name:'是否深度国产化'},
	{key:'LCCMemo',name:'深度国产化备注'},
	{key:'tradePropertyNum',name:'零件贸易属性代码'},
	{key:'tradePropertyDescriptionZh',name:'零件贸易属性描述(中)'},
	{key:'',name:'零件贸易属性描述(德)'},
	{key:'',name:'零件贸易属性描述(英)'},
	{key:'machiningDegreeNum',name:'零件加工程度代码'},
	{key:'machiningDegreeDescriptionZh',name:'零件加工程度(中)'},
	{key:'machiningDegreeDescriptionDe',name:'零件加工程度(德)'},
	{key:'machiningDegreeDescriptionEn',name:'零件加工程度(英)'},
	{key:'',name:'零件沿用性质代码'},
	{key:'inheritedPropertyDescriptionZh',name:'零件沿用性质描述(中)'},
	{key:'inheritedPropertyDescriptionDe',name:'零件沿用性质描述(德)'},
	{key:'inheritedPropertyDescriptionEn',name:'零件沿用性质描述(英)'},
	{key:'platformPropertyNum',name:'零件平台性质代码'},
	{key:'platformPropertyDescriptionZh',name:'零件平台性质描述(中)'},
	{key:'platformPropertyDescriptionDe',name:'零件平台性质描述(德)'},
	{key:'platformPropertyDescriptionEn',name:'零件平台性质描述(英)'},
	{key:'',name:'新建信息单备注'},
	{key:'partNum1',name:'零件号第一部分'},
	{key:'partNum2',name:'零件号第二部分'},
	{key:'partNum3',name:'零件号第三部分'},
	{key:'partNum4',name:'零件号第四部分'},
	{key:'partNum5',name:'零件号第五部分'},
]

export const enquiryTableTitle = [
	{ props: 'a', name: '文件名' },
  { props: 'b', name: '文件大小（MB）' },
  { props: 'c', name: '上传日期' },
  { props: 'd', name: '上传人' }
]

export const unconfirmedTableTitle = [
  { props: 'a', name: '版本号' },
  { props: 'b', name: '信息流水单号' },
  { props: 'c', name: '维护人' },
  { props: 'd', name: '推送时间' },
  { props: 'e', name: '版本状态' }
]

export const usageTableTitle = [
  { props: 'a', name: '车型大类' },
  { props: 'b', name: '发动机类型' },
  { props: 'c', name: '电池容量' },
	{ props: 'd', name: '变速箱类型' },
  { props: 'e', name: '车型等级' },
  { props: 'f', name: '其他信息' },
  { props: 'g', name: '每车用量' }
]

export const versionDialogTableTitle = [
  { props: 'a', name: '版本号' },
  { props: 'b', name: '操作人' },
  { props: 'c', name: '推送时间' },
  { props: 'd', name: '版本状态' }
]

export const logTableTitle = [
	{ props: 'a', name: '操作' },
  { props: 'b', name: '发生时间' },
  { props: 'c', name: '操作人' },
  { props: 'd', name: '备注' }
]