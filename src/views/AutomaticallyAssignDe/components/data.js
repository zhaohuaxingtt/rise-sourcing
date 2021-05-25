/*
 * @Author: yuszhou
 * @Date: 2021-05-24 17:43:42
 * @LastEditTime: 2021-05-24 20:34:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\AutomaticallyAssignDe\components\data.js
 */


/**
 * @description: 管理员分配界面
 * @param {*}
 * @return {*}
 */
export const navBarList = [
  {
    value: 1,
    name: "配件自动分配科室",
    message: 0,
    url:'/sourcing/partsign',
    activePath: "/partsign",
    key:"LK_PJZDFPKESHI"
  }
]


export const tabelTile = [
  {props:'rfqId',name:'材料组编号',key: '',tooltip:true, width:'' },
  {props:'rfqId',name:'材料组名称',key: '',tooltip:true, width:'' },
  {props:'rfqId',name:'分配科室',key: '',tooltip:true, width:'' }
]