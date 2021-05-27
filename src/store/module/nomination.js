/*
 * @Author: HaoJiang
 * @Date: 2021-05-27 14:29:09
 * @LastEditTime: 2021-05-27 10:20:08
 * @LastEditors: Luoshuang
 * @Description: 定点管理状态管理，缓存定点管理 - 决策资料 - 预览状态，
 * 其他页面统一通过isPreview这个状态，禁用自己页面编辑
 *
 */

const state = {
  isPreview: false,
};

const mutations = {
  SET_PREVIEW_STATE(state, STATE) {
      state.isPreview = STATE
  }
};

const actions = {
  setPreviewState({commit}, isPreview) {
    commit('SET_PREVIEW_STATE', isPreview === '1')
  }
}

const getters = {
  isPreview: (state) => state.isPreview
};

export default {
  state,
  mutations,
  actions,
  getters
}