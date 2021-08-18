/*
 * @Author: your name
 * @Date: 2021-02-25 10:10:50
 * @LastEditTime: 2021-08-17 17:18:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\data.js
 */
import {partProjTypes} from '@/config'
//零件采购详情数据
export const detailData = {
	bmg: "", //Boolean
	buyerName: "", //询价采购员（即前期采购员）
	cartypeCategory: "", //车型大类
	carTypeProjectNum: "", //	车型项目编号
	carTypeProjectZh: "", //	 车型项目
	categoryCode: "", //	 材料组编号
	cfController: "", //	integer($int64) CF控制员
	isCommonSourcing: "", //	
	cs1MeetMemo: "", //	 cs1上会备注
	linieId:'', //linie ID
	cs1Memo: "", //	 cs*1备注
	csfMeetMemo: "", //	 csf上会备注
	csfMemo: "", //	 csf备注
	currency: "", //	货币
	fsnrGsnrNum: "", //	FSNR/GSNR号 FSNR/GSNR
	linieDept: "", //	Linie部门
	linieMeetMemo: "", //	linie上会备注
	linieMemo: "", //	linie备注
	linieName: "", //	Linie名称
	modelNameZh: "", //车型
	mtzPart: false, //是否MTZ零件
	partNameDe: "", //零件德文名
	partNameZh: "", //零件中文名
	partNum: "", //零件号
	partProjectType: "", //零件项目类型
	partStatus: "", //	零件状态
	payTerms: "", //	付款条款
	procureFactory: "", //采购工厂
	purchaseNum: "", // 采购条数
	purchaseProjectId: "", //	采购项目ID
	purchasingRequirementId: "", //采购申请ID
	quickSavings: "", //	string
	rfqId: "", //RFQid
	signDate: "", //签收时间)
	sopDate: "", //SOP时间
	unit: "", //单位
	heavyItem: "", // heavyItem
	partCostUserId: "", // 零件成本分析员Id
	partCostUserName: "", // 零件成本分析员名称
	mouldCostUserId: "", // 模具成本分析员Id
	mouldCostUserName: "", // 模具成本分析员名称
	isDB: 0,// 是否DB件
	oldFsnrGsnrNum:'' //老零件号
}
// 采购项目拆分表头
export const splitPurchTitle = [
	{
		name: '采购工厂名称',
		props: "factoryName",
		key: 'LK_CAIGOUGONGCHNEGMINGCHENG'
	},
	{
		name: '产量占比（%）',
		props: "share",
		key: 'LK_CHANLIANGZHANBI'
	}
]

//维护fs 和 gs对应的commonSourcing 枚举
export const partsCommonSourcing = [
	{
		fs:partProjTypes.FSXIAOLINGJIAN,
		common:partProjTypes.FSCOMMONSOURCING
	},
	{
		fs:partProjTypes.GSLINGJIAN,
		common:partProjTypes.GSCOMMONSOURCING
	}
]

export function translateDataForService(data){
	const newMap = {}
	Object.keys(JSON.parse(JSON.stringify(data))).forEach(e=>{
		newMap['old'+(e.charAt(0).toUpperCase() + e.slice(1))] = data[e]
	})
	return newMap
}
