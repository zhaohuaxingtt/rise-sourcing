/*
 * @Author: moxuan
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2022-04-02 12:53:03
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\home\components\data.js
 */
import { permissionTitle } from '@/utils'
export const tableTitle = [
// export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
    { props: 'id', name: 'RFQ编号', key: 'RFQBIANHAO', tooltip: true, width:110, sortable: true, fixed: true },
    { props: 'rfqName', name: 'RFQ名称', key: 'RFQMINGCHENG', tooltip: true, width: 280, sortable: true, fixed: true },
    { props: 'rfqType', name: 'RFQ类型', key: 'RFQLEIXING', tooltip: true, width: 110, sortable: true, },
    // { props: 'carType', name: '车型项目', key: 'CHEXINGXIANGMU', tooltip: true, width: 280 },
    { props: 'createDate', name: '创建日期', key: 'CHUANGJIANRIQI', tooltip: true, width:115, sortable: true, },
    { props: 'currentRounds', name: '当前轮次', key: 'DANGQIANLUNCI', tooltip: true, width: 105, sortable: true, },
    { props: 'suppliers', name: '已报价/已询价供应商', key: 'YIBAOJIA_YIXUNJIA_GONGYINGSHANG', tooltip: true,width:190, sortable: true, },
    // { props: 'quotations', name: '已报价供应商', key: 'YIBAOJIAGONGYINGSHANG', tooltip: true,width:100 },
    { props: 'currentStatus', name: 'RFQ状态', key: 'RFQZHUANGTAI', tooltip: true, width:105, sortable: true, },
    { props: 'currentRoundsEndTime', name: '报价截至日期', key: 'BAOJIAJIEZHIRIQI', tooltip: true, width:135, sortable: true,},
    { props: 'buyerName', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', tooltip: true, width:120, sortable: true, },
    { props: 'linieNameZh', name: 'LINIE', key: 'LINIE', tooltip: true,width:85, sortable: true, },
    { props: 'tpGradeStatus', name: '技术评分状态', key: 'JISHUPINGFENZHUANGTAI', tooltip: true, width: 135, sortable: true, },
    { props: 'mqGradeStatus', name: '质量评分状态', key: 'ZHILIANGPINGFENZHUANGTAI', tooltip: true, width: 135, sortable: true, },
    { props: 'targetGradeStatus', name: '财务目标价状态', key: 'CAIWUMUBIAOJIAZHUANGTAI', tooltip: true, width: 150, sortable: true, },
    { props: 'heavyItem', name: 'Heavy Item', key: 'HEAVYITEM', tooltip: true, width: 125, sortable: true, },
    { props: 'kmAnalysis', name: '分析报告', key: 'FENXIBAOGAO', tooltip: true, width: 105, sortable: true, },
    { props: 'recordId', name: '', key: '', tooltip: true, sortable: true, },
]
// )

export const assignmentOfScroingTasksTableTitle = [
    { props: 'deptNum', name: '部门编号', key: 'LK_BUMENBIANHAO' },
    { props: 'deptType', name: '部门评分类型', key: 'LK_BUMENPINGFENLEIXING' },
    { props: 'graderId', name: '评分人', key: 'LK_PINGFENREN' },
]

export const attachmentTableTitle = [
    { props: 'fileName', name: '文件名称', key: 'WENJIANMINGCHENG' }
]
export const maintainSupplierTitle = [
    // { props: 'fsnrGsnrNum', name: '零件采购项目号', key: 'FSGSSPNO', tooltip: true },
    // { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
    // { props: 'procureFactoryName', name: '采购工厂', key: 'CAIGOUGONGCHANG', tooltip: true },
    { props: 'supplierNameZh', name: '供应商', key: 'SUPPLIER', tooltip: true },
    // { props: 'e', name: '工厂地址', key: 'GONGCHANGDIZHI', tooltip: true },
]
export const noStarMonitorTable = [
    { props: 'fsnrGsnrNum', name: '零件采购项目号', key: 'FSGSSPNO', tooltip: true },
    { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
    { props: 'procureFactoryName', name: '采购工厂', key: 'CAIGOUGONGCHANG', tooltip: true },
]
export const noBnkTable = [
    { props: 'fsnrGsnrNum', name: '零件采购项目号', key: 'FSGSSPNO', tooltip: true },
    { props: 'partNumb', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
    { props: 'procureFactoryName', name: '采购工厂', key: 'CAIGOUGONGCHANG', tooltip: true },
    { props: 'supplierName', name: '供应商', key: 'SUPPLIER', tooltip: true },
]

export const partsprocureNavList = [
	{
		value: 1,
		name: "RFQ管理",
		message: 0,
		url: "/sourceinquirypoint/sourcing/partsrfq",
		activePath: "partsrfq",
		key: "LK_RFQGUANLI",
		permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSRFQ',
		permissionName: '寻源执行-RFQ管理'
	},
    {
      value: 2,
      name: "竞价开标",
      message: 0,
      url: "/sourceinquirypoint/sourcing/partsrfq/biddingProjectList",
      activePath: "biddingProjectList",
      key: "LK_JINGJIAKAIBIAO",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_BIDDINGPROJECTLIST',
      permissionName: '寻源执行-竞价开标'
    },
]