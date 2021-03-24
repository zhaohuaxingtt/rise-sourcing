/*
 * @Author: yuszhou
 * @Date: 2021-02-23 16:43:12
 * @LastEditTime: 2021-03-08 16:39:33
 * @LastEditors: Please set LastEditors
 * @Description: components data and function
 * @FilePath: \rise\src\layout\components\data.js
 */

 //界面左边条目btn列表
 export const iconData = [
   {
     icon:'iconhomeweixuanzhong',
     acIcon:'iconhomexuanzhong',
     active:true,
     key:'first',
     path:'/partsign',
     menuData: []
   },
   {
    icon:'iconworkbenchweixuanzhong',
    acIcon:'iconworkbenchxuanzhong',
    active:false,
    key:'tow',
    path:'/partsprocure',
    menuData: []
  },
  {
    icon:'iconcommonfunctionweixuanzhong',
    acIcon:'iconcommonfunctionxuanzhong',
    active:false,
    key:'three',
    path:'/partsrfq',
    menuData: [
      {
        label:'任务中心',
        active: false,
        key:1,
        path:'/taskcenter',
      },
    ]
  }
 ]


 export const menuData = [
   {
     label:'菜单测试目录',
     active:true,
     key:1
   },
   {
    label:'菜单测试目录',
    active:false,
    key:2
  },
  {
    label:'菜单测试目录',
    active:false,
    key:3
  },
  {
    label:'菜单测试目录',
    active:false,
    key:4
  }
 ]

export const messageTypeMap = {
  '4': 'message',
  '5': 'notice'
}