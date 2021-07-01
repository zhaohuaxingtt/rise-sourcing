/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:28
 * @LastEditTime: 2021-06-30 18:34:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\components\data.js
 */
export const queryForm = {
  rateDepartNum: "",
  rateTag: ""
}

export const tableTitle = [
  { props: "rateTag", name: "部门评分类型", key: "部门评分类型", tooltip: true },
  { props: "rateDepartNum", name: "部门编号", key: "部门编号", tooltip: true },
  { props: "isCheck", name: "是否审核", key: "是否审核", tooltip: true },
]

export const deptDialogQueryForm = {
  deptNum: "",
  nameZh: "",
  nameEn: ""
}

export const deptDialogTableTitle = [
  { props: "deptNum", name: "部门编号", key: "部门编号", tooltip: true },
  { props: "nameZh", name: "部门中文名", key: "部门中文名", tooltip: true },
  { props: "nameEn", name: "部门英文名", key: "部门英文名", tooltip: true },
]