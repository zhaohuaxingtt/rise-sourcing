// 搜索
export const search=[
	{props: 'headcount', name: '报告名称', type: 'input',key:'TPZS.BGMC'},
	{props: 'managerNumber', name: '分析工具类型', type: 'select',select:'EMPLOYEE_GENDER',key:'TPZS.FXGJLX'},
	{props: 'developerNumber', name: '材料组', type: 'input',key:'LK_CAILIAOZU'},
	{props: 'productionNumber', name: '零件号', type: 'input',key:'LK_LINGJIANHAO'},
	{props: 'isSetTradeUnion', name: 'RFQ号/名称', type: 'input', key:'TPZS.RFQHMC'},
]

// 专项分析工具
export const specialToolsTitle = [
   { props: 'version', name: '版本号', key: 'LK_BANBENHAO', tooltip: true },
   { props: 'tpId', name: '信息流水单号', key: 'LK_XINXILIUSHUIDANHAO', tooltip: true },
   { props: 'maintainerId', name: '维护人', key: 'LK_WEIHUREN', tooltip: true },
   { props: 'publishDate', name: '推送时间', key: 'LK_TUISONGSHIJIAN', tooltip: true },
   { props: 'versionStatus', name: '版本状态', key: 'LK_BANBENZHUANGTAI', tooltip: true }
]

// 报价分析
export const quotationAnalysisTitle = [
   { props: 'version', name: '报告名称', key: 'LK_BANBENHAO', tooltip: true },
   { props: 'tpId', name: 'RFQ', key: 'LK_XINXILIUSHUIDANHAO', tooltip: true },
]

// 谈判基本信息
export const negotiationBasicTitle = [
   { props: 'version', name: '报告名称', key: 'LK_BANBENHAO', tooltip: true },
   { props: 'tpId', name: 'RFQ', key: 'LK_XINXILIUSHUIDANHAO', tooltip: true },
]