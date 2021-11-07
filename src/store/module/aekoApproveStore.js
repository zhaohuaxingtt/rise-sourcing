/*
 * @Author: YoHo
 * @Date: 2021-10-15 11:38:10
 * @LastEditTime: 2021-11-05 16:49:30
 * @LastEditors: YoHo
 * @Description: 
 */
const state = {
    itemAekoApproveDetails:null,
    optionAEKOApprove:1,
    count: 0,   // 待办数量
    module: null,   // 当前所处模块，用于查询相应日志

}
const getters = {
    getItemAekoApproveDetails(state){
        return state.itemAekoApproveDetails;
    },
    getOptionAEKOApprove(state){
        return state.optionAEKOApprove;
    },
    getLogCount(state){
        return state.count
    },
    getLogModule(state){
        return state.module
    }
};

const mutations = {
    // state指的是state的数据
    // name传递过来的数据
    setItemAekoApproveDetails(state, itemAekoApproveDetails){
        state.itemAekoApproveDetails = itemAekoApproveDetails;//将传参设置给state的itemAekoApproveDetails
    },
    setOptionAEKOApprove(state,optionAEKOApprove){
        state.optionAEKOApprove=optionAEKOApprove
    },
    setLogCount(state, count){
        state.count = count
    },
    setLogModule(state, module){
        state.module = module
    }
}

const actions ={
// 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setItemAEKOApproveDetailsVal({commit,state}, itemAekoApproveDetails){
        // 跟后台打交道
        // 调用mutaions里面的方法
        commit("setItemAekoApproveDetails", itemAekoApproveDetails);
    },
    setOptionAEKOApproveVal({commit,state}, optionAEKOApprove) {
        commit("setOptionAEKOApprove", optionAEKOApprove);

    },
    setLogCountVal({commit, state}, count) {
        commit("setLogCount", count)
    },
    setLogModuleVal({commit, state}, module) {
        commit("setLogModule", module)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}