/*
 * @Author: your name
 * @Date: 2021-07-14 11:46:46
 * @LastEditTime: 2021-10-27 18:07:13
 * @LastEditors: Please set LastEditors
 * @Description: 配置
 * @FilePath: /front-web/src/config/index.js
 */
export const onlyselfProject = {
  // DB零件一次性采购
  DBLINGJIANYICIXCAIGOU: '50005000',
  // DB一次性采购（PT19）
  DBYICHIXINGCAIGOU: '50001001',
  // 工序委外（PT14）
  GONGXUWEIWAI: '1044297',
  // 一次性采购（PT06）
  YICIXINGCAIGOU: '50001000',
  // AEKO零件(新)
  AEKOLINGJIANXIN: '1000020',
  // 钢材一次性采购（PT13）
  GANGCAIYICIXINGCAIGOU: '1000030',
  // DB仅零件号更改（PT03）
  DBJINLINGJIANHAOGENGAI: '50003000',
  // 仅零件号更改（PT08）
  JINLINGJIANHAOGENGGAI: '1000005',
  // AEKO零件（PT02）
  AEKOLINGJIAN: '1000006',
  // 钢材批量采购（PT12）
  GANGCAIPILIANGCAIGOU: '1000040',
  // 配件（PT17）
  PEIJIAN: '1000060',
  // 附件（PT18）
  FUJIAN: '1000061'

}
export const allitemsList = {
  // GS Common Sourcing（PT10）
  GSCOMMONSOURCING: '50002001',
  // 扩产能（PT15）
  KUOCHANNENG: '50003001',
  // DB涨价（PT16）
  DBZHANGJIA: '50003002',
  // 涨价零件（PT20）
  ZHANGJIALINGJIAN: '50001150',
  // DB零件（PT04）
  DBLINGJIAN: '1000009',
  // Deep Localization
  DEEPLOCALIZATION: '1044298',
  // FS小零件（PT05）
  FSXIAOLINGJIAN: '1000001',
  // FS总成件
  FSZONGCHENGJIAN: '1000002',
  // GS零件（PT11）
  GSLINGJIAN: '1000003',
  // COP零件（PT07）
  COPLINGJIAN: '1000004',
  // SPECIAL零件（PT01）
  SPECIALLINGJIAN: '1000007',
  // GS零件(TP)
  GSLINGJIANIP: '50000000',
  // FS Common Sourcing（PT09）
  FSCOMMONSOURCING: '50002000'
}
// 零件项目类型
export const partProjTypes = Object.assign(JSON.parse(JSON.stringify(onlyselfProject)),JSON.parse(JSON.stringify(allitemsList)))
// 扩产能角色tag id，cf提供
export const BKMROLETAGID = 'KCNGLY'
//钢材批量采购
export const STEEL = {
  STEELONECE:'1000030', //钢材一次性采购
  STEELALL:'1000040'    //钢材批量采购
}
//用户角色,由于前期是用tag暂时判断，后期需要替换此处的角色ID
export const user = {
  //前期采购员
  BEFORBUYER:9,
  //linie
  LINLIE:4,
  //扩产能管理员
  BKMROLETAGID:'KCNGLY',
  // 前期采购股长
  QQCGGZ: 'QQCGGZ'
}

//上传文件的hostId
export const fileType = {
  JINGLINGHAOBIANG:'125' //仅零件号变更文件类型
}

export const partsType = {
  PARTSACCS:'A', //总成零件类型
  NOUMEN:'L', //本体零件
  GENERAL: 'P', //普通零件，
  PROCESSANDASSEMBLY:'S' //加工装配费
}

const enums = {
  "RFQ_STATE_ENUM": { // RFQ状态
    "NO_INQUIRY": "NOT_REQ", // 未询价
    "INQUIRY_ING": "IN_REQ", // 询价中
    // "HAS_INQUIRY": "02", // 已询价
    "NEGOTIATE_ING": "IN_NEGO_PROC", // 谈判中
    "VEER_NEGOTIATE": "TO_NEGO", // 转谈判
    "VEER_ENQUIRY": "TO_REQ", // 转询价
    "NEGOTIATE_END": "NEGO_COMPLETE", // 谈判完成
    "NON_CONFIRM_BOM": "TO_CONFIRMED", // 待确认BOM
    "END_CONFIRM_BOM": "CONFIRMED", // 已确认BOM
    "END_RFQ": "CLOSED", // 已关闭
    "END_POINT": "NOMINATED", // 已定点
  },
  "PART_QUOTATION_STATE_ENUM": { // 零件报价状态
    "NOT_QUOTED": "WAITING", // 待接受
    "ACCEPT": "ACCEPT", // 已接受
    "REFUSE": "REFUSE", // 已拒绝
    "DRAFT": "DRAFT", // 草稿
    "SUBMITTED": "SUBMITTED", // 已提交
    "DELEGATE_ACCEPT": "DELEGATE_ACCEPT", // 代接受报价
    "DELEGATE_REFUSE": "DELEGATE REFUSE", // 代拒绝
    "DELEGATE_DRAFT": "DELGATE DRAFT", // 代报价草稿
    "DELEGATE_SUBMITTED": "DELGATE SUBMITTED" // 代报价提交 
  },
  "PURCHASE_PROJECT_STATE_ENUM": { // 零件采购项目状态
    "NO_PROJECT_NUM": "NO_NR", // 无采购项目编号
    "NO_RFQ": "NOT_IN_RFQ", // 未加入RFQ
    "HAS_RFQ": "IN_RFQ", // 已加入RFQ
    "APPLICATION_DESIGNAT": "APPLIED_NOM", // 已申请定点
    "FROZEN": "FROZEN_NOM", // 已冻结
    "DESIGNATED": "NOMINATED", // 已定点
    "END": "CANCELED", // 已结束
    "CANCEL": "STOP" // 已取消
  },
  "RFQ_ROUNDS_STATE_ENUM": { // RFQ轮次状态
    "CLOSED": "CLOSED", // 已关闭
    "RUNNING": "RUNNING" // 进行中
  }
}

Object.freeze(enums)

export const getEnumValue = function(fullKey) {
  try {
    const keys = fullKey.split(/\./)

    const result = keys.reduce((acc, cur) => {
      return acc[cur] ? acc[cur] : undefined
    }, enums)

    return typeof result === "object" ? "" : result
  } catch {
    return ""
  }
}

export const roundsType = {
  zxjjys:'biddingRound'
}