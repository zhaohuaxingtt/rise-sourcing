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
			path: 'partsrfq/externalNegotiationAssistant',
			name: 'vpAnalyseDetail',
			component: () => import('../../views/partsrfq/externalAccessToAnalysisTools/negotiationAssistant')
		},
		{
			path: "partsrfq/bob",
			name: "bob",
			meta: {
					title: "BOB",
			},
			component: () =>
					import ("@/views/partsrfq/bob/bob.vue"),
		},
		{
			path: "partsrfq/bobNew",
			name: "bobNew",
			meta: {
					title: "BOBNew",
			},
			component: () =>
					import ("@/views/partsrfq/bob/newReport"),
		},
	]
}]

