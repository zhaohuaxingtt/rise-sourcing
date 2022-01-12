/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:21
 * @LastEditTime: 2021-11-17 15:51:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\store\module\location.js
 */
const location = {
  state: {
    locationNumber: 1,
    mtzObject: {},
    submitDataList: 0,
    submitInfor:{},
    disabled: localStorage.getItem('disabled') || false,
  },
  actions: {
    setMtzChangeBtn({ commit }, data) {
      commit('SET_MTZ_CHANGE_DISABLED', data)
    }
  },
  mutations: {
    submitBtnInfor: (state, data) => {
      state.submitInfor = data
    },
    locationBtnChange: (state, data) => {
      state.locationNumber = data
    },
    routerMtzData: (state, data) => {
      state.mtzObject = data
    },
    submitDataNumber: (state, data) => {
      state.submitDataList = data
    },
    SET_MTZ_CHANGE_DISABLED(state, data) {
      state.disabled = data
      localStorage.setItem('disabled', data)
    }
  }
}
export default location
