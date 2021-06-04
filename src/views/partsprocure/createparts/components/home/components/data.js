/*
 * @Author: your name
 * @Date: 2021-05-24 20:45:24
 * @LastEditTime: 2021-06-02 10:32:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createparts\components\home\components\data.js
 */
export const tableTitle = [
  { props: "partNum", name: "零件号", key: "createparts.LingJianHao", tooltip: true },
  { props: "partNameZh", name: "零件名(中)", key: "createparts.LingJianMingZhong", tooltip: true },
  { props: "partNameDe", name: "零件名(德)", key: "createparts.LingJianMingDe", tooltip: true },
  { props: "source", name: "零件来源", key: "createparts.LingJianLaiYuan", tooltip: true },
  { props: "partStatus", name: "零件状态", key: "createparts.LingJianZhuangTai", tooltip: true },
  { props: "date", name: "激活时间", key: "createparts.JiHuoShiJian", tooltip: true },
  { props: "log", name: "操作日志", key: "createparts.CaoZuoRiZhi", tooltip: true },
]

export const queryForm = {
  partNum: "",
  partNameZh: "",
  partNameDe: "",
  source: "",
  partStatus: ""
}