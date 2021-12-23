/*
 * @Author: YoHo
 * @Date: 2021-12-23 15:58:25
 * @LastEditTime: 2021-12-23 16:02:58
 * @LastEditors: YoHo
 * @Description: 
 */
/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-12-23 15:34:44
 * @LastEditors: Please set LastEditors
 * @Description: 定点申请头部
 *
 */
export const heaederSubMenu = [
  {
    value: 1,
    name: "概览",
    message: 0,
    url: "/sourcing/dashboard",
    activePath: "dashboard",
    key: "GAILAN",
    permissionKey: 'DASHBOARD_OVERVIEW_PAGE',
    permissionName: '概览'
  },
  {
    value: 2,
    name: '状态跟踪报表',
    message: 0,
    url: '/sourceinquirypoint/sourcing/reportmgmt/report',
    activePath: 'reportmgmt/report',
    key: 'LK_ZHUANGTAIGENZHONGBAOBIAO',
    permissionKey: 'REPORTMGMT_STATUSREPORT_PROCESS_PBI',
    permissionName: '报表管理-状态跟踪报表',
    group: 1
  },
  {
    value: 3,
    name: '状态跟踪详情',
    message: 0,
    url: '/sourceinquirypoint/sourcing/reportmgmt/details',
    activePath: 'reportmgmt/details',
    key: 'LK_ZHUANGTAIGENZHONGXIANGQING',
    permissionKey: 'REPORTMGMT_STATUSREPORT_PROCESSDETAILS_PAGE',
    permissionName: '报表管理-状态跟踪详情',
    group: 1
  },
]