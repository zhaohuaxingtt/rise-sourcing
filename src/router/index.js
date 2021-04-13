/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-27 16:49:15
 * @LastEditors: Please set LastEditors
 * @Description: 系统静态路由.
 * @FilePath: \rise\src\router\index.js
 *
 */
/* eslint-disable no-undef */
Vue.use(VueRouter);
export const staticRouter = [{
        path: "/",
        name: "index",
        component: () =>
            import ("@/layout/default"),
        redirect: "/partsign",
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
                path: "/partsign",
                name: "partsign",
                meta: {
                    title: "新建信息单",
                },
                component: () =>
                    import ("@/views/partsign/home"),
            },
            {
                path: "/partsign/editordetail",
                name: "editordetail",
                meta: {
                    title: "新建信息单详情",
                },
                component: () =>
                    import ("@/views/partsign/editordetail"),
            },
            {
                path: "/partsign/volumeVersion",
                name: "volumeVersion",
                meta: {
                    title: "新建信息单每车用量版本",
                },
                component: () =>
                    import ("@/views/partsign/version/volume"),
            },
            {
                path: "/partsign/enquiryVersion",
                name: "enquiryVersion",
                meta: {
                    title: "新建信息单询价资料版本",
                },
                component: () =>
                    import ("@/views/partsign/version/enquiry"),
            },
            {
                path: "/partsprocure",
                name: "partsprocure",
                meta: {
                    title: "采购项目",
                },
                component: () =>
                    import ("@/views/partsprocure/home"),
            },
            {
                path: "/partsprocure/editordetail",
                name: "partsprocure",
                meta: {
                    title: "采购项目详情",
                },
                component: () =>
                    import ("@/views/partsprocure/editordetail"),
            },
            {
                path: "/partsprocure/batchmiantain",
                name: "batchmiantain",
                meta: {
                    title: "采购项目批量修改",
                },
                component: () =>
                    import ("@/views/partsprocure/batchmiantain"),
            },
            {
                path: "/partsprocure/outputplan",
                name: "outputplan",
                meta: {
                    title: "采购项目计划",
                },
                component: () =>
                    import ("@/views/partsprocure/outputplan"),
            },
            {
                path: "/partsrfq",
                name: "partsrfq",
                meta: {
                    title: "RFQ",
                },
                component: () =>
                    import ("@/views/partsrfq/home"),
            },
            {
                path: "/partsrfq/editordetail", //RFQ详情
                name: "editordetail",
                meta: {
                    title: "RFQ详情",
                },
                component: () =>
                    import ("@/views/partsrfq/editordetail"),
            },
            {
                path: "/partsrfq/editordetail/partScoring", //零件评分
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
                path: '/priceorder/check',
                name: 'organizationcheck',
                meta: {
                    title: '组织管理-组织查看'
                },
                component: () =>
                    import (`@/views/priceorder/home`)
            },
            {
                path: '/priceorder/stocksheet',
                name: 'stocksheet',
                meta: {
                    title: '价格与订单-备货表'
                },
                component: () =>
                    import (`@/views/priceorder/stocksheet`)
            },
            {
                path: '/priceorder/postmanagement',
                name: '/postmanagement',
                meta: {
                    title: '岗位管理-岗位管理'
                },
                component: () =>
                    import (`@/views/priceorder/jobmanagement`)
            },
            {
                path: "/ws3-register",
                name: "/ws3Register",
                component: () =>
                    import ("@/views/ws3/register"),
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
    routes: staticRouter
});