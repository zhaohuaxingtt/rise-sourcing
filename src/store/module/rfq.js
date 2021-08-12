/*
 * @Author: your name
 * @Date: 2021-06-22 20:16:45
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\store\module\rfq.js
 */
const state = {
  pendingPartsList: [],
  entryStatus: parseInt(window.sessionStorage.getItem('entryStatus')) || 0, //0:外部，1：内部
  rfqId: window.sessionStorage.getItem('rfqId') || '',
  SchemeId: window.sessionStorage.getItem('SchemeId') || '',
  materialGroup: window.sessionStorage.getItem('materialGroup') || '',//材料组
  spareParts: window.sessionStorage.getItem('spareParts') || '',//零件号
  categoryCode:window.sessionStorage.getItem('categoryCode') || '',//材料组code
}
const mutations = {
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
}

export default {
  state,
  mutations,
  actions,
}
