/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-12-08 09:55:48
 * @LastEditors: Luoshuang
 * @Description: 定点管理
 * @metaParams: hideTabLV3 隐藏三级导航
 *
 */
import { cloneDeep } from 'lodash'
// 抽取定点申请 - 决策资料所有页面，兼容预览，不含公共layout
const nominationpages = [
  {
    path: 'title',
    name: 'designateDecisionData',
    meta: {
      title: '定点管理-决策资料-title',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/title'),
  },
  {
    path: 'partlist',
    name: 'designateDecisionDataPartList',
    meta: {
      title: '定点管理-决策资料-Part List',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/partList'),
  },
  {
    path: 'singlesourcing',
    name: 'designateDecisionDataSingleSourcing',
    meta: {
      title: '定点管理-决策资料-Single Sourcing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import(
        '@/views/designate/designatedetail/decisionData/singleSourcing'
      ),
  },
  {
    path: 'timeline',
    name: 'designateDecisionDataTimeLine',
    meta: {
      title: '定点管理-决策资料-Time Line',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/timeLine'),
  },
  {
    path: 'bdl',
    name: 'designateDecisionDataBDL',
    meta: {
      title: '定点管理-决策资料-BDL',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/bdl'),
  },
  {
    path: 'drawing',
    name: 'designateDecisionDrawing',
    meta: {
      title: '定点管理-决策资料-drawing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/drawing'),
  },
  {
    path: 'mtz',
    name: 'designateDecisionDataMTZ',
    meta: {
      title: '定点管理-决策资料-MTZ',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/mtz'),
  },
  {
    path: 'attachment',
    name: 'designateDecisionAttachment',
    meta: {
      title: '定点管理-决策资料-attachment',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/attachment'),
  },
  {
    path: 'tasks',
    name: 'designateDecisionTasks',
    meta: {
      title: '定点管理-决策资料-tasks',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/views/designate/designatedetail/tasks'),
  },
  {
    path: 'awardingscenario',
    name: 'designateDecisionAwardingscenario',
    meta: {
      title: '定点管理-决策资料-awardingscenario',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/awardingscenario'),
  },
  {
    path: 'rs',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-RS',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/rs/home'),
  },
  {
    path: 'rscapacityexpan',
    name: 'designateDecisionRSexpan',
    meta: {
      title: '定点管理-决策资料-扩产能',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import(
        '@/views/designate/designatedetail/decisionData/rsCapacityExpan'
      ),
  },
  {
    path: 'abprice',
    name: 'designateDecisionAbPrice',
    meta: {
      title: '定点管理-决策资料-abprice',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/abPrice'),
  },
  {
    path: 'costanalysis',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-costanalysis',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import(
        '@/views/designate/designatedetail/decisionData/costanalysis'
      ),
  },
  {
    path: 'strategy',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-strategy',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/strategy'),
  },
]

export default [
  {
    path: '/designate',
    name: 'designate',
    meta: {
      title: '定点管理',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/layout/default'),
    redirect: '/designate/rfq',
    children: [
      {
        path: '/sourcing/partsnomination',
        name: 'designateHome',
        meta: {
          title: '定点申请综合管理',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home'),
      },
      {
        path: '/sourcing/partsnomination/rsreview',
        name: 'designateRsReview',
        meta: {
          title: '上会RS单复核',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/rsReview'),
      },
      {
        path: '/sourcing/partsnomination/rsreview/details',
        name: 'designateRsreviewDetails',
        meta: {
          title: '上会RS单复核详情',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/rsReview/details'),
      },
      {
        path: '/sourcing/partsnomination/record',
        name: 'designateRecord',
        meta: {
          title: '定点记录综合管理',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/record'),
      },
      {
        path: '/sourcing/partsnomination/record/detail',
        name: 'designateRecordDetails',
        meta: {
          title: '定点记录详情',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/record/detail'),
      },
      {
        path: '/sourcing/partsnomination/signSheet',
        name: 'designateSignSheet',
        meta: {
          title: '签字单列表',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/signSheet'),
      },
      {
        path: '/sourcing/partsnomination/signSheetBox',
        name: 'designateSignSheetBox',
        meta: {
          title: '签字单列表',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/signSheet/box'),
      },
      {
        path: '/sourcing/partsnomination/signSheet/addSignOverView',
        name: 'addSignOverView',
        meta: {
          title: '签字单导航',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/signSheet/components/headerNav/index'),
        // redirect: '/sourcing/partsnomination/signSheet/addSignOverView/details',
        children: [
          {
            path: 'details',
            name: 'designateNewSignSheet',
            meta: {
              title: '新建签字单',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import('@/views/designate/home/signSheet/details'),
          },
          // {
          //   path: 'mtzDetails',
          //   name: 'mtzDesignateNewSignSheet',
          //   meta: {
          //     title: 'MTZ定点申请单',
          //     activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
          //   },
          //   component: () =>
          //     import('@/views/designate/home/signSheet/mtzDetails/index.vue'),
          // },
        ],
      },
      {
        path: '/sourcing/designate/rfqdetail/addRfq',
        name: 'designateAddRfq',
        meta: {
          title: '定点管理-RFQ零件清单-新增RFQ',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/designatedetail/addRfq'),
      },
      {
        path: '/sourcing/designate/rsSingleMaintenance',
        name: 'rsSingleMaintenance',
        meta: {
          title: '定点管理-RS单维护',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () =>
          import('@/views/designate/designatedetail/rsSingleMaintenance'),
      },
      {
        path: '/sourcing/designate/defaultLogic',
        name: 'defaultLogic',
        meta: {
          title: '定点申请预设逻辑',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/defaultLogic'),
      },
      {
        path: '/designate/rfq',
        name: 'designate-rfq',
        component: () => import('@/layout/nomination/layout'),
        meta: {
          title: '定点申请单详情',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        redirect: '/designate/rfqdetail',
        children: [
          // 定点管理详情
          {
            path: '/designate/details',
            name: 'designateDetails',
            meta: {
              hideTabLV3: true,
              title: '定点管理-定点管理详情',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import('@/views/designate/designatedetail/details/index'),
          },
          // 供应商&单一供应商
          {
            path: '/designate/supplier',
            name: 'designateSupplier',
            meta: {
              hideTabLV3: true,
              title: '定点管理-供应商&单一供应商',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import('@/views/designate/supplier/index'),
          },
          // 定点建议
          {
            path: '/designate/suggestion',
            name: 'designateSuggestion',
            meta: {
              hideTabLV3: true,
              title: '定点管理-定点建议',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () => import('@/views/designate/suggestion/index'),
          },
          {
            path: '/designate/rfqdetail',
            name: 'designateRfqdetail',
            meta: {
              hideTabLV3: true,
              title: '定点管理-RFQ零件清单',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () =>
              import('@/views/designate/designatedetail/rfqdetail'),
          },
          {
            path: '/designate/approvalpersonrecord',
            name: 'approvalPersonAndRecord',
            meta: {
              title: '定点管理-审批人审批记录',
              hideTabLV3: true,
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
            },
            component: () =>
              import('@/views/designate/approvalPersonAndRecord/index'),
          },
        ],
      },
      // 决策资料板块
      {
        path: '/designate/decisiondata',
        name: 'designateDecisionDataPage',
        meta: {
          title: '定点管理-决策资料',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/layout/nomination/layout'),
        redirect: '/designate/decisiondata/title',
        children: cloneDeep(nominationpages).map(route => {
          // 复制路径
          route.meta.path = route.path
          return route
        })
      },
    ],
  },
  {
    path: '/designate/designatesuggestion',
    name: 'designateSuggestion',
    meta: {
      title: '定点管理-定点建议',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/views/designate/suggestion/index'),
  },
  {
    path: '/designate/designateCirculateRS',
    name: 'designateSuggestion',
    meta: {
      title: '定点管理-rs流转',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/rs/preview'),
  },
  {
    path: '/sourcing/partsnomination/signSheet/preview',
    name: 'designateSignSheetPreview',
    meta: {
      title: '签字单预览下载',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/views/designate/home/signSheet/signPreview'),
  },
  // rs预览，不嵌公共layout模板，不支持跳转其他决策资料
  // component: () => import('@/layout/nomination/layout'),
  {
    path: '/rspreview',
    name: 'designateRSPreview',
    meta: {
      title: '定点管理-决策资料-RS预览',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/layout/nomination/layout'),
    redirect: '/rspreview/view',
    children: [
      {
        path: 'view',
        name: 'designateRSPreviewDetail',
        meta: {
          title: '定点管理RS预览',
          hideTabLV3: true,
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/designatedetail/decisionData/rs/home'),
      }
    ]
  },
  // 决策资料预览
  {
    path: '/desinatepreview',
    name: 'designatePreview',
    meta: {
      title: '定点管理-决策资料预览',
      layoutPath: '/desinatepreview',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/layout/nomination/layout'),
    redirect: '/desinatepreview/title',
    children: cloneDeep(nominationpages).map((route, index) => {
      if (route && route.path && route.meta) {
        // 通过此字段判断决策资料预览模式
        route.meta.layoutPath = '/desinatepreview'
        // 隐藏关闭按钮
        route.meta.hideCloseButton = true
        // 复制路径
        route.meta.path = route.path
      }
      return route
    })
  },
]
