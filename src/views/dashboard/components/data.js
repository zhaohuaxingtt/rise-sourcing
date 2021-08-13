/*
 * @Author: hoajiang
 * @Date: 2021-08-05 10:36:42
 * @LastEditTime: 2021-08-13 22:13:31
 * @LastEditors: Please set LastEditors
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
    key: "XUANYUANGAILAN"
  },
  {
    value: 2,
    name: "寻源执行",
    message: 0,
    url: "/sourcing/partsign",
    activePath: "sourcing",
    key: "XUANYUANCAIDAN"
  },
  {
    value: 3,
    name: "报表管理",
    message: 0,
    url: "/sourcing/reportmgmt/report",
    activePath: "reportmgmt",
    key: "LK_BAOBIAOGUANLI"
  },
]