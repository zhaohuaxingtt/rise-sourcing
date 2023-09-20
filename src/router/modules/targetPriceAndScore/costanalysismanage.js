/*
 * @Author: your name
 * @Date: 2021-05-27 12:00:48
 * @LastEditTime: 2022-02-11 11:20:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\router\modules\targetPriceAndScore\costanalysismanage.js
 */
export default [
  {
    path: 'costanalysismanage',
    meta: {
      title: '成本分析管理',
      activeMenu: ['RISE_WORKBENCH', 'COSTANALYSISMANAGE'],
    },
    component: () => import('@/views/routerView'),
    redirect: 'costanalysismanage/home',
    children: [
      {
        path: 'home',
        name: 'costAnalysisManageHome',
        meta: {
          title: '成本分析管理-成本分析',
        },
        component: () => import('@/views/costanalysismanage/components/home'),
      },
      {
        path: 'rfqdetail',
        name: 'costAnalysisManageRfqDetail',
        meta: {
          title: '成本分析管理-RFQ详情',
          permissionKey: 'FINANCIALMANAGE_COSTANALYSISMANAGE_RFQDETAIL'
        },
        component: () =>
          import('@/views/costanalysismanage/components/rfqdetail'),
      },
      {
        path: 'costanalysis',
        name: 'costAnalysisManageCostAnalysis',
        meta: {
          title: '成本分析管理-成本分析',
          permissionKey: 'FINANCIALMANAGE_COSTANALYSISMANAGE_COSTANALYSIS'
        },
        component: () =>
          import('@/views/costanalysismanage/components/costanalysis'),
      },
    ],
  },
  {
    path: 'datamaintenance',
    name: 'dataMaintenance',
    meta: {
      title: '数据维护',
      activeMenu: ['RISE_WORKBENCH', 'COSTANALYSISMANAGE'],
    },
    component: () =>
      import('@/views/costanalysismanage/components/datamaintenance'),
    redirect: 'datamaintenance/costDataMaintenance',
    children: [
      {
        path: 'costMaintenance',
        name: 'laborCostMaintenance',
        meta: {
          title: '基础数据维护-人工成本维护',
        },
        component: () =>
          import(
            '@/views/costanalysismanage/components/datamaintenance/components/costMaintenance'
          ),
      },
      {
        path: 'costDataMaintenance',
        name: 'laborCostDataMaintenance',
        meta: {
          title: '基础数据维护-人工成本数据维护',
        },
        component: () =>
          import(
            '@/views/costanalysismanage/components/datamaintenance/components/costDataMaintenance'
          ),
      },
    ],
  },
]
