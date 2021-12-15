/*
 * @Author: hoajiang
 * @Date: 2021-08-05 10:36:42
 * @LastEditTime: 2021-09-07 17:56:22
 * @LastEditors: Hao,Jiang
 * @Description: 寻源概览配置
 * @FilePath: /front-web/src/views/dashboard/components/data.js
 */

// 采购员，股长，科长可见
export const TAB = [
  {
    value: 1,
    name: "寻源概览",
    message: 0,
    url: "/sourcing/dashboard",
    activePath: "dashboard",
    key: "XUANYUANGAILAN",
    permissionKey: 'DASHBOARD_OVERVIEW_PAGE',
    permissionName: '寻源概览'
  },
  {
    value: 2,
    name: "寻源执行",
    message: 0,
    url: "/sourceinquirypoint/sourcing/partsign",
    activePath: "partsign",
    key: "XUANYUANCAIDAN",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_MENU',
    permissionName: '寻源执行'
  },
  {
    value: 3,
    name: "报表管理",
    message: 0,
    url: "/sourceinquirypoint/sourcing/reportmgmt/details",
    activePath: "reportmgmt",
    key: "LK_BAOBIAOGUANLI",
    permissionKey: 'REPORTMGMT_STATUSREPORT_PROCESSDETAILS_PAGE',
    permissionName: '报表管理-状态跟踪详情'
  },
]

export const MENU = [
  {
    value: 1,
    name: '状态跟踪报表',
    message: 0,
    url: '/sourceinquirypoint/sourcing/reportmgmt/report',
    activePath: 'reportmgmt/report',
    key: 'LK_ZHUANGTAIGENZHONGBAOBIAO',
    permissionKey: 'REPORTMGMT_STATUSREPORT_PROCESS_PBI',
    permissionName: '报表管理-状态跟踪报表'
  },
  {
    value: 2,
    name: '状态跟踪详情',
    message: 0,
    url: '/sourceinquirypoint/sourcing/reportmgmt/details',
    activePath: 'reportmgmt/details',
    key: 'LK_ZHUANGTAIGENZHONGXIANGQING',
    permissionKey: 'REPORTMGMT_STATUSREPORT_PROCESSDETAILS_PAGE',
    permissionName: '报表管理-状态跟踪详情'
  },
]

// 状态跟踪详情筛选参数
export const form = {}