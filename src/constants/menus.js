const menuTooling = [
  {
    title: '模具投资',
    url: '/tooling'
  },
  {
    title: '模具采购',
    url: '/purchase'
  },
  {
    title: '模具采购（供应商）',
    url: '/purchaseSupplier'
  },
  {
    title: '品类管理助手',
    url: '/sourcing/categoryManagementAssistant/internalDemandAnalysis'
  },
]

const menuPortal = [
  {
    title: '审批中心',
    url: '/bpm/approval/center'
  },
  {
    title: '组织树',
    url: '/org/chart'
  },
  {
    title: '组织管理',
    url: '/org/list',
    subMenus: [
      {
        ittle: '创建组织',
        url: '/org/create/0/createOrg/0/0',
        hidden: true
      }
    ]
  },
  {
    title: '角色管理',
    url: '/role/index'
  },
  {
    title: '员工管理',
    url: '/authorityMgmt/index'
  },
  {
    title: '人员管理',
    url: '/users',
    hidden: true
  },
  {
    title: '审批代理',
    url: '/approval/agent?type=normal'
  },
  {
    title: '岗位代理',
    url: '/position/agent'
  },
  {
    title: '轮岗申请',
    url: '/position/transfer'
  },
  {
    title: '岗位列表',
    url: '/position/list'
  },
  {
    title: '任务中心',
    url: '/task/center'
  },
  {
    title: '审批模板',
    url: '/bpm/template'
  },
  {
    title: '文件管理',
    url: '/files',
    hidden: true
  },
  {
    title: '供应商用户管理',
    url: '/provider/userMgm/list'
  },
  {
    title: '供应商系统管理',
    url: '/provider/sysMgm/list'
  },
  {
    title: '供应商授权管理',
    url: '/provider/authMgm/list'
  }
]

const menuApplication = [
  {
    title: '项目管理',
    url: ''
  },
  {
    title: '模具投资',
    url: 'http://10.122.17.38/sourcing/#/tooling/budgetManagement/carTypeOverview',
    target: '_blank'
  },
  {
    title: '寻源定点',
    url: ''
  },
  {
    title: '送样',
    url: ''
  },
  {
    title: '谈判',
    url: '/sourcing/partsrfq/externalNegotiationAssistant'
  },
  {
    title: 'AEKO技术变更',
    url: ''
  },
  {
    title: '零件价格与订单',
    url: 'http://10.122.17.38/order/index.html#/priceOrder',
    target: '_blank'
  },
  {
    title: '模具采购',
    url: ''
  },
  {
    title: '供应商管理',
    url: '/portal/supplier/supplierList'
  },
  {
    title: '总成散件管理',
    url: ''
  },
  {
    title: '需求产能管理',
    url: ''
  },
  {
    title: '财务风险管理',
    url: '/portal/supplier/frmrating/depthRating'
  },
  {
    title: '采购业绩',
    url: ''
  },
  {
    title: '原材料价格补差',
    url: ''
  },
  {
    title: '0公里索赔',
    url: ''
  },
  {
    title: '零件对外销售',
    url: ''
  }
]

const sprint12 = [
  {
    title: '供应商绩效',
    url: '/supplier/kpi'
  },
]
export default [
  {
    icon: 'iconhomeweixuanzhong',
    activeIcon: 'iconhomexuanzhong',
    title: '',
    key: 'first',
    url: '/tooling',
    subMenus: menuTooling
  },
  {
    icon: 'iconworkbenchweixuanzhong',
    activeIcon: 'iconworkbenchxuanzhong',
    title: '',
    key: 'tow',
    url: '/supplier',
    // subMenus: menuApplication
    subMenus: sprint12
  },
  {
    icon: 'iconcommonfunctionweixuanzhong',
    activeIcon: 'iconcommonfunctionxuanzhong',
    title: '',
    key: 'three',
    url: '/bpm',
    // subMenus: menuPortal
  }
]
