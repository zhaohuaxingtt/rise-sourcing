/*
 * @Author: your name
 * @Date: 2021-06-22 16:28:54
 * @LastEditTime: 2022-01-28 17:16:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\data.js
 */
export const scoreTableTitle = [
  { props: "sapCode", name: "供应商号", key: "GONGYINGSHANGHAO", tooltip: true },
  { props: "supplierName", name: "供应商名", key: "GONGYINGSHANGMING", tooltip: true },
  { props: "proLocation", name: "供应商生产场地", key: "GONGYINGSHANGSHENGCHANCHANGDI", tooltip: true },
  { props: "partScore", name: "零件评分", key: "LINGJIANPINGFEN", tooltip: true },
]

export const deptScoreTableTitle = [
  { props: "rate", name: "评分", key: "LK_PINGFEN", tooltip: true },
  { props: "externalFee", name: "外部开发费(元)", key: "WAIBUKAIFAFEIYUAN", tooltip: true,isFileHidden:true },
  { props: "addFee", name: "增加的认可费(元)", key: "ZNEGJIADERENKEFEIYUAN", tooltip: true,isFileHidden:true },
  { props: "confirmCycle", name: "认可周期(周)", key: "RENKEZHOUQIZHOU", tooltip: true,isFileHidden:true },
  { props: "remark", name: "备注", key: "BEIZHU",width:200, },
  { props: "rateStatus", name: "评分状态", key: "PINGFENZHUANGTAI", tooltip: true },
]

export const SQETableTitle = [
  { props: "rate", name: "绩效", key: "绩效", tooltip: true },
  { props: "externalFee", name: "QTR", key: "QTR", tooltip: true },
  { props: "remark", name: "备注", key: "BEIZHU",width:200, },
  { props: "rateStatus", name: "状态", key: "ZHUANGTAI", tooltip: true },
  { props: "approval", name: "审核", key: "审核", tooltip: true },
]
export const attachmentTableTile = [
  { props: "fileName", name: "文件名称", key: "WENJIANMINGCHENG", tooltip: true },
  { props: "fileSize", name: "大小", key: "DAXIAO", tooltip: true },
  { props: "createDate", name: "上传日期", key: "SHANGCHUANRIQI", tooltip: true },
  { props: "uploader", name: "上传人", key: "SHANGCHUANREN", tooltip: true },
]