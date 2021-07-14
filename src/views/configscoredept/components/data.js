/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:28
 * @LastEditTime: 2021-07-02 18:19:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\components\data.js
 */
export const queryForm = {
  rateDepartNum: "",
  rateTag: ""
}

export const tableTitle = [
  { props: "rateTag", name: "部门评分类型", key: "BUMENPINGFENLEIXING", tooltip: true },
  { props: "rateDepartNum", name: "部门编号", key: "BUMENBIANHAO", tooltip: true },
  { props: "isCheck", name: "是否审核", key: "SHIFOUSHENHE", tooltip: true },
]

export const deptDialogQueryForm = {
  deptNum: "",
  deptNameZh: "",
  deptNameEn: ""
}

export const deptDialogTableTitle = [
  { props: "deptNum", name: "部门编号", key: "BUMENBIANHAO", tooltip: true },
  { props: "deptNameZh", name: "部门中文名", key: "BUMENZHONGWENMING", tooltip: true },
  { props: "deptNameEn", name: "部门英文名", key: "BUMENYINGWENMING", tooltip: true },
]