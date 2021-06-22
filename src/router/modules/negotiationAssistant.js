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
			path: "partsrfq/vpAnalyCreat",
			name: "vpAnalyCreat",
			component: () =>
				import("@/views/partsrfq/vpAnalyse/vpAnalyCreat/index.vue"),
		},
	]
}]

