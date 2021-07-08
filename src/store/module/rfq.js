const state = {
  pendingPartsList: [],
  entryStatus: window.sessionStorage.getItem('entryStatus') || 0,//0:外部，1：内部
  rfqId: window.sessionStorage.getItem('rfqId') || ''
};
const mutations = {
  SET_PENDING_PARTS_LIST(state, data) {
    state.pendingPartsList = data
  },
  SET_ENTRY_STATUS(state, data) {
    state.entryStatus = data
  },
};

const actions = {
  setPendingPartsList({ commit }, data) {
    commit('SET_PENDING_PARTS_LIST', data)
  },
  setEntryStatus({ commit }, data) {
    commit('SET_ENTRY_STATUS', data)
  }
}

export default {
  state,
  mutations,
  actions
}