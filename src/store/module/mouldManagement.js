const state = {
    budgetManagement: {
        carTypeProject: '',
        sourceStatus: '',
    },
    versionId: ''
};

const mutations = {
    SET_budgetManagement(state, data) {
        state.budgetManagement = data
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