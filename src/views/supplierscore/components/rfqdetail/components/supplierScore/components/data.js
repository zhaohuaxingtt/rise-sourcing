/*
 * @Author: your name
 * @Date: 2021-06-22 16:28:54
 * @LastEditTime: 2021-06-29 18:19:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\data.js
 */
// export const scoreTableTitle = [
//   { props: "svw", name: "SVW号", key: "SVWHAO", tooltip: true },
//   { props: "supplierName", name: "供应商名", key: "GONGYINGSHANGMING", tooltip: true },
//   { props: "proLocation", name: "供应商生产场地", key: "GONGYINGSHANGSHENGCHANCHANGDI", tooltip: true },
//   { props: "partScore", name: "零件评分", key: "LINGJIANPINGFEN", tooltip: true },
// ]
export const scoreTableTitle = [
  { props: "svw", name: "SVW号", key: "SVW号", tooltip: true },
  { props: "supplierName", name: "供应商名", key: "供应商名", tooltip: true },
  { props: "proLocation", name: "供应商生产场地", key: "供应商生产场地", tooltip: true },
  { props: "partScore", name: "零件评分", key: "零件评分", tooltip: true },
]

export const deptScoreTableTitle = [
  { props: "rate", name: "评分", key: "评分", tooltip: true },
  { props: "externalFee", name: "外部开发费(元)", key: "外部开发费(元)", tooltip: true },
  { props: "addFee", name: "增加的认可费(元)", key: "增加的认可费(元)", tooltip: true },
  { props: "confirmCycle", name: "认可周期(周)", key: "认可周期(周)", tooltip: true },
  { props: "remark", name: "备注", key: "备注", tooltip: true },
  { props: "rateStatus", name: "评分状态", key: "评分状态", tooltip: true },
]

// export const attachmentTableTile = [
//   { props: "fileName", name: "文件名称", key: "WENJIANMINGCHENG", tooltip: true },
//   { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
//   { props: "createDate", name: "上传日期", key: "SHANGCHUANRIQI", tooltip: true },
//   { props: "createBy", name: "上传人", key: "SHANGCHUANREN", tooltip: true },
// ]
export const attachmentTableTile = [
  { props: "fileName", name: "文件名称", key: "文件名称", tooltip: true },
  { props: "fileSize", name: "大小", key: "大小", tooltip: true },
  { props: "createDate", name: "上传日期", key: "上传日期", tooltip: true },
  { props: "createBy", name: "上传人", key: "上传人", tooltip: true },
]