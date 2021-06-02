const state = {
    budgetManagement: {
        carTypeProject: '',
        sourceStatus: '',
    },
    versionId: '',
    isBudget: '',
    nextStep: false,
    onleySelf: false,
    checkHistory: false,
};

const mutations = {
    SET_budgetManagement(state, data) {
        state.budgetManagement = data
    },
    SET_versionId(state, data) {
        state.versionId = data
    },
    SET_isBudget(state, data) {
        state.isBudget = data
    },
    SET_nextStep(state, data) {
        state.nextStep = data
    },
    SET_onleySelf(state, data) {
        state.onleySelf = data
    },
    SET_checkHistory(state, data) {
        state.checkHistory = data
    },
};

const actions = {
}

export default {
    state,
    mutations,
}