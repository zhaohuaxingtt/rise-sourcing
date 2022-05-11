/*
 * @Author: your name
 * @Date: 2021-05-24 16:28:13
 * @LastEditTime: 2021-12-01 11:09:58
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsprocure\createparts\components\data.js
 */
export const navList = [
  {
    value: 1,
    name: "手工采购项目创建",
    url: "/sourceinquirypoint/sourcing/createparts/home",
    activePath: "/createparts/home",
    key: "SHOUGONGCAIGOUXIANGMUCHUANGJIAN",
    permissionKey: 'CREATEPARTSHOME_TAB',
    permissionName: '手工采购项目创建'
  },
  // {
  //   value: 2,
  //   name: "钢材批量采购",
  //   url: "/sourcing/createparts/steelbatchpurchase",
  //   activePath: "/createparts/steelbatchpurchase",
  //   key: "createparts.GangCaiPiLiangCaiGou"
  // },
  // {
  //   value: 3,
  //   name: "钢材一次性采购",
  //   url: "/sourcing/createparts/steelsinglepurchase",
  //   activePath: "/createparts/steelsinglepurchase",
  //   key: "createparts.GangCaiYiCiXingCaiGou"
  // },
  {
    value: 2,
    name: "工厂迁移",
    url: "/sourceinquirypoint/sourcing/createparts/factoryrelocate",
    activePath: "/createparts/factoryrelocate",
    key: "GONGCHANGQIANYI",
    permissionKey: 'FACTORYRELOCATE_TAB',
    permissionName: '工厂迁移'
  }
]