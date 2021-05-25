/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 13:50:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-25 14:16:21
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\data.js
 */

export const pageMenu = [{
  value: 1,
  name: "寻源执行",
  message: 0,
  url:'/sourcing/sourcingexecution',
  activePath: '/sourcingexecution',
  key:"寻源执行"
  }, {
  value: 2,
  name: "进度监控",
  message: 0,
  url:'/sourcing/progressmonitoring',
  activePath: '/progressmonitoring',
  key:"进度监控"
  }, 
  // {
  //   value: 3,
  //   name: "定点信列表",
  //   message: 0,
  //   url:'/partsrfq',
  //   key:"LK_DDXLB"
  // }
]

export const navList = [
  {
    value: 1,
    name: "配件需求签收",
    url: "/sourcing/sourcingexecution/signforpartsdemand",
    activePath: "/sourcingexecution/signforpartsdemand",
    key: "配件需求签收"
  },
  {
    value: 2,
    name: "配件综合管理",
    url: "/sourcing/sourcingexecution/integratedmanage",
    activePath: "/sourcingexecution/integratedmanage",
    key: "配件综合管理"
  },
  {
    value: 3,
    name: "RFQ管理",
    url: "/sourcing/sourcingexecution/rfqmanage",
    activePath: "/sourcingexecution/rfqmanage",
    key: "RFQ管理"
  },
  {
    value: 4,
    name: "定点管理",
    url: "/sourcing/sourcingexecution/designate",
    activePath: "/sourcingexecution/designate",
    key: '定点管理'
  }
]