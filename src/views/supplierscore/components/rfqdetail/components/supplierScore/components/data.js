/*
 * @Author: your name
 * @Date: 2021-06-22 16:28:54
 * @LastEditTime: 2021-06-22 19:57:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\data.js
 */
export const scoreTableTitle = [
  { props: "svwCode", name: "SVW号", key: "SVW号", tooltip: true },
  { props: "shortNameZh", name: "供应商名", key: "供应商名", tooltip: true },
  { props: "companyAddress", name: "供应商生产场地", key: "供应商生产场地", tooltip: true },
  { props: "partScore", name: "零件评分", key: "零件评分", tooltip: true },
  { 
    props: "mq", 
    name: "MQS", 
    key: "MQS",
    type: "group",
    children: [
      { props: "rate", name: "评分", key: "评分", tooltip: true },
      { props: "externaFee", name: "外部开发费(元)", key: "外部开发费(元)", tooltip: true },
      { props: "addFee", name: "增加的认可费(元)", key: "增加的认可费(元)", tooltip: true },
      { props: "confirmCycle", name: "认可周期(周)", key: "认可周期(周)", tooltip: true },
      { props: "remark", name: "备注", key: "备注", tooltip: true },
      { props: "rateState", name: "评分状态", key: "评分状态", tooltip: true }
    ] 
  },
  { 
    props: "ft", 
    name: "FTS", 
    key: "FTS",
    type: "group",
    children: [
      { props: "rate", name: "评分", key: "评分", tooltip: true },
      { props: "externaFee", name: "外部开发费(元)", key: "外部开发费(元)", tooltip: true },
      { props: "addFee", name: "增加的认可费(元)", key: "增加的认可费(元)", tooltip: true },
      { props: "confirmCycle", name: "认可周期(周)", key: "认可周期(周)", tooltip: true },
      { props: "remark", name: "备注", key: "备注", tooltip: true },
      { props: "rateState", name: "评分状态", key: "评分状态", tooltip: true }
    ] 
  }
]

export const attachmentTableTile = [
  { props: "fileName", name: "文件名称", key: "文件名称", tooltip: true },
  { props: "fileSize", name: "大小（MB）", key: "大小（MB）", tooltip: true },
  { props: "createDate", name: "上传日期", key: "上传日期", tooltip: true },
  { props: "createBy", name: "上传人", key: "上传人", tooltip: true },
]