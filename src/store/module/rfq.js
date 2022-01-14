/*
 * @Author: your name
 * @Date: 2021-06-22 20:16:45
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\store\module\rfq.js
 */
import { waitDealtRfqTaskStatus } from '@/api/partsprocure/home';
const state = {
  pendingPartsList: [], //已经加入rfq里面的零件采购项目
  entryStatus: parseInt(window.sessionStorage.getItem('entryStatus')) || 0, //0:外部，1：内部
  rfqId: window.sessionStorage.getItem('rfqId') || '',
  SchemeId: window.sessionStorage.getItem('SchemeId') || '',
  materialGroup: window.sessionStorage.getItem('materialGroup') || '',//材料组
  spareParts: window.sessionStorage.getItem('spareParts') || '',//零件号
  categoryCode: window.sessionStorage.getItem('categoryCode') || '',//材料组code
  categoryName: window.sessionStorage.getItem('categoryName') || '',//材料组name
  // categoryId:window.sessionStorage.getItem('categoryId') || '',//材料组name
  piIndexChartParams: {
    dimensionHandle: [],
    particleSize: '3',
    beginTime: '',
    endTime: ''
  },
  piIndexChartData: {
    seriesArray: [],
    xLabelData: [],
    resChartData: []
  },
  // 待办项
  todoObj:{
    mouldPriceStatusDesc:{name:'模具目标价',key:'MUJUMUBIAOJIA'},
    mouldBudgetStatusDesc:{name:'模具投资预算',key:'MOJUTOUZIYUSUAN'},
    cfPriceStatusDesc:{name:'零件目标价',key:'LINGJIANMUBIAOJIA'},
    pushRateStatusDesc:{name:'供应商评分',key:'GONGYINGSHANGPINGFEN'},
  },
  partfunc:null

}
const mutations = {
  SET_PART_PROJECT(state, data) {
    state.partfunc = data
  },
  SET_PENDING_PARTS_LIST(state, data) {
    state.pendingPartsList = data
  },
  SET_ENTRY_STATUS(state, data) {
    state.entryStatus = data
  },
  SET_RFQ_ID(state, data) {
    state.rfqId = data
  },
  SET_SCHEME_ID(state, data) {
    state.SchemeId = data
    sessionStorage.setItem('SchemeId', data)
  },
  SET_MATERIAL_GROUP(state, data) {
    state.materialGroup = data
    sessionStorage.setItem('materialGroup', data)
  },
  SET_SPARE_PARTS(state, data) {
    state.spareParts = data
    sessionStorage.setItem('spareParts', data)
  },
  // 品类管理助手-材料组code
  SET_CATEGORY_CODE(state, data) {
    state.categoryCode = data
    sessionStorage.setItem('categoryCode', data)
  },
  // 品类管理助手-材料组name
  SET_CATEGORY_NAME(state, data) {
    state.categoryName = data
    sessionStorage.setItem('categoryName', data)
  },
  // // 品类管理助手-材料组ID
  // SET_CATEGORY_ID(state, data) {
  //   state.categoryId = data
  //   sessionStorage.setItem('categoryId', data)
  // },
  // PI数据处理
  SET_PI_INDEX_CHART_PARAMS(state, data) {
    state.piIndexChartParams = data
  },
  SET_PI_CHART_DATA(state, data) {
    state.piIndexChartData = data
  },
  SET_TODO_OBJ(state, todoObj) {
    state.todoObj = todoObj
  }
}

const actions = {
  setPendingPartsList({ commit }, data) {
    commit('SET_PENDING_PARTS_LIST', data)
  },
  setEntryStatus({ commit }, data) {
    commit('SET_ENTRY_STATUS', data)
  },
  setRfqId({ commit }, data) {
    commit('SET_RFQ_ID', data)
  },
  setSchemeId({ commit }, data) {
    commit('SET_SCHEME_ID', data)
  },
  setMaterialGroup({ commit }, data) {
    commit('SET_MATERIAL_GROUP', data)
  },
  setSpareParts({ commit }, data) {
    commit('SET_SPARE_PARTS', data)
  },
  // 品类管理助手-材料组code
  setCategoryCode({ commit }, data) {
    commit('SET_CATEGORY_CODE', data)
  },
  // 品类管理助手-材料组name
  setCategoryName({ commit }, data) {
    commit('SET_CATEGORY_NAME', data)
  },
  // // 品类管理助手-材料组Id
  // setCategoryId({ commit }, data) {
  //   commit('SET_CATEGORY_ID', data)
  // },
  // PI数据处理
  setPiIndexChartParams({ commit }, data) {
    commit('SET_PI_INDEX_CHART_PARAMS', data)
  },
  setPiIndexChartData({ commit }, data) {
    commit('SET_PI_CHART_DATA', data)
  },
  // 根据rfqId查询待办任务状态
  async setTodoObj({ commit }, id){
    let result = false
    const todoObj = {
      mouldPriceStatusDesc:{name:'模具目标价',key:'MUJUMUBIAOJIA'},
      mouldBudgetStatusDesc:{name:'模具投资预算',key:'MOJUTOUZIYUSUAN'},
      cfPriceStatusDesc:{name:'零件目标价',key:'LINGJIANMUBIAOJIA'},
      pushRateStatusDesc:{name:'供应商评分',key:'GONGYINGSHANGPINGFEN'},
    }
    await waitDealtRfqTaskStatus(id).then(async(res)=>{
      if(res.result){
        let data = res.data
        for (const key in todoObj) {
          todoObj[key].status = ''
          if (data[key]) {
            todoObj[key].status = data[key]
            if(data[key]!='已完成'){
              result = true
            }
          }
        }
      }
    })
    commit('SET_TODO_OBJ', todoObj)
    return result
  }
}

export default {
  state,
  mutations,
  actions,
}
