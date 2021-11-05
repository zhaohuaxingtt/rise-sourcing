/*
 * @Author: shujie
 * @Date: 2021-02-24 10:17:53
 * @LastEditTime: 2021-10-15 12:11:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\data.js
 */
export const partTitle = [
	{key:'partNum',name:'零件号',permissionKey:'PARTSIGN_EDITORDETAIL_PARTNUMBER', language: 'LK_LINGJIANHAO'},
	{key:'partNameCn',name:'零件名（中）',permissionKey:'PARTSIGN_EDITORDETAIL_PARTNAMEZH', language: 'LK_LINGJIANMINGZHONG'},
	{key:'partNameDe',name:'零件名（德）',permissionKey:'PARTSIGN_EDITORDETAIL_PARTNAMEGER', language: 'LK_LINGJIANMINGDE'},
	{key:'carModelID',name:'车型大类',permissionKey:'PARTSIGN_EDITORDETAIL_VEHICLECATEGORIES', language: 'LK_CHEXINGDALEI'},
	{key:'projectCarType',name:'车型项目',permissionKey:'PARTSIGN_EDITORDETAIL_MODELPROJECT', language: 'LK_CHEXINGXIANGMU'},
	{key:'stuffName',name:'询价采购员',permissionKey:'PARTSIGN_EDITORDETAIL_BUYER', language: 'LK_XUNJIACAIGOUYUAN'},
	{key:'tpPartID',name:'新建信息单流水号',permissionKey:'PARTSIGN_EDITORDETAIL_INFORMATIONSERIALNUMBER', language: 'LK_XINJIANXINXIDANLIUSHUIHAO'},
	{key:'tpInfoType',name:'信息单类型',permissionKey:'PARTSIGN_EDITORDETAIL_INFORMATIONCLASSIFICATION', language: 'LK_XINXIDANLEIXING'},
	{key:'status',name:'信息单状态',permissionKey:'PARTSIGN_DETAIL_INFORMATIONSTATUS', language: 'LK_XINXIDANZHUANGTAI'},
  ]
