/*
 * @Author: your name
 * @Date: 2021-08-26 19:56:52
 * @LastEditTime: 2021-10-21 15:16:51
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\router\modules\sourcing.js
 */
export default [
  {
    path: "sourcing",
    name: "询源执行",
    meta:{
        title:'询源执行'
    },
    component: () => import("@/layout/default-white"),
    redirect: "/sourceinquirypoint/sourcing/partsign",
    children:[
        // 定点信相关路由
        {
            path: "partsletter",
            name: "partsletter",
            meta:{
                title:'定点信'
            },
            component: () => import ("@/views/letterAndLoi")
        },
        {
            path: "partsletter/letterdetail",
            name: "letterdetail",
            meta:{
                title:'定点信详情'
            },
            component: () => import ("@/views/letterAndLoi/letter/detail")
        },
        {
            path: "partsletter/loidetail",
            name: "loidetail",
            meta:{
                title:'LOi详情'
            },
            component: () => import ("@/views/letterAndLoi/loi/detail")
        },
        {
          path: "previewloi",
          name: "previewLoi",
          meta:{
            title:'预览LOI'
        },
          component: () => import ("@/views/letterAndLoi/previewLoi")
        },
        // 报价详情相关路由
        {
            path: "supplier/quotationdetail",
            name: "quotationDetail",
            meta:{
                title:'代供应商报价详情'
            },
            component: () =>
                import ("@/views/supplier/quotationdetail")
        },
        {
            path: "importfiles",
            name: "importFiles",
            meta:{
                title:'附件导入'
            },
            component: () =>
                import ("@/views/designateFiles/importFiles"),
        },
        {
            path: "importfiles/detaillist",
            name: "filesDetailList",
            meta:{
                title:'附件导入详情'
            },
            component: () =>
                import ("@/views/designateFiles/importFiles/detail"),
        } ,
        {
            path: "filemanage",
            name: "fileManage",
            meta: { title: "附件综合管理" },
            component: () => import("@/views/designateFiles/fileManage/index"),
        },   
        // 配件相关路由
        {
            path: "signforpartsdemand",
            name: "signForPartsDemand",
            meta: { title: "配件需求签收" },
            component: () => import("@/views/accessoryPart/signForPartsDemand/index"),
        },
        {
            path: "integratedmanage",
            name: "integratedManage",
            meta: { title: "配件综合管理" },
            component: () => import("@/views/accessoryPart/integratedManage/index"),
        },
        {
            path: "accessorypartdetail",
            name: "配件详情",
            meta: { title: "配件详情" },
            component: () => import("@/views/accessoryPart/accessoryPartDetail/index"),
        },
        // 报价详情相关路由
        {
            path: "supplier/quotationdetail",
            name: "报价详情",
            meta:{
                title:'报价详情'
            },
            component: () => 
                import ("@/views/supplier/quotationdetail")
        },
        {
            path: "createrfq",
            name: "创建RFQ",
            meta: { title: "创建RFQ" },
            component: () => import("@/views/accessoryPart/createRfq/index"),
        },
        {
          path: "partsign",
          name: "partsign",
          meta: {
              title: "新建信息单",
          },
          component: () =>
              import ("@/views/partsign/home"),
        },
        {
            path: "partsign/editordetail",
            name: "editordetail",
            meta: {
                title: "新建信息单详情",
            },
            component: () =>
                import ("@/views/partsign/editordetail"),
        },
        {
            path: "partsign/preview",
            name: "editordetailPreview",
            meta: {
                isPreview: true,
                title: "新建信息单预览",
            },
            component: () =>
                import ("@/views/partsign/editordetail"),
        },
        {
            path: "partsign/volumeVersion",
            name: "volumeVersion",
            meta: {
                title: "新建信息单每车用量版本",
            },
            component: () =>
                import ("@/views/partsign/version/volume"),
        },
        {
            path: "partsign/enquiryVersion",
            name: "enquiryVersion",
            meta: {
                title: "新建信息单询价资料版本",
            },
            component: () =>
                import ("@/views/partsign/version/enquiry"),
        },
        {
            path: "partsprocure",
            name: "partsprocure",
            meta: {
                title: "采购项目",
            },
            component: () =>
                import ("@/views/partsprocure/home"),
        },
        {
            path: "partsprocure/editordetail",
            name: "partsprocure",
            meta: {
                title: "采购项目详情",
            },
            component: () =>
                import ("@/views/partsprocure/editordetail"),
        },
        {
            path: "partsprocure/batchmiantain",
            name: "batchmiantain",
            meta: {
                title: "采购项目批量修改",
            },
            component: () =>
                import ("@/views/partsprocure/batchmiantain"),
        },
        {
            path: "partsprocure/outputplan",
            name: "outputplan",
            meta: {
                title: "采购项目计划",
            },
            component: () =>
                import ("@/views/partsprocure/outputplan"),
        },
        {
            path: "partsrfq",
            name: "partsrfq",
            meta: {
                title: "RFQ管理",
            },
            component: () =>
                import ("@/views/partsrfq/home"),
        },
        {
            path: "partsrfq/editordetail", //RFQ详情待办
            name: "editordetail",
            meta: {
                title: "RFQ详情待办",
            },
            component: () =>
                import ("@/views/partsrfq/editordetail"),
        },
        {
            path: "partsrfq/editorInfo", //RFQ详情
            name: "editordetail",
            meta: {
                title: "RFQ详情",
            },
            component: () =>
                import ("@/views/partsrfq/editordetailInfo"),
        },
        {
            path: "partsrfq/assistant", //RFQ谈判助手
            name: "editordetail",
            meta: {
                title: "谈判助手",
            },
            component: () =>
                import ("@/views/partsrfq/assistant"),
        },
        {
            path: "partsrfq/editordetail/partScoring", //零件评分
            name: "editordetailPartScoring",
            meta: {
                title: "RFQ零件评分",
            },
            component: () =>
                import ("@/views/partsrfq/editordetail/components/rfqPending/components/supplierScore/components/partScoring"),
        }
      ]
    }
]