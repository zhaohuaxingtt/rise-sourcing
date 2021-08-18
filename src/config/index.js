/*
 * @Author: your name
 * @Date: 2021-07-14 11:46:46
 * @LastEditTime: 2021-08-17 15:09:06
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
  BKMROLETAGID:'KCNGLY'
}

//上传文件的hostId
export const fileType = {
  JINGLINGHAOBIANG:'125' //仅零件号变更文件类型
}