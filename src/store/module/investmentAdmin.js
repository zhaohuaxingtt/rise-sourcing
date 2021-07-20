const state = {
  report: null,
  versionId: '',  //  版本id
};

const mutations = {
  SET_report(state, data) {
      state.report = data
  },

  SET_versionId(state, data) {
    state.versionId = data
},
};

const actions = {
}

export default {
  state,
  mutations,
}