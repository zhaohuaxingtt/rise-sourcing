/*
 * @Author: your name
 * @Date: 2021-06-16 15:25:24
 * @LastEditTime: 2021-11-05 15:13:26
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\store\module\sourcing.js
 */
import { getAgentTasksNum } from "@/api/partsrfq/home"
import { cloneDeep } from "lodash"
import axios from "axios"

const state = {
  navList: [ //sourcing 4级菜单列表
    {
      value: 1,
      name: "零件签收",
      message: 0,
      url: "/sourceinquirypoint/sourcing/partsign",
      activePath: "partsign",
      key: "LK_LINGJIANQIANSHOU",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSIGN',
      permissionName: '寻源执行-零件签收'
    },
    {
      value: 2,
      name: "采购项目建立",
      message: 0,
      url: "/sourceinquirypoint/sourcing/partsprocure",
      activePath: "partsprocure",
      key: "LK_CAIGOUXIANGMUJIANLI",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSPROCURE',
      permissionName: '寻源执行-采购项目建立'
    },
    {
      value: 3,
      name: "配件签收",
      message: 0,
      url: "/sourceinquirypoint/sourcing/signforpartsdemand",
      activePath: "signforpartsdemand",
      key: "LK_PEIJIANXUQIUQIANSHOU",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_SIGNFORPARTSDEMAND',
      permissionName: '寻源执行-配件签收'
    },
    {
      value: 4,
      name: "配件管理",
      message: 0,
      url: "/sourceinquirypoint/sourcing/integratedmanage",
      activePath: "integratedmanage",
      key: "LK_PEIJIANZONGHEGUANLI",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_INTEGRATEDMANAGE',
      permissionName: '寻源执行-配件管理'
    },
    {
      value: 5,
      name: "附件导入",
      message: 0,
      url: "/sourceinquirypoint/sourcing/importfiles",
      activePath: "importfiles",
      key: "LK_FUJIANXUQIUDAORU",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_IMPORTFILES',
      permissionName: '寻源执行-附件导入'
    },
    {
      value: 6,
      name: "附件管理",
      message: 0,
      url: "/sourceinquirypoint/sourcing/filemanage",
      activePath: "filemanage",
      key: "LK_FUJIANZONGHEGUANLI",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_FILEMANAGE',
      permissionName: '寻源执行-附件管理'
    },
    {
      value: 7,
      name: "RFQ管理",
      message: 0,
      url: "/sourceinquirypoint/sourcing/partsrfq",
      activePath: "partsrfq",
      key: "LK_RFQGUANLI",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSRFQ',
      permissionName: '寻源执行-RFQ管理'
    },
    {
      value: 8,
      name: "竞价开标",
      message: 0,
      url: "/sourceinquirypoint/sourcing/biddingProjectList",
      activePath: "biddingProjectList",
      key: "LK_JINGJIAKAIBIAO",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_BIDDINGPROJECTLIST',
      permissionName: '寻源执行-竞价开标'
    },
    {
      value: 9,
      name: "定点管理",
      message: 0,
      url: "/sourcing/partsnomination",
      activePath: "partsnomination",
      key: "LK_DINGDIANGUANLI",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSNOMINATION',
      permissionName: '寻源执行-定点管理'
    },
    {
      value: 10,
      name: "钢材创建",
      message: 0,
      url: "/sourceinquirypoint/sourcing/steeldemandcreation",
      activePath: "steeldemandcreation",
      key: "GANGCAIXUQIUCHUANGJIAN",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_STEELDEMANDCREATION',
      permissionName: '寻源执行-钢材创建'
    },
    {
      value: 11,
      name: "定点信/LOI",
      message: 0,
      url: "/sourceinquirypoint/sourcing/partsletter",
      activePath: "partsletter",
      key: "LK_DINGDIANXINLOI",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSLETTER',
      permissionName: '寻源执行-定点信/LOI'
    },
  ],
  navListLeft:[ //sourcing 三级菜单列表
    {
      value: 1,
      name: "寻源执行",
      message: 0,
      url: "/sourceinquirypoint/sourcing/partsign",
      activePath: "sourcing",
      key: "XUANYUANCAIDAN",
      permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_MENU',
      permissionName: '寻源执行'
    }
  ]
}

const mutations = {
  SET_NAV_LIST(state, data) {
    state.navList = data
  }
}

let source = null
const actions = {
  updateNavList({ commit, state }) {
    if (source) source.cancel()
    source = axios.CancelToken.source()
    
    return new Promise((resolve, reject) => {
      getAgentTasksNum({ cancelToken: source.token })
      .then(res => {
        if (res.code == 200) {
          const navList = cloneDeep(state.navList)

          Object.keys(res.data).forEach(key => {
            for (let i = 0, item; (item = navList[i++]); ) {
              switch(key) {
                case "partAgentNum": // 零件签收待办
                  if (item.url.indexOf("partsign") > -1) {
                    item.message = res.data[key] || 0
                  }
                  break;
                case "purchaseProjectAgentNum": // 采购项目待办
                  if (item.url.indexOf("partsprocure") > -1) {
                    item.message = res.data[key] || 0
                  }
                  break;
                case "rfqAgentNum": // RFQ待办
                  if (item.url.indexOf("partsrfq") > -1) {
                    item.message = res.data[key] || 0
                  }
                  break;
                case "normiAgentNun": // 定点管理待办
                  if (item.url.indexOf("partsnomination") > -1) {
                    item.message = res.data[key] || 0
                  }
                  break;
                default:
                  break;
              }
            }
          })

          commit("SET_NAV_LIST", navList)
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => reject(err))
    })
  }
}

const getters = {
  navList: state => state.navList,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}