export default [
  {
    // 在线开标
    path: "/bidding/open/:id",
    name: "biddingOpen",
    meta: {
      title: "在线开标",
    },
    component: () => import("@/views/biddingManage/bidding/open/index.vue"),
  },
  {
    // 项目列表
    path: "/bidding/projectlist",
    name: "biddingProjectList",
    meta: {
      title: "项目列表",
    },
    component: () => import("@/views/biddingManage/bidding/projectlist/index.vue"),
  },
  {
    // 采购员-竞价明细
    path: "/bidding/project/detail/:id",
    name: "biddingProjectDetail",
    meta: {
      title: "竞价明细",
      role: "buyer",
    },
    component: () => import("@/views/biddingManage/bidding/detail/index.vue"),
  },
  {
    // 供应商-竞价明细
    path: "/bidding/supplier/detail/:id",
    name: "biddingSupplierDetail",
    meta: {
      title: "竞价明细",
      role: "supplier",
    },
    component: () => import("@/views/biddingManage/bidding/detail/index.vue"),
  },
  {
    // 项目管理
    path: "/bidding/project/:id",
    name: "biddingProject",
    redirect: "/bidding/project/inquiry/:id",
    meta: {
      title: "采购员-项目管理",
      role: "buyer",
    },
    component: () => import("@/views/biddingManage/bidding/project/index.vue"),
    children: [
      {
        // 询价管理
        path: "/bidding/project/inquiry/:id",
        name: "biddingProjectInquiry",
        meta: {
          title: "询价管理",
          role: "buyer",
        },
        component: () =>
          import("@/views/biddingManage/bidding/project/inquiry/index.vue"),
      },
      {
        // 竞价大厅
        path: "/bidding/project/hall/:id",
        name: "biddingProjectHall",
        meta: {
          title: "竞价大厅",
          role: "buyer",
        },
        component: () =>
          import("@/views/biddingManage/bidding/project/hall/index.vue"),
      },
      {
        // 项目结果
        path: "/bidding/project/result/:id",
        name: "biddingProjectResult",
        meta: {
          title: "项目结果",
          role: "buyer",
        },
        component: () =>
          import("@/views/biddingManage/bidding/project/result/index.vue"),
      },
    ],
  },
  {
    // 项目管理
    path: "/bidding/supplier/:id",
    name: "biddingSupplier",
    redirect: "/bidding/supplier/filing/:id",
    meta: {
      title: "供应商-项目管理",
      role: "supplier",
    },
    component: () => import("@/views/biddingManage/bidding/project/index.vue"),
    children: [
      {
        // 建档信息
        path: "/bidding/supplier/filing/:id",
        name: "biddingSupplierFiling",
        meta: {
          title: "建档信息",
          role: "supplier",
        },
        component: () =>
          import("@/views/biddingManage/bidding/project/filing/index.vue"),
      },
      {
        // 竞价大厅
        path: "/bidding/supplier/hall/:id",
        name: "biddingSupplierHall",
        meta: {
          title: "竞价大厅",
          role: "supplier",
        },
        component: () =>
          import("@/views/biddingManage/bidding/project/hall/index.vue"),
      },
      {
        // 项目结果
        path: "/bidding/supplier/result/:id",
        name: "biddingSupplierResult",
        meta: {
          title: "项目结果",
          role: "supplier",
        },
        component: () =>
          import("@/views/biddingManage/bidding/project/result/index.vue"),
      },
    ],
  },
  {
    // 在线/手工竞价 - 英氏/荷氏
    path: "/bidding/competition/:id",
    name: "biddingCompetition",
    redirect: "/bidding/competition/base/:id",
    meta: {
      title: "在线竞价",
    },
    component: () => import("@/views/biddingManage/bidding/competition/index.vue"),
    children: [
      {
        // 基础信息
        path: "/bidding/competition/base/:id",
        name: "biddingCompetitionBase",
        component: () =>
          import("@/views/biddingManage/bidding/competition/base/index.vue"),
      },
      {
        // 项目信息
        path: "/bidding/competition/project/:id",
        name: "biddingCompetitionProject",
        component: () =>
          import("@/views/biddingManage/bidding/competition/project/index.vue"),
      },
      {
        // 报价规则
        path: "/bidding/competition/quotation/:id",
        name: "biddingCompetitionQuotation",
        component: () =>
          import("@/views/biddingManage/bidding/competition/quotation/index.vue"),
      },
    ],
  },
  {
    // 竞标告知书
    path: "/bidding/bidNotice",
    name: "biddingSupplierBidnotice",
    meta: {
      title: "建档信息",
      role: "supplier",
    },
    component: () =>
      import("@/views/biddingManage/bidding/project/filing/components/bidNotice.vue"),
  },

  {
    // 测试-新建RFQ
    path: "/bidding/test/addRFQ",
    name: "biddingTestAddRFQ",
    meta: {
      title: "新建RFQ轮次（测试）",
    },
    component: () => import("@/views/biddingManage/bidding/test/addRFQ.vue"),
  },
  {
    // 测试-新建测试项目
    path: "/bidding/test/addManual/:code",
    name: "biddingTestAddManual",
    meta: {
      title: "新建测试项目（测试）",
    },
    component: () => import("@/views/biddingManage/bidding/test/addManual.vue"),
  },
  {
    // 测试-修改供应商code
    path: "/bidding/test/supplierCode",
    name: "biddingTestSupplierCode",
    meta: {
      title: "修改供应商code（测试）",
    },
    component: () => import("@/views/biddingManage/bidding/test/supplierCode.vue"),
  },
  //系统使用条款
  {
    path: "/bidding/bidNoticeDoc/:id",
    name: "bidNoticeDoc",
    meta: {
      title: "系统使用条款",
    },
    component: () =>
      import(
        "@/views/biddingManage/bidding/project/filing/components/bidNoticeDoc.vue"
      ),
  },
  {
    path: "/bidding/bidNoticeDocTender/:id",
    name: "bidNoticeDocTender",
    meta: {
      title: "开标告知书",
    },
    component: () =>
      import(
        "@/views/biddingManage/bidding/project/filing/components/bidNoticeDoc.vue"
      ),
  },
  {
    path: "/bidding/bidNoticeDocBidding/:id",
    name: "bidNoticeDocBidding",
    meta: {
      title: "竞价告知书",
    },
    component: () =>
      import(
        "@/views/biddingManage/bidding/project/filing/components/bidNoticeDoc.vue"
      ),
  },
];
