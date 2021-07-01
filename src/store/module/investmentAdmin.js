const state = {
  report: null,
  versionId: '1408259535264575490',  //  版本id
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