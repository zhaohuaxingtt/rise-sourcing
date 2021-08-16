/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-08-15 11:03:21
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
import steeldemandcreation from './modules/steeldemandcreation'
import negotiationAssistant from './modules/negotiationAssistant'
import aekoRoutes from './modules/aeko'
import projectRoutes from './modules/project'
import reportmanage from './modules/reportmanage'

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
    redirect: "/sourcing/partsign",
    children: [{
        path: "/index",
        name: "home",
        meta: {
            title: "首页",
        },
        component: () =>
            import ("@/views/home"),
    },
        {
            path: "/sourcing/partsign",
            name: "partsign",
            meta: {
                title: "新建信息单",
            },
            component: () =>
                import ("@/views/partsign/home"),
        },
        {
            path: "/sourcing/partsign/editordetail",
            name: "editordetail",
            meta: {
                title: "新建信息单详情",
            },
            component: () =>
                import ("@/views/partsign/editordetail"),
        },
        {
            path: "/sourcing/partsign/volumeVersion",
            name: "volumeVersion",
            meta: {
                title: "新建信息单每车用量版本",
            },
            component: () =>
                import ("@/views/partsign/version/volume"),
        },
        {
            path: "/sourcing/partsign/enquiryVersion",
            name: "enquiryVersion",
            meta: {
                title: "新建信息单询价资料版本",
            },
            component: () =>
                import ("@/views/partsign/version/enquiry"),
        },
        {
            path: "/sourcing/partsprocure",
            name: "partsprocure",
            meta: {
                title: "采购项目",
            },
            component: () =>
                import ("@/views/partsprocure/home"),
        },
        {
            path: "/sourcing/partsprocure/editordetail",
            name: "partsprocure",
            meta: {
                title: "采购项目详情",
            },
            component: () =>
                import ("@/views/partsprocure/editordetail"),
        },
        {
            path: "/sourcing/partsprocure/batchmiantain",
            name: "batchmiantain",
            meta: {
                title: "采购项目批量修改",
            },
            component: () =>
                import ("@/views/partsprocure/batchmiantain"),
        },
        {
            path: "/sourcing/partsprocure/outputplan",
            name: "outputplan",
            meta: {
                title: "采购项目计划",
            },
            component: () =>
                import ("@/views/partsprocure/outputplan"),
        },
        {
            path: "/sourcing/partsrfq",
            name: "partsrfq",
            meta: {
                title: "RFQ",
            },
            component: () =>
                import ("@/views/partsrfq/home"),
        },
        {
            path: "/sourcing/partsrfq/editordetail", //RFQ详情待办
            name: "editordetail",
            meta: {
                title: "RFQ详情待办",
            },
            component: () =>
                import ("@/views/partsrfq/editordetail"),
        },
        {
            path: "/sourcing/partsrfq/editorInfo", //RFQ详情
            name: "editordetail",
            meta: {
                title: "RFQ详情",
            },
            component: () =>
                import ("@/views/partsrfq/editordetailInfo"),
        },
        {
            path: "/sourcing/partsrfq/assistant", //RFQ谈判助手
            name: "editordetail",
            meta: {
                title: "谈判助手",
            },
            component: () =>
                import ("@/views/partsrfq/assistant"),
        },
        {
            path: "/sourcing/partsrfq/editordetail/partScoring", //零件评分
            name: "editordetailPartScoring",
            meta: {
                title: "RFQ零件评分",
            },
            component: () =>
                import ("@/views/partsrfq/editordetail/components/rfqPending/components/supplierScore/components/partScoring"),
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
        // {
        //     path: '/tooling/investmentAdmin',
        //     name: 'toolingModelDetails',
        //     redirect: '/tooling/investmentAdmin/payBlock',
        //     meta: {
        //         title: '模具投资付款管理员'
        //     },
        //     component: () => import (`@/views/ws2/investmentAdmin`),
        //     children: [
        //         {
        //             path: '/tooling/investmentAdmin/payBlock',
        //             name: 'investmentAdminPayBlock',
        //             meta: {
        //                 title: '付款看板'
        //             },
        //             component: () => import (`@/views/ws2/investmentAdmin/payBlock`),
        //         },
        //         {
        //             path: '/tooling/investmentAdmin/yearlyPlan',
        //             name: 'investmentAdminYearlyPlan',
        //             meta: {
        //                 title: '年度计划'
        //             },
        //             component: () => import (`@/views/ws2/investmentAdmin/yearlyPlan`),
        //         },
        //         {
        //             path: '/tooling/investmentAdmin/monthlyPlan',
        //             name: 'investmentAdminMonthlyPlan',
        //             meta: {
        //                 title: '月度计划'
        //             },
        //             component: () => import (`@/views/ws2/investmentAdmin/monthlyPlan`),
        //         }
        //     ]
        // },
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
                path: "/sourcing/importfiles",
                name: "importFiles",
                component: () =>
                    import ("@/views/designateFiles/importFiles"),
            },
            {
                path: "/sourcing/importfiles/detaillist",
                name: "filesDetailList",
                component: () =>
                    import ("@/views/designateFiles/importFiles/detail"),
            } ,
            {
                path: "/sourcing/filemanage",
                name: "fileManage",
                meta: { title: "附件综合管理" },
                component: () => import("@/views/designateFiles/fileManage/index"),
            },   
            // 配件相关路由
            {
                path: "/sourcing/signforpartsdemand",
                name: "signForPartsDemand",
                meta: { title: "配件需求签收" },
                component: () => import("@/views/accessoryPart/signForPartsDemand/index"),
            },
            {
                path: "/sourcing/integratedmanage",
                name: "integratedManage",
                meta: { title: "配件综合管理" },
                component: () => import("@/views/accessoryPart/integratedManage/index"),
            },
            {
                path: "/sourcing/accessorypartdetail",
                name: "accessoryPartDetail",
                meta: { title: "配件详情" },
                component: () => import("@/views/accessoryPart/accessoryPartDetail/index"),
            },
            // 报价详情相关路由
            {
                path: "/supplier/quotationdetail",
                name: "quotationDetail",
                component: () => 
                    import ("@/views/supplier/quotationdetail")
            },
            {
                path: "/sourcing/createrfq",
                name: "createRfq",
                meta: { title: "创建RFQ" },
                component: () => import("@/views/accessoryPart/createRfq/index"),
            },
            {
                path: "/configscoredept",
                name: "configscoredept",
                meta: { title: "配置评分部门" },
                component: () => import("@/views/configscoredept"),
            },
            // 定点信相关路由
            {
                path: "/sourcing/partsletter",
                name: "partsletter",
                component: () => import ("@/views/letterAndLoi")
            },
            {
                path: "/sourcing/previewloi",
                name: "previewLoi",
                component: () => import ("@/views/letterAndLoi/previewLoi")
            },
            {
                path: "/sourcing/partsletter/letterdetail",
                name: "letterdetail",
                component: () => import ("@/views/letterAndLoi/letter/detail")
            },
            {
                path: "/sourcing/partsletter/loidetail",
                name: "loidetail",
                component: () => import ("@/views/letterAndLoi/loi/detail")
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
        },
        {
            path: "/sourcing/importfiles",
            name: "importFiles",
            component: () =>
                import ("@/views/designateFiles/importFiles"),
        },
        {
            path: "/sourcing/importfiles/detaillist",
            name: "filesDetailList",
            component: () =>
                import ("@/views/designateFiles/importFiles/detail"),
        } ,
        {
            path: "/sourcing/filemanage",
            name: "fileManage",
            meta: { title: "附件综合管理" },
            component: () => import("@/views/designateFiles/fileManage/index"),
        },
        // 配件相关路由
        {
            path: "/sourcing/signforpartsdemand",
            name: "signForPartsDemand",
            meta: { title: "配件需求签收" },
            component: () => import("@/views/accessoryPart/signForPartsDemand/index"),
        },
        {
            path: "/sourcing/integratedmanage",
            name: "integratedManage",
            meta: { title: "配件综合管理" },
            component: () => import("@/views/accessoryPart/integratedManage/index"),
        },
        {
            path: "/sourcing/accessorypartdetail",
            name: "accessoryPartDetail",
            meta: { title: "配件详情" },
            component: () => import("@/views/accessoryPart/accessoryPartDetail/index"),
        },
        // 报价详情相关路由
        {
            path: "/supplier/quotationdetail",
            name: "quotationDetail",
            component: () =>
                import ("@/views/supplier/quotationdetail")
        },
        {
            path: "/sourcing/createrfq",
            name: "createRfq",
            meta: { title: "创建RFQ" },
            component: () => import("@/views/accessoryPart/createRfq/index"),
        },
        // 定点信相关路由
        {
            path: "/sourcing/partsletter",
            name: "partsletter",
            component: () => import ("@/views/letterAndLoi")
        },
        {
            path: "/sourcing/partsletter/letterdetail",
            name: "letterdetail",
            component: () => import ("@/views/letterAndLoi/letter/detail")
        },
        {
            path: "/sourcing/partsletter/loidetail",
            name: "loidetail",
            component: () => import ("@/views/letterAndLoi/loi/detail")
        },

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
        ...financialtargetpriceRoutes,
        ...steeldemandcreation,
        //谈判助手
        ...negotiationAssistant,
        ...aekoRoutes,
        //项目管理
        ...projectRoutes,
        // 报表管理
        ...reportmanage
    ]
});