export const partDetailTitle=[
	[{key:'tpPrincepalName',name:'设计工程师姓名',language: 'LK_SHEJIGONGCHENGSHIXINGMING'},
	{key:'partNameEn',name:'零件名（英）',language: 'LK_LINGJIANMINGYING'},
	{key:'stuffNumber',name:'采购员工号',language: 'LK_CAIGOUYUANGONGHAO'}, 
	
	{key:'backReason',name:'退回原因',language: 'LK_TUIHUIYUANYIN'},
	{key:'interruptReason',name:'取消原因',language: 'LK_QUXIAOYUANYIN'},
	{key:'createDate',name:'信息单生成时间',language: 'LK_XINXIDANSHENGCHENGSHIJIAN'},
	
	{key:'createDate',name:'创建时间',language: 'LK_CHUANGJIANSHIJIAN'},
	{key:'creatorNum',name:'创建人工号',language: 'LK_CHUANGJIANRENGONGHAO'},
	{key:'creatorName',name:'创建人姓名',language: 'LK_CHUANGJIANRENXINGMING'},
	
	{key:'tpDeptNum',name:'设计科室',language: 'LK_SHEJIKESHI'},
	{key:'tpPrincepalNum',name:'设计工程师号',language: 'LK_SHEJIGONGCHENGSHIHAO'},
	{key:'farbeNum',name:'色标号',language: 'LK_SEBIAOHAO'},
	
	{key:'drawingDate',name:'图纸日期',language: 'LK_TUZHIRIQI'},
	{key:'material',name:'材料',language: 'LK_CAILIAO'},
	{key:'weight',name:'重量',language: 'LK_ZHONGLIANG'},
	
	{key:'optionalPart',name:'选装件',language: 'LK_XUANZHUANGJIAN'},
	{key:'size',name:'尺寸',language: 'LK_CHICUN'},
	{key:'isSecondTier',name:'是否二次件',language: 'LK_SHIFOUERCIJIAN'},
	
	{key:'aekoNum',name:'Aeko号',language: 'LK_AEKOHAO'},
	{key:'productGroupNum',name:'原配厂',language: 'LK_YUANPEICHANG'},
	{key:'isBMG',name:'BMG',language: 'BMG'},
	
	{key:'partDerived',name:'从零件派生',language: 'LK_CONGLINGJIANPAISHENG'},
	{key:'replacedPartNum',name:'被代替零件',language: 'LK_BEIDAITILINGJIAN'},
	{key:'carModelID',name:'沿用车型大类代码',language: 'LK_YANYONGCHEXINGDALEIDAIMA'},
	
	{key:'partTypeName',name:'零件类型',language: 'LK_LINGJIANLEIXING'},
	{key:'partTypeNum',name:'零件类型代码',language: 'LK_LINGJIANLEIXINGDAIMA'},
	{key:'cscMeetingRequiredDate',name:'要求CSC会议日期',language: 'LK_YAOQIUCSCHUIYIRIQI'},
	
	{key:'specialRequirement',name:'特殊要求',language: 'LK_TESHUYAOQIU'},
	{key:'lccDegreeNum',name:'深度国产化代码',language: 'LK_SHENDUGUOCHANHUADAIMA'},
	{key:'isLcc',name:'是否深度国产化',language: 'LK_SHIFOUSHENDUGUOCHANHUA'},
	
	{key:'lccMemo',name:'深度国产化备注',language: 'LK_SHENDUGUOCHANHUABEIZHU'}],
	[
		{key:'tradePropertyNum',name:'零件贸易属性代码',language: 'LK_LINGJIANMAOYISHUXINGDAIMA'},
	],
	[
		{key:'tradePropertyDescriptionZh',name:'零件贸易属性描述(中)',language: 'LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG'},
		
		{key:'tradePropertyDescriptionDe',name:'零件贸易属性描述(德)',language: 'LK_LINGJIANMAOYISHUXINGMIAOSHUDE'},
		{key:'tradePropertyDescriptionEn',name:'零件贸易属性描述(英)',language: 'LK_LINGJIANMAOYISHUXINGMIAOSHUYING'},
	],
	[
		{key:'machiningDegreeNum',name:'零件加工程度代码',language: 'LK_LINGJIANJIAGONGCHENGDUDAIMA'},
	],
	[
		{key:'machiningDegreeDescriptionZh',name:'零件加工程度(中)',language: 'LK_LINGJIANJIAGONGCHENGDUZHONG'},
		{key:'machiningDegreeDescriptionDe',name:'零件加工程度(德)',language: 'LK_LINGJIANJIAGONGCHENGDUDE'},
		{key:'machiningDegreeDescriptionEn',name:'零件加工程度(英)',language: 'LK_LINGJIANJIAGONGCHENGDUYING'},
	],
	[
		{key:'inheritedPropertyNum',name:'零件沿用性质代码',language: 'LK_LINGJIANYANYONGXINGZHIDAIMA'},
	],
	[
		{key:'inheritedPropertyDescriptionZh',name:'零件沿用性质描述(中)',language: 'LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG'},
		{key:'inheritedPropertyDescriptionDe',name:'零件沿用性质描述(德)',language: 'LK_LINGJIANYANYONGXINGZHIMIAOSHUDE'},
		{key:'inheritedPropertyDescriptionEn',name:'零件沿用性质描述(英)',language: 'LK_LINGJIANYANYONGXINGZHIMIAOSHUYING'},
	],
	[
		{key:'platformPropertyNum',name:'零件平台性质代码',language: 'LK_LINGJIANPINGTAIXINGZHIDAIMA'},
	],
	[
		{key:'platformPropertyDescriptionZh',name:'零件平台性质描述(中)',language: 'LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG'},
		{key:'platformPropertyDescriptionDe',name:'零件平台性质描述(德)',language: 'LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE'},
		{key:'platformPropertyDescriptionEn',name:'零件平台性质描述(英)',language: 'LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING'},
	],
	[
		{key:'tpPartSheetMemo',name:'新建信息单备注',language: 'LK_XINJIANXINXIDANBEIZHU'},
	],
	[
		{key:'partNum1',name:'零件号第一部分',language: 'LK_LINGJIANHAODIYIBUFEN'},
		{key:'partNum2',name:'零件号第二部分',language: 'LK_LINGJIANHAODIERBUFEN'},
		
		{key:'partNum3',name:'零件号第三部分',language: 'LK_LINGJIANHAODISANBUFEN'},
		{key:'partNum4',name:'零件号第四部分',language: 'LK_LINGJIANHAODISIBUFEN'},
		{key:'partNum5',name:'零件号第五部分',language: 'LK_LINGJIANHAODIWUBUFEN'},
	]	
]

