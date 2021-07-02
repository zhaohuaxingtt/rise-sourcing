/*
 * @Author: your name
 * @Date: 2021-06-16 15:25:24
 * @LastEditTime: 2021-07-02 17:07:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\store\module\sourcing.js
 */
import { getAgentTasksNum } from "@/api/partsrfq/home"
import { cloneDeep } from "lodash"
import axios from "axios"

const state = {
  navList: [
    {
      value: 1,
      name: "零件签收",
      message: 0,
      url: "/sourcing/partsign",
      activePath: "partsign",
      key: "LK_LINGJIANQIANSHOU"
    },
    {
      value: 2,
      name: "采购项目建立",
      message: 0,
      url: "/sourcing/partsprocure",
      activePath: "partsprocure",
      key: "LK_CAIGOUXIANGMUJIANLI"
    },
    {
      value: 3,
      name: "配件需求签收",
      message: 0,
      url: "/sourcing/signforpartsdemand",
      activePath: "signforpartsdemand",
      key: "LK_PEIJIANXUQIUQIANSHOU"
    },
    {
      value: 4,
      name: "配件综合管理",
      message: 0,
      url: "/sourcing/integratedmanage",
      activePath: "integratedmanage",
      key: "LK_PEIJIANZONGHEGUANLI"
    },
    {
      value: 5,
      name: "附件需求导入",
      message: 0,
      url: "/sourcing/importfiles",
      activePath: "importfiles",
      key: "LK_FUJIANXUQIUDAORU"
    },
    {
      value: 6,
      name: "附件综合管理",
      message: 0,
      url: "/sourcing/filemanage",
      activePath: "filemanage",
      key: "LK_FUJIANZONGHEGUANLI"
    },
    {
      value: 7,
      name: "RFQ管理",
      message: 0,
      url: "/sourcing/partsrfq",
      activePath: "partsrfq",
      key: "LK_RFQGUANLI"
    },
    {
      value: 8,
      name: "定点管理",
      message: 0,
      url: "/sourcing/partsnomination",
      activePath: "partsnomination",
      key: "LK_DINGDIANGUANLI"
    },
    {
      value: 9,
      name: "钢材需求创建",
      message: 0,
      url: "/sourcing/steeldemandcreation",
      activePath: "steeldemandcreation",
      key: "GANGCAIXUQIUCHUANGJIAN"
    },
    {
      value: 10,
      name: "定点信 / LOI",
      message: 0,
      url: "/sourcing/partsletter",
      activePath: "partsletter",
      key: "LK_DINGDIANXINLOI"
    },
  ],
  navListLeft:[
    {
      value: 1,
      name: "寻源执行",
      message: 0,
      url: "/sourcing/partsign",
      activePath: "sourcing",
      key: "XUANYUANCAIDAN"
    },
    {
      value: 2,
      name: '财务目标价管理',
      key: 'CAIWUMUBIAOJIAGUANLI',
      url: '/financialtargetprice',
      activePath: 'financialtargetprice',
      message: 0
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