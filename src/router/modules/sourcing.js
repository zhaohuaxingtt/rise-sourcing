/*
 * @Author: your name
 * @Date: 2021-08-26 19:56:52
 * @LastEditTime: 2021-12-23 18:35:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\router\modules\sourcing.js
 */
export default [
    {
    path: "sourcing",
    name: "询源执行",
    meta: {
        title:'询源执行',
        activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
            ]
        },
    component: () => import("@/layout/default-white"),
    redirect: "SOURCEINQUIRYPOINT/sourcing/partsign",
    children: [
            // 定点信相关路由
            {
            path: "partsletter",
            name: "partsletter",
            meta: {
                title:'寻源与定点-定点信',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import ("@/views/letterAndLoi")
            },
            {
            path: "partsletter/loi",
            name: "loi",
            meta: {
                title:'寻源与定点-LOI',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import ("@/views/letterAndLoi/loi")
            },
            {
            path: "partsletter/letterdetail",
            name: "letterdetail",
            meta: {
                title:'寻源与定点-定点信详情',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import ("@/views/letterAndLoi/letter/detail")
            },
            {
            path: "partsletter/loidetail",
            name: "loidetail",
            meta: {
                title:'寻源与定点-LOi详情',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import ("@/views/letterAndLoi/loi/detail")
            },
            {
          path: "previewloi",
          name: "previewLoi",
          meta: {
            title:'预览LOI',
            activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
          component: () => import ("@/views/letterAndLoi/previewLoi")
            },
            // 报价详情相关路由
            {
            path: "supplier/quotationdetail",
            name: "quotationDetail",
            meta: {
                title:'代供应商报价详情',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/supplier/quotationdetail")
            },
            {
            path: "partsign/importfiles",
            name: "importFiles",
            meta: {
                title:'附件导入',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/designateFiles/importFiles"),
            },
            {
            path: "importfiles/detaillist",
            name: "filesDetailList",
            meta: {
                title:'附件导入详情',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/designateFiles/importFiles/detail"),
            },
            {
            path: "partsign/filemanage",
            name: "fileManage",
            meta: { title: "附件综合管理", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/designateFiles/fileManage/index"),
            },
            // 配件相关路由
            {
            path: "partsign/signforpartsdemand",
            name: "signForPartsDemand",
            meta: { title: "配件需求签收", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/accessoryPart/signForPartsDemand/index"),
            },
            {
            path: "partsign/integratedmanage",
            name: "integratedManage",
            meta: { title: "配件综合管理", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/accessoryPart/integratedManage/index"),
            },
            {
            path: "accessorypartdetail",
            name: "配件详情",
            meta: { title: "配件详情", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/accessoryPart/accessoryPartDetail/index"),
            },
            // 报价详情相关路由
            {
            path: "supplier/quotationdetail",
            name: "报价详情",
            meta: {
                title:'报价详情',
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => 
                import ("@/views/supplier/quotationdetail")
            },
            {
            path: "createrfq",
            name: "配附件创建RFQ",
            meta: { title: "配附件创建RFQ", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/accessoryPart/createRfq/index"),
            },
            //竞价开标
            {
            path: "partsrfq/biddingProjectList",  
            name:'biddingProjectList',
            meta: {
                title: "竞价开标",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => 
                import ("@/views/biddingProjectList"),
            },
            {
          path: "partsign",
          name: "partsign",
          meta: {
              title: "寻源与定点-批量件签收",
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
          component: () =>
              import ("@/views/partsign/home"),
            },
            {
            path: "partsign/editordetail",
            name: "editordetail",
            meta: {
                title: "寻源与定点-新建信息单详情",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsign/editordetail"),
            },
            {
            path: "partsign/preview",
            name: "editordetailPreview",
            meta: {
                isPreview: true,
                title: "寻源与定点-新建信息单预览",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsign/editordetail"),
            },
            {
            path: "partsign/volumeVersion",
            name: "volumeVersion",
            meta: {
                title: "寻源与定点-新建信息单每车用量版本",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsign/version/volume"),
            },
            {
            path: "partsign/enquiryVersion",
            name: "enquiryVersion",
            meta: {
                title: "寻源与定点-新建信息单询价资料版本",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsign/version/enquiry"),
            },
            {
            path: "partsprocure",
            name: "partsprocure",
            meta: {
                title: "寻源与定点-采购项目",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsprocure/home"),
            },
            {
            path: "partsprocure/editordetail",
            name: "partsprocure",
            meta: {
                title: "寻源与定点-采购项目详情",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsprocure/editordetail"),
            },
            {
            path: "partsprocure/editordetail/priceRecord",
            name: "partsprocure",
            meta: {
                title: "寻源与定点-价格记录",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsprocure/editordetail/components/currentSupplier/priceRecord"),
            },
            {
            path: "partsprocure/batchmiantain",
            name: "batchmiantain",
            meta: {
                title: "寻源与定点-采购项目批量修改",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsprocure/batchmiantain"),
            },
            {
            path: "partsprocure/outputplan",
            name: "outputplan",
            meta: {
                title: "寻源与定点-采购项目计划",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsprocure/outputplan"),
            },
            {
            path: "partsrfq",
            name: "partsrfq",
            meta: {
                title: "寻源与定点-RFQ管理",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsrfq/home"),
            },
            {
            path: "partsrfq/editordetail", //RFQ详情待办
            name: "editordetail",
            meta: {
                title: "寻源与定点-RFQ详情待办",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsrfq/editordetail"),
            },
            {
            path: "partsrfq/editorInfo", //RFQ详情
            name: "editordetail",
            meta: {
                title: "寻源与定点-RFQ详情",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsrfq/editordetailInfo"),
            },
            {
            path: "partsrfq/assistant", //RFQ谈判助手
            name: "editordetail",
            meta: {
                title: "寻源与定点-RFQ详情谈判助手",
                parentId: "/SOURCEINQUIRYPOINT/SOURCING", //指定需要挂载的ID
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                // import ("@/views/partsrfq/assistant"),
                import ("@/views/partsrfq/editordetail"),
            },
            {
            path: "partsrfq/editordetail/partScoring", //零件评分
            name: "editordetailPartScoring",
            meta: {
                title: "寻源与定点-RFQ零件评分",
                activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () =>
                import ("@/views/partsrfq/editordetail/components/rfqPending/components/supplierScore/components/partScoring"),
            },
            {
            path: "createparts/home",
            name: "createPartsHome",
            meta: { title: "寻源与定点-手工采购项目创建", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/partsprocure/createparts/components/home"),
            },
            {
            path: "createparts/steelbatchpurchase",
            name: "createPartsSteelBatchPurchase",
            meta: { title: "寻源与定点-钢材批量采购", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/partsprocure/createparts/components/steelbatchpurchase"),
            },
            {
            path: "createparts/steelsinglepurchase",
            name: "createPartsSteelSinglePurchase",
            meta: { title: "寻源与定点-钢材一次性采购", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/partsprocure/createparts/components/steelsinglepurchase"),
            },
            {
            path: "createparts/factoryrelocate",
            name: "createPartsFactoryRelocate",
            meta: { title: "寻源与定点-工厂迁移", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/partsprocure/createparts/components/factoryrelocate"),
            },
            {
            path: "createparts/batchDetail",
            name: "createPartsBatchDetail",
            meta: { title: "寻源与定点-批次详情", activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'
                    ]
                },
            component: () => import("@/views/partsprocure/createparts/components/factoryrelocate/components/detail"),
            }
        ]
    }
]