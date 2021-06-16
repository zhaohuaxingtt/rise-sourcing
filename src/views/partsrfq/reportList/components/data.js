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
   { props: 'version', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
   { props: 'tpId', name: '分析工具类型', key: 'TPZS.FXGJLX', tooltip: true },
   { props: 'maintainerId', name: '材料组', key: 'LK_CAILIAOZU', tooltip: true },
   { props: 'publishDate', name: 'RFQ', key: 'TPZS.RFQ', tooltip: true },
   { props: 'versionStatus', name: '默认项', key: 'TPZS.MRX', tooltip: true },
   { props: 'versionStatus', name: '文件类型', key: 'TPZS.WJLX', tooltip: true },
   { props: 'versionStatus', name: '创建人', key: 'TPZS.CJR', tooltip: true },
   { props: 'versionStatus', name: '创建日期', key: 'LK_CHUANGJIANRIQI', tooltip: true },
   { props: 'versionStatus', name: '上次修改日期', key: 'TPZS.SCXGRQ', tooltip: true },
]

// 报价分析
export const quotationAnalysisTitle = [
   { props: 'version', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
   { props: 'tpId', name: 'RFQ', key: 'TPZS.RFQ', tooltip: true },
]

// 谈判基本信息
export const negotiationBasicTitle = [
   { props: 'version', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
   { props: 'tpId', name: 'RFQ', key: 'TPZS.RFQ', tooltip: true },
]