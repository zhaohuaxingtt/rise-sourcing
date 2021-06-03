/*
 * @Author: HaoJiang
 * @Date: 2021-05-27 14:29:09
 * @LastEditTime: 2021-06-01 14:47:47
 * @LastEditors: Luoshuang
 * @Description: 定点管理状态管理，缓存定点管理 - 决策资料 - 预览状态，
 * 其他页面统一通过isPreview这个状态，禁用自己页面编辑
 *
 */
import { 
  findFrontPageSeat,
  updatePresenPageSeat,
} from '@/api/designate'

const state = {
  // 定点管理，决策资料 是否处于预览状态
  isPreview: false,
  // 定点管理，定点类型
  nominationType: 'MEETING',
  // 是否禁用定点类型
  disableNominationType: true,
  // 定点管理 步骤状态
  nominationStep:{},
  // 定点管理 当前步骤状态
  phaseType:'1'
};

const mutations = {
  SET_DISABLE_NOMINATION(state, STATE) {
    state.disableNominationType = STATE
  },
  SET_PREVIEW_STATE(state, STATE) {
      state.isPreview = STATE
  },
  SET_NOMINATION_TYPE(state, type) {
    state.nominationType = type
  },
  SET_NOMINATION_STEP(state,step){
    state.nominationStep = step
  },
  SET_PHASE_TYPE(state,type){
    state.phaseType = type
  }
};

const actions = {
  setNominationTypeDisable({commit}, state) {
    commit('SET_DISABLE_NOMINATION', state)
  },
  setPreviewState({commit}, isPreview) {
    commit('SET_PREVIEW_STATE', isPreview === '1')
  },
  setNominationType({commit}, type) {
    commit('SET_NOMINATION_TYPE', type)
  },
  // 定点管理顶部步骤状态
  setNominationStep({commit},params){
    return new Promise((resole,reject)=>{
      findFrontPageSeat(params).then(res=>{
        const {data={},code} = res;
        const {phaseType="1"} = data;
        if(code == 200 && data){
          commit('SET_NOMINATION_STEP', data);
          commit('SET_PHASE_TYPE', phaseType);
          resole(data);
        }else{
          commit('SET_NOMINATION_STEP', {});
          commit('SET_PHASE_TYPE', phaseType); 
          reject({})
        }
      }).catch((err)=>{
        reject(err);
      })

    })
  },
  // 更新定点管理顶部步骤
  updateNominationStep({commit},params){
    const {nominationStep} = state;
    const {phaseType} = state;
    // 若更新步骤小于当前步骤就不用更新状态
    if(phaseType > params.phaseType) return;
    const data = {
      ...nominationStep,
      ...params,
    }
    return new Promise((resole,reject)=>{
      updatePresenPageSeat(data).then((res)=>{
        const {code,data} = res;
        if(code === '200' && data){
          resole(data);
        }else{
          reject({});
        }
      
      }).catch((err)=>{
        reject(err);
      })
    })
    
  },
}

const getters = {
  isPreview: (state) => state.isPreview,
  nominationType: (state) => state.nominationType,
  nominationStep: (state) => state.nominationStep,
  phaseType: (state) => state.phaseType,
  disableNominationType: (state) => state.disableNominationType,
  
};

export default {
  state,
  mutations,
  actions,
  getters
}