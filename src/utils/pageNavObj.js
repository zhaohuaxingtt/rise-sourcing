/*
*  目前只使用了url和permissionKey两个属性，其余属性为冗余字段
*  如果后期需要优化项目结构，可以统一从这里获取各页面Nav
* */
export const pageNavObj = {
  toolingNavList: [
    // 无对应页面,直接重定向
    // {
    //   value: 1,
    //   message: 0,
    //   name: '预算管理',
    //   activePath: '/tooling/budgetManagement',
    //   url: '/tooling/budgetManagement',
    //   key: 'LK_YUSUANGUANLI',
    //   permissionKey: 'TOOLING_INVEST_YUSUANGUANLI',
    // },
    {
      value: 2,
      message: 0,
      name: '预算审批',
      activePath: '/tooling/budgetApproval',
      url: '/tooling/budgetApproval',
      key: 'LK_YUSUANSHENPI',
      permissionKey: '/TOOLING/BUDGETAPPROVAL',
    },
    {
      value: 3,
      message: 0,
      name: 'BA申请',
      activePath: '/tooling/baApplyIndex',
      url: '/tooling/baApplyIndex',
      key: 'LK_BASHENQING',
      permissionKey: '/TOOLING/BAAPPLYINDEX',
    },
    {
      value: 4,
      message: 0,
      name: 'BM申请',
      activePath: '/tooling/bmApplyIndex',
      url: '/tooling/bmApplyIndex',
      key: 'LK_BMSHENQING',
      permissionKey: '/TOOLING/BMAPPLYINDEX',
    },
    {
      value: 5,
      message: 0,
      name: '投资报告',
      activePath: '/tooling/investmentReport',
      url: '/tooling/investmentReport',
      key: 'LK_TOUZIBAOGAO',
      permissionKey: 'TOOLING_INVEST_TOUZIBAOGAO',
    },
    {
      value: 6,
      message: 0,
      name: 'BA审批',
      activePath: '/tooling/baApprovalIndex',
      url: '/tooling/baApprovalIndex',
      key: 'LK_BAAPPROVAL',
      permissionKey: '/TOOLING/BAAPPROVALINDEX',
    },
    // 无对应页面,直接重定向
    // {
    //   value: 7,
    //   message: 0,
    //   name: '付款计划制定与查看',
    //   activePath: '/tooling/investmentAdmin',
    //   url: '/tooling/investmentAdmin',
    //   key: 'LK_FUKUANJIHUADINGZHIYUCHAKAN',
    //   permissionKey: 'TOOLING_INVEST_FUKUANJIHUACHAKAN',
    // },
  // ],  // 模具投资
  // investmentAdminNavList:[
    {
      value: 3,
      message: 0,
      name: '付款看板',
      activePath: 'payBlock',
      url: '/tooling/investmentAdmin/payBlock',
      key: 'LK_FUKUANKANBAN',
      permissionKey: '/TOOLING/INVESTMENTADMIN/PAYBLOCK',
    },
    {
      value: 4,
      message: 0,
      name: '年度计划',
      activePath: 'yearlyPlan',
      url: '/tooling/investmentAdmin/yearlyPlan',
      key: 'LK_NIANDUJIHUA',
      permissionKey: 'TOOLING_PAYMENTPLAN_YEAR',
    },
    {
      value: 5,
      message: 0,
      name: '月度计划',
      activePath: 'monthlyPlan',
      url: '/tooling/investmentAdmin/monthlyPlan',
      key: 'LK_YUEDUJIHUA',
      permissionKey: '/TOOLING/INVESTMENTADMIN/MONTHLYPLAN',
    },
  //   ],  // 模具投资=> 付款计划制定与查看
  // budgetManagementNavList: [
    {
      value: 1,
      message: 0,
      name: '车型项目',
      activePath: 'carTypeOverview',
      url: '/tooling/budgetManagement/carTypeOverview',
      key: 'LK_CHEXINGXIANGMU',
      permissionKey: 'TOOLING_BUDGET_OVERVIEW',
    },
    {
      value: 2,
      message: 0,
      name: 'Common Sourcing',
      activePath: 'commonSourcing',
      url: '/tooling/budgetManagement/commonSourcing',
      key: 'Common Sourcing',
      permissionKey: 'TOOLSMANAGE_FINDKEY_BUDGETMANAGEMENT_COMMONSOURCING',
    },
  ]  // 模具投资
}