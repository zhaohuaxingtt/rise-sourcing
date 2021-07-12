/*
 * @Author: your name
 * @Date: 2021-06-30 14:31:57
 * @LastEditTime: 2021-07-12 16:46:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\partscore\components\data.js
 */
export const tableTitle = [
  { props: "partNum", name: "零件号", key: "LINGJIANHAO", tooltip: true },
  { props: "fsNum", name: "FS号", key: "FSHAO", tooltip: true },
  { props: "purchasingFactory", name: "采购工厂", key: "CAIGOUGONGCHANG", tooltip: true },
  { props: "partNameZh", name: "零件名称(中)", key: "LINGJIANMINGCHENGZHONG", tooltip: true },
  { props: "partNameDe", name: "零件名称(德)", key: "LINGJIANMINGCHENGDE", tooltip: true },
  { props: "carProjectType", name: "车型项目", key: "CHEXINGXIANGMU", tooltip: true },
  { props: "relatedModels", name: "相关车型", key: "XIANGGUANCHEXING", tooltip: true },
]

export const deptScoreTableTitle = [
  { props: "grade", name: "评分", key: "LK_PINGFEN", tooltip: true },
  { props: "externaFee", name: "外部开发费(元)", key: "WAIBUKAIFAFEIYUAN", tooltip: true },
  { props: "addFee", name: "增加的认可费(元)", key: "ZNEGJIADERENKEFEIYUAN", tooltip: true },
  { props: "confirmCycle", name: "认可周期(周)", key: "RENKEZHOUQIZHOU", tooltip: true },
  { props: "remark", name: "备注", key: "BEIZHU", tooltip: true },
]