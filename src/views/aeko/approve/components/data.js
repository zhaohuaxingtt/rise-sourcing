/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:37:05
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-23 17:49:47
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
  { props: "aekoCode", name: "AEKO号", key: "LK_AEKOHAO_MANAGE", tooltip: true,width:140 },
  { props: "describe", name: "描述", key: "LK_AEKOMIAOSHU", tooltip: true },
  { props: "describe", name: "审批单", key: "LK_AEKOSHENPIDAN", tooltip: true },
  { props: "describe", name: "审批类型", key: "SHENPILEIXING", tooltip: true },
  { props: "describe", name: "commodity科室", key: "COMMODITYKESHI", tooltip: true },
  { props: "linie", name: "专业采购员", key: "ZHUANYECAIGOUYUAN", tooltip: true },
  { props: "csf", name: "CSF股长", key: "CSFGUZHANG", tooltip: true },
]