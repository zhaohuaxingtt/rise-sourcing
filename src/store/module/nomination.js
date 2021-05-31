/*
 * @Author: HaoJiang
 * @Date: 2021-05-27 14:29:09
 * @LastEditTime: 2021-05-29 14:11:34
 * @LastEditors: Luoshuang
 * @Description: 定点管理状态管理，缓存定点管理 - 决策资料 - 预览状态，
 * 其他页面统一通过isPreview这个状态，禁用自己页面编辑
 *
 */

const state = {
  // 定点管理，决策资料 是否处于预览状态
  isPreview: false,
  // 定点管理，定点类型
  nominationType: ''
};

const mutations = {
  SET_PREVIEW_STATE(state, STATE) {
      state.isPreview = STATE
  },
  SET_NOMINATION_TYPE(state, type) {
    state.nominationType = type
  }
};

const actions = {
  setPreviewState({commit}, isPreview) {
    commit('SET_PREVIEW_STATE', isPreview === '1')
  },
  setNominationType({commit}, type) {
    commit('SET_NOMINATION_TYPE', type)
  }
}

const getters = {
  isPreview: (state) => state.isPreview,
  nominationType: (state) => state.nominationType,
};

export default {
  state,
  mutations,
  actions,
  getters
}