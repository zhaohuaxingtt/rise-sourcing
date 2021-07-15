/*
 * @Author: your name
 * @Date: 2021-06-22 20:16:45
 * @LastEditTime: 2021-07-15 16:14:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\store\module\rfq.js
 */
const state = {
  pendingPartsList: [],
  entryStatus: parseInt(window.sessionStorage.getItem('entryStatus')) || 0, //0:外部，1：内部
  rfqId: window.sessionStorage.getItem('rfqId') || '',
  SchemeId: window.sessionStorage.getItem('SchemeId') || '',
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
}

export default {
  state,
  mutations,
  actions,
}
