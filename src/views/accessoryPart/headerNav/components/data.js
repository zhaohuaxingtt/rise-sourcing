/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-12-23 18:40:40
 * @LastEditors: Please set LastEditors
 * @Description: 定点申请头部
 *
 */

export const headerSubMenu = [
  {
    value: 1,
    name: "零件签收",
    message: 0,
    url: "/sourceinquirypoint/sourcing/partsign",
    path: "/sourceinquirypoint/sourcing/partsign",
    activePath: "partsign",
    key: "LK_LINGJIANQIANSHOU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSIGN',
    permissionName: '寻源执行-零件签收'
  },
  {
    value: 2,
    name: "配件签收",
    message: 0,
    path: "/sourceinquirypoint/sourcing/signforpartsdemand",
    url: "/sourceinquirypoint/sourcing/partsign/signforpartsdemand",
    activePath: "/signforpartsdemand",
    key: "LK_PEIJIANXUQIUQIANSHOU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_SIGNFORPARTSDEMAND',
    permissionName: '寻源执行-配件签收'
  },
  {
    value: 3,
    name: "配件管理",
    message: 0,
    path: "/sourceinquirypoint/sourcing/integratedmanage",
    url: "/sourceinquirypoint/sourcing/partsign/integratedmanage",
    activePath: "/integratedmanage",
    key: "LK_PEIJIANZONGHEGUANLI",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_INTEGRATEDMANAGE',
    permissionName: '寻源执行-配件管理'
  },
  {
    value: 4,
    name: "附件导入",
    message: 0,
    path: "/sourceinquirypoint/sourcing/importfiles",
    url: "/sourceinquirypoint/sourcing/partsign/importfiles",
    activePath: "/importfiles",
    key: "LK_FUJIANXUQIUDAORU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_IMPORTFILES',
    permissionName: '寻源执行-附件导入',

  },
  {
    value: 5,
    name: "附件管理",
    message: 0,
    path: "/sourceinquirypoint/sourcing/filemanage",
    url:'/sourceinquirypoint/sourcing/partsign/filemanage',
    activePath: "/filemanage",
    key: "LK_FUJIANZONGHEGUANLI",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_FILEMANAGE',
    permissionName: '寻源执行-附件管理',
  },
  
  {
    value: 6,
    name: "钢材创建",
    message: 0,
    url: "/sourceinquirypoint/sourcing/partsign/steeldemandcreation",
    activePath: "steeldemandcreation",
    key: "GANGCAIXUQIUCHUANGJIAN",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_STEELDEMANDCREATION',
    permissionName: '寻源执行-钢材创建'
  },
]