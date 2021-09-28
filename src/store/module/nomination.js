/*
 * @Author: HaoJiang
 * @Date: 2021-05-27 14:29:09
 * @LastEditTime: 2021-07-15 11:38:20
 * @LastEditors: Please set LastEditors
 * @Description: 定点管理状态管理，缓存定点管理 - 决策资料 - 预览状态，
 * 其他页面统一通过isPreview这个状态，禁用自己页面编辑
 *
 */
import { 
  findFrontPageSeat,
  updatePresenPageSeat,
} from '@/api/designate'

// 获取零件列表，用于零件非空校验
import { 
  getPartList 
} from '@/api/designate/designatedetail/rfqdetail/index'

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
  phaseType:'1',
  // 定点管理AppId，desinateId
  nomiAppId: '',
  // 该定点申请中是否有单一供应商
  isSingle:false,
  // 该定点申请RFQ是否加入了零件，前4步进行零件非空校验
  isPartListNull: false,
  // 定点申请状态disabled
  nominationDisabled: false,
  rsDisabled: false
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
  },
  SET_NOMIAPP_ID(state,id){
    state.nomiAppId = id
  },
  SET_SINGLE_STATUS(state,type){
    state.isSingle = type
  },
  SET_PART_LIST_NULL(state,type){
    state.isPartListNull = type
  },
  SET_NOMINATION_DISABLED(state, disabled) {
    state.nominationDisabled = disabled
  },
  SET_RS_DISABLED(state, disabled) {
    state.rsDisabled = disabled
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
  setNominateId({commit}, id) {
    commit('SET_NOMIAPP_ID', id)
  },
  setPartListNull({commit}, isPartListNull) {
    commit('SET_PART_LIST_NULL', isPartListNull)
  },
  setNominationDisabled({commit}, disabled) {
    commit('SET_NOMINATION_DISABLED', disabled)
  },
  setRsDisabled({commit}, disabled) {
    commit('SET_RS_DISABLED', disabled)
  },
  // 检查零件清单是否为空
  checkPartNull({commit, state}) {
    getPartList(state.nomiAppId).then((res)=>{
      if(res.code === '200'){
        commit('SET_PART_LIST_NULL', !(res.data && res.data.length))
      } else {
        commit('SET_PART_LIST_NULL', true)
      }
    }).catch(e => {
      commit('SET_PART_LIST_NULL', true)
    })
  },
  // 定点管理顶部步骤状态
  setNominationStep({commit},params){
    return new Promise((resole,reject)=>{
      findFrontPageSeat(params).then(res=>{
        const {data={},code} = res;
        const {phaseType="1",isSingle=false} = data;
        if(code == 200 && data){
          commit('SET_NOMINATION_STEP', data);
          commit('SET_PHASE_TYPE', phaseType);
          commit('SET_SINGLE_STATUS', isSingle);
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
          commit('SET_PHASE_TYPE', params.phaseType);
        }else{
          reject({});
        }
      
      }).catch((err)=>{
        reject(err);
      })
    })
    
  }
}

const getters = {
  isPreview: (state) => state.isPreview,
  nominationType: (state) => state.nominationType,
  nominationStep: (state) => state.nominationStep,
  phaseType: (state) => state.phaseType,
  disableNominationType: (state) => state.disableNominationType,
  nomiAppId: (state) => state.nomiAppId,
  isSingle: (state) => state.isSingle,
  isPartListNull: (state) => state.isPartListNull,
  nominationDisabled: (state) => state.nominationDisabled,
  rsDisabled: (state) => state.rsDisabled,
};

export default {
  state,
  mutations,
  actions,
  getters
}