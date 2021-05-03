const state = {
    budgetManagement: {
        carTypeProject: '',
        sourceStatus: '',
    },
};

const mutations = {
    SET_budgetManagement(state, data) {
        state.budgetManagement = data
    },
};

const actions = {
}

export default {
    state,
    mutations,
}