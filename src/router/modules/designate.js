/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2023-04-26 17:52:03
 * @LastEditors: 余继鹏 917955345@qq.com
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
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'TITLE'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/title'),
  },
  {
    path: 'partlist',
    name: 'designateDecisionDataPartList',
    meta: {
      title: '定点管理-决策资料-Part List',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'PARTLIST'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/partList'),
  },
  {
    path: 'singlesourcing',
    name: 'designateDecisionDataSingleSourcing',
    meta: {
      title: '定点管理-决策资料-Single Sourcing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SINGLESOURCING'
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
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'TIMELINE'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/timeLine'),
  },
  {
    path: 'bdl',
    name: 'designateDecisionDataBDL',
    meta: {
      title: '定点管理-决策资料-BDL',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'BDL'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/bdl'),
  },
  {
    path: 'drawing',
    name: 'designateDecisionDrawing',
    meta: {
      title: '定点管理-决策资料-drawing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'DRAWING'
    },
    component: () =>
      import('@/views/designate/designatedetail/drawing'),
  },
  {
    path: 'mtz',
    name: 'designateDecisionDataMTZ',
    meta: {
      title: '定点管理-决策资料-MTZ',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'MTZ'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/mtz'),
  },
  {
    path: 'attachment',
    name: 'designateDecisionAttachment',
    meta: {
      title: '定点管理-决策资料-attachment',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'ATTACHMENT'
    },
    component: () =>
      import('@/views/designate/designatedetail/attachment'),
  },
  {
    path: 'tasks',
    name: 'designateDecisionTasks',
    meta: {
      title: '定点管理-决策资料-tasks',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'TASKS'
    },
    component: () => import('@/views/designate/designatedetail/tasks'),
  },
  {
    path: 'awardingscenario',
    name: 'designateDecisionAwardingscenario',
    meta: {
      title: '定点管理-决策资料-awardingscenario',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'AWARDINGSCENARIO'
    },
    component: () =>
      import('@/views/designate/designatedetail/awardingscenario'),
  },
  {
    path: 'rs',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-RS',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'RS'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/rs/home'),
  },
  {
    path: 'rscapacityexpan',
    name: 'designateDecisionRSexpan',
    meta: {
      title: '定点管理-决策资料-扩产能',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'RSCAPACITYEXPAN'
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
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'ABPRICE'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/abPrice'),
  },
  {
    path: 'costanalysis',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-costanalysis',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'COSTANALYSIS'
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
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'STRATEGY'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/strategy'),
  },
]


const nominationpages_copy = [
  {
    path: 'title',
    name: 'designateDecisionData',
    meta: {
      title: '定点管理-决策资料-title',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_TITLE'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/title'),
  },
  {
    path: 'partlist',
    name: 'designateDecisionDataPartList',
    meta: {

      title: '定点管理-决策资料-Part List',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_PARTLIST'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/partList'),
  },
  {
    path: 'singlesourcing',
    name: 'designateDecisionDataSingleSourcing',
    meta: {
      title: '定点管理-决策资料-Single Sourcing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_SINGLESOURCING'
    },
    component: () =>
      import(
        '@/views/designate/designatedetail/previewCSC/singleSourcing'
      ),
  },
  {
    path: 'timeline',
    name: 'designateDecisionDataTimeLine',
    meta: {
      title: '定点管理-决策资料-Time Line',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_TIMELINE'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/timeLine'),
  },
  {
    path: 'bdl',
    name: 'designateDecisionDataBDL',
    meta: {
      title: '定点管理-决策资料-BDL',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_BDL'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/bdl'),
  },
  {
    path: 'drawing',
    name: 'designateDecisionDrawing',
    meta: {
      title: '定点管理-决策资料-drawing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_DRAWING'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/drawing'),
  },
  {
    path: 'mtz',
    name: 'designateDecisionDataMTZ',
    meta: {
      title: '定点管理-决策资料-MTZ',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_MTZ'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/mtz'),
  },
  {
    path: 'attachment',
    name: 'designateDecisionAttachment',
    meta: {
      title: '定点管理-决策资料-attachment',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_ATTACHMENT'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/attachment'),
  },
  {
    path: 'tasks',
    name: 'designateDecisionTasks',
    meta: {
      title: '定点管理-决策资料-tasks',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_TASKS'
    },
    component: () => import('@/views/designate/designatedetail/previewCSC/tasks'),
  },
  {
    path: 'awardingscenario',
    name: 'designateDecisionAwardingscenario',
    meta: {
      title: '定点管理-决策资料-awardingscenario',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_AWARDINGSCENARIO'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/awardingscenario'),
  },
  {
    path: 'rs',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-RS',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_RS'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/rs/home'),
  },
  {
    path: 'rscapacityexpan',
    name: 'designateDecisionRSexpan',
    meta: {
      title: '定点管理-决策资料-扩产能',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_RSCAPACITYEXPAN'
    },
    component: () =>
      import(
        '@/views/designate/designatedetail/previewCSC/rsCapacityExpan'
      ),
  },
  {
    path: 'abprice',
    name: 'designateDecisionAbPrice',
    meta: {
      title: '定点管理-决策资料-abprice',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_ABPRICE'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/abPrice'),
  },
  {
    path: 'costanalysis',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-costanalysis',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_COSTANALYSIS'
    },
    component: () =>
      import(
        '@/views/designate/designatedetail/previewCSC/costanalysis'
      ),
  },
  {
    path: 'strategy',
    name: 'designateDecisionRS',
    meta: {
      title: '定点管理-决策资料-strategy',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_PREVIEWCSC_STRATEGY'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/strategy'),
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
          title: '定点管理-定点申请',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home'),
      },
      {
        path: '/sourcing/partsnomination/rsreview',
        name: 'designateRsReview',
        meta: {
          title: '定点管理-上会RS单复核',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/rsReview'),
      },
      {
        path: '/sourcing/partsnomination/rsreview/details',
        name: 'designateRsreviewDetails',
        meta: {
          title: '定点管理-上会RS单复核详情',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_RSREVIEW_DETAILS'
        },
        component: () => import('@/views/designate/home/rsReview/details'),
      },
      {
        path: '/sourcing/partsnomination/record',
        name: 'designateRecord',
        meta: {
          title: '定点管理-定点记录综合管理',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/record'),
      },
      {
        path: '/sourcing/partsnomination/record/detail',
        name: 'designateRecordDetails',
        meta: {
          title: '定点管理-定点记录详情',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_RECORD_DETAILS'
        },
        component: () => import('@/views/designate/home/record/detail'),
      },
      {
        path: '/sourcing/partsnomination/signSheet',
        name: 'designateSignSheet',
        meta: {
          title: '定点管理-签字单列表',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_SIGNSHEET'
        },
        component: () => import('@/views/designate/home/signSheet'),
      },
      {
        path: '/sourcing/partsnomination/signSheetBox',
        name: 'designateSignSheetBox',
        meta: {
          title: '定点管理-签字单列表',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
        },
        component: () => import('@/views/designate/home/signSheet/box'),
      },
      {
        path: '/sourcing/partsnomination/signSheet/addSignOverView',
        name: 'addSignOverView',
        meta: {
          title: '定点管理-签字单导航',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_DETAILS_TITLE'
        },
        component: () => import('@/views/designate/home/signSheet/components/headerNav/index'),
        children: [
          {
            path: 'details',
            name: 'designateNewSignSheet',
            meta: {
              title: '定点管理-M签字单-新建签字单',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
              permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_DETAILS'
            },
            component: () => import('@/views/designate/home/signSheet/details'),
          },
        ],
      },
      {
        path: '/sourcing/partsnomination/signSheet/approve',
        name: 'designateApprove',
        meta: {
          title: 'M签字单-审批页面',
        },
        component: () => import('@/views/designate/home/signSheet/approve/index.vue'),
      },
      {
        path: '/sourcing/designate/rfqdetail/addRfq',
        name: 'designateAddRfq',
        meta: {
          title: '定点管理-RFQ零件清单-新增RFQ',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_PARTSNOMINATION_ADDRFQ'
        },
        component: () => import('@/views/designate/designatedetail/addRfq'),
      },
      {
        path: '/sourcing/designate/rsSingleMaintenance',
        name: 'rsSingleMaintenance',
        meta: {
          title: '定点管理-RS单维护',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_PARTSNOMINATION_RSMAINTAIN'
        },
        component: () =>
          import('@/views/designate/designatedetail/rsSingleMaintenance'),
      },
      {
        path: '/sourcing/designate/defaultLogic',
        name: 'defaultLogic',
        meta: {
          title: '定点申请预设逻辑',
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_PARTSNOMINATION_DEFAULTLOGIC'
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
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
              permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_PARTSNOMINATION_DETAILS'
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
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
              permissionKey: 'SOURCEINQUIRYPOINT_DESIGNATE_SUPPLIER'
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
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
              permissionKey: 'SOURCEINQUIRYPOINT_DESIGNATE_SUGGESTION'
            },
            component: () => import('@/views/designate/suggestion/index'),
          },
          {
            path: '/designate/rfqdetail',
            name: 'designateRfqdetail',
            meta: {
              hideTabLV3: true,
              title: '定点管理-RFQ零件清单',
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
              permissionKey: 'SOURCEINQUIRYPOINT_DESIGNATE_RFQDETAIL'
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
              activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
              permissionKey: 'SOURCEINQUIRYPOINT_DESIGNATE_APPROVALPERSONRECORD'
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
          // 拼接权限资源点
          route.meta.permissionKey = 'SOURCEINQUIRYPOINT_DESIGNATE_DECISIONDATA_' + route.meta.permissionKey
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
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey:'SOURCEINQUIRYPOINT_DESIGNATE_DESIGNATESUGGESTION'
    },
    component: () => import('@/views/designate/suggestion/index'),
  },
  {
    path: '/designate/designateCirculateRS',
    name: 'designateSuggestion',
    meta: {
      title: '定点管理-rs流转',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_DESIGNATE_DESIGNATECIRCULATERS'
    },
    component: () =>
      import('@/views/designate/designatedetail/previewCSC/rs/preview'),
  },
  {
    path: '/designate/designateCirculateSingleSourcing',
    name: 'designateSuggestion',
    meta: {
      title: '定点管理-singleSourcing',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_DESIGNATE_DESIGNATECIRCULATESINGLESOURCING'
    },
    component: () =>
      import('@/views/designate/designatedetail/decisionData/singleSourcing/preview'),
  },
  {
    path: '/sourcing/partsnomination/signSheet/preview',
    name: 'designateSignSheetPreview',
    meta: {
      title: '签字单预览下载',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_PARTSNOMINATION_SIGNSHEET_PREVIEW'
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
          activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT'],
          permissionKey: 'SOURCEINQUIRYPOINT_RSPREVIEW_VIEW'
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
        // 拼接权限资源点
        route.meta.permissionKey = 'SOURCEINQUIRYPOINT_DESINATEPREVIEW_' + route.meta.permissionKey
      }
      return route
    })
  },
  {
    path: '/previewCSC',
    name: 'previewCSC',
    meta: {
      title: 'CSC预览',
      layoutPath: '/previewCSC',
      activeMenu: ['RISE_WORKBENCH', 'SOURCEINQUIRYPOINT']
    },
    component: () => import('@/views/designate/designatedetail/previewCSC/index'),
    redirect: '/previewCSC/partlist',
    children: cloneDeep(nominationpages_copy).map((route, index) => {
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
  {
    path: '/sourcing/partsnomination/signSheet/approve/details',
    name: 'designateApprove',
    meta: {
      title: 'M签字单-审批详情页面',
    },
    component: () => import('@/views/designate/home/signSheet/approve/details.vue'),
  },
]
