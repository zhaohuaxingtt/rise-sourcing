const state = {
    pendingPartsList: []
};

const mutations = {
    SET_PENDING_PARTS_LIST(state, data) {
        state.pendingPartsList = data
    },
};

const actions = {
    setPendingPartsList({commit}, data) {
        commit('SET_PENDING_PARTS_LIST', data)
    }
}

export default {
    state,
    mutations,
    actions
}