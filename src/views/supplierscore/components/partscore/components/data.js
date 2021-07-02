/*
 * @Author: your name
 * @Date: 2021-06-30 14:31:57
 * @LastEditTime: 2021-06-30 14:49:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\partscore\components\data.js
 */
export const tableTitle = [
  { props: "partNum", name: "零件号", key: "零件号", tooltip: true },
  { props: "fsNum", name: "FS号", key: "FS号", tooltip: true },
  { props: "purchasingFactory", name: "采购工厂", key: "采购工厂", tooltip: true },
  { props: "partNameZh", name: "零件名称(中)", key: "零件名称(中)", tooltip: true },
  { props: "partNameDe", name: "零件名称(德)", key: "零件名称(德)", tooltip: true },
  { props: "carProjectType", name: "车型项目", key: "车型项目", tooltip: true },
  { props: "relatedModels", name: "相关车型", key: "相关车型", tooltip: true },
]

export const deptScoreTableTitle = [
  { props: "grade", name: "评分", key: "评分", tooltip: true },
  { props: "externaFee", name: "外部开发费(元)", key: "外部开发费(元)", tooltip: true },
  { props: "addFee", name: "增加的认可费(元)", key: "增加的认可费(元)", tooltip: true },
  { props: "confirmCycle", name: "认可周期(周)", key: "认可周期(周)", tooltip: true },
  { props: "remark", name: "备注", key: "备注", tooltip: true },
]