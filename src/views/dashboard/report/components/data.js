/*
 * @Author: hoajiang
 * @Date: 2021-08-05 10:36:42
 * @LastEditTime: 2021-08-06 16:47:36
 * @LastEditors: Please set LastEditors
 * @Description: 寻源概览配置
 * @FilePath: /front-web/src/views/dashboard/components/data.js
 */

// 采购员，股长，科长可见
export const TAB = [
  {
    value: 0,
    name: "寻源概览",
    message: 0,
    url: "/sourcing/dashboard",
    activePath: "dashboard",
    key: "XUANYUANGAILAN"
  },
  {
    value: 1,
    name: "寻源执行",
    message: 0,
    url: "/sourcing/partsign",
    activePath: "partsign",
    key: "XUANYUANCAIDAN"
  },
  {
    value: 1,
    name: "报表管理",
    message: 0,
    url: "/sourcing/dashboard/report",
    activePath: "dashboard",
    key: "LK_BAOBIAOGUANLI"
  },
]

export const MENU = [
  {
    value: 1,
    name: '状态跟踪报表',
    message: 0,
    url: '/sourcing/partsign',
    activePath: 'partsign',
    key: 'LK_ZHUANGTAIGENZHONGBAOBIAO'
  },
  {
    value: 1,
    name: '状态跟踪详情',
    message: 0,
    url: '/sourcing/dashboard/report',
    activePath: 'dashboard',
    key: 'LK_ZHUANGTAIGENZHONGXIANGQING'
  },
]

// 状态跟踪详情筛选参数
export const form = {}