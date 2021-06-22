/*
 * @Author: your name
 * @Date: 2021-06-18 11:39:52
 * @LastEditTime: 2021-06-18 15:02:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\negotiationAssistant.js
 */
/*
 * @Author: yourName
 * @Description: 谈判助手
 *
 */

export default [{
	path: "/sourcing",
	name: "sourcingNegotiationAssistant",
	component: () => import("@/layout/default"),
	children: [
		{
			path: 'partsrfq/vpAnalyseDetail',
			name: 'vpAnalyseDetail',
			component: () => import('../../views/partsrfq/vpAnalyse/vpAnalyseDetail')
		},
		{
			path: "partsrfq/reportList",
			name: "reportList",
			meta: {
				title: "报告清单",
			},
			component: () =>
				import("@/views/partsrfq/reportList"),
		},
		{
			path: "partsrfq/bobAnalysis",
			name: "bobAnalysis",
			meta: {
				title: "Bob分析",
			},
			component: () =>
				import("@/views/partsrfq/bobAnalysis"),
		},
	]
}]