export const enquiryTableTitle = [
  { props: 'tpPartAttachmentName', name: '文件名', key: 'LK_WENJIANMING', tooltip: true ,minWidth: 90},
  { props: 'size', name: '文件大小', key: 'WENJIANDAXIAO', tooltip: true },
  { props: 'updateDate', name: '上传日期', key: 'LK_SHANGCHUANRIQI', tooltip: true },
  { props: 'uploadBy', name: '上传人', key: 'LK_SHANGCHUANREN', tooltip: true }
]

export const volumeUnconfirmedTableTitle = [
  { props: 'version', name: '版本号', key: 'LK_BANBENHAO', tooltip: true ,minWidth:15},
  { props: 'tpId', name: '信息流水单号', key: 'LK_XINXILIUSHUIDANHAO', tooltip: true },
  { props: 'maintainerId', name: '维护人', key: 'LK_WEIHUREN', tooltip: true },
  { props: 'publishDate', name: '推送时间', key: 'LK_TUISONGSHIJIAN', tooltip: true },
  { props: 'versionStatus', name: '版本状态', key: 'LK_BANBENZHUANGTAI', tooltip: true }
]

export const volumeTableTitle = [
  { props: 'cartypeCategory', name: '车型大类', key: 'LK_CHEXINGDALEI', tooltip: true },
  { props: 'engineType', name: '发动机类型', key: 'LK_FADONGJILEIXING', tooltip: true },
  { props: 'batteryCapacity', name: '电池容量', key: 'LK_DIANCHIRONGLIANG', tooltip: true },
  { props: 'gearType', name: '变速箱类型', key: 'LK_BIANSUXIANGLEIXING', tooltip: true },
  { props: 'cartypeLevel', name: '车型等级', key: 'LK_CHEXINGDENGJI', tooltip: true },
  { props: 'otherInfo', name: '其他信息', key: 'LK_QITAXINXI', tooltip: true },
  { props: 'perCarDosage', name: '每车用量', key: 'LK_MEICHEYONGLIANG', tooltip: true }
]

export const volumeDialogTableTitle = [
  { props: 'cartypeCategory', name: '车型大类', key: 'LK_CHEXINGDALEI', tooltip: true },
  { props: 'engineType', name: '发动机类型', key: 'LK_FADONGJILEIXING', tooltip: true },
  { props: 'batteryCapacity', name: '电池容量', key: 'LK_DIANCHIRONGLIANG', tooltip: true },
  { props: 'gearType', name: '变速箱类型', key: 'LK_BIANSUXIANGLEIXING', tooltip: true },
  { props: 'cartypeLevel', name: '车型等级', key: 'LK_CHEXINGDENGJI', tooltip: true },
  { props: 'otherInfo', name: '其他信息', key: 'LK_QITAXINXI', tooltip: true },
  { props: 'perCarDosage', name: '每车用量', key: 'LK_MEICHEYONGLIANG', tooltip: true }
]

export const logTableTitle = [
  { props: 'a', name: '操作', key: 'LK_CAOZUO' },
  { props: 'b', name: '发生时间', key: 'LK_FASHENGSHIJIAN' },
  { props: 'c', name: '操作人', key: 'LK_CAOZUOREN' },
  { props: 'd', name: '备注', key: 'LK_BEIZHU' }
]

export const enquiryUnconfirmedTableTitle = [
	{ props: 'version', name: '版本号', key: 'LK_BANBENHAO', tooltip: true ,minWidth:15},
  { props: 'tpId', name: '信息流水单号', key: 'LK_XINXILIUSHUIDANHAO', tooltip: true },
  { props: 'uploadBy', name: '上传人', key: 'LK_SHANGCHUANREN', tooltip: true },
  { props: 'createDate', name: '上传日期', key: 'LK_SHANGCHUANRIQI', tooltip: true },
  { props: 'versionStatus', name: '版本状态', key: 'LK_BANBENZHUANGTAI', tooltip: true }
]