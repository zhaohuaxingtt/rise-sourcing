/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2022-01-26 19:35:59
 * @LastEditors: Please set LastEditors
 * @Description: 系统静态路由.
 * @FilePath: \front-sourcing\src\router\index.js
 *
 */
/* eslint-disable no-undef */

// 引入modules
// 定点管理
import designateRoutes from './modules/designate'
import createpartsRoutes from './modules/createparts'
import negotiationAssistant from './modules/negotiationAssistant'
import aekoRoutes from './modules/aeko'
import projectRoutes from './modules/project'
import deliverRoutes from './modules/deliver'
import supplierkpiRoutes from './modules/supplierkpi'
import categoryManagementAssistant from './modules/categoryManagementAssistant'
import mek from './modules/mek'
import ws2 from './modules/ws2'
import reportmanage from './modules/reportmanage'
import sourceInquirypoint from './modules/sourceInquirypoint'
import biddingRouter from './modules/biddingManage'
import targetPriceAndScoreRoutes from './modules/targetPriceAndScore'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
export const staticRouter = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/layout/default'),
		redirect: '/sourcing/dashboard',
		children: [
			{
				path: '/index',
				name: 'home',
				meta: {
					title: '首页',
				},
				component: () => import('@/views/home'),
			},
			{
				path: '/report',
				name: 'report',
				meta: {
					title: '报表',
				},
				component: () => import('@/views/report'),
			},
			{
				path: '/taskcenter',
				name: 'taskcenter',
				component: () => import('@/views/taskcenter/home'),
			},
			{
				path: '/log',
				name: 'log',
				component: () => import('@/views/log/home'),
			},
			/** work stream 2 组织/用户权限 */
			{
				path: '/tooling/modelDetails',
				name: 'toolingModelDetails',
				meta: {
					title: '车型项目详情',
					permissionKey: 'TOOLSMANAGE_FINDKEY_MODELDETAILS'
				},
				component: () => import(`@/views/ws2/baApply/details`),
			},
			{
				path: '/tooling',
				name: 'tooling',
				meta: {
					title: '模具投资',
				},
				component: () => import(`@/views/ws2`),
				redirect: '/tooling/budgetManagement',
				children: [
					// {
					// 	path: '/',
					// },
					//  付款计划制定与查看
					{
						path: '/tooling/investmentAdmin',
						redirect: '/tooling/investmentAdmin/payBlock',
					},
					{
						path: '/tooling/investmentAdmin/payBlock',
						name: 'investmentAdminPayBlock',
						meta: {
							title: '模具投资-付款计划制定与查看-付款看板',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
							permissionKey: '/TOOLING/INVESTMENTADMIN/PAYBLOCK',
							navKey: 'toolingNavList'
						},
						component: () => import(`@/views/ws2/investmentAdmin/payBlock`),
					},
					{
						path: '/tooling/investmentAdmin/yearlyPlan',
						name: 'investmentAdminYearlyPlan',
						meta: {
							title: '模具投资-付款计划制定与查看-年度计划',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
							permissionKey: 'TOOLING_PAYMENTPLAN_YEAR',
							navKey: 'toolingNavList'
						},
						component: () => import(`@/views/ws2/investmentAdmin/yearlyPlan`),
					},
					{
						path: '/tooling/investmentAdmin/monthlyPlan',
						name: 'investmentAdminMonthlyPlan',
						meta: {
							title: '模具投资-付款计划制定与查看-月度计划',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
							permissionKey: '/TOOLING/INVESTMENTADMIN/MONTHLYPLAN',
							navKey: 'toolingNavList'
						},
						component: () => import(`@/views/ws2/investmentAdmin/monthlyPlan`),
					},
					// 预算管理
					{
						path: '/tooling/budgetManagement',
						redirect: 'budgetManagement/carTypeOverview',
						meta: {
							permissionKey: 'TOOLING_INVEST_YUSUANGUANLI',
							navKey: 'toolingNavList'
						},
					},
					{
						path: '/tooling/budgetManagement/carTypeOverview',
						name: 'carTypeOverview',
						meta: {
							title: '模具投资-预算管理-车型项目',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
							permissionKey: 'TOOLING_BUDGET_OVERVIEW',
							navKey: 'toolingNavList'
						},
						component: () =>
							import(`@/views/ws2/budgetManagement/carTypeOverview`),
					},
					{
						path: '/tooling/budgetManagement/generateInvestmentList',
						name: 'generateInvestmentList',
						meta: {
							title: '模具投资-预算管理-生成投资清单',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () =>
							import(`@/views/ws2/budgetManagement/generateInvestmentList`),
					},
					{
						path: '/tooling/budgetManagement/investmentListJV',
						name: 'investmentListJV',
						meta: {
							title: '模具投资-预算管理-投资清单JV',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () =>
							import(`@/views/ws2/budgetManagement/investmentListJV`),
					},
					{
						path: '/tooling/budgetManagement/investmentListCommon',
						name: 'investmentListCommon',
						meta: {
							title: '模具投资-预算管理-投资清单Common',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () =>
							import(`@/views/ws2/budgetManagement/investmentListCommon`),
					},
					{
						path: '/tooling/budgetManagement/commonSourcing',
						name: 'commonSourcing',
						meta: {
							title: '模具投资-预算管理-commonSourcing',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
							permissionKey: 'TOOLSMANAGE_FINDKEY_BUDGETMANAGEMENT_COMMONSOURCING',
							navKey: 'toolingNavList'
						},
						component: () =>
							import(`@/views/ws2/budgetManagement/commonSourcing/index`),
					},
					{
						path: '/tooling/baApplyIndex',
						name: 'baApplyIndex',
						meta: {
							title: '模具投资-BA申请',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/baApply`),
					},
					{
						path: '/tooling/baApprovalIndex',
						name: 'baApprovalIndex',
						meta: {
							title: '模具投资-BA审批',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/baApproval`),
					},
					//历史数据库
					{
						path: '/tooling/dataBase',
						name: 'dataBase',
						meta: {
							title: '模具投资-历史数据库',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/dataBase`),
					},
					//预算审批
					{
						path: '/tooling/budgetApproval',
						name: 'budgetApproval',
						meta: {
							title: '模具投资-预算审批',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/budgetApproval`),
					},
					{
						path: '/tooling/bmApplyIndex',
						name: 'bmApplyIndex',
						meta: {
							title: '模具投资-BM申请',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/bmApply`),
					},
					{
						path: '/tooling/carTypeProOverview',
						name: 'carTypeProOverview',
						meta: {
							title: '模具投资-车型项目概览',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/investmentReport`),
					},
					{
						path: '/tooling/investmentReport',
						name: 'investmentReport',
						meta: {
							title: '模具投资-投资报告',
							activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY']
						},
						component: () => import(`@/views/ws2/investmentReport`),
					},
				],
			},
			{
        path: '/tooling/investmentReport/rsDetails',
        name: 'investmentReportRsDetails',
        meta: {
			title: '模具投资-RS单号详情',
			activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
			permissionKey: 'TOOLSMANAGE_FINDKEY_INVESTMENTREPORT_RSDETAILS'
        },
        component: () => import (`@/views/ws2/rsDetails`),
      },
			{
				path: '/ws3-register',
				name: '/ws3Register',
				component: () => import('@/views/ws3/register'),
			},
			// workStream1 -------------------------------------- //
			{
				path: '/partsfp/automaticallyassignde', //管理员看到的，手动分配配件任务。
				name: '/ws3Register',
				meta: {
					title: '配件自动分配科室',
				},
				component: () => import('@/views/AutomaticallyAssignDe'),
			},
			{
				path: '/tooling/budgetManagement/addModelBag',
				name: 'addModelBag',
				meta: {
					title: 'addModelBag',
					activeMenu: ['RISE_WORKBENCH', 'TOOLSMANAGE_FINDKEY'],
					permissionKey: 'TOOLSMANAGE_FINDKEY_BUDGETMANAGEMENT_ADDMODELBAG'
				},
				component: () =>
					import(`@/views/ws2/budgetManagement/commonSourcing/addModelBag`),
			},
			{
				path: '/tooling/dataBase',
				name: 'dataBase',
				meta: {
					title: '价格与订单-备货表',
				},
				component: () => import(`@/views/ws2/dataBase`),
			},
			{
				path: '/ws2/budgetManagement/generateInvestmentList',
				name: 'stocksheetGenerateInvestmentList',
				meta: {
					title: '模具-材料组清单',
					permissionKey: 'TOOLSMANAGE_FINDKEY_BUDGETMANAGEMENT_GENERATEINVESTMENTLIST'
				},
				component: () =>
					import(`@/views/ws2/budgetManagement/generateInvestmentList`),
			},
			{
				path: '/ws2/budgetManagement/investmentListCommon',
				name: 'investmentListCommon',
				meta: {
					title: '模具-投资清单',
					permissionKey: 'TOOLSMANAGE_FINDKEY_BUDGETMANAGEMENT_INVESTMENTLISTCOMMON'
				},
				component: () =>
					import(`@/views/ws2/budgetManagement/investmentListCommon`),
			},
			{
				path: '/ws3-register',
				name: '/ws3Register',
				component: () => import('@/views/ws3/register'),
			},
			// workStream1 -------------------------------------- //
			{
				path: '/partsfp/automaticallyassignde', //管理员看到的，手动分配配件任务。
				name: '/ws3Register',
				meta: {
					title: '配件自动分配科室',
				},
				component: () => import('@/views/AutomaticallyAssignDe'),
			},
			{	
				// 暂时放在souring下 后面会移动到portal
				path: '/demo/partsconfig',
				name: 'partsconfig',
				meta: {
					title: '零件采购项目类型配置',
				},
				component: () => import('@/views/demo/partsItemConfig'),
			},
		],
	},
	{
		path: '/ui',
		name: 'ui',
		meta: {
			title: '公用组件管理',
		},
		component: () => import('@/views/ui'),
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
		},
		component: () => import('@/views/login'),
	},
	{
		path: '/superLogin',
		name: 'superlogin',
		meta: {
			title: '登录',
		},
		component: () => import('@/views/login'),
	},
	{
			path:'/sourceinquirypoint/sourcing/previewfssugs',
			name:'谈判助手-预览界面',
			meta:{
					title:'谈判助手-预览界面',
					activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
			},
			component:()=> import("@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz/preview.vue")
	},
	{
		path: '/sourceinquirypoint/designate/decisiondata/exportPdf',
		name: '决策资料导出PDF',
		meta: {
			title: '决策资料导出PDF'
		},
		component: () => import('@/views/designate/designatedetail/decisionData/exportPdf/index.vue')
	},
	{
		path: '*',
		name: '404',
		meta: {
			title: '404',
		},
		component: () => import(`@/views/404`),
	},
]

// eslint-disable-next-line no-undef
const router = new VueRouter({
	routes: [
		...staticRouter,
		...designateRoutes,
		...createpartsRoutes,
		//谈判助手
		...negotiationAssistant,
		...aekoRoutes,
		//项目管理
		...projectRoutes,
		//送样管理
		...deliverRoutes,
		//品类管理助手
		...categoryManagementAssistant,
		//ws2
		...ws2,
		//MEK
		...mek,
		...supplierkpiRoutes,
		// 报表管理
		...reportmanage,
		// 询源于定点
		...sourceInquirypoint,
		// bidding 相关
		...biddingRouter,
		...targetPriceAndScoreRoutes,
	],
})

router.afterEach(() => {
	// Remove initial loading
	const appLoading = document.getElementById('app-loading')
	if (appLoading) {
		appLoading.style.display = 'none'
	}
})
export default router
