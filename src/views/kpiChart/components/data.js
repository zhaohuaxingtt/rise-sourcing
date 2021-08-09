/*
    设置开始点 start:true
    设置开始点 start:true
*/
export const tabSetting = [
  {
    prop:"roleName",
    label: '角色ID',
  },
  {
    prop:"id",
    label: '开始代码',
    icon:"el-icon-minus",
    start:true
  },
  {
    prop:"code",
    label: '角色名称',
  },{
    prop:"fullNameZh",
    label: '角色ID',
  },
  {
    prop:"code",
    label: '结束代码',
    icon:"el-icon-plus",
    start:false
  },
  {
    prop:"aa",
    label: '角色名称',
  },]

  export const tabsetting = [
    {
      type: 'selection',
      width: 50,
    },
    {
      prop: '#',
      label: '#',
      i18n: '#',
      width: 50,
      align: 'center',
    },
    {
      prop: 'nameZh',
      label: '供应商名称',
      i18n: 'LK_GONGYINGSHANGMINGCHENG',
      align: 'center',
      tooltip: true
    },
    ]
  

    export const setCloum = [{
      prop: 'index',
      label: '#',
      i18n: '#',
      width: 50,
      align: 'center',
    },{
      prop: 'nameZh',
      label: '供应商名称',
      i18n: 'partsprocure.GongYingShangMingCheng',
      align: 'center',
      emit: 'go-detail',
      customRender: (h, scope) => {
        return <span class="open-link-text">{scope.row.nameZh}</span>
      },
      tooltip: true,
    }]

    export const tabtitle = [
      // {value: 1, message: 0, name: "车型项目概览", activePath: '/tooling/investmentReport', url: '/tooling/investmentReport', key: "LK_CHEXINGXIANGMUGAILAN"},
      {value: 1, message: 0, name: "预算管理", activePath: '/tooling/budgetManagement', url: '/tooling/budgetManagement', key: "LK_YUSUANGUANLI"},
      {value: 2, message: 0, name: "预算审批", activePath: '/tooling/budgetApproval', url: '/tooling/budgetApproval', key: "LK_YUSUANSHENPI"},
      {value: 3, message: 0, name: "BA申请", activePath: '/tooling/baApplyIndex', url: '/tooling/baApplyIndex', key: "LK_BASHENQING"},
      {value: 4, message: 0, name: "BM申请", activePath: '/tooling/bmApplyIndex', url: '/tooling/bmApplyIndex', key: "LK_BMSHENQING"},
      {value: 5, message: 0, name: "投资报告", activePath: '/tooling/investmentReport', url: '/tooling/investmentReport', key: "LK_TOUZIBAOGAO"},
      {value: 6, message: 0, name: "BA审批", activePath: '/tooling/baApprovalIndex', url: '/tooling/baApprovalIndex', key: "LK_BAAPPROVAL"},
      {value: 7, message: 0, name: "付款计划制定与查看", activePath: '/tooling/investmentAdmin', url: '/tooling/investmentAdmin', key: "LK_FUKUANJIHUADINGZHIYUCHAKAN"},
  ]

 