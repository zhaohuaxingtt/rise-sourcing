/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:37:05
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-13 15:32:56
 * @Description: 
 */

// 主菜单
export const TAB = [
  {
    value: 1,
    name: 'AEKO操作',
    message: 0,
    url: '/aeko/approve',
    activePath: 'projectoverview',
    key: 'LK_AEKOCAOZUO'
  },
  {
    value: 2,
    name: 'AEKO报表',
    message: 0,
    url: '/projectmgt/projectoverview',
    activePath: 'projectoverview',
    key: 'LK_AEKOBAOBIAO'
  },
]
export  const AEKOAPPROVEMENU=[
  { value: 1,
    message: 0,
    name: 'AEKO操作',
    activePath: '/aeko/approve',
    url: '/aeko/approve/approvelistcsf',
    // 用于判断子路由是否处于当前父路由下
    currentPath: '/aeko/approve',
    // 右侧魔方是否展示
    magicCube: true,
    // 右侧魔方跳转Path
    magicCubePath: '/projectmgt/projectscheassistant/historyprocessdb',
    // 右侧魔方Hover content
    magicCubeHoverText: '模具台账',
    key: 'AEKO操作',
    rightNavList: [
      {
        value: 1,
        message: 0,
        name: 'AEKO审批',
        activePath: 'approvelistcsf',
        url: '/aeko/approve/approvelistcsf',
        key: 'AEKO审批'
      },
      {
        value: 2,
        message: 0,
        name: 'AEKO查看',
        activePath: 'changeTask',
        url: '#',
        key: 'AEKO查看'
      }
    ]

  },{
    value: 2,
    message: 0,
    name: 'AEKO报表',
    activePath: '/aeko/approve/#',
    url: '/aeko/approve/#',
    key: 'AEKO报表',
    // 用于判断子路由是否处于当前父路由下
    currentPath: '/aeko/approve/#',
    // 右侧魔方是否展示
    magicCube: false,
    // 右侧魔方跳转Path
    magicCubePath: '#',
    // 右侧魔方Hover content
    magicCubeHoverText: '模具台账',
    rightNavList: [ ]
  },

]


export const SUBMENU = [
  {
    value: 1,
    name: 'AEKO审批',
    message: 0,
    url: '/aeko/approve',
    activePath: 'projectoverview',
    key: 'LK_AEKOSHENPI'
  },
  {
    value: 2,
    name: 'AEKO查看',
    message: 0,
    url: '/aeko/approve',
    activePath: 'projectoverview',
    key: 'LK_AEKOCHAKAN'
  },
]
// 主菜单
export const ATTACHSUBMENU = [
  {
    value: 1,
    name: '审批单',
    message: 0,
    url: '/aeko/AEKOApprovalDetails/Approvalform',
    activePath: 'Approvalform',
    key: 'LK_AEKOSHENPIDAN'
  },
  {
    value: 2,
    name: 'CBD汇总',
    message: 0,
    url: '/aeko/AEKOApprovalDetails/CBDSummary',
    activePath: 'CBDSummary',
    key: 'LK_CBDHUIZONG'
  },
  {
    value: 3,
    name: '审批附件',
    message: 0,
    url: '/aeko/approve/explainattach',
    activePath: 'explainattach',
    key: 'LK_AEKO_SHENPIFUJIAN'
  },
]

// csf / commodity 审批界面选项卡
export const navList = [
  {
    code: '1',
    name:'待审批',
    key:'LK_DAISHENPI',
    // path:'/sourcing/partsnomination'
  },
  {
    code: '2',
    name:'已审批',
    key:'LK_YISHENPI'
  },
]

// 表头
export const tableTitle = [
  { props: "isTop", name: "", key: "", tooltip: false, width:30 },
  { props: "aekoNum", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true,width:60 },
  { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
  { props: "assignsheet", name: "审批单", key: "LK_AEKOSHENPIDAN", tooltip: true },
  { props: "auditTypeName", name: "审批类型", key: "SHENPILEIXING", tooltip: true },
  { props: "departmentName", name: "commodity科室", key: "COMMODITYKESHI", tooltip: true },
  { props: "buyerName", name: "专业采购员", key: "ZHUANYECAIGOUYUAN", tooltip: true },
  { props: "chiefName", name: "CSF股长", key: "CSFGUZHANG", tooltip: true },
]

// 表头
export const tableCsfTitle = [
  { props: "isTop", name: "", key: "", tooltip: false, width:30 },
  { props: "aekoNum", name: "AEKO号", key: "LK_AEKOHAO", tooltip: true,width:70 },
  { props: "auditTypeName", name: "审批类型", key: "SHENPILEIXING", tooltip: true },
  { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
  { props: "assignsheet", name: "更改零件名称", key: "LK_AEKO_GENGGAILINGJIANMINGCHENG", tooltip: true, width:100  },
  { props: "carType", name: "涉及车型/车型项目", key: "SHEJICHEXINGCHEXINGXIANGMU", tooltip: true, width:120 },
  { props: "supplier", name: "主要供应商", key: "LK_AEKO_ZHUYAOGONGYINGSHANG", tooltip: true },
  { props: "EP1", name: "增加材料成本（RMB/车）", key: "LK_AEKO_ZENGJIACAILIAOCHENGBEN", tooltip: true },
  { props: "EP2", name: "增加投资费用（不含税）", key: "LK_AEKO_ZENGJIATOUZIFEIYONG", tooltip: true },
  { props: "EP3", name: "其他费用(不含税）", key: "LK_AEKO_QITAFEIYONGBUHANSHUI", tooltip: true },
  { props: "DepartmentName", name: "科室", key: "LK_KESHI", tooltip: true },
  { props: "buyerName", name: "采购员", key: "CAIGOUYUAN", tooltip: true },
  { props: "attach", name: "审批附件", key: "LK_AEKO_SHENPIFUJIAN", tooltip: true },
  { props: "date", name: "AEKO截止日期", key: "LK_AEKO_AEKOJIEZHIRIQI" },
  { props: "createDate", name: "创建时间", key: "CHUANGJIANRIQI" },
]

// 解释附件表头
export const explainAttachTableTitle = [
  { props: "fileName", name: "文件名", key: "LK_WENJIANMING", tooltip: true },
  { props: "fileDescribe", name: "文件描述", key: "LK_WENJIANMIOASHU", tooltip: true, width: 450},
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "createDate", name: "上传时间", key: "SHANGCHUANSHIJIAN", tooltip: true },
  { props: "userName", name: "上传人", key: "SHANGCHUANREN", tooltip: true },
]