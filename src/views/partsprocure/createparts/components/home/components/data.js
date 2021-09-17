/*
 * @Author: your name
 * @Date: 2021-05-24 20:45:24
 * @LastEditTime: 2021-06-25 13:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createparts\components\home\components\data.js
 */
export const tableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIAHAO", tooltip: true },
  { props: "partNameZh", name: "零件名(中)", key: "LINGJIANMINGZHONG", tooltip: true },
  { props: "partNameDe", name: "零件名(德)", key: "LINGJIANMINGDE", tooltip: true },
  { props: "source", name: "零件来源", key: "LINGJIANLAIYUAN", tooltip: true },
  { props: "partStatusDesc", name: "零件状态", key: "LINGJIANZHUANGTAI", tooltip: true },
  { props: "activeTime", name: "激活时间", key: "JIHUOSHIJIAN", tooltip: true },
  { props: "log", name: "操作日志", key: "CAOZUORIZHI", tooltip: true },
]

export const queryForm = {
  partNum: "",
  partNameZh: "",
  partNameDe: "",
  source: "",
  partStatus: ""
}