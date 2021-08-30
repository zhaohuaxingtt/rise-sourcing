/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-08-30 11:34:43
 * @LastEditors: Please set LastEditors
 * @Description: 系统静态路由.
 * @FilePath: \front-web\src\router\index.js
 *
 */
/* eslint-disable no-undef */

// 引入modules
// 定点管理
import designateRoutes from './modules/designate'
import createpartsRoutes from './modules/createparts'
import costanalysismanageRoutes from './modules/costanalysismanage'
import supplierscoreRoutes from './modules/supplierscore'
import financialtargetpriceRoutes from './modules/financialtargetprice'
import negotiationAssistant from './modules/negotiationAssistant'
import aekoRoutes from './modules/aeko'
import projectRoutes from './modules/project'
import reportmanage from './modules/reportmanage'
import sourceInquirypoint from './modules/sourceInquirypoint'
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export const staticRouter = [{
    path: "/",
    name: "index",
    component: () =>
        import ("@/layout/default"),
    redirect: "/sourceinquirypoint/sourcing/partsign",
    children: [
        {
        path: "/index",
        name: "home",
        meta: {
            title: "首页",
        },
        component: () =>
            import ("@/views/home"),
        },
        {
            path: "/report",
            name: "report",
            meta: {
                title: "报表",
            },
            component: () =>
                import ("@/views/report"),
        },
        {
            path: "/taskcenter",
            name: "taskcenter",
            component: () =>
                import ("@/views/taskcenter/home"),
        },
        {
            path: "/log",
            name: "log",
            component: () =>
                import ("@/views/log/home"),
        },
        /** work stream 2 组织/用户权限 */
        {
            path: '/tooling/modelDetails',
            name: 'toolingModelDetails',
            meta: {
                title: '车型项目详情'
            },
            component: () => import (`@/views/ws2/baApply/details`),
        },
            {
                path: '/tooling',
                name: 'tooling',
                meta: {
                    title: '模具'
                },
                component: () => import (`@/views/ws2`),
                children: [
                    {
                        path: '/',
                        redirect: 'budgetManagement/carTypeOverview',
                    },
                    //  付款计划制定与查看
                    {
                        path: '/tooling/investmentAdmin',
                        redirect: '/tooling/investmentAdmin/payBlock',
                    },
                    {
                        path: '/tooling/investmentAdmin/payBlock',
                        name: 'investmentAdminPayBlock',
                        meta: {
                            title: '付款看板'
                        },
                        component: () => import (`@/views/ws2/investmentAdmin/payBlock`),
                    },
                    {
                        path: '/tooling/investmentAdmin/yearlyPlan',
                        name: 'investmentAdminYearlyPlan',
                        meta: {
                            title: '年度计划'
                        },
                        component: () => import (`@/views/ws2/investmentAdmin/yearlyPlan`),
                    },
                    {
                        path: '/tooling/investmentAdmin/monthlyPlan',
                        name: 'investmentAdminMonthlyPlan',
                        meta: {
                            title: '月度计划'
                        },
                        component: () => import (`@/views/ws2/investmentAdmin/monthlyPlan`),
                    },
                    // 预算管理
                    {
                        path: '/tooling/budgetManagement',
                        redirect: 'budgetManagement/carTypeOverview',
                    },
                    {
                        path: '/tooling/budgetManagement/carTypeOverview',
                        name: 'carTypeOverview',
                        meta: {
                            title: '生成投资清单'
                        },
                        component: () => import (`@/views/ws2/budgetManagement/carTypeOverview`),
                    },
                    {
                        path: '/tooling/budgetManagement/generateInvestmentList',
                        name: 'generateInvestmentList',
                        meta: {
                            title: '生成投资清单'
                        },
                        component: () => import (`@/views/ws2/budgetManagement/generateInvestmentList`),
                    },
                    {
                        path: '/tooling/budgetManagement/investmentListJV',
                        name: 'investmentListJV',
                        meta: {
                            title: '投资清单JV'
                        },
                        component: () => import (`@/views/ws2/budgetManagement/investmentListJV`),
                    },
                    {
                        path: '/tooling/budgetManagement/investmentListCommon',
                        name: 'investmentListCommon',
                        meta: {
                            title: '投资清单Common'
                        },
                        component: () => import (`@/views/ws2/budgetManagement/investmentListCommon`),
                    },
                    {
                        path: '/tooling/budgetManagement/commonSourcing',
                        name: 'commonSourcing',
                        meta: {
                            title: 'commonSourcing'
                        },
                        component: () => import (`@/views/ws2/budgetManagement/commonSourcing/index`),
                    },
                    {
                        path: '/tooling/baApplyIndex',
                        name: 'baApplyIndex',
                        meta: {
                            title: 'BA申请'
                        },
                        component: () => import (`@/views/ws2/baApply`),
                    },
                    {
                        path: '/tooling/baApprovalIndex',
                        name: 'baApprovalIndex',
                        meta: {
                            title: 'BA审批'
                        },
                        component: () => import (`@/views/ws2/baApproval`),
                    },
                    //历史数据库
                    {
                        path: '/tooling/dataBase',
                        name: 'dataBase',
                        meta: {
                            title: '历史数据库'
                        },
                        component: () => import (`@/views/ws2/dataBase`),
                    },
                    //预算审批
                    {
                        path: '/tooling/budgetApproval',
                        name: 'budgetApproval',
                        meta: {
                            title: '预算审批'
                        },
                        component: () => import (`@/views/ws2/budgetApproval`),
                    },
                    {
                        path: '/tooling/bmApplyIndex',
                        name: 'bmApplyIndex',
                        meta: {
                            title: 'BM申请'
                        },
                        component: () => import (`@/views/ws2/bmApply`),
                    },
                    {
                        path: '/tooling/carTypeProOverview',
                        name: 'carTypeProOverview',
                        meta: {
                            title: '车型项目概览'
                        },
                        component: () => import (`@/views/ws2/investmentReport`),
                    },
                    {
                        path: '/tooling/investmentReport',
                        name: 'investmentReport',
                        meta: {
                            title: '投资报告'
                        },
                        component: () => import (`@/views/ws2/investmentReport`),
                    },
                ]
            },
            {
                path: "/ws3-register",
                name: "/ws3Register",
                component: () =>
                    import ("@/views/ws3/register"),
            },
            // workStream1 -------------------------------------- //
            {
                path: "/partsfp/automaticallyassignde", //管理员看到的，手动分配配件任务。
                name: "/ws3Register",
                component: () =>
                    import ("@/views/AutomaticallyAssignDe"),
            },
            {
                path: "/configscoredept",
                name: "configscoredept",
                meta: { title: "配置评分部门" },
                component: () => import("@/views/configscoredept"),
            },
            {
                path: '/tooling/budgetManagement/addModelBag',
                name: 'addModelBag',
                meta: {
                    title: 'addModelBag'
                },
                component: () => import (`@/views/ws2/budgetManagement/commonSourcing/addModelBag`),
            },
        {
            path: '/tooling/dataBase',
            name: 'dataBase',
            meta: {
                title: '价格与订单-备货表'
            },
            component: () =>
                import (`@/views/ws2/dataBase`)
        },
        {
            path: '/ws2/budgetManagement/generateInvestmentList',
            name: 'stocksheetGenerateInvestmentList',
            meta: {
                title: '模具-材料组清单'
            },
            component: () =>
                import (`@/views/ws2/budgetManagement/generateInvestmentList`)
        },
        {
            path: '/ws2/budgetManagement/investmentListCommon',
            name: 'investmentListCommon',
            meta: {
                title: '模具-投资清单'
            },
            component: () =>
                import (`@/views/ws2/budgetManagement/investmentListCommon`)
        },
        {
            path: "/ws3-register",
            name: "/ws3Register",
            component: () =>
                import ("@/views/ws3/register"),
        },
        // workStream1 -------------------------------------- //
        {
            path: "/partsfp/automaticallyassignde", //管理员看到的，手动分配配件任务。
            name: "/ws3Register",
            component: () =>
                import ("@/views/AutomaticallyAssignDe"),
        }
    ],
},
    {
        path: "/ui",
        name: "ui",
        meta: {
            title: "公用组件管理",
        },
        component: () =>
            import ("@/views/ui"),
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
        },
        component: () =>
            import ("@/views/login"),
    },
    {
        path: '*',
        name: '404',
        meta: {
            title: '404'
        },
        component: () =>
            import (`@/views/404`)
    }
]

// eslint-disable-next-line no-undef
export default new VueRouter({
    routes: [
        ...staticRouter,
        ...designateRoutes,
        ...createpartsRoutes,
        ...costanalysismanageRoutes,
        ...supplierscoreRoutes,
        ...financialtargetpriceRoutes,
        //谈判助手
        ...negotiationAssistant,
        ...aekoRoutes,
        //项目管理
        ...projectRoutes,
        // 报表管理
        ...reportmanage,
        // 询源与定点
        ...sourceInquirypoint
    ]
});
