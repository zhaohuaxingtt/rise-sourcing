/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:37:05
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-26 15:33:28
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


// 表头
export const tableTitle = [
  { props: "isTop", name: "", key: "", tooltip: false, width:30 },
  { props: "aekoNum", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true,width:60 },
  { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
  { props: "assignsheet", name: "审批单", key: "LK_AEKOSHENPIDAN", tooltip: true },
  { props: "auditType", name: "审批类型", key: "SHENPILEIXING", tooltip: true },
  { props: "DepartmentName", name: "commodity科室", key: "COMMODITYKESHI", tooltip: true },
  { props: "buyerName", name: "专业采购员", key: "ZHUANYECAIGOUYUAN", tooltip: true },
  { props: "chiefName", name: "CSF股长", key: "CSFGUZHANG", tooltip: true },
]
