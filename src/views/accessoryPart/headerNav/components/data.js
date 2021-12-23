/*
 * @Author: HaoJiang
 * @Date: 2021-05-20 14:29:09
 * @LastEditTime: 2021-12-23 15:34:44
 * @LastEditors: Please set LastEditors
 * @Description: 定点申请头部
 *
 */

export const headerSubMenu = [
  {
    value: 1,
    name: "配件签收",
    message: 0,
    path: "/sourceinquirypoint/sourcing/signforpartsdemand",
    url: "/sourceinquirypoint/sourcing/signforpartsdemand",
    activePath: "/signforpartsdemand",
    key: "LK_PEIJIANXUQIUQIANSHOU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_SIGNFORPARTSDEMAND',
    permissionName: '寻源执行-配件签收'
  },
  {
    value: 2,
    name: "配件管理",
    message: 0,
    path: "/sourceinquirypoint/sourcing/integratedmanage",
    url: "/sourceinquirypoint/sourcing/signforpartsdemand",
    activePath: "/integratedmanage",
    key: "LK_PEIJIANZONGHEGUANLI",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_INTEGRATEDMANAGE',
    permissionName: '寻源执行-配件管理'
  },
  {
    value: 3,
    name: "附件导入",
    message: 0,
    path: "/sourceinquirypoint/sourcing/importfiles",
    activePath: "/importfiles",
    key: "LK_FUJIANXUQIUDAORU",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_IMPORTFILES',
    permissionName: '寻源执行-附件导入',
    url: "/sourceinquirypoint/sourcing/signforpartsdemand",

  },
  {
    value: 4,
    name: "附件管理",
    message: 0,
    path: "/sourceinquirypoint/sourcing/filemanage",
    activePath: "/filemanage",
    key: "LK_FUJIANZONGHEGUANLI",
    permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_FILEMANAGE',
    permissionName: '寻源执行-附件管理',
    url: "/sourceinquirypoint/sourcing/signforpartsdemand",

  },
]